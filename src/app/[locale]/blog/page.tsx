import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Blog - MySonAI | AI ve Teknoloji Makaleleri'
      : 'Blog - MySonAI | AI and Technology Articles',
    description: isTurkish
      ? 'AI, teknoloji ve bilişim dünyasından en güncel makaleler. Uzmanlarımızdan derinlemesine analizler ve rehberler.'
      : 'Latest articles from AI, technology and IT world. In-depth analysis and guides from our experts.',
    keywords: isTurkish
      ? 'AI blog, teknoloji makaleleri, yapay zeka, bilişim, teknoloji haberleri'
      : 'AI blog, technology articles, artificial intelligence, IT, technology news',
  };
}

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Yapay Zeka ile Geleceğin İş Dünyası',
    excerpt: 'AI teknolojilerinin iş dünyasında yaratacağı dönüşümü ve fırsatları keşfedin.',
    author: 'MySonAI Ekibi',
    date: '2024-01-15',
    category: 'AI & Teknoloji',
    tags: ['AI', 'İş Dünyası', 'Gelecek'],
    image: '/images/blog/ai-business.jpg',
    readTime: '5 dk',
  },
  {
    id: '2',
    title: 'ChatGPT ve Diğer AI Asistanlarının Karşılaştırması',
    excerpt: 'Farklı AI asistanlarının güçlü ve zayıf yönlerini detaylı olarak inceliyoruz.',
    author: 'Teknoloji Uzmanı',
    date: '2024-01-12',
    category: 'AI Karşılaştırma',
    tags: ['ChatGPT', 'AI Asistanlar', 'Karşılaştırma'],
    image: '/images/blog/ai-comparison.jpg',
    readTime: '7 dk',
  },
  {
    id: '3',
    title: 'Küçük İşletmeler için AI Çözümleri',
    excerpt: "KOBİ'lerin AI teknolojilerinden nasıl faydalanabileceğini öğrenin.",
    author: 'İş Geliştirme Uzmanı',
    date: '2024-01-10',
    category: 'İş Çözümleri',
    tags: ['KOBİ', 'AI Çözümleri', 'İş Geliştirme'],
    image: '/images/blog/small-business-ai.jpg',
    readTime: '6 dk',
  },
];

const categories = [
  'Tümü',
  'AI & Teknoloji',
  'AI Karşılaştırma',
  'İş Çözümleri',
  'Eğitim',
  'Güvenlik',
];

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  const isTurkish = params.locale === 'tr';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            {isTurkish ? 'Blog' : 'Blog'}
          </h1>
          <p className='text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8'>
            {isTurkish
              ? 'AI, teknoloji ve bilişim dünyasından en güncel makaleler'
              : 'Latest articles from AI, technology and IT world'}
          </p>
        </div>

        {/* Search and Filter */}
        <div className='mb-12'>
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder={isTurkish ? 'Makale ara...' : 'Search articles...'}
                className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
            <div className='flex gap-2'>
              {categories.map(category => (
                <Button
                  key={category}
                  variant='outline'
                  className='bg-white/10 border-white/20 text-white hover:bg-white/20'
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map(post => (
            <Card
              key={post.id}
              className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group'
            >
              <div className='p-6'>
                <div className='mb-4'>
                  <Badge className='bg-purple-500/20 text-purple-400 border-purple-500/50 mb-3'>
                    {post.category}
                  </Badge>
                  <h3 className='text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-3'>
                    {post.title}
                  </h3>
                  <p className='text-gray-300 text-sm mb-4'>{post.excerpt}</p>
                </div>

                <div className='flex items-center justify-between text-sm text-gray-400 mb-4'>
                  <div className='flex items-center space-x-4'>
                    <span className='flex items-center'>
                      <User className='w-4 h-4 mr-1' />
                      {post.author}
                    </span>
                    <span className='flex items-center'>
                      <Calendar className='w-4 h-4 mr-1' />
                      {post.date}
                    </span>
                  </div>
                  <span>{post.readTime}</span>
                </div>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {post.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant='outline'
                      className='text-xs border-white/20 text-gray-300'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={`/${params.locale}/blog/${post.id}`}>
                  <Button className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group'>
                    {isTurkish ? 'Devamını Oku' : 'Read More'}
                    <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className='text-center mt-12'>
          <Button
            variant='outline'
            className='bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3'
          >
            {isTurkish ? 'Daha Fazla Makale Yükle' : 'Load More Articles'}
          </Button>
        </div>
      </div>
    </div>
  );
}
