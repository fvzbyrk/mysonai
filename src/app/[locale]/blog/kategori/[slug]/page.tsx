import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getBlogPostsByCategory, 
  blogCategories,
  type BlogPost,
  type BlogCategory 
} from '@/lib/blog-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const category = blogCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı | MySonAI Blog',
      description: 'Aradığınız kategori bulunamadı.',
    };
  }

  return {
    title: `${category.name} Kategorisi | MySonAI Blog`,
    description: category.description,
    keywords: [category.name, 'blog', 'makale', 'MySonAI'],
  };
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <div className="p-6">
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

function CategoryContent({ 
  params 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  const category = blogCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  const posts = getBlogPostsByCategory(params.slug);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <div className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/${params.locale}/blog`}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Blog'a Dön
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {category.name}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {category.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>{posts.length} makale</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Popüler kategori</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
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
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white opacity-50" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Henüz Makale Yok
              </h2>
              <p className="text-gray-300 mb-8">
                Bu kategoride henüz makale bulunmuyor. Yakında yeni içerikler eklenecek.
              </p>
              <Link href={`/${params.locale}/blog`}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Tüm Makaleleri Gör
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Diğer Kategoriler
            </h2>
            <p className="text-gray-300">
              Diğer ilgi alanlarınızı keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCategories
              .filter(cat => cat.slug !== params.slug)
              .map((otherCategory) => (
                <Link key={otherCategory.id} href={`/${params.locale}/blog/kategori/${otherCategory.slug}`}>
                  <Card className={`bg-gradient-to-r ${otherCategory.color} text-white hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{otherCategory.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{otherCategory.description}</p>
                      <div className="text-white/60 text-xs">
                        {otherCategory.postCount} makale
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CategoryPage({ 
  params 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  return <CategoryContent params={params} />;
}
