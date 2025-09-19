import { NextRequest, NextResponse } from 'next/server';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantRequest {
  message: string;
  locale: string;
  conversationHistory: Message[];
}

// AI asistan sistem promptu
const getSystemPrompt = (locale: string) => {
  const isTurkish = locale === 'tr';

  return isTurkish
    ? `
Sen MySonAI'nin AI asistanısın. Görevin müşterilere yardımcı olmak ve onları doğru hizmetlere yönlendirmek.

**Rol Tanımı:**
- MySonAI'nin resmi AI asistanısın
- Müşteri hizmetleri ve teknik destek sağlıyorsun
- Proje danışmanlığı yapıyorsun

**Görevler:**
1. Müşteri sorularını yanıtla
2. Hizmetlerimiz hakkında bilgi ver
3. Proje süreci hakkında açıklama yap
4. Teknik sorunları çöz
5. İletişim bilgilerini paylaş
6. Demo ve referanslara yönlendir

**Kurallar:**
- Her zaman profesyonel ve yardımcı ol
- Türkçe konuş
- Kısa ve net yanıtlar ver
- Müşteriyi doğru kişiye yönlendir
- Teknik detaylara girmeden genel bilgi ver
- Her yanıtın sonunda "Daha detaylı bilgi için iletişime geçebilirsiniz" ekle

**Hizmetlerimiz:**
- AI Çözümleri: Prompt mühendisliği, AI asistanlar, veri analizi
- Klasik Bilişim: Web & mobil geliştirme, API entegrasyon, veritabanı
- Dijital Medya: Video/animasyon, sesli kitaplar, podcast
- Danışmanlık & Eğitim: AI eğitimleri, dijital dönüşüm
- Yazılım İhtiyaçları: Özel yazılım, mobil uygulama, e-ticaret
- Güvenlik: Siber güvenlik çözümleri

**Alt Markalarımız:**
- MySon Video: AI destekli animasyon & medya
- MySon Firmatch: Akıllı dış ticaret asistanı
- MySon Avukat: AI hukuk çözümleri
- MySon Kids: Çocuk hikâyeleri, animasyon, sesli kitaplar
- MySon Education: AI tabanlı eğitim çözümleri
- MySon Music: AI tabanlı müzik düzenlemeleri

**İletişim:**
- E-posta: info@mysonai.com, projeler@mysonai.com
- Telefon: +90 (555) 123 45 67
- Adres: Teknoloji Mahallesi, İstanbul, Türkiye

Yanıtlarını bu bilgilere göre ver ve müşteriyi doğru yönlendir.
`
    : `
You are MySonAI's AI assistant. Your task is to help customers and direct them to the right services.

**Role Definition:**
- You are MySonAI's official AI assistant
- You provide customer service and technical support
- You offer project consulting

**Tasks:**
1. Answer customer questions
2. Provide information about our services
3. Explain our project process
4. Solve technical issues
5. Share contact information
6. Direct to demos and references

**Rules:**
- Always be professional and helpful
- Speak in English
- Give short and clear answers
- Direct customers to the right person
- Provide general information without going into technical details
- Add "You can contact us for more detailed information" at the end of each response

**Our Services:**
- AI Solutions: Prompt engineering, AI assistants, data analysis
- Classic IT: Web & mobile development, API integration, database
- Digital Media: Video/animation, audiobooks, podcasts
- Consulting & Training: AI training, digital transformation
- Software Needs: Custom software, mobile apps, e-commerce
- Security: Cybersecurity solutions

**Our Sub-brands:**
- MySon Video: AI-powered animation & media
- MySon Firmatch: Smart foreign trade assistant
- MySon Avukat: AI legal solutions
- MySon Kids: Children's stories, animation, audiobooks
- MySon Education: AI-based education solutions
- MySon Music: AI-based music arrangements

**Contact:**
- Email: info@mysonai.com, projeler@mysonai.com
- Phone: +90 (555) 123 45 67
- Address: Technology District, Istanbul, Turkey

Provide responses based on this information and direct customers appropriately.
`;
};

export async function POST(request: NextRequest) {
  try {
    const body: AIAssistantRequest = await request.json();
    const { message, locale, conversationHistory } = body;

    // Basit AI yanıt sistemi (gerçek AI entegrasyonu için OpenAI API kullanılabilir)
    const systemPrompt = getSystemPrompt(locale);

    // Mesaj analizi ve yanıt üretimi
    let response = '';

    // Hizmetler hakkında sorular
    if (message.toLowerCase().includes('hizmet') || message.toLowerCase().includes('service')) {
      response = `MySonAI olarak şu hizmetleri sunuyoruz:

🤖 **AI Çözümleri**: Prompt mühendisliği, AI asistanlar, veri analizi, görüntü/ses işleme
💻 **Klasik Bilişim**: Web & mobil geliştirme, API entegrasyon, veritabanı, bulut & altyapı
🎬 **Dijital Medya**: Video/animasyon, sesli kitaplar, podcast, sosyal medya içerikleri
🎓 **Danışmanlık & Eğitim**: AI eğitimleri, dijital dönüşüm danışmanlığı
💼 **Yazılım İhtiyaçları**: Özel yazılım, mobil uygulama, e-ticaret, entegrasyon/otomasyon
🔒 **Güvenlik**: Siber güvenlik çözümleri

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // Proje süreci hakkında sorular
    else if (
      message.toLowerCase().includes('proje') ||
      message.toLowerCase().includes('süreç') ||
      message.toLowerCase().includes('process')
    ) {
      response = `Proje sürecimiz 5 aşamadan oluşuyor:

1️⃣ **İhtiyaç Analizi**: Projenizi detaylı olarak analiz ediyoruz
2️⃣ **Çözüm Tasarımı**: Size özel çözüm önerisi hazırlıyoruz
3️⃣ **Geliştirme**: Uzman ekibimizle projeyi hayata geçiriyoruz
4️⃣ **Test**: Kalite kontrolü ve test süreçleri
5️⃣ **Teslim**: Projeyi teslim ediyor ve destek sağlıyoruz

Proje süresi proje büyüklüğüne göre değişir. Basit web siteleri 2-4 hafta, karmaşık AI projeleri 2-6 ay sürebilir.

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // Fiyatlandırma hakkında sorular
    else if (
      message.toLowerCase().includes('fiyat') ||
      message.toLowerCase().includes('ücret') ||
      message.toLowerCase().includes('price') ||
      message.toLowerCase().includes('cost')
    ) {
      response = `Fiyatlandırmamız proje kapsamına göre özel olarak yapılır:

💰 **Proje Analizi**: Ücretsiz danışmanlık ve teklif hazırlığı
📊 **Şeffaf Fiyatlandırma**: Proje detaylarına göre net fiyat
💳 **Esnek Ödeme**: Taksitli ödeme seçenekleri
🔄 **6 Ay Destek**: Tüm projeler için ücretsiz destek

Bütçe aralıkları (+KDV):
- 10.000 - 25.000 TL +KDV: Basit web siteleri
- 25.000 - 50.000 TL +KDV: Orta ölçekli projeler
- 50.000 - 100.000 TL +KDV: Karmaşık AI projeleri
- 100.000 TL+ +KDV: Kurumsal çözümler

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // Teknik destek hakkında sorular
    else if (
      message.toLowerCase().includes('teknik') ||
      message.toLowerCase().includes('destek') ||
      message.toLowerCase().includes('technical') ||
      message.toLowerCase().includes('support')
    ) {
      response = `Teknik destek hizmetlerimiz:

🛠️ **7/24 E-posta Desteği**: info@mysonai.com
📞 **Telefon Desteği**: +90 (555) 123 45 67 (Pazartesi-Cuma 09:00-18:00)
💬 **Canlı Destek**: Bu AI asistan ile anlık yardım
📚 **Dokümantasyon**: Detaylı kullanım kılavuzları
🎓 **Eğitim**: Proje ekiplerinize özel eğitim

Destek süreçleri:
- 6 ay ücretsiz destek (tüm projeler)
- Sonrasında ücretli destek paketleri
- Uzaktan erişim ve on-site destek

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // AI çözümleri hakkında sorular
    else if (
      message.toLowerCase().includes('ai') ||
      message.toLowerCase().includes('yapay zeka') ||
      message.toLowerCase().includes('artificial intelligence')
    ) {
      response = `AI çözümlerimiz:

🤖 **Prompt Mühendisliği**: AI modelleri için optimize edilmiş promptlar
🧠 **AI Asistanlar**: Özel ihtiyaçlara göre AI asistanlar
🎯 **Özel Uzmanlık Alanı AI Asistanları**: Kendi uzmanlık alanınız için özel AI asistan geliştirme
💬 **Chatbot AI Desteği**: Mevcut chatbotlarınızı AI ile güçlendirme
📊 **Veri Analizi**: AI destekli veri analizi ve raporlama
🎨 **Görüntü İşleme**: AI destekli görüntü ve video işleme
🎵 **Ses İşleme**: AI destekli ses analizi ve sentezi
📝 **Doğal Dil İşleme**: Metin analizi ve anlama

**Özel AI Asistan Hizmeti:**
- Kendi uzmanlık alanınız için özel AI asistan
- Sektörel bilgi ve deneyim entegrasyonu
- Özel prompt mühendisliği
- Kişiselleştirilmiş yanıt sistemi

**Chatbot AI Desteği:**
- Mevcut chatbotlarınızı AI ile güçlendirme
- Doğal dil işleme entegrasyonu
- Akıllı yanıt optimizasyonu
- Çok dilli destek
- Öğrenme ve gelişim sistemi

Alt markalarımız:
- MySon Video: AI destekli animasyon
- MySon Avukat: AI hukuk çözümleri
- MySon Education: AI eğitim platformları
- MySon Music: AI müzik düzenleme

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // Chatbot AI desteği hakkında sorular
    else if (
      message.toLowerCase().includes('chatbot') ||
      message.toLowerCase().includes('chat bot') ||
      message.toLowerCase().includes('sohbet botu') ||
      message.toLowerCase().includes('ai desteği')
    ) {
      response = `Chatbot AI Desteği hizmetlerimiz:

💬 **Mevcut Chatbot Güçlendirme**: 
- Mevcut chatbotlarınızı AI ile güçlendiriyoruz
- Doğal dil işleme entegrasyonu
- Akıllı yanıt optimizasyonu
- Öğrenme ve gelişim sistemi

🚀 **Yeni Chatbot Geliştirme**:
- Sıfırdan AI destekli chatbot geliştirme
- Sektörel bilgi entegrasyonu
- Çok dilli destek
- Entegrasyon ve API desteği

📊 **Chatbot Analizi**:
- Mevcut chatbot performans analizi
- İyileştirme önerileri
- Kullanıcı deneyimi optimizasyonu
- ROI hesaplama

🔧 **Teknik Destek**:
- Chatbot entegrasyonu
- API geliştirme
- Veri analizi ve raporlama
- Sürekli optimizasyon

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // İletişim bilgileri
    else if (
      message.toLowerCase().includes('iletişim') ||
      message.toLowerCase().includes('contact') ||
      message.toLowerCase().includes('telefon') ||
      message.toLowerCase().includes('phone')
    ) {
      response = `İletişim bilgilerimiz:

📧 **E-posta**: 
- info@mysonai.com (Genel bilgi)
- projeler@mysonai.com (Proje teklifleri)

📞 **Telefon**: 
- +90 (555) 123 45 67
- +90 (212) 456 78 90

📍 **Adres**: 
Teknoloji Mahallesi, İstanbul, Türkiye

🕒 **Çalışma Saatleri**:
- Pazartesi-Cuma: 09:00-18:00
- Cumartesi: 10:00-16:00

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }
    // Genel yanıt
    else {
      response = `Merhaba! MySonAI olarak size nasıl yardımcı olabilirim?

🤖 **AI Çözümleri** hakkında bilgi alabilirsiniz
💻 **Klasik Bilişim** hizmetlerimizi öğrenebilirsiniz
🎬 **Dijital Medya** projelerinizi planlayabilirsiniz
🎓 **Eğitim ve Danışmanlık** hizmetlerimizi keşfedebilirsiniz

Hangi konuda yardıma ihtiyacınız var? Size en uygun çözümü bulalım.

Daha detaylı bilgi için iletişime geçebilirsiniz.`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI asistan hatası:', error);
    return NextResponse.json({ error: 'AI asistan yanıt veremedi' }, { status: 500 });
  }
}
