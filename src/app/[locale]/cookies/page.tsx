import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Cookie, Settings, Shield, Eye, Database, BarChart3, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çerez Politikası - MySonAI',
  description: 'MySonAI çerez politikası ve çerez kullanımı hakkında bilgiler.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Çerez Politikası</h1>
          <p className="text-gray-300 text-lg">Web sitemizde çerez kullanımı hakkında bilgiler</p>
          <p className="text-gray-400 text-sm mt-2">Son güncelleme: 18 Aralık 2024</p>
        </div>

        <div className="space-y-8">
          {/* Giriş */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Cookie className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Çerez Nedir?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınızda saklanan küçük metin dosyalarıdır.
                Bu dosyalar, web sitesinin daha iyi çalışmasını sağlar ve kullanıcı deneyimini geliştirir.
                MySonAI olarak, çerezleri belirli amaçlarla kullanırız ve bu kullanım hakkında sizleri bilgilendirmek isteriz.
              </p>
            </div>
          </Card>

          {/* Çerez Türleri */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Çerez Türleri</h2>
              </div>
              <div className="space-y-6">
                {/* Zorunlu Çerezler */}
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-red-400 mr-2" />
                    <h3 className="text-lg font-semibold text-red-400">Zorunlu Çerezler</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Web sitesinin temel işlevlerini yerine getirmesi için gerekli çerezlerdir.
                    Bu çerezler olmadan site düzgün çalışmaz.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Oturum yönetimi çerezleri</li>
                    <li>• Güvenlik çerezleri</li>
                    <li>• Dil tercihi çerezleri</li>
                    <li>• Form verileri çerezleri</li>
                  </ul>
                </div>

                {/* Performans Çerezleri */}
                <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                    <h3 className="text-lg font-semibold text-blue-400">Performans Çerezleri</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Web sitesinin performansını analiz etmek ve iyileştirmek için kullanılan çerezlerdir.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Google Analytics çerezleri</li>
                    <li>• Sayfa yükleme süreleri</li>
                    <li>• Kullanıcı davranış analizi</li>
                    <li>• Hata raporlama çerezleri</li>
                  </ul>
                </div>

                {/* Fonksiyonel Çerezler */}
                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <User className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="text-lg font-semibold text-green-400">Fonksiyonel Çerezler</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Kullanıcı deneyimini geliştirmek için kullanılan çerezlerdir.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Kullanıcı tercihleri</li>
                    <li>• Tema seçimi</li>
                    <li>• Bildirim ayarları</li>
                    <li>• Kişiselleştirme çerezleri</li>
                  </ul>
                </div>

                {/* Hedefleme Çerezleri */}
                <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 text-purple-400 mr-2" />
                    <h3 className="text-lg font-semibold text-purple-400">Hedefleme Çerezleri</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Kullanıcılara daha alakalı içerik ve reklamlar göstermek için kullanılan çerezlerdir.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reklam hedefleme çerezleri</li>
                    <li>• Sosyal medya entegrasyonu</li>
                    <li>• Üçüncü taraf çerezleri</li>
                    <li>• Pazarlama çerezleri</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Kullanılan Çerezler */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Kullandığımız Çerezler</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-white font-semibold">Çerez Adı</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Amaç</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Süre</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Tür</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">session_id</td>
                      <td className="py-3 px-4">Oturum yönetimi</td>
                      <td className="py-3 px-4">Oturum süresi</td>
                      <td className="py-3 px-4">
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Zorunlu</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">user_preferences</td>
                      <td className="py-3 px-4">Kullanıcı tercihleri</td>
                      <td className="py-3 px-4">1 yıl</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Fonksiyonel</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">_ga</td>
                      <td className="py-3 px-4">Google Analytics</td>
                      <td className="py-3 px-4">2 yıl</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Performans</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">_gid</td>
                      <td className="py-3 px-4">Google Analytics</td>
                      <td className="py-3 px-4">24 saat</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Performans</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">theme</td>
                      <td className="py-3 px-4">Tema tercihi</td>
                      <td className="py-3 px-4">1 yıl</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Fonksiyonel</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Çerez Yönetimi */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Çerez Yönetimi</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Çerez Tercihlerinizi Yönetin</h3>
                  <p className="text-gray-300 mb-4">
                    Çerez kullanımı konusunda tercihlerinizi aşağıdaki yöntemlerle yönetebilirsiniz:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Tarayıcı Ayarları</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz.
                      </p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Chrome: Ayarlar &gt; Gizlilik ve güvenlik &gt; Çerezler</li>
                        <li>• Firefox: Seçenekler &gt; Gizlilik ve güvenlik</li>
                        <li>• Safari: Tercihler &gt; Gizlilik</li>
                        <li>• Edge: Ayarlar &gt; Çerezler ve site izinleri</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Site Ayarları</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Web sitemizde çerez tercihlerinizi yönetebilirsiniz.
                      </p>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                          Çerez Ayarlarını Aç
                        </button>
                        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors">
                          Tüm Çerezleri Kabul Et
                        </button>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors">
                          Tüm Çerezleri Reddet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Önemli Uyarı</h4>
                  <p className="text-gray-300 text-sm">
                    Zorunlu çerezleri reddetmeniz durumunda web sitemizin bazı özellikleri düzgün çalışmayabilir.
                    Bu durumda kullanıcı deneyiminiz olumsuz etkilenebilir.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Üçüncü Taraf Çerezler */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-orange-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Üçüncü Taraf Çerezler</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Web sitemizde aşağıdaki üçüncü taraf hizmetlerin çerezleri kullanılmaktadır:
                </p>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Web sitesi trafiğini analiz etmek için kullanılır.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Daha fazla bilgi: <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline">Google Privacy Policy</a>
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">OpenAI</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      AI hizmetlerinin sağlanması için kullanılır.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Daha fazla bilgi: <a href="https://openai.com/privacy" className="text-blue-400 hover:underline">OpenAI Privacy Policy</a>
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Supabase</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Veritabanı ve kimlik doğrulama hizmetleri için kullanılır.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Daha fazla bilgi: <a href="https://supabase.com/privacy" className="text-blue-400 hover:underline">Supabase Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* İletişim */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Cookie className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">İletişim</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white font-semibold mb-2">E-posta:</p>
                  <p className="text-gray-300">privacy@mysonai.com</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white font-semibold mb-2">Adres:</p>
                  <p className="text-gray-300">
                    MySonAI Teknoloji A.Ş.<br />
                    İstanbul, Türkiye
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
