# Google OAuth Domain Ayarları - MySonAI

## 🚨 Sorun
Google ile giriş yapılamıyor çünkü `mysonai.com` domain'i OAuth ayarlarında tanımlanmamış.

## 🔧 Çözüm Adımları

### 1. Google Cloud Console Ayarları

#### A. Google Cloud Console'a Giriş
1. [Google Cloud Console](https://console.cloud.google.com/) → Giriş yap
2. MySonAI projesini seç

#### B. OAuth Consent Screen Ayarları
1. **APIs & Services** → **OAuth consent screen**
2. **Authorized domains** bölümüne ekle:
   - `mysonai.com`
   - `www.mysonai.com`
   - `app.mysonai.com` (eğer varsa)

#### C. Credentials Ayarları
1. **APIs & Services** → **Credentials**
2. OAuth 2.0 Client ID'yi seç
3. **Authorized JavaScript origins** bölümüne ekle:
   - `https://mysonai.com`
   - `https://www.mysonai.com`
   - `https://app.mysonai.com` (eğer varsa)
4. **Authorized redirect URIs** bölümüne ekle:
   - `https://mysonai.com/auth/callback`
   - `https://www.mysonai.com/auth/callback`
   - `https://app.mysonai.com/auth/callback` (eğer varsa)

### 2. Supabase Ayarları

#### A. Supabase Dashboard
1. [Supabase Dashboard](https://supabase.com/dashboard) → Giriş yap
2. MySonAI projesini seç

#### B. Authentication Ayarları
1. **Authentication** → **Settings**
2. **Site URL** bölümüne ekle:
   - `https://mysonai.com`
   - `https://www.mysonai.com`

#### C. OAuth Providers
1. **Authentication** → **Providers**
2. **Google** provider'ını seç
3. **Redirect URLs** bölümüne ekle:
   - `https://mysonai.com/auth/callback`
   - `https://www.mysonai.com/auth/callback`

### 3. Environment Variables

#### A. Production Environment
```bash
# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://ixmzmgjfwolihwmjnpyk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### B. Domain Ayarları
```bash
# Domain configuration
NEXT_PUBLIC_SITE_URL=https://mysonai.com
NEXT_PUBLIC_APP_URL=https://mysonai.com
```

### 4. DNS Ayarları

#### A. Domain Provider
1. Domain sağlayıcısına giriş yap
2. DNS kayıtlarını kontrol et:
   - `A` record: `mysonai.com` → Server IP
   - `CNAME` record: `www.mysonai.com` → `mysonai.com`

#### B. SSL Sertifikası
1. HTTPS sertifikasının aktif olduğunu kontrol et
2. Let's Encrypt veya Cloudflare SSL kullan

### 5. Test Adımları

#### A. OAuth Test
1. `https://mysonai.com/tr/signup` sayfasına git
2. "Google ile devam et" butonuna tıkla
3. Google OAuth sayfası açılmalı
4. Giriş yap ve callback'e yönlendirilmeli

#### B. Hata Kontrolü
1. Browser Developer Tools → Console
2. Network tab'ında OAuth isteklerini kontrol et
3. Hata mesajlarını not et

### 6. Yaygın Hatalar ve Çözümleri

#### A. "redirect_uri_mismatch" Hatası
- **Sebep:** Redirect URI'lar eşleşmiyor
- **Çözüm:** Google Console'da redirect URI'ları güncelle

#### B. "invalid_client" Hatası
- **Sebep:** Client ID yanlış veya domain tanımlanmamış
- **Çözüm:** Google Console'da domain ayarlarını kontrol et

#### C. "access_denied" Hatası
- **Sebep:** OAuth consent screen ayarları
- **Çözüm:** Consent screen'de domain'i authorized domains'e ekle

### 7. Monitoring ve Logging

#### A. Supabase Logs
1. **Logs** → **Auth** bölümünü kontrol et
2. OAuth hatalarını takip et

#### B. Google Cloud Logs
1. **Logging** → **Logs Explorer**
2. OAuth isteklerini filtrele

## 🚀 Deployment Sonrası Kontrol

### 1. Production Test
- [ ] Google OAuth çalışıyor
- [ ] Callback URL'leri doğru
- [ ] Domain ayarları aktif
- [ ] SSL sertifikası geçerli

### 2. User Experience Test
- [ ] Signup flow tamamlanıyor
- [ ] User bilgileri doğru kaydediliyor
- [ ] Dashboard'a yönlendirme çalışıyor

## 📞 Destek

Sorun devam ederse:
1. Google Cloud Console → Support
2. Supabase → Support
3. Domain provider → Technical Support

---

**Not:** Bu ayarlar yapıldıktan sonra 5-10 dakika içinde aktif olur. Eğer hemen çalışmazsa cache temizleme gerekebilir.
