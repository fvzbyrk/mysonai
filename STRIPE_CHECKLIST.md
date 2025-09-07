# Stripe Dashboard Kurulum Checklist

## ✅ Adım 1: Stripe Hesabı Oluşturma

- [ ] [Stripe Dashboard](https://dashboard.stripe.com/) adresine git
- [ ] "Create account" butonuna tıkla
- [ ] Email ve şifre ile hesap oluştur
- [ ] Email doğrulamasını tamamla
- [ ] İşletme bilgilerini doldur
- [ ] Test modunda başla

## ✅ Adım 2: API Anahtarlarını Alma

- [ ] Dashboard'da "Developers" > "API keys" sekmesine git
- [ ] "Test mode" aktif olduğunu kontrol et
- [ ] "Publishable key" (pk_test_...) kopyala
- [ ] "Secret key" (sk_test_...) kopyala
- [ ] Bu anahtarları `.env.local` dosyasına ekle

## ✅ Adım 3: Product Oluşturma

### Pro Plan Product
- [ ] "Products" sekmesine git
- [ ] "Add product" butonuna tıkla
- [ ] Product bilgilerini gir:
  ```
  Name: MySonAI Pro Plan
  Description: Professional AI assistant plan with 1000 messages/month
  ```
- [ ] Pricing bilgilerini gir:
  ```
  Price: 99.00
  Currency: Turkish Lira (TRY)
  Billing period: Monthly
  ```
- [ ] "Save product" butonuna tıkla
- [ ] Product ID'yi not et: `prod_xxxxxxxxxx`

### Enterprise Plan Product
- [ ] Yeni product oluştur
- [ ] Product bilgilerini gir:
  ```
  Name: MySonAI Enterprise Plan
  Description: Enterprise AI assistant plan with unlimited usage
  ```
- [ ] Pricing bilgilerini gir:
  ```
  Price: 299.00
  Currency: Turkish Lira (TRY)
  Billing period: Monthly
  ```
- [ ] Product ID'yi not et: `prod_xxxxxxxxxx`

## ✅ Adım 4: Price ID'lerini Alma

- [ ] Her product için oluşturulan price'ları bul
- [ ] Pro Plan Price ID'yi not et: `price_xxxxxxxxxx`
- [ ] Enterprise Plan Price ID'yi not et: `price_xxxxxxxxxx`

## ✅ Adım 5: Webhook Endpoint Kurulumu

- [ ] "Developers" > "Webhooks" sekmesine git
- [ ] "Add endpoint" butonuna tıkla
- [ ] Endpoint URL'ini gir:
  ```
  https://mysonai.com/api/webhooks/stripe
  ```
- [ ] Events to send bölümünde şu event'leri seç:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_failed`
  - [ ] `invoice.payment_succeeded`
- [ ] "Add endpoint" butonuna tıkla
- [ ] Webhook secret'i not et: `whsec_xxxxxxxxxx`

## ✅ Adım 6: Environment Variables Güncelleme

- [ ] `.env.local` dosyasını oluştur/güncelle
- [ ] Stripe anahtarlarını ekle:
  ```env
  STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
  STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
  STRIPE_PRODUCT_ID_PRO=prod_your_pro_product_id
  STRIPE_PRODUCT_ID_ENTERPRISE=prod_your_enterprise_product_id
  STRIPE_PRICE_ID_PRO=price_your_pro_price_id
  STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_price_id
  ```

## ✅ Adım 7: Test Ödemesi

- [ ] Test kartı ile ödeme yapmayı dene:
  ```
  Card Number: 4242 4242 4242 4242
  Expiry: 12/34
  CVC: 123
  ```
- [ ] Webhook'ların çalıştığını kontrol et
- [ ] Database'de subscription bilgilerinin güncellendiğini doğrula
- [ ] Billing dashboard'da fatura göründüğünü kontrol et

## ✅ Adım 8: Production'a Geçiş

- [ ] Stripe Dashboard'da "Activate your account" butonuna tıkla
- [ ] Live API key'lerini al
- [ ] Environment variables'ları production değerleriyle güncelle
- [ ] Webhook endpoint'ini production URL'iyle güncelle
- [ ] Test ödemesi yap

## 🔧 Sorun Giderme

### Webhook Hataları
- [ ] Webhook secret'in doğru olduğundan emin ol
- [ ] Endpoint URL'inin erişilebilir olduğunu kontrol et
- [ ] Stripe Dashboard'da webhook log'larını incele

### Ödeme Hataları
- [ ] API key'lerin doğru olduğundan emin ol
- [ ] Currency'nin TRY olduğunu kontrol et
- [ ] Test kartlarını kullandığından emin ol

### Database Hataları
- [ ] Supabase connection'ının çalıştığını kontrol et
- [ ] RLS policy'lerinin doğru olduğunu doğrula
- [ ] User ID'lerin doğru format'ta olduğunu kontrol et

## 📞 Destek

Sorun yaşarsan:
1. Stripe Dashboard'da log'ları kontrol et
2. Browser console'da hata mesajlarını incele
3. Supabase Dashboard'da database log'larını kontrol et
4. GitHub Issues'da sorun bildir

---

**Not:** Bu checklist test ortamı için hazırlanmıştır. Production'a geçmeden önce tüm güvenlik önlemlerini almayı unutma.
