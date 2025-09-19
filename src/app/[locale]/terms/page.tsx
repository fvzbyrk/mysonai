import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kullanım Şartları - MySonAI',
  description: 'MySonAI kullanım şartları ve hizmet koşulları.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-white mb-4'>Kullanım Şartları</h1>
          <p className='text-gray-300 text-lg'>
            Hizmetlerimizi kullanmadan önce lütfen bu şartları okuyun
          </p>
          <p className='text-gray-400 text-sm mt-2'>Son güncelleme: 18 Aralık 2024</p>
        </div>

        <div className='space-y-8'>
          {/* Giriş */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <FileText className='w-6 h-6 text-blue-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>1. Giriş ve Kabul</h2>
              </div>
              <p className='text-gray-300 leading-relaxed'>
                Bu kullanım şartları, MySonAI platformunu kullanan tüm kullanıcılar için geçerlidir.
                Platformu kullanarak bu şartları kabul etmiş sayılırsınız. Eğer bu şartları kabul
                etmiyorsanız, lütfen platformu kullanmayın.
              </p>
            </div>
          </Card>

          {/* Hizmet Tanımı */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <Scale className='w-6 h-6 text-green-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>2. Hizmet Tanımı</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300'>
                  MySonAI, yapay zeka teknolojileri kullanarak çeşitli hizmetler sunan bir
                  platformdur:
                </p>
                <ul className='text-gray-300 space-y-2 ml-4'>
                  <li>• AI asistan hizmetleri</li>
                  <li>• Metin üretimi ve düzenleme</li>
                  <li>• Görsel üretimi</li>
                  <li>• Kod yazma ve analiz</li>
                  <li>• Eğitim ve danışmanlık hizmetleri</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Kullanıcı Yükümlülükleri */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <Shield className='w-6 h-6 text-purple-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>3. Kullanıcı Yükümlülükleri</h2>
              </div>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Yasaklı Kullanımlar</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Yasadışı içerik üretimi</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Telif hakkı ihlali</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Zararlı yazılım üretimi</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Spam ve kötüye kullanım</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Kişisel veri ihlali</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <XCircle className='w-5 h-5 text-red-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Sistem güvenliğini tehdit etme</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    Kullanıcı Sorumlulukları
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex items-start space-x-2'>
                      <CheckCircle className='w-5 h-5 text-green-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>
                        Hesap bilgilerinizi güvenli tutun
                      </span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <CheckCircle className='w-5 h-5 text-green-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Doğru ve güncel bilgi sağlayın</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <CheckCircle className='w-5 h-5 text-green-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>Hizmet şartlarına uyun</span>
                    </div>
                    <div className='flex items-start space-x-2'>
                      <CheckCircle className='w-5 h-5 text-green-400 mt-1 flex-shrink-0' />
                      <span className='text-gray-300 text-sm'>
                        Yasal düzenlemelere uygun hareket edin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Fikri Mülkiyet */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <Scale className='w-6 h-6 text-yellow-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>4. Fikri Mülkiyet Hakları</h2>
              </div>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Platform İçeriği</h3>
                  <p className='text-gray-300 text-sm'>
                    MySonAI platformu, yazılımı ve tüm içeriği telif hakkı ve diğer fikri mülkiyet
                    yasaları ile korunmaktadır.
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>Kullanıcı İçeriği</h3>
                  <p className='text-gray-300 text-sm'>
                    Kullanıcılar tarafından oluşturulan içeriklerin sahipliği kullanıcıya aittir.
                    Ancak, hizmet sunumu için gerekli lisanslar verilmiş sayılır.
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>AI Üretimi İçerik</h3>
                  <p className='text-gray-300 text-sm'>
                    AI tarafından üretilen içeriklerin sahipliği ve kullanım hakları, ilgili yasal
                    düzenlemelere tabidir.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Sorumluluk Sınırları */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <AlertTriangle className='w-6 h-6 text-orange-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>5. Sorumluluk Sınırları</h2>
              </div>
              <div className='space-y-4'>
                <div className='bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-orange-400 mb-2'>Önemli Uyarı</h3>
                  <p className='text-gray-300 text-sm'>
                    MySonAI, AI teknolojilerinin doğası gereği %100 doğru sonuçlar garanti etmez.
                    Kullanıcılar, AI üretimi içerikleri kendi sorumluluklarında kullanmalıdır.
                  </p>
                </div>
                <div className='space-y-2'>
                  <p className='text-gray-300 text-sm'>
                    • Hizmet kesintileri ve teknik sorunlar için sorumluluk kabul edilmez
                  </p>
                  <p className='text-gray-300 text-sm'>
                    • Üçüncü taraf hizmetlerin kullanımından doğan sorunlar için sorumluluk alınmaz
                  </p>
                  <p className='text-gray-300 text-sm'>
                    • Kullanıcı hatalarından kaynaklanan veri kayıpları için sorumluluk kabul
                    edilmez
                  </p>
                  <p className='text-gray-300 text-sm'>
                    • Yasal düzenlemelerdeki değişikliklerden kaynaklanan sorunlar için sorumluluk
                    alınmaz
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Hizmet Değişiklikleri */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <FileText className='w-6 h-6 text-blue-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>6. Hizmet Değişiklikleri</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300'>
                  MySonAI, hizmetlerini önceden bildirim yaparak değiştirme, güncelleme veya
                  sonlandırma hakkını saklı tutar.
                </p>
                <div className='bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-blue-400 mb-2'>Bildirim Süreci</h3>
                  <ul className='text-gray-300 text-sm space-y-1'>
                    <li>• Önemli değişiklikler 30 gün önceden bildirilir</li>
                    <li>• Acil güvenlik güncellemeleri anında uygulanabilir</li>
                    <li>• Kullanıcılar değişiklikleri kabul etmek zorundadır</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Uygulanacak Hukuk */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <Scale className='w-6 h-6 text-red-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>7. Uygulanacak Hukuk ve Yetki</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300'>
                  Bu kullanım şartları Türk hukukuna tabidir. Uyuşmazlıklar İstanbul mahkemelerinde
                  çözülecektir.
                </p>
                <div className='bg-red-500/10 border border-red-500/20 p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold text-red-400 mb-2'>Uyuşmazlık Çözümü</h3>
                  <ul className='text-gray-300 text-sm space-y-1'>
                    <li>• Öncelikle dostane çözüm aranır</li>
                    <li>• Arabuluculuk süreci uygulanabilir</li>
                    <li>• Son çare olarak mahkeme yoluna başvurulur</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* İletişim */}
          <Card className='bg-white/10 backdrop-blur-md border-white/20'>
            <div className='p-8'>
              <div className='flex items-center mb-4'>
                <FileText className='w-6 h-6 text-green-400 mr-3' />
                <h2 className='text-2xl font-semibold text-white'>8. İletişim</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300'>
                  Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className='bg-white/5 p-4 rounded-lg'>
                  <p className='text-white font-semibold mb-2'>E-posta:</p>
                  <p className='text-gray-300'>legal@mysonai.com</p>
                </div>
                <div className='bg-white/5 p-4 rounded-lg'>
                  <p className='text-white font-semibold mb-2'>Adres:</p>
                  <p className='text-gray-300'>
                    MySonAI Teknoloji A.Ş.
                    <br />
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
