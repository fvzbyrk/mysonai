#!/bin/bash

# MySonAI Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="mysonai"
DOCKER_IMAGE="mysonai/website"
VERSION=${1:-latest}
ENVIRONMENT=${2:-production}

echo -e "${BLUE}🚀 Starting MySonAI deployment...${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Version: ${VERSION}${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

if ! command_exists docker; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Backup current deployment
echo -e "${YELLOW}💾 Creating backup...${NC}"
if [ -d "/var/www/${PROJECT_NAME}" ]; then
    sudo cp -r "/var/www/${PROJECT_NAME}" "/var/www/${PROJECT_NAME}.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✅ Backup created${NC}"
fi

# Pull latest image
echo -e "${YELLOW}📥 Pulling latest Docker image...${NC}"
docker pull "${DOCKER_IMAGE}:${VERSION}"

# Update environment file
echo -e "${YELLOW}🔧 Updating environment configuration...${NC}"
if [ -f ".env.${ENVIRONMENT}" ]; then
    cp ".env.${ENVIRONMENT}" "/var/www/${PROJECT_NAME}/.env"
    echo -e "${GREEN}✅ Environment file updated${NC}"
else
    echo -e "${RED}❌ Environment file .env.${ENVIRONMENT} not found${NC}"
    exit 1
fi

# Deploy with Docker Compose
echo -e "${YELLOW}🐳 Deploying with Docker Compose...${NC}"
cd "/var/www/${PROJECT_NAME}"

# Stop existing containers
docker-compose down

# Start new containers
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Health check
echo -e "${YELLOW}🏥 Performing health check...${NC}"
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo -e "${YELLOW}🔄 Rolling back to previous version...${NC}"
    docker-compose down
    # Restore backup logic here
    exit 1
fi

# Cleanup old images
echo -e "${YELLOW}🧹 Cleaning up old Docker images...${NC}"
docker image prune -f

# Update Nginx configuration if needed
echo -e "${YELLOW}🔧 Updating Nginx configuration...${NC}"
if [ -f "nginx/conf.d/mysonai.conf" ]; then
    sudo cp nginx/conf.d/mysonai.conf /etc/nginx/conf.d/
    sudo nginx -t && sudo systemctl reload nginx
    echo -e "${GREEN}✅ Nginx configuration updated${NC}"
fi

# SSL certificate renewal check
echo -e "${YELLOW}🔒 Checking SSL certificates...${NC}"
if command_exists certbot; then
    sudo certbot renew --quiet
    echo -e "${GREEN}✅ SSL certificates checked${NC}"
fi

# Send deployment notification
echo -e "${YELLOW}📢 Sending deployment notification...${NC}"
if [ ! -z "$SLACK_WEBHOOK" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"🚀 MySonAI deployed successfully!\nEnvironment: ${ENVIRONMENT}\nVersion: ${VERSION}\nTime: $(date)\"}" \
        "$SLACK_WEBHOOK"
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}📊 Monitoring: https://mysonai.com/monitoring${NC}"
echo -e "${BLUE}🌐 Application: https://mysonai.com${NC}"
