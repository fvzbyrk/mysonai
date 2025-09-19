import { NextRequest, NextResponse } from 'next/server';
import { GeminiChat } from '@/lib/gemini-chat';

const geminiChat = new GeminiChat();

// Daily production categories with weights
const CATEGORIES = [
  { name: 'AI Teknolojisi', weight: 20 }, // 20 articles
  { name: 'İş Dünyası', weight: 15 }, // 15 articles
  { name: 'Eğitimler', weight: 10 }, // 10 articles
  { name: 'Vaka Çalışmaları', weight: 8 }, // 8 articles
  { name: 'Haberler', weight: 7 }, // 7 articles
];

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'generate-daily-60') {
      return await generateDaily60Articles();
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid action',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Daily production error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Daily production failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function generateDaily60Articles() {
  try {
    const results = [];
    let totalGenerated = 0;

    for (const category of CATEGORIES) {
      console.log(`Generating ${category.weight} articles for ${category.name}...`);

      for (let i = 0; i < category.weight; i++) {
        try {
          const article = await generateArticleForCategory(category.name, i + 1);
          results.push(article);
          totalGenerated++;

          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Error generating article ${i + 1} for ${category.name}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily production completed: ${totalGenerated} articles generated`,
      data: {
        totalGenerated,
        categories: CATEGORIES,
        articles: results,
      },
    });
  } catch (error) {
    console.error('Daily 60 articles generation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate daily articles',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function generateArticleForCategory(category: string, index: number) {
  const prompts = {
    'AI Teknolojisi': [
      'Son 24 Saatin En Önemli AI & Tech Gelişmeleri - Model Yayınları ve Açık Kaynak Projeler',
      "xAI'den Fiziksel Dünya Odaklı Yeni AI Modeli: Robotik ve Otonom Sistemler İçin Devrim",
      'Google VaultGemma LLM: Gizlilik Odaklı Kurumsal AI Çözümleri',
      "İsviçre'den Apertus: Tam Açık Kaynaklı AI Modeli ve Demokratikleşme",
      'Anthropic Claude 3.7: Gelişmiş Akıl Yürütme ve Kurumsal Uygulamalar',
      'DeepSeek AI Modelinin Sırları: $300K Maliyetle Nasıl Geliştirildi?',
      "Tongyi Lab'den Derin Araştırma Ajanları: 6 Yeni Makale Analizi",
      'Paper2Agent: Araştırma Makalelerini Etkileşimli AI Ajanlarına Dönüştürme',
      "Upscale AI'den $100M Fonlu Açık Standartlı AI Ağ Altyapısı",
      "IBM ve BharatGen'den Indic LLM'ler: Hindistan Odaklı Açık Kaynak Modeller",
      "Microsoft'tan $30B İngiltere AI Yatırımı: 23K GPU ve Süperbilgisayar",
      'Google AP2 Protokolü: AI Ajanları İçin Ödeme Sistemi (60+ Ortak)',
      'Meta Hypernova Akıllı Gözlükler: AI Destekli Gelecek Teknolojisi',
      'OpenAI $6.5B Fon ve Gençlik Güvenliği: ChatGPT Otomatik Yaş Tespiti',
      'Çin Nvidia Çip Yasağı: ABD-Çin AI Gerilimi ve Teknoloji Savaşı',
      "HeyGen Video Agent: Prompt'tan Video Üretimi Teknolojisi",
      'Gamma 3.0: Ajanik Sunum Aracı ve Yaratıcı AI Çözümleri',
      "YouTube'un 30+ AI Yaratıcı Aracı: İçerik Üretiminde Devrim",
      'Gartner 2025 AI Harcamaları: $1.5T Pazar ve İş Kayıpları Uyarısı',
      'AI Model Interpretability: Kara Kutu Problemi ve Çözüm Yöntemleri',
    ],
    'İş Dünyası': [
      'AI Ajanları İş Dünyasında: Otomatik Müşteri Hizmetleri ve Satış Süreçleri',
      'Microsoft Copilot Kurumsal Uygulamaları: Office 365 Entegrasyonu ve Verimlilik',
      "Google Workspace AI Özellikleri: Gmail, Docs ve Sheets'te Yapay Zeka",
      "Salesforce Einstein AI: CRM'de Makine Öğrenmesi ve Tahmin Analitiği",
      'SAP Leonardo AI: Kurumsal Kaynak Planlamada Yapay Zeka',
      'IBM Watson Business: AI Destekli İş Kararları ve Risk Yönetimi',
      "Amazon Bedrock Kurumsal Çözümleri: AWS'de AI Model Yönetimi",
      'Oracle AI Cloud Services: Veritabanı ve Uygulama Entegrasyonu',
      'ServiceNow AIOps: IT Operasyonlarında Yapay Zeka ve Otomasyon',
      'Workday AI ve ML: İnsan Kaynakları ve Finansta Makine Öğrenmesi',
      'HubSpot AI Marketing: Pazarlama Otomasyonu ve Kişiselleştirme',
      'Zendesk AI Customer Service: Müşteri Deneyimi ve Chatbot Teknolojileri',
      'Slack AI Özellikleri: İş İletişiminde Yapay Zeka Asistanları',
      'Zoom AI Meeting Assistant: Toplantı Özetleme ve Not Alma',
      'Notion AI Workspace: Proje Yönetimi ve Dokümantasyonda AI',
    ],
    Eğitimler: [
      'Python ile AI ve Makine Öğrenmesi: Sıfırdan Uzmanlığa Rehber',
      "TensorFlow ve PyTorch Karşılaştırması: Hangi Framework'ü Seçmeli?",
      'ChatGPT ve GPT-4 API Kullanımı: Geliştiriciler İçin Pratik Rehber',
      'OpenAI API Entegrasyonu: Python ve JavaScript ile AI Uygulamaları',
      'LangChain Framework: AI Ajanları ve RAG Sistemleri Geliştirme',
      'Hugging Face Transformers: Pre-trained Modeller ve Fine-tuning',
      "Vector Database'ler: Pinecone, Weaviate ve ChromaDB Karşılaştırması",
      'AI Model Deployment: Docker, Kubernetes ve Cloud Platformları',
      "Prompt Engineering: ChatGPT, Claude ve Gemini için Etkili Prompt'lar",
      'AI Ethics ve Responsible AI: Geliştiriciler İçin Etik Rehber',
    ],
    'Vaka Çalışmaları': [
      'Netflix AI Öneri Sistemi: 200M+ Kullanıcı İçin Kişiselleştirilmiş İçerik',
      'Spotify AI Playlist: Müzik Keşfi ve Kullanıcı Davranış Analizi',
      'Amazon AI Fulfillment: 2 Milyar Paket İçin Otomatik Sıralama Sistemi',
      'Tesla Autopilot AI: 4 Milyon Araç İçin Gerçek Zamanlı Karar Verme',
      'Google Search AI: 8.5 Milyar Günlük Sorgu İçin Anlamsal Arama',
      'Facebook AI Content Moderation: 3 Milyar Kullanıcı İçin Otomatik Moderasyon',
      'Uber AI Route Optimization: 15 Milyon Günlük Yolculuk İçin Dinamik Rota',
      'Airbnb AI Pricing: 6 Milyon Konaklama İçin Dinamik Fiyatlandırma',
    ],
    Haberler: [
      'OpenAI GPT-5 Duyurusu: 2025 Yılında Beklenen Devrim Niteliğindeki Güncelleme',
      'Google Gemini 2.0 Beta: Multimodal AI ve Video Anlama Yetenekleri',
      "Anthropic Claude 4 Hazırlıkları: AGI'ye Doğru Bir Adım Daha",
      'Microsoft Copilot Studio: Kurumsal AI Ajanları Geliştirme Platformu',
      'Meta AI Research: Llama 3.1 ve Açık Kaynak AI Modeli Güncellemeleri',
      'Tesla FSD Beta 12: Tam Otonom Sürüş İçin Son Teknoloji',
      "Apple Intelligence iOS 18: iPhone'da Yerel AI İşleme",
      'NVIDIA H200 GPU: AI Training ve Inference İçin Yeni Nesil Donanım',
    ],
  };

  const categoryPrompts = prompts[category as keyof typeof prompts] || prompts['AI Teknolojisi'];
  const selectedPrompt = categoryPrompts[index % categoryPrompts.length];

  const fullPrompt = `${selectedPrompt} konusunda son 24 saatteki en güncel gelişmeleri, teknik detayları ve gerçek dünya uygulamalarını içeren kapsamlı bir makale yaz. Türkçe olarak yaz ve şu özellikleri içersin:

1. **Güncel Giriş**: Son 24 saatteki en önemli gelişmeler ve haberler
2. **Teknik Derinlik**: Detaylı teknik açıklamalar, algoritmalar ve metodolojiler
3. **Gerçek Dünya Uygulamaları**: Büyük şirketlerin kullanım örnekleri ve başarı hikayeleri
4. **Pazar Analizi**: Yatırım rakamları, pazar büyüklüğü ve trend analizi
5. **Gelecek Öngörüleri**: 2025-2030 dönemi için tahminler ve beklentiler
6. **Pratik Örnekler**: Kod örnekleri, API kullanımı ve implementasyon rehberleri
7. **Kaynak ve Referanslar**: Güvenilir kaynaklar ve linkler

Makale 2000-2500 kelime arasında olsun, SEO optimize edilmiş olsun, güncel veriler içersin ve okuyucuya maksimum değer katsın. Özellikle son 24 saatteki gelişmeleri, yeni duyuruları ve teknoloji güncellemelerini vurgula.`;

  const result = await geminiChat.generateResponse([
    {
      role: 'user',
      content: fullPrompt,
    },
  ]);

  if (!result.success) {
    throw new Error(result.error || 'Content generation failed');
  }

  return {
    id: `daily-${Date.now()}-${index}`,
    title: `${selectedPrompt} - ${new Date().toLocaleDateString('tr-TR')}`,
    content: result.content,
    category,
    tags: [category.toLowerCase(), 'günlük', 'ai-üretimi'],
    source: 'Gemini AI',
    priority: 'medium',
    author: 'MySonAI',
    readTime: Math.ceil(result.content.length / 200),
    publishedAt: new Date().toISOString(),
    status: 'published',
  };
}
