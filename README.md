# MySonAI - Türkçe AI Asistan Platformu

MySonAI, Türkçe dil desteği ile çalışan gelişmiş AI asistan platformudur. 17 farklı uzmanlık alanına sahip AI asistanı ile kullanıcıların ihtiyaçlarını karşılar.

## 🚀 Özellikler

- **17 AI Asistan**: Her biri kendi alanında uzman
- **Türkçe Destek**: Tamamen Türkçe dil desteği
- **Gerçek Zamanlı Chat**: Anında iletişim
- **Modern UI/UX**: Responsive ve kullanıcı dostu arayüz
- **Güvenli API**: OpenAI entegrasyonu
- **Performanslı**: Next.js 14 ile optimize edilmiş

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Supabase (Auth, Database)
- **AI**: OpenAI GPT-4
- **Testing**: Jest, React Testing Library, Playwright
- **Quality**: ESLint, Prettier, Husky

## 📦 Kurulum

### Gereksinimler

- Node.js 20.x veya üzeri
- npm veya yarn
- Supabase hesabı
- OpenAI API anahtarı

### Adımlar

1. **Repository'yi klonlayın**
   ```bash
   git clone https://github.com/your-username/mysonai-website.git
   cd mysonai-website
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Çevresel değişkenleri ayarlayın**
   ```bash
   cp env.example .env.local
   ```
   
   `.env.local` dosyasını düzenleyin:
   ```env
   # Supabase
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://mysonai.com
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 🧪 Test

### Unit Tests
```bash
npm test
```

### Coverage Raporu
```bash
npm run test:coverage
```

### E2E Tests
```bash
npm run test:e2e
```

### E2E UI Mode
```bash
npm run test:e2e:ui
```

## 🔧 Geliştirme

### Kod Kalitesi Kontrolleri
```bash
# Lint
npm run lint

# Format
npm run format

# Type Check
npm run type-check

# Tüm kontroller
npm run check
```

### Build
```bash
npm run build
```

### Production
```bash
npm run start
```

## 📁 Proje Yapısı

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── blog/           # Blog pages
│   ├── contact/        # Contact page
│   ├── demo/           # Demo page
│   ├── pricing/        # Pricing page
│   └── ...
├── components/         # React components
│   ├── ui/            # UI components
│   └── ...
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── lib/               # Utility functions
├── tests/             # Test files
└── types/             # TypeScript types
```

## 🤖 AI Asistanlar

| Asistan | Uzmanlık | Açıklama |
|---------|----------|----------|
| Fevzi | Takım Lideri | Proje yönetimi ve koordinasyon |
| Elif | Ürün Müdürü | UX/UI tasarım ve ürün stratejisi |
| Burak | Sistem Mimarı | Teknoloji seçimi ve mimari |
| Ayşe | Geliştirici | Kod yazma ve implementasyon |
| Deniz | Veri Analisti | Veri analizi ve optimizasyon |
| Zeynep | E-ticaret | Online satış ve pazarlama |
| Can | Tasarımcı | Logo ve görsel kimlik |
| Mert | SEO | Arama motoru optimizasyonu |
| Seda | Müşteri İlişkileri | Destek ve iletişim |
| Ahmet | Finans | Maliyet analizi ve bütçe |
| Leyla | Hukuki | Sözleşmeler ve uyumluluk |
| Nur | Diyetisyen | Beslenme ve sağlık |
| Emre | Eğitim Koçu | Kişisel gelişim |
| Aylin | Öğretmen | Akademik eğitim |
| Deniz | Psikolog | Ruh sağlığı |
| Kaan | Fitness Koçu | Spor ve fitness |
| Melis | Yaşam Koçu | Yaşam hedefleri |

## 🔒 Güvenlik

- OWASP Top 10 güvenlik standartları
- Input validation ve sanitization
- CSRF koruması
- Rate limiting
- Güvenli API anahtarı yönetimi

## 📈 Performans

- Lighthouse skorları:
  - Performance: ≥ 90
  - Accessibility: ≥ 95
  - Best Practices: ≥ 95
  - SEO: ≥ 95

## 🌐 SEO

- Meta tags ve Open Graph
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URLs

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Kuralları

Conventional Commits kullanın:
- `feat:` Yeni özellik
- `fix:` Hata düzeltmesi
- `docs:` Dokümantasyon
- `style:` Kod stili
- `refactor:` Refactoring
- `test:` Test
- `chore:` Bakım

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Website: [https://mysonai.com](https://mysonai.com)
- Email: info@mysonai.com
- Twitter: [@mysonai](https://twitter.com/mysonai)
- LinkedIn: [MySonAI](https://linkedin.com/company/mysonai)

## 🙏 Teşekkürler

- OpenAI - AI teknolojileri
- Supabase - Backend altyapısı
- Next.js - React framework
- Tailwind CSS - Styling
- Radix UI - UI components

---

**MySonAI** ile geleceği şekillendirin! 🚀
