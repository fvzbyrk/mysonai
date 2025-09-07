# 🚀 MySonAI Deployment Rehberi

## 📋 Gereksinimler
- VPS (Hostinger VPS önerilir)
- Domain adı (opsiyonel)
- SSH erişimi

## 🔧 VPS Hazırlığı

### 1. VPS'e Bağlanma
```bash
# SSH ile bağlan
ssh root@YOUR_VPS_IP

# Veya Hostinger Panel'den Terminal kullan
```

### 2. Gerekli Paketleri Kurma
```bash
# Node.js 18 kurulumu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 kurulumu
sudo npm install -g pm2

# Nginx kurulumu
sudo apt update
sudo apt install nginx -y
```

### 3. Proje Klasörü Oluşturma
```bash
# Proje klasörü oluştur
sudo mkdir -p /var/www/mysonai
sudo chown -R $USER:$USER /var/www/mysonai
cd /var/www/mysonai
```

## 📦 Dosya Yükleme

### Yöntem 1: ZIP Dosyası ile
1. `mysonai-deploy.zip` dosyasını VPS'e yükleyin
2. ZIP'i açın:
```bash
unzip mysonai-deploy.zip
```

### Yöntem 2: Git ile (önerilen)
```bash
# Git kurulumu
sudo apt install git -y

# Projeyi klonla
git clone https://github.com/YOUR_USERNAME/mysonai.git .
# Veya dosyaları manuel yükleyin
```

## 🚀 Deployment

### 1. Bağımlılıkları Kur
```bash
npm install
```

### 2. Build Yap
```bash
npm run build
```

### 3. PM2 ile Başlat
```bash
# PM2 ile uygulamayı başlat
pm2 start ecosystem.config.js

# PM2 durumunu kontrol et
pm2 status

# PM2'yi sistem başlangıcında otomatik başlat
pm2 startup
pm2 save
```

## 🌐 Nginx Konfigürasyonu

### 1. Nginx Site Konfigürasyonu
```bash
sudo nano /etc/nginx/sites-available/mysonai
```

### 2. Konfigürasyon İçeriği
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Siteyi Aktif Et
```bash
sudo ln -s /etc/nginx/sites-available/mysonai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 SSL Sertifikası (Let's Encrypt)

### 1. Certbot Kurulumu
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. SSL Sertifikası Al
```bash
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

## ✅ Test

### 1. Uygulama Testi
```bash
# PM2 durumunu kontrol et
pm2 status

# Logları kontrol et
pm2 logs mysonai

# Nginx durumunu kontrol et
sudo systemctl status nginx
```

### 2. Web Testi
- http://YOUR_VPS_IP:3000 (direkt erişim)
- http://YOUR_DOMAIN.com (domain ile erişim)
- https://YOUR_DOMAIN.com (SSL ile erişim)

## 🔧 Sorun Giderme

### PM2 Sorunları
```bash
# PM2'yi yeniden başlat
pm2 restart mysonai

# PM2'yi durdur ve başlat
pm2 stop mysonai
pm2 start mysonai
```

### Nginx Sorunları
```bash
# Nginx konfigürasyonunu test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx

# Nginx loglarını kontrol et
sudo tail -f /var/log/nginx/error.log
```

### Port Sorunları
```bash
# Port 3000'in kullanımını kontrol et
sudo netstat -tlnp | grep :3000

# Firewall ayarları
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443
```

## 📞 Destek

Sorun yaşarsanız:
1. PM2 loglarını kontrol edin: `pm2 logs mysonai`
2. Nginx loglarını kontrol edin: `sudo tail -f /var/log/nginx/error.log`
3. Uygulama loglarını kontrol edin: `pm2 logs mysonai --lines 50`

## 🎯 Sonraki Adımlar

1. **Domain Bağlama**: DNS ayarlarını yapın
2. **SSL Kurulumu**: HTTPS aktif edin
3. **Monitoring**: Uptime monitoring ekleyin
4. **Backup**: Otomatik yedekleme kurun
5. **CI/CD**: GitHub Actions ile otomatik deploy
