# Stripe Test Kartları

## Başarılı Ödemeler

### Visa
```
Kart Numarası: 4242 4242 4242 4242
Son Kullanma: 12/34
CVC: 123
```

### Mastercard
```
Kart Numarası: 5555 5555 5555 4444
Son Kullanma: 12/34
CVC: 123
```

### American Express
```
Kart Numarası: 3782 822463 10005
Son Kullanma: 12/34
CVC: 1234
```

## Başarısız Ödemeler

### Yetersiz Bakiye
```
Kart Numarası: 4000 0000 0000 0002
Son Kullanma: 12/34
CVC: 123
```

### Kart Reddedildi
```
Kart Numarası: 4000 0000 0000 0069
Son Kullanma: 12/34
CVC: 123
```

### CVC Hatalı
```
Kart Numarası: 4000 0000 0000 0127
Son Kullanma: 12/34
CVC: 999
```

## 3D Secure Test Kartları

### Başarılı 3D Secure
```
Kart Numarası: 4000 0025 0000 3155
Son Kullanma: 12/34
CVC: 123
```

### Başarısız 3D Secure
```
Kart Numarası: 4000 0000 0000 3220
Son Kullanma: 12/34
CVC: 123
```

## Test Senaryoları

### Başarılı Abonelik
- Kart: 4242 4242 4242 4242
- Sonuç: Aylık abonelik başarıyla oluşturulur

### Abonelik İptali
- Kart: 4000 0000 0000 0002
- Sonuç: Yetersiz bakiye nedeniyle iptal

### Webhook Testi
- Kart: 4242 4242 4242 4242
- Sonuç: Webhook'lar tetiklenir

## Test Adımları

1. **Test Modunda Başlayın**
   - Stripe Dashboard'da "Test mode" aktif olduğundan emin olun

2. **Product Oluşturun**
   - Pro Plan: 99₺/ay
   - Enterprise Plan: 299₺/ay

3. **Test Ödemesi Yapın**
   - Yukarıdaki test kartlarını kullanın
   - Webhook'ların çalıştığını kontrol edin

4. **Database'i Kontrol Edin**
   - Supabase'de subscription bilgilerinin güncellendiğini doğrulayın

5. **Production'a Geçin**
   - Tüm testler başarılı olduktan sonra live mode'a geçin
