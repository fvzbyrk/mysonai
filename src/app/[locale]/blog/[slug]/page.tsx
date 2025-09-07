import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, User } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Blog post data - In real app, this would come from CMS or database
const blogPosts = {
  'mysonai-vs-pi-analysis': {
    title: 'MySonAI vs Pi: Hız, Gizlilik ve Empati Analizi',
    excerpt:
      "Pi kullanıcılarının yaşadığı sorunları çözen MySonAI'ın avantajlarını detaylı analiz ediyoruz.",
    category: 'Karşılaştırma',
    readTime: '8 dk',
    date: '2024-01-15',
    author: 'MySonAI Ekibi',
    content: `
      <h2>Giriş</h2>
      <p>Kişisel AI asistanı pazarında Pi, kullanıcıların empatik bir yoldaş aradığında ilk tercih ettikleri platformlardan biri. Ancak son zamanlarda kullanıcı geri bildirimleri, Pi'nin bazı kritik alanlarda yetersiz kaldığını gösteriyor. Bu yazıda, MySonAI'ın bu sorunları nasıl çözdüğünü detaylı olarak inceleyeceğiz.</p>

      <h2>Hız Karşılaştırması</h2>
      <p><strong>Pi'nin Sorunu:</strong> Kullanıcılar Pi ile sohbet ederken yarım ila bir dakika arasında yanıt beklemek zorunda kalıyor. Bu, özellikle hızlı karar verme gerektiren durumlarda büyük bir dezavantaj.</p>
      
      <p><strong>MySonAI'ın Çözümü:</strong> Optimize edilmiş altyapı sayesinde MySonAI, Pi'den <strong>10 kat daha hızlı</strong> yanıt veriyor. Ortalama yanıt süresi 2-3 saniye.</p>

      <h2>Gizlilik ve Güvenlik</h2>
      <p><strong>Pi'nin Sorunu:</strong> Kullanıcılar verilerinin karıştırılması ve üçüncü tarafların konuşmaları dinlemesi konusunda endişe duyuyor.</p>
      
      <p><strong>MySonAI'ın Çözümü:</strong> %100 şeffaf gizlilik politikası ve end-to-end şifreleme ile verileriniz tamamen güvende.</p>

      <h2>Empati ve Kişiselleştirme</h2>
      <p>Her iki platform da empatik yaklaşımı benimsiyor, ancak MySonAI'ın Türkçe dil desteği ve kültürel uyumu, Türk kullanıcılar için daha doğal bir deneyim sunuyor.</p>

      <h2>Sonuç</h2>
      <p>MySonAI, Pi'nin güçlü yanlarını korurken, zayıf noktalarını başarıyla gideriyor. Hız, güvenlik ve kültürel uyum açısından Türk kullanıcılar için daha iyi bir seçenek sunuyor.</p>
    `,
    relatedPosts: [
      { id: 'ai-privacy-guide', title: 'Kişisel AI Asistanınız Güvenli Mi?' },
      { id: 'ai-companion-guide', title: 'AI Yoldaşı Nasıl Kullanılır?' },
    ],
  },
  'ai-privacy-guide': {
    title: 'Kişisel AI Asistanınız Güvenli Mi? Gizlilik Rehberi',
    excerpt:
      "AI asistanlarında veri güvenliği nasıl sağlanır? MySonAI'ın gizlilik politikası ve güvenlik önlemleri.",
    category: 'Güvenlik',
    readTime: '6 dk',
    date: '2024-01-12',
    author: 'Güvenlik Uzmanı',
    content: `
      <h2>AI Asistanlarında Veri Güvenliği</h2>
      <p>Kişisel AI asistanları kullanırken en önemli endişelerden biri veri güvenliği. Bu yazıda, MySonAI'ın verilerinizi nasıl koruduğunu detaylı olarak açıklıyoruz.</p>

      <h2>End-to-End Şifreleme</h2>
      <p>MySonAI, tüm konuşmalarınızı end-to-end şifreleme ile koruyor. Bu, verilerinizin sadece siz ve AI asistanınız arasında görülebileceği anlamına geliyor.</p>

      <h2>Veri Saklama Politikası</h2>
      <p>Konuşmalarınız sadece geçici olarak saklanıyor ve belirli bir süre sonra otomatik olarak siliniyor. Bu, uzun vadeli veri birikimini önlüyor.</p>

      <h2>Üçüncü Taraf Paylaşımı</h2>
      <p>MySonAI, verilerinizi hiçbir üçüncü taraf ile paylaşmıyor. Bu, tamamen şeffaf bir yaklaşım.</p>
    `,
    relatedPosts: [
      { id: 'mysonai-vs-pi-analysis', title: 'MySonAI vs Pi Analizi' },
      { id: 'turkish-ai-assistants', title: 'Türkçe AI Asistanları' },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    return {
      title: 'Yazı Bulunamadı | MySonAI Blog',
    };
  }

  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish ? `${post.title} | MySonAI Blog` : `${post.title} | MySonAI Blog`,
    description: post.excerpt,
    keywords: isTurkish
      ? 'AI blog, yapay zeka blog, AI asistanları, MySonAI, Pi karşılaştırma'
      : 'AI blog, artificial intelligence blog, AI assistants, MySonAI, Pi comparison',
  };
}

export default function BlogPostPage({ params }: { params: { locale: Locale; slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Header */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
        <Link
          href={`/${params.locale}/blog`}
          className='inline-flex items-center text-purple-400 hover:text-purple-300 mb-8'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Blog'a Dön
        </Link>
      </div>

      {/* Article */}
      <article className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <Card className='bg-white/10 backdrop-blur-md border-white/20 overflow-hidden'>
          {/* Article Header */}
          <div className='p-8 border-b border-white/20'>
            <div className='flex items-center gap-2 mb-4'>
              <Badge variant='secondary'>{post.category}</Badge>
              <span className='text-gray-400'>•</span>
              <div className='flex items-center text-gray-400 text-sm'>
                <Clock className='w-4 h-4 mr-1' />
                {post.readTime}
              </div>
              <span className='text-gray-400'>•</span>
              <div className='flex items-center text-gray-400 text-sm'>
                <Calendar className='w-4 h-4 mr-1' />
                {post.date}
              </div>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>{post.title}</h1>

            <p className='text-xl text-gray-300 mb-6'>{post.excerpt}</p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center text-gray-400'>
                <User className='w-4 h-4 mr-2' />
                <span>{post.author}</span>
              </div>

              <Button variant='outline' size='sm'>
                <Share2 className='w-4 h-4 mr-2' />
                Paylaş
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className='p-8'>
            <div
              className='prose prose-invert prose-lg max-w-none'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Card>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className='mt-16'>
            <h2 className='text-3xl font-bold text-white mb-8 text-center'>İlgili Yazılar</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {post.relatedPosts.map(relatedPost => (
                <Card
                  key={relatedPost.id}
                  className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300'
                >
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-white mb-3'>{relatedPost.title}</h3>
                    <Link href={`/${params.locale}/blog/${relatedPost.id}`}>
                      <Button variant='outline' className='w-full'>
                        <BookOpen className='w-4 h-4 mr-2' />
                        Devamını Oku
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className='mt-16'>
          <Card className='bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border-white/20'>
            <div className='p-8 text-center'>
              <h2 className='text-3xl font-bold text-white mb-4'>
                AI Asistanlarınızla Tanışmaya Hazır mısınız?
              </h2>
              <p className='text-xl text-gray-300 mb-6'>
                Bu yazıyı beğendiyseniz, MySonAI'ı deneyimleyin
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href={`/${params.locale}/demo`}
                  className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                >
                  Demo Başlat
                </Link>
                <Link
                  href={`/${params.locale}/assistants`}
                  className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
                >
                  Asistanları Gör
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
}
