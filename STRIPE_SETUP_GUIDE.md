# Stripe Dashboard Kurulum Rehberi

Bu rehber, MySonAI projesi için Stripe dashboard kurulumunu adım adım açıklar.

## 1. Stripe Hesabı Oluşturma

1. [Stripe Dashboard](https://dashboard.stripe.com/) adresine gidin
2. "Create account" butonuna tıklayın
3. Hesap bilgilerinizi girin ve doğrulayın
4. Test modunda başlayın (geliştirme için)

## 2. Product ve Price Oluşturma

### Pro Plan Product Oluşturma

1. Stripe Dashboard'da **Products** sekmesine gidin
2. **"Add product"** butonuna tıklayın
3. Aşağıdaki bilgileri girin:

```
Product Name: MySonAI Pro Plan
Description: Professional AI assistant plan with 1000 messages/month
```

4. **Pricing** bölümünde:
```
Price: 99.00
Currency: Turkish Lira (TRY)
Billing period: Monthly
```

5. **"Save product"** butonuna tıklayın
6. Oluşturulan Product ID'yi not edin: `prod_xxxxxxxxxx`

### Enterprise Plan Product Oluşturma

1. Yeni bir product oluşturun:
```
Product Name: MySonAI Enterprise Plan
Description: Enterprise AI assistant plan with unlimited usage
```

2. **Pricing** bölümünde:
```
Price: 299.00
Currency: Turkish Lira (TRY)
Billing period: Monthly
```

3. Product ID'yi not edin: `prod_xxxxxxxxxx`

## 3. Price ID'lerini Alma

1. Her product için oluşturulan price'ları bulun
2. Price ID'lerini not edin:
   - Pro Plan Price ID: `price_xxxxxxxxxx`
   - Enterprise Plan Price ID: `price_xxxxxxxxxx`

## 4. Webhook Endpoint Kurulumu

1. Stripe Dashboard'da **Webhooks** sekmesine gidin
2. **"Add endpoint"** butonuna tıklayın
3. Endpoint URL'ini girin:
```
https://mysonai.com/api/webhooks/stripe
```

4. **Events to send** bölümünde şu event'leri seçin:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`

5. **"Add endpoint"** butonuna tıklayın
6. Webhook secret'i not edin: `whsec_xxxxxxxxxx`

## 5. Environment Variables Güncelleme

`.env.local` dosyanızı aşağıdaki bilgilerle güncelleyin:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Stripe Product IDs (Stripe Dashboard'dan alın)
STRIPE_PRODUCT_ID_PRO=prod_your_pro_product_id
STRIPE_PRODUCT_ID_ENTERPRISE=prod_your_enterprise_product_id

# Stripe Price IDs (Stripe Dashboard'dan alın)
STRIPE_PRICE_ID_PRO=price_your_pro_price_id
STRIPE_PRICE_ID_ENTERPRISE=price_your_enterprise_price_id
```

## 6. Kod Güncellemesi

`src/lib/stripe.ts` dosyasındaki ID'leri güncelleyin:

```typescript
export const STRIPE_PRODUCT_IDS = {
  pro: 'prod_your_pro_product_id',
  enterprise: 'prod_your_enterprise_product_id'
} as const

export const STRIPE_PRICE_IDS = {
  pro: 'price_your_pro_price_id',
  enterprise: 'price_your_enterprise_price_id'
} as const
```

## 7. Test Ödemesi

1. Test kartı ile ödeme yapmayı deneyin:
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
```

2. Webhook'ların çalıştığını kontrol edin
3. Database'de subscription bilgilerinin güncellendiğini doğrulayın

## 8. Production'a Geçiş

1. Stripe Dashboard'da **"Activate your account"** butonuna tıklayın
2. Live API key'lerini alın
3. Environment variables'ları production değerleriyle güncelleyin
4. Webhook endpoint'ini production URL'iyle güncelleyin

## Sorun Giderme

### Webhook Hataları
- Webhook secret'in doğru olduğundan emin olun
- Endpoint URL'inin erişilebilir olduğunu kontrol edin
- Stripe Dashboard'da webhook log'larını inceleyin

### Ödeme Hataları
- API key'lerin doğru olduğundan emin olun
- Currency'nin TRY olduğunu kontrol edin
- Test kartlarını kullandığınızdan emin olun

### Database Hataları
- Supabase connection'ının çalıştığını kontrol edin
- RLS policy'lerinin doğru olduğunu doğrulayın
- User ID'lerin doğru format'ta olduğunu kontrol edin

## Destek

Sorun yaşarsanız:
1. Stripe Dashboard'da log'ları kontrol edin
2. Browser console'da hata mesajlarını inceleyin
3. Supabase Dashboard'da database log'larını kontrol edin
4. GitHub Issues'da sorun bildirin

---

**Not:** Bu rehber test ortamı için hazırlanmıştır. Production'a geçmeden önce tüm güvenlik önlemlerini almayı unutmayın.
