import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPostSkeleton } from '@/components/ui/skeleton-screens';
import { 
  blogPosts, 
  blogCategories, 
  getFeaturedBlogPosts, 
  getRecentBlogPosts,
  type BlogPost,
  type BlogCategory 
} from '@/lib/blog-data';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  Filter,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Users,
  Lightbulb,
  Newspaper
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Blog - AI Teknolojileri, İş Dünyası ve Dijital Dönüşüm | MySonAI'
      : 'Blog - AI Technologies, Business and Digital Transformation | MySonAI',
    description: isTurkish
      ? 'AI teknolojileri, iş dünyası, dijital dönüşüm ve chatbot uygulamaları hakkında güncel makaleler. Uzman görüşleri ve pratik rehberler.'
      : 'Latest articles about AI technologies, business, digital transformation and chatbot applications. Expert opinions and practical guides.',
    keywords: isTurkish
      ? 'AI blog, yapay zeka makaleleri, dijital dönüşüm, chatbot, iş teknolojileri'
      : 'AI blog, artificial intelligence articles, digital transformation, chatbot, business technologies',
  };
}

function BlogCard({ post }: { post: BlogPost }) {
  const category = blogCategories.find(cat => cat.id === post.category);
  
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <div className="p-6">
        {/* Category Badge */}
        {category && (
          <Badge 
            variant="secondary" 
            className={`mb-4 bg-gradient-to-r ${category.color} text-white border-0`}
          >
            {category.name}
          </Badge>
        )}
        
        {/* Featured Badge */}
        {post.featured && (
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <TrendingUp className="w-3 h-3 mr-1" />
            Öne Çıkan
          </Badge>
        )}
        
        {/* Image */}
        {post.image && (
          <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} dk</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Read More Button */}
        <Link href={`/${params.locale}/blog/${post.slug}`}>
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10 group-hover:border-purple-500 group-hover:text-purple-300 transition-all duration-300"
          >
            Devamını Oku
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function CategoryCard({ category }: { category: BlogCategory }) {
  return (
    <Link href={`/${params.locale}/blog/kategori/${category.slug}`}>
      <Card className={`bg-gradient-to-r ${category.color} text-white hover:scale-105 transition-all duration-300 cursor-pointer`}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-white/80 text-sm mb-3">{category.description}</p>
          <div className="text-white/60 text-xs">
            {category.postCount} makale
          </div>
        </div>
      </Card>
    </Link>
  );
}

function BlogContent({ params }: { params: { locale: Locale } }) {
  const featuredPosts = getFeaturedBlogPosts();
  const recentPosts = getRecentBlogPosts(6);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              MySonAI Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AI teknolojileri, iş dünyası ve dijital dönüşüm hakkında güncel makaleler, 
              uzman görüşleri ve pratik rehberler.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Makale ara..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Kategoriler
            </h2>
            <p className="text-gray-300">
              İlgi alanınıza göre makaleleri keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Öne Çıkan Makaleler
              </h2>
              <p className="text-gray-300">
                En popüler ve güncel içeriklerimiz
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Son Makaleler
            </h2>
            <p className="text-gray-300">
              En güncel içeriklerimizi keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
            >
              Daha Fazla Yükle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Blog Güncellemelerini Kaçırmayın
            </h2>
            <p className="text-gray-300 mb-8">
              Yeni makalelerimizden haberdar olmak için e-posta listemize katılın
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Abone Ol
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  return <BlogContent params={params} />;
}