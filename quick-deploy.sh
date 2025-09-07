#!/bin/bash

# MySonAI Hızlı Deployment Script
echo "🚀 MySonAI Hızlı Deployment Başlıyor..."

# Renkli çıktı için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# VPS IP'sini al
read -p "VPS IP adresinizi girin: " VPS_IP
read -p "Domain adınızı girin (opsiyonel): " DOMAIN

echo -e "${YELLOW}📋 Deployment Bilgileri:${NC}"
echo "VPS IP: $VPS_IP"
echo "Domain: ${DOMAIN:-'Yok'}"

# Dosyaları VPS'e kopyala
echo -e "${YELLOW}📦 Dosyalar VPS'e kopyalanıyor...${NC}"
scp mysonai-deploy.zip root@$VPS_IP:/var/www/mysonai/

# VPS'e bağlan ve deployment yap
echo -e "${YELLOW}🔧 VPS'te deployment yapılıyor...${NC}"
ssh root@$VPS_IP << EOF
cd /var/www/mysonai
unzip -o mysonai-deploy.zip
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
EOF

echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"
echo -e "${GREEN}🌐 Uygulamanız şu adreslerde erişilebilir:${NC}"
echo "http://$VPS_IP:3000"
if [ ! -z "$DOMAIN" ]; then
    echo "http://$DOMAIN"
fi

echo -e "${YELLOW}📝 Sonraki adımlar:${NC}"
echo "1. Nginx konfigürasyonu yapın"
echo "2. SSL sertifikası kurun"
echo "3. Domain DNS ayarlarını yapın"
echo "4. Uygulamayı test edin"

echo -e "${GREEN}🎉 MySonAI başarıyla deploy edildi!${NC}"
