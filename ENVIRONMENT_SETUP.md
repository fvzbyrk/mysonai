# 🔐 Environment Variables Güvenlik Rehberi

## ⚠️ ÖNEMLİ GÜVENLİK UYARISI

**API key'lerinizi asla kod repository'sine commit etmeyin!** Bu dosya sadece rehber amaçlıdır.

## 📁 Gerekli Environment Dosyaları

### 1. `.env.local` (Local Development)
```bash
# Bu dosyayı proje root'unda oluşturun
# Git'e commit edilmemeli (.gitignore'da)

# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Supabase Configuration  
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://mysonai.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mysonai.com

# Feature Flags
NEXT_PUBLIC_FEATURE_DEMO=true
NEXT_PUBLIC_FEATURE_CHAT=true
```

### 2. Production Environment Variables

#### Vercel Deployment:
1. Vercel Dashboard → Project Settings → Environment Variables
2. Aşağıdaki değişkenleri ekleyin:

```
OPENAI_API_KEY = sk-your-actual-openai-api-key
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL = https://mysonai.com
```

#### Docker Deployment:
```bash
# docker-compose.yml'de environment section
environment:
  - OPENAI_API_KEY=sk-your-actual-openai-api-key
  - SUPABASE_URL=https://your-project.supabase.co
  - SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🔑 API Key Alma Rehberi

### OpenAI API Key:
1. https://platform.openai.com/api-keys adresine gidin
2. "Create new secret key" butonuna tıklayın
3. Key'i kopyalayın ve güvenli bir yerde saklayın
4. **⚠️ Key'i sadece bir kez görebilirsiniz!**

### Supabase Keys:
1. https://supabase.com/dashboard adresine gidin
2. Project Settings → API
3. URL, anon key ve service role key'i alın

## 🛡️ Güvenlik Best Practices

### ✅ Yapılması Gerekenler:
- Environment variables kullanın
- `.env.local` dosyasını `.gitignore`'a ekleyin
- Production'da environment variables ayarlayın
- API key'leri düzenli olarak rotate edin
- Sadece gerekli izinleri verin

### ❌ Yapılmaması Gerekenler:
- API key'leri kod içine hardcode etmeyin
- API key'leri public repository'ye commit etmeyin
- API key'leri client-side kodda kullanmayın
- API key'leri log dosyalarına yazdırmayın

## 🚀 Hızlı Kurulum

### Local Development:
```bash
# 1. .env.local dosyası oluşturun
cp env.example .env.local

# 2. .env.local dosyasını düzenleyin
# OPENAI_API_KEY=sk-your-actual-key-here

# 3. Development server'ı başlatın
npm run dev
```

### Production Deployment:
1. Hosting provider'ınızda environment variables ayarlayın
2. API key'leri güvenli bir şekilde ekleyin
3. Deploy edin

## 🔍 API Key Kontrolü

API key'inizin çalışıp çalışmadığını kontrol etmek için:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.openai.com/v1/models
```

Başarılı yanıt alırsanız API key'iniz çalışıyor demektir.
