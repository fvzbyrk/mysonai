#!/bin/bash

# MySonAI Backup Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="mysonai"
BACKUP_DIR="/var/backups/mysonai"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/mysonai_backup_${DATE}.tar.gz"

echo -e "${BLUE}💾 Starting MySonAI backup...${NC}"
echo -e "${BLUE}Backup file: ${BACKUP_FILE}${NC}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Create backup
echo -e "${YELLOW}📦 Creating backup archive...${NC}"
tar -czf "${BACKUP_FILE}" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='coverage' \
    --exclude='playwright-report' \
    -C /var/www "${PROJECT_NAME}"

# Database backup
echo -e "${YELLOW}🗄️ Backing up database...${NC}"
docker-compose exec -T postgres pg_dump -U mysonai mysonai > "${BACKUP_DIR}/database_${DATE}.sql"

# Redis backup
echo -e "${YELLOW}🔴 Backing up Redis data...${NC}"
docker-compose exec -T redis redis-cli BGSAVE
docker cp $(docker-compose ps -q redis):/data/dump.rdb "${BACKUP_DIR}/redis_${DATE}.rdb"

# Upload to cloud storage (optional)
if [ ! -z "$AWS_S3_BUCKET" ]; then
    echo -e "${YELLOW}☁️ Uploading to S3...${NC}"
    aws s3 cp "${BACKUP_FILE}" "s3://${AWS_S3_BUCKET}/backups/"
    aws s3 cp "${BACKUP_DIR}/database_${DATE}.sql" "s3://${AWS_S3_BUCKET}/backups/"
    aws s3 cp "${BACKUP_DIR}/redis_${DATE}.rdb" "s3://${AWS_S3_BUCKET}/backups/"
fi

# Cleanup old backups (keep last 7 days)
echo -e "${YELLOW}🧹 Cleaning up old backups...${NC}"
find "${BACKUP_DIR}" -name "mysonai_backup_*.tar.gz" -mtime +7 -delete
find "${BACKUP_DIR}" -name "database_*.sql" -mtime +7 -delete
find "${BACKUP_DIR}" -name "redis_*.rdb" -mtime +7 -delete

echo -e "${GREEN}✅ Backup completed successfully!${NC}"
echo -e "${BLUE}Backup location: ${BACKUP_FILE}${NC}"
