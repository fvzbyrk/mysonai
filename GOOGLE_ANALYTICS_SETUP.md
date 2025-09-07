# Google Analytics 4 (GA4) Kurulum Rehberi

## 🎯 Google Analytics Hesabı Oluşturma

### Adım 1: Google Analytics'e Giriş
- [Google Analytics](https://analytics.google.com/) adresine git
- Google hesabınla giriş yap
- "Hesap Oluştur" butonuna tıkla

### Adım 2: Hesap Bilgilerini Doldur
```
Hesap Adı: MySonAI
Ülke: Turkey
Para Birimi: Turkish Lira (TRY)
```

### Adım 3: Property Oluştur
```
Property Adı: MySonAI Website
Raporlama Saat Dilimi: Turkey (GMT+3)
Para Birimi: Turkish Lira (TRY)
```

### Adım 4: İşletme Bilgileri
```
Sektör Kategorisi: Technology
İşletme Boyutu: 1-10 çalışan
Google Analytics'i nasıl kullanmayı planlıyorsunuz: 
- Web sitesi trafiğini ölçmek
- E-ticaret performansını izlemek
- Kullanıcı davranışlarını analiz etmek
```

## 🌐 Veri Akışı Oluşturma

### Adım 1: Web Veri Akışı
- "Veri Akışları" sekmesine git
- "Web" seçeneğini seç
- Web sitesi URL'sini gir: `https://mysonai.com`
- Akış adını gir: `MySonAI Website`

### Adım 2: Gelişmiş Ölçümler
```
Gelişmiş Ölçümler: Aktif
Google Signals: Aktif
Demografik ve İlgi Alanı Raporları: Aktif
```

### Adım 3: Ölçüm Kimliği Alma
- Oluşturulan veri akışının detaylarına git
- "Ölçüm Kimliği"ni kopyala (G-XXXXXXXXXX formatında)
- Bu ID'yi `.env.local` dosyasına ekle

## 📊 Özel Event'ler ve Hedefler

### E-ticaret Event'leri
```javascript
// Satın alma event'i
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 99.00,
  currency: 'TRY',
  items: [{
    item_id: 'pro_plan',
    item_name: 'MySonAI Pro Plan',
    category: 'subscription',
    quantity: 1,
    price: 99.00
  }]
});

// Abonelik başlatma event'i
gtag('event', 'subscribe', {
  currency: 'TRY',
  value: 99.00,
  subscription_id: 'sub_12345'
});
```

### Özel Event'ler
```javascript
// AI asistan kullanımı
gtag('event', 'ai_assistant_used', {
  assistant_name: 'Fevzi',
  assistant_role: 'Team Leader',
  session_duration: 300
});

// Demo başlatma
gtag('event', 'demo_started', {
  demo_type: 'ai_chat',
  user_type: 'guest'
});

// Signup başlatma
gtag('event', 'signup_started', {
  method: 'email',
  source: 'homepage'
});
```

## 🎯 Hedefler ve Dönüşümler

### Ana Hedefler
1. **Demo Başlatma**
   - Event: `demo_started`
   - Değer: 0₺
   - Kategori: Engagement

2. **Signup Tamamlama**
   - Event: `sign_up`
   - Değer: 0₺
   - Kategori: Conversion

3. **Pro Plan Satın Alma**
   - Event: `purchase`
   - Değer: 99₺
   - Kategori: Revenue

4. **Enterprise Plan Satın Alma**
   - Event: `purchase`
   - Değer: 299₺
   - Kategori: Revenue

### Özel Hedefler
1. **AI Asistan Kullanımı**
   - Event: `ai_assistant_used`
   - Threshold: 5 kullanım/session

2. **Sayfa Görüntüleme**
   - Event: `page_view`
   - Threshold: 3 sayfa/session

3. **Süre Hedefi**
   - Event: `engagement_time_msec`
   - Threshold: 60 saniye

## 📈 Raporlar ve Dashboard'lar

### Ana Dashboard
- **Gerçek Zamanlı Raporlar**
  - Aktif kullanıcılar
  - Sayfa görüntülemeleri
  - Trafik kaynakları

- **Erişim Raporları**
  - Kullanıcı sayısı
  - Yeni kullanıcılar
  - Oturum sayısı
  - Sayfa görüntülemeleri

### E-ticaret Raporları
- **Satın Alma Raporları**
  - Toplam gelir
  - Dönüşüm oranı
  - Ortalama sipariş değeri

- **Abonelik Raporları**
  - Yeni abonelikler
  - İptal edilen abonelikler
  - Churn rate

### Özel Raporlar
- **AI Asistan Kullanım Raporları**
  - En popüler asistanlar
  - Kullanım süreleri
  - Kullanıcı segmentasyonu

- **Funnel Analizi**
  - Demo → Signup → Purchase
  - Her adımdaki dönüşüm oranları
  - Drop-off noktaları

## 🔧 Teknik Kurulum

### Environment Variables
```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Next.js Entegrasyonu
```typescript
// src/lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = (action: string, parameters: any) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    gtag('event', action, parameters)
  }
}
```

### Layout.tsx'te Script Ekleme
```typescript
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🧪 Test ve Doğrulama

### Test Adımları
1. **Gerçek Zamanlı Raporlar**
   - GA4'te "Gerçek Zamanlı" sekmesine git
   - Web sitesini ziyaret et
   - Verilerin geldiğini kontrol et

2. **Event Testi**
   - Browser console'da `gtag` fonksiyonunu test et
   - Custom event'leri tetikle
   - GA4'te event'lerin göründüğünü kontrol et

3. **E-ticaret Testi**
   - Test ödeme yap
   - Purchase event'inin tetiklendiğini kontrol et
   - Revenue raporlarında göründüğünü doğrula

### Debug Araçları
- **Google Tag Assistant**: Chrome extension
- **GA4 Debug View**: Real-time event monitoring
- **Browser Console**: JavaScript hatalarını kontrol et

## 📊 KPI'lar ve Metrikler

### Ana KPI'lar
- **Traffic**: Günlük/aylık ziyaretçi sayısı
- **Conversion Rate**: Demo → Signup → Purchase
- **Revenue**: Aylık gelir (MRR)
- **Churn Rate**: Abonelik iptal oranı

### Özel Metrikler
- **AI Usage**: Asistan kullanım sıklığı
- **Session Duration**: Ortalama oturum süresi
- **Page Depth**: Sayfa derinliği
- **Bounce Rate**: Tek sayfa ziyaret oranı

## 🚀 Gelişmiş Özellikler

### Audience Segmentation
- **Yeni Kullanıcılar**: İlk ziyaret
- **Dönüş Kullanıcıları**: Tekrar ziyaret
- **Premium Kullanıcılar**: Pro/Enterprise plan
- **Churned Users**: İptal eden kullanıcılar

### Custom Dimensions
- **User Plan**: free, pro, enterprise
- **Assistant Used**: Fevzi, Elif, Burak, etc.
- **Signup Source**: homepage, demo, pricing
- **Payment Method**: card, bank_transfer

### Enhanced Ecommerce
- **Product Performance**: En popüler planlar
- **Shopping Behavior**: Funnel analizi
- **Checkout Behavior**: Ödeme süreci
- **Product List Performance**: Pricing sayfası

---

**Not**: Bu rehber GA4'ün en güncel özelliklerini içerir. Kurulum sırasında sorun yaşarsan Google Analytics Help Center'dan destek alabilirsin.
