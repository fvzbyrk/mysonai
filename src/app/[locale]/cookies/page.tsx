import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FeatureGuard } from '@/components/feature-guard';
import { Cookie, Settings, Shield, BarChart3, Eye, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Çerez Politikası - MySonAI Çerez Kullanımı'
      : 'Cookie Policy - MySonAI Cookie Usage',
    description: isTurkish
      ? 'MySonAI çerez politikası ve çerez kullanımı hakkında bilgi. Hangi çerezleri kullandığımız ve nasıl yönettiğiniz.'
      : 'Information about MySonAI cookie policy and cookie usage. What cookies we use and how you can manage them.',
    keywords: isTurkish
      ? 'çerez politikası, çerez kullanımı, MySonAI, web çerezleri'
      : 'cookie policy, cookie usage, MySonAI, web cookies',
  };
}

function CookiesContent({ params }: { params: { locale: Locale } }) {
  const isTurkish = params.locale === 'tr';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Cookie className='w-10 h-10 text-orange-400' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              {isTurkish ? 'Çerez Politikası' : 'Cookie Policy'}
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              {isTurkish
                ? 'Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz. Bu sayfa, hangi çerezleri kullandığımızı ve nasıl yönetebileceğinizi açıklar.'
                : 'We use cookies on our website to improve user experience. This page explains what cookies we use and how you can manage them.'}
            </p>
            <p className='text-sm text-gray-400 mt-4'>
              {isTurkish ? 'Son güncelleme: 15 Ocak 2024' : 'Last updated: January 15, 2024'}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-8'>
            {/* 1. Çerez Nedir? */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Cookie className='w-6 h-6 text-blue-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '1. Çerez Nedir?' : '1. What Are Cookies?'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <p>
                      {isTurkish
                        ? 'Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınızda saklanan küçük metin dosyalarıdır. Bu dosyalar, web sitesinin sizi tanımasını ve deneyiminizi kişiselleştirmesini sağlar.'
                        : 'Cookies are small text files stored in your browser when you visit websites. These files allow the website to recognize you and personalize your experience.'}
                    </p>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Çerez Türleri' : 'Cookie Types'}
                      </h3>
                      <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>
                          {isTurkish ? 'Oturum çerezleri (geçici)' : 'Session cookies (temporary)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Kalıcı çerezler (uzun süreli)'
                            : 'Persistent cookies (long-term)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Birinci taraf çerezleri (bizim)'
                            : 'First-party cookies (ours)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Üçüncü taraf çerezleri (partnerlerimiz)'
                            : 'Third-party cookies (our partners)'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Hangi Çerezleri Kullanıyoruz? */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Settings className='w-6 h-6 text-green-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '2. Hangi Çerezleri Kullanıyoruz?' : '2. What Cookies Do We Use?'}
                  </h2>
                  <div className='space-y-6 text-gray-300'>
                    {/* Gerekli Çerezler */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                        <Shield className='w-5 h-5 text-green-400' />
                        {isTurkish ? 'Gerekli Çerezler' : 'Essential Cookies'}
                      </h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Bu çerezler web sitesinin temel işlevlerini sağlamak için gereklidir ve devre dışı bırakılamaz.'
                          : 'These cookies are necessary for the basic functions of the website and cannot be disabled.'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>
                          {isTurkish ? 'Kimlik doğrulama çerezleri' : 'Authentication cookies'}
                        </li>
                        <li>{isTurkish ? 'Güvenlik çerezleri' : 'Security cookies'}</li>
                        <li>
                          {isTurkish ? 'Dil tercihi çerezleri' : 'Language preference cookies'}
                        </li>
                        <li>{isTurkish ? 'Tema tercihi çerezleri' : 'Theme preference cookies'}</li>
                      </ul>
                    </div>

                    {/* Analitik Çerezler */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                        <BarChart3 className='w-5 h-5 text-blue-400' />
                        {isTurkish ? 'Analitik Çerezler' : 'Analytics Cookies'}
                      </h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Bu çerezler web sitesinin nasıl kullanıldığını anlamamıza yardımcı olur.'
                          : 'These cookies help us understand how the website is used.'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>
                          {isTurkish ? 'Google Analytics çerezleri' : 'Google Analytics cookies'}
                        </li>
                        <li>{isTurkish ? 'Sayfa görüntüleme verileri' : 'Page view data'}</li>
                        <li>
                          {isTurkish ? 'Kullanıcı davranış analizi' : 'User behavior analysis'}
                        </li>
                        <li>{isTurkish ? 'Performans metrikleri' : 'Performance metrics'}</li>
                      </ul>
                    </div>

                    {/* Fonksiyonel Çerezler */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-3 flex items-center gap-2'>
                        <Eye className='w-5 h-5 text-purple-400' />
                        {isTurkish ? 'Fonksiyonel Çerezler' : 'Functional Cookies'}
                      </h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Bu çerezler web sitesinin gelişmiş özelliklerini sağlar.'
                          : 'These cookies provide advanced features of the website.'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>{isTurkish ? 'Kullanıcı tercihleri' : 'User preferences'}</li>
                        <li>{isTurkish ? 'Chat geçmişi' : 'Chat history'}</li>
                        <li>{isTurkish ? 'Form verileri' : 'Form data'}</li>
                        <li>{isTurkish ? 'Kişiselleştirme' : 'Personalization'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Çerez Yönetimi */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Settings className='w-6 h-6 text-purple-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish
                      ? '3. Çerez Ayarlarınızı Nasıl Yönetirsiniz?'
                      : '3. How Do You Manage Your Cookie Settings?'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    {/* Tarayıcı Ayarları */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Tarayıcı Ayarları' : 'Browser Settings'}
                      </h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Çerezleri tarayıcınızın ayarlarından yönetebilirsiniz:'
                          : 'You can manage cookies from your browser settings:'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>
                          {isTurkish
                            ? 'Chrome: Ayarlar > Gizlilik ve güvenlik > Çerezler'
                            : 'Chrome: Settings > Privacy and security > Cookies'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Firefox: Seçenekler > Gizlilik ve güvenlik'
                            : 'Firefox: Options > Privacy and security'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Safari: Tercihler > Gizlilik'
                            : 'Safari: Preferences > Privacy'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Edge: Ayarlar > Çerezler ve site izinleri'
                            : 'Edge: Settings > Cookies and site permissions'}
                        </li>
                      </ul>
                    </div>

                    {/* Çerez Banner */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? "Çerez Onay Banner'ı" : 'Cookie Consent Banner'}
                      </h3>
                      <p className='ml-4'>
                        {isTurkish
                          ? "Web sitemizi ilk ziyaret ettiğinizde çerez onay banner'ı görürsünüz. Buradan çerez tercihlerinizi yönetebilirsiniz."
                          : 'When you first visit our website, you will see a cookie consent banner. You can manage your cookie preferences from there.'}
                      </p>
                    </div>

                    {/* Çerez Ayarları Butonu */}
                    <div className='mt-6'>
                      <Button className='bg-purple-600 hover:bg-purple-700 text-white' asChild>
                        <a href='#cookie-settings'>
                          <Settings className='w-4 h-4 mr-2' />
                          {isTurkish ? 'Çerez Ayarlarını Düzenle' : 'Edit Cookie Settings'}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Üçüncü Taraf Çerezler */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <AlertTriangle className='w-6 h-6 text-yellow-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '4. Üçüncü Taraf Çerezler' : '4. Third-Party Cookies'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    {/* Google Analytics */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>Google Analytics</h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Web sitesi trafiğini analiz etmek için Google Analytics kullanıyoruz.'
                          : 'We use Google Analytics to analyze website traffic.'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>
                          {isTurkish
                            ? '_ga: Kullanıcıları ayırt etmek için'
                            : '_ga: To distinguish users'}
                        </li>
                        <li>
                          {isTurkish
                            ? '_gid: Kullanıcıları ayırt etmek için'
                            : '_gid: To distinguish users'}
                        </li>
                        <li>
                          {isTurkish
                            ? '_gat: İstek hızını sınırlamak için'
                            : '_gat: To throttle request rate'}
                        </li>
                      </ul>
                    </div>

                    {/* Stripe */}
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>Stripe (Ödeme)</h3>
                      <p className='mb-2 ml-4'>
                        {isTurkish
                          ? 'Güvenli ödeme işlemleri için Stripe kullanıyoruz.'
                          : 'We use Stripe for secure payment processing.'}
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-8'>
                        <li>{isTurkish ? 'Ödeme güvenliği' : 'Payment security'}</li>
                        <li>{isTurkish ? 'Dolandırıcılık önleme' : 'Fraud prevention'}</li>
                        <li>{isTurkish ? 'Kullanıcı deneyimi' : 'User experience'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Çerez Süreleri */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Cookie className='w-6 h-6 text-indigo-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '5. Çerez Süreleri' : '5. Cookie Durations'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <div className='overflow-x-auto'>
                      <table className='w-full border-collapse'>
                        <thead>
                          <tr className='border-b border-gray-600'>
                            <th className='text-left py-2 px-4 text-white font-semibold'>
                              {isTurkish ? 'Çerez Türü' : 'Cookie Type'}
                            </th>
                            <th className='text-left py-2 px-4 text-white font-semibold'>
                              {isTurkish ? 'Süre' : 'Duration'}
                            </th>
                            <th className='text-left py-2 px-4 text-white font-semibold'>
                              {isTurkish ? 'Amaç' : 'Purpose'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-sm'>
                          <tr className='border-b border-gray-700'>
                            <td className='py-2 px-4'>Session</td>
                            <td className='py-2 px-4'>
                              {isTurkish ? 'Tarayıcı kapatılana kadar' : 'Until browser closed'}
                            </td>
                            <td className='py-2 px-4'>
                              {isTurkish ? 'Temel işlevsellik' : 'Basic functionality'}
                            </td>
                          </tr>
                          <tr className='border-b border-gray-700'>
                            <td className='py-2 px-4'>Authentication</td>
                            <td className='py-2 px-4'>30 gün</td>
                            <td className='py-2 px-4'>
                              {isTurkish ? 'Kullanıcı oturumu' : 'User session'}
                            </td>
                          </tr>
                          <tr className='border-b border-gray-700'>
                            <td className='py-2 px-4'>Analytics</td>
                            <td className='py-2 px-4'>2 yıl</td>
                            <td className='py-2 px-4'>
                              {isTurkish ? 'Web analitik' : 'Web analytics'}
                            </td>
                          </tr>
                          <tr className='border-b border-gray-700'>
                            <td className='py-2 px-4'>Preferences</td>
                            <td className='py-2 px-4'>1 yıl</td>
                            <td className='py-2 px-4'>
                              {isTurkish ? 'Kullanıcı tercihleri' : 'User preferences'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Çerez Politikası Değişiklikleri */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  {isTurkish ? '6. Çerez Politikası Değişiklikleri' : '6. Cookie Policy Changes'}
                </h2>
                <p className='text-gray-300 mb-6'>
                  {isTurkish
                    ? 'Bu çerez politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler web sitemizde duyurulacaktır.'
                    : 'We may update this cookie policy from time to time. Important changes will be announced on our website.'}
                </p>
                <div className='space-y-2'>
                  <p className='text-white'>
                    <strong>{isTurkish ? 'Son güncelleme:' : 'Last updated:'}</strong> 15 Ocak 2024
                  </p>
                  <p className='text-white'>
                    <strong>{isTurkish ? 'Sonraki gözden geçirme:' : 'Next review:'}</strong> 15
                    Temmuz 2024
                  </p>
                </div>
              </div>
            </Card>

            {/* 7. İletişim */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  {isTurkish ? '7. İletişim' : '7. Contact'}
                </h2>
                <p className='text-gray-300 mb-6'>
                  {isTurkish
                    ? 'Çerez politikası hakkında sorularınız varsa, bizimle iletişime geçin:'
                    : 'If you have questions about the cookie policy, please contact us:'}
                </p>
                <div className='space-y-2'>
                  <p className='text-white'>
                    <strong>E-posta:</strong> privacy@mysonai.com
                  </p>
                  <p className='text-white'>
                    <strong>{isTurkish ? 'Adres:' : 'Address:'}</strong>{' '}
                    {isTurkish ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CookiesPage({ params }: { params: { locale: Locale } }) {
  return (
    <FeatureGuard feature='cookies' fallback={<div>Çerez politikası sayfası devre dışı</div>}>
      <CookiesContent params={params} />
    </FeatureGuard>
  );
}
