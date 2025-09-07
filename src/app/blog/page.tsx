import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'AI Asistanların Geleceği: 2024 Trendleri',
    excerpt:
      'Yapay zeka teknolojilerindeki son gelişmeler ve AI asistanların iş dünyasındaki rolü hakkında detaylı bir analiz.',
    author: 'MySonAI Ekibi',
    date: '2024-01-15',
    readTime: '5 dk',
    category: 'AI Teknolojileri',
    image: '/api/placeholder/400/250',
    slug: 'ai-asistanlarin-gelecegi-2024-trendleri',
  },
  {
    id: 2,
    title: 'Türkçe AI: Yerel Dil Desteğinin Önemi',
    excerpt:
      'Türkçe dil desteğinin AI sistemlerindeki kritik rolü ve kullanıcı deneyimine etkileri.',
    author: 'Elif Yılmaz',
    date: '2024-01-10',
    readTime: '4 dk',
    category: 'Dil Teknolojileri',
    image: '/api/placeholder/400/250',
    slug: 'turkce-ai-yerel-dil-desteginin-onemi',
  },
  {
    id: 3,
    title: 'Chatbot vs AI Asistan: Farklar ve Kullanım Alanları',
    excerpt:
      'Geleneksel chatbotlar ile gelişmiş AI asistanlar arasındaki farklar ve hangi durumlarda hangisini tercih etmek gerekir.',
    author: 'Burak Demir',
    date: '2024-01-05',
    readTime: '6 dk',
    category: 'AI Karşılaştırması',
    image: '/api/placeholder/400/250',
    slug: 'chatbot-vs-ai-asistan-farklar-ve-kullanim-alanlari',
  },
  {
    id: 4,
    title: 'Müşteri Hizmetlerinde AI: Başarı Hikayeleri',
    excerpt:
      'AI asistanların müşteri hizmetlerinde nasıl devrim yarattığını gösteren gerçek vaka çalışmaları.',
    author: 'Seda Kaya',
    date: '2023-12-28',
    readTime: '7 dk',
    category: 'Müşteri Deneyimi',
    image: '/api/placeholder/400/250',
    slug: 'musteri-hizmetlerinde-ai-basari-hikayeleri',
  },
  {
    id: 5,
    title: 'AI Güvenliği: Veri Koruma ve Gizlilik',
    excerpt:
      'AI sistemlerinde veri güvenliği ve kullanıcı gizliliğinin nasıl sağlanması gerektiği hakkında rehber.',
    author: 'Leyla Özkan',
    date: '2023-12-20',
    readTime: '8 dk',
    category: 'Güvenlik',
    image: '/api/placeholder/400/250',
    slug: 'ai-guvenligi-veri-koruma-ve-gizlilik',
  },
  {
    id: 6,
    title: 'Küçük İşletmeler için AI: Başlangıç Rehberi',
    excerpt:
      'Küçük ve orta ölçekli işletmelerin AI teknolojilerini nasıl etkili şekilde kullanabileceğini anlatan pratik rehber.',
    author: 'Ahmet Yıldız',
    date: '2023-12-15',
    readTime: '5 dk',
    category: 'İş Geliştirme',
    image: '/api/placeholder/400/250',
    slug: 'kucuk-isletmeler-icin-ai-baslangic-rehberi',
  },
];

const categories = [
  'Tümü',
  'AI Teknolojileri',
  'Dil Teknolojileri',
  'AI Karşılaştırması',
  'Müşteri Deneyimi',
  'Güvenlik',
  'İş Geliştirme',
];

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>Blog</h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            AI teknolojileri, yapay zeka trendleri ve MySonAI&apos;dan en güncel haberler. Uzman
            yazarlarımızdan öğrenin.
          </p>
        </div>

        {/* Categories */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {categories.map(category => (
            <button
              key={category}
              className='bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors'
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className='mb-16'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='bg-gradient-to-br from-purple-600 to-pink-600 h-64 lg:h-full flex items-center justify-center'>
                <div className='text-center text-white'>
                  <div className='text-6xl mb-4'>🤖</div>
                  <h2 className='text-2xl font-bold'>AI Teknolojileri</h2>
                </div>
              </div>
              <div className='p-8'>
                <div className='flex items-center space-x-4 mb-4'>
                  <span className='bg-purple-500 text-white px-3 py-1 rounded-full text-sm'>
                    Öne Çıkan
                  </span>
                  <span className='text-gray-300 text-sm'>{blogPosts[0].category}</span>
                </div>
                <h2 className='text-2xl font-bold text-white mb-4'>{blogPosts[0].title}</h2>
                <p className='text-gray-300 mb-6'>{blogPosts[0].excerpt}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4 text-sm text-gray-300'>
                    <div className='flex items-center space-x-1'>
                      <User className='w-4 h-4' />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-4 h-4' />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Clock className='w-4 h-4' />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2'
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className='w-4 h-4' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.slice(1).map(post => (
            <article
              key={post.id}
              className='bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-200'
            >
              <div className='bg-gradient-to-br from-purple-600 to-pink-600 h-48 flex items-center justify-center'>
                <div className='text-center text-white'>
                  <div className='text-4xl mb-2'>📝</div>
                  <h3 className='text-lg font-semibold'>Blog Yazısı</h3>
                </div>
              </div>
              <div className='p-6'>
                <div className='flex items-center space-x-2 mb-3'>
                  <span className='bg-purple-500 text-white px-2 py-1 rounded text-xs'>
                    {post.category}
                  </span>
                </div>
                <h3 className='text-xl font-bold text-white mb-3 line-clamp-2'>{post.title}</h3>
                <p className='text-gray-300 text-sm mb-4 line-clamp-3'>{post.excerpt}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4 text-xs text-gray-300'>
                    <div className='flex items-center space-x-1'>
                      <User className='w-3 h-3' />
                      <span>{post.author}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-3 h-3' />
                      <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className='text-purple-300 hover:text-white transition-colors flex items-center space-x-1'
                  >
                    <span className='text-sm'>Oku</span>
                    <ArrowRight className='w-3 h-3' />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className='mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center'>
          <h2 className='text-2xl font-bold text-white mb-4'>Güncel Kalın</h2>
          <p className='text-gray-300 mb-6'>
            En son AI haberleri ve MySonAI güncellemeleri için e-posta listemize katılın.
          </p>
          <div className='max-w-md mx-auto flex space-x-3'>
            <input
              type='email'
              placeholder='E-posta adresiniz'
              className='flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <button className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200'>
              Abone Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
