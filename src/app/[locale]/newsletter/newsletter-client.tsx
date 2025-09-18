'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight,
  Bell,
  BookOpen,
  Zap,
  Shield,
  Gift
} from 'lucide-react';

// Newsletter benefits
const newsletterBenefits = [
  {
    icon: TrendingUp,
    title: 'AI Güncellemeleri',
    description: 'En son AI teknolojileri ve gelişmeler hakkında bilgi alın'
  },
  {
    icon: Star,
    title: 'Özel İçerikler',
    description: 'Sadece abonelere özel makaleler ve rehberler'
  },
  {
    icon: Gift,
    title: 'Erken Erişim',
    description: 'Yeni özellikler ve ürünlerden ilk siz haberdar olun'
  },
  {
    icon: Users,
    title: 'Topluluk',
    description: 'AI topluluğu ile bağlantı kurun ve deneyimlerinizi paylaşın'
  }
];

// Newsletter categories
const newsletterCategories = [
  {
    id: 'ai-updates',
    name: 'AI Güncellemeleri',
    description: 'Yapay zeka teknolojilerindeki son gelişmeler',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'product-news',
    name: 'Ürün Haberleri',
    description: 'MySonAI ürünlerindeki yeni özellikler ve güncellemeler',
    icon: Zap,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'tutorials',
    name: 'Eğitimler',
    description: 'AI kullanımı hakkında pratik rehberler ve ipuçları',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'security',
    name: 'Güvenlik',
    description: 'AI güvenliği ve gizlilik konularında güncellemeler',
    icon: Shield,
    color: 'from-orange-500 to-red-500'
  }
];

// Recent newsletters
const recentNewsletters = [
  {
    id: '1',
    title: 'AI Asistanları ile Verimliliği Artırın',
    date: '2024-01-15',
    category: 'tutorials',
    readTime: '5 dk',
    featured: true
  },
  {
    id: '2',
    title: 'Yeni MySon Video Özellikleri',
    date: '2024-01-12',
    category: 'product-news',
    readTime: '3 dk',
    featured: false
  },
  {
    id: '3',
    title: 'AI Güvenliği: En İyi Uygulamalar',
    date: '2024-01-10',
    category: 'security',
    readTime: '7 dk',
    featured: true
  },
  {
    id: '4',
    title: 'ChatGPT vs MySonAI: Karşılaştırma',
    date: '2024-01-08',
    category: 'ai-updates',
    readTime: '6 dk',
    featured: false
  }
];

export function NewsletterClient({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isTurkish = locale === 'tr';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              {isTurkish ? 'Başarıyla Abone Oldunuz!' : 'Successfully Subscribed!'}
            </h1>
            
            <p className="text-gray-300 mb-6">
              {isTurkish 
                ? 'Newsletter\'ımıza başarıyla abone oldunuz. Yakında size özel içerikler göndereceğiz.'
                : 'You have successfully subscribed to our newsletter. We will send you exclusive content soon.'
              }
            </p>
            
            <Button
              onClick={() => setIsSubscribed(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isTurkish ? 'Yeni Abonelik' : 'New Subscription'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isTurkish ? 'Newsletter' : 'Newsletter'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {isTurkish 
                ? 'AI dünyasındaki son gelişmelerden haberdar olun. Özel içerikler ve erken erişim fırsatları için abone olun.'
                : 'Stay updated with the latest developments in the AI world. Subscribe for exclusive content and early access opportunities.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isTurkish ? 'Neden Abone Olmalısınız?' : 'Why Should You Subscribe?'}
            </h2>
            <p className="text-gray-300">
              {isTurkish 
                ? 'Newsletter\'ımıza abone olarak bu avantajlardan yararlanın'
                : 'Subscribe to our newsletter to benefit from these advantages'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsletterBenefits.map((benefit, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-16 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {isTurkish ? 'Abone Olun' : 'Subscribe'}
                </h2>
                <p className="text-gray-300">
                  {isTurkish 
                    ? 'E-posta adresinizi girin ve ilgi alanlarınızı seçin'
                    : 'Enter your email address and select your interests'
                  }
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {isTurkish ? 'E-posta Adresi' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder={isTurkish ? 'ornek@email.com' : 'example@email.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-white font-semibold mb-4">
                    {isTurkish ? 'İlgi Alanlarınızı Seçin' : 'Select Your Interests'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newsletterCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedCategories.includes(category.id)
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">
                              {category.name}
                            </h3>
                            <p className="text-gray-300 text-sm">
                              {category.description}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedCategories.includes(category.id)
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-white/40'
                          }`}>
                            {selectedCategories.includes(category.id) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {isTurkish ? 'Abone Olunuyor...' : 'Subscribing...'}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        {isTurkish ? 'Abone Ol' : 'Subscribe'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Newsletters */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {isTurkish ? 'Son Newsletter\'lar' : 'Recent Newsletters'}
            </h2>
            <p className="text-gray-300">
              {isTurkish 
                ? 'Geçmiş newsletter içeriklerimizi inceleyin'
                : 'Browse our past newsletter content'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentNewsletters.map((newsletter) => (
              <Card key={newsletter.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {newsletter.featured && (
                          <Badge className="bg-purple-600 text-white mr-2">
                            {isTurkish ? 'Öne Çıkan' : 'Featured'}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-gray-300">
                          {newsletterCategories.find(c => c.id === newsletter.category)?.name}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {newsletter.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">
                          {new Date(newsletter.date).toLocaleDateString()}
                        </span>
                        <span>
                          {newsletter.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    {isTurkish ? 'Oku' : 'Read'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isTurkish ? 'Hemen Başlayın' : 'Get Started Now'}
          </h2>
          <p className="text-gray-300 mb-8">
            {isTurkish 
              ? 'AI dünyasındaki son gelişmelerden haberdar olmak için hemen abone olun.'
              : 'Subscribe now to stay informed about the latest developments in the AI world.'
            }
          </p>
          
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <Bell className="w-4 h-4 mr-2" />
            {isTurkish ? 'Abone Ol' : 'Subscribe'}
          </Button>
        </div>
      </section>
    </div>
  );
}
