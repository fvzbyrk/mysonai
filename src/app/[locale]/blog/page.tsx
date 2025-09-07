import { Locale } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';
  
  return {
    title: isTurkish 
      ? 'AI Blog - Yapay Zeka Asistanları Hakkında Bilmeniz Gerekenler | MySonAI'
      : 'AI Blog - Everything You Need to Know About AI Assistants | MySonAI',
    description: isTurkish
      ? 'Yapay zeka asistanları, AI teknolojisi ve MySonAI hakkında uzman görüşleri, karşılaştırmalar ve rehberler. Pi vs MySonAI analizi.'
      : 'Expert insights, comparisons and guides about AI assistants, AI technology and MySonAI. Pi vs MySonAI analysis.',
    keywords: isTurkish
      ? 'AI blog, yapay zeka blog, AI asistanları, Pi vs MySonAI, yapay zeka rehberi, AI karşılaştırma'
      : 'AI blog, artificial intelligence blog, AI assistants, Pi vs MySonAI, AI guide, AI comparison',
  };
}

// Blog posts data
const blogPosts = [
  {
    id: 'mysonai-vs-pi-analysis',
    title: 'MySonAI vs Pi: Hız, Gizlilik ve Empati Analizi',
    excerpt: 'Pi kullanıcılarının yaşadığı sorunları çözen MySonAI\'ın avantajlarını detaylı analiz ediyoruz.',
    category: 'Karşılaştırma',
    readTime: '8 dk',
    date: '2024-01-15',
    image: '/blog/mysonai-vs-pi.jpg',
    featured: true
  },
  {
    id: 'ai-privacy-guide',
    title: 'Kişisel AI Asistanınız Güvenli Mi? Gizlilik Rehberi',
    excerpt: 'AI asistanlarında veri güvenliği nasıl sağlanır? MySonAI\'ın gizlilik politikası ve güvenlik önlemleri.',
    category: 'Güvenlik',
    readTime: '6 dk',
    date: '2024-01-12',
    image: '/blog/ai-privacy.jpg',
    featured: true
  },
  {
    id: 'ai-companion-guide',
    title: 'AI Yoldaşı Nasıl Kullanılır? Başlangıç Kılavuzu',
    excerpt: 'Yapay zeka asistanınızla daha etkili iletişim kurma yolları ve profesyonel kullanım ipuçları.',
    category: 'Rehber',
    readTime: '10 dk',
    date: '2024-01-10',
    image: '/blog/ai-companion.jpg',
    featured: false
  },
  {
    id: 'turkish-ai-assistants',
    title: 'Türkçe AI Asistanları: Dil ve Kültür Uyumu',
    excerpt: 'Türkçe konuşan AI asistanlarının avantajları ve MySonAI\'ın dil anlayışındaki farklar.',
    category: 'Teknoloji',
    readTime: '7 dk',
    date: '2024-01-08',
    image: '/blog/turkish-ai.jpg',
    featured: false
  },
  {
    id: 'ai-productivity-tips',
    title: 'AI Asistanınızla Verimliliği Artırmanın 10 Yolu',
    excerpt: 'Günlük görevlerinizi AI asistanınızla nasıl optimize edersiniz? Pratik ipuçları ve stratejiler.',
    category: 'Verimlilik',
    readTime: '9 dk',
    date: '2024-01-05',
    image: '/blog/ai-productivity.jpg',
    featured: false
  },
  {
    id: 'ai-education-benefits',
    title: 'Öğrenciler İçin AI Asistanı: Eğitimde Devrim',
    excerpt: 'MySonAI\'ın öğrencilere sunduğu avantajlar ve eğitim sürecini nasıl dönüştürdüğü.',
    category: 'Eğitim',
    readTime: '8 dk',
    date: '2024-01-03',
    image: '/blog/ai-education.jpg',
    featured: false
  }
];

const categories = ['Tümü', 'Karşılaştırma', 'Güvenlik', 'Rehber', 'Teknoloji', 'Verimlilik', 'Eğitim'];

export default function BlogPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Yapay zeka asistanları, AI teknolojisi ve MySonAI hakkında uzman görüşleri, karşılaştırmalar ve rehberler
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === 'Tümü' ? 'default' : 'secondary'}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-600 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Öne Çıkan Yazılar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-gray-400 text-sm">•</span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <span className="text-gray-400 text-sm">•</span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/${params.locale}/blog/${post.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tüm Yazılar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/${params.locale}/blog/${post.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Oku
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              AI Asistanlarınızla Tanışmaya Hazır mısınız?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Blog yazılarımızı okuduktan sonra MySonAI'ı deneyimleyin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${params.locale}/demo`} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Demo Başlat
              </Link>
              <Link href={`/${params.locale}/assistants`} className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                Asistanları Gör
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
