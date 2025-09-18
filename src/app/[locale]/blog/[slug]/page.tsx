import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getBlogPostBySlug, 
  getRecentBlogPosts,
  blogCategories,
  type BlogPost 
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
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Eye,
  TrendingUp
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Makale Bulunamadı | MySonAI Blog',
      description: 'Aradığınız makale bulunamadı.',
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
    },
  };
}

function BlogPostContent({ post }: { post: BlogPost }) {
  const category = blogCategories.find(cat => cat.id === post.category);
  const recentPosts = getRecentBlogPosts(3);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <div className="pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/${params.locale}/blog`}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Blog'a Dön
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Article Header */}
        <article className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          {/* Category and Featured Badge */}
          <div className="flex items-center gap-3 mb-6">
            {category && (
              <Badge 
                variant="secondary" 
                className={`bg-gradient-to-r ${category.color} text-white border-0`}
              >
                {category.name}
              </Badge>
            )}
            {post.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                Öne Çıkan
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} dakika okuma</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>1.2k görüntüleme</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Beğen
            </Button>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="w-full h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-sm opacity-80">Makale Görseli</p>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h1>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
              }}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{post.author.avatar}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{post.author.name}</h3>
                <p className="text-gray-300 mb-4">{post.author.bio}</p>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Profili Görüntüle
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {recentPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              İlgili Makaleler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/${params.locale}/blog/${relatedPost.slug}`}>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MessageCircle className="w-6 h-6 mr-3" />
            Yorumlar
          </h2>
          
          <div className="space-y-6">
            {/* Comment Form */}
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Yorum Yap</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="E-posta"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <textarea
                  placeholder="Yorumunuz..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  Yorum Gönder
                </Button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AY</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-semibold">Ahmet Yılmaz</h4>
                      <span className="text-gray-400 text-sm">2 gün önce</span>
                    </div>
                    <p className="text-gray-300">
                      Çok faydalı bir makale olmuş. AI teknolojilerinin geleceği hakkında düşüncelerimizi şekillendiriyor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function BlogPostPage({ 
  params 
}: { 
  params: { locale: Locale; slug: string } 
}) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}