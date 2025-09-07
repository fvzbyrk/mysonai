import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { FeatureGuard } from '@/components/feature-guard';
import { Shield, Eye, Lock, Database, Users, Globe, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Gizlilik Politikası - MySonAI Kişisel Veri Koruma'
      : 'Privacy Policy - MySonAI Personal Data Protection',
    description: isTurkish
      ? 'MySonAI gizlilik politikası ve kişisel veri koruma uygulamaları. Verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.'
      : 'MySonAI privacy policy and personal data protection practices. Information about how your data is collected, used and protected.',
    keywords: isTurkish
      ? 'gizlilik politikası, kişisel veri koruma, GDPR, veri güvenliği, MySonAI'
      : 'privacy policy, personal data protection, GDPR, data security, MySonAI',
  };
}

function PrivacyContent({ params }: { params: { locale: Locale } }) {
  const isTurkish = params.locale === 'tr';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Shield className='w-10 h-10 text-blue-400' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              {isTurkish ? 'Gizlilik Politikası' : 'Privacy Policy'}
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              {isTurkish
                ? 'Kişisel verilerinizin korunması bizim için önemlidir. Bu politika, verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi verir.'
                : 'The protection of your personal data is important to us. This policy provides information about how your data is collected, used and protected.'}
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
            {/* 1. Veri Toplama */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Database className='w-6 h-6 text-green-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '1. Hangi Verileri Topluyoruz?' : '1. What Data Do We Collect?'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Kişisel Veriler' : 'Personal Data'}
                      </h3>
                      <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>
                          {isTurkish ? 'E-posta adresi ve şifre' : 'Email address and password'}
                        </li>
                        <li>{isTurkish ? 'Ad ve soyad' : 'First and last name'}</li>
                        <li>{isTurkish ? 'Profil bilgileri' : 'Profile information'}</li>
                        <li>
                          {isTurkish
                            ? 'Ödeme bilgileri (Stripe aracılığıyla)'
                            : 'Payment information (via Stripe)'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Kullanım Verileri' : 'Usage Data'}
                      </h3>
                      <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>{isTurkish ? 'AI asistan kullanımı' : 'AI assistant usage'}</li>
                        <li>
                          {isTurkish
                            ? 'Mesaj sayısı ve token kullanımı'
                            : 'Message count and token usage'}
                        </li>
                        <li>{isTurkish ? 'Sayfa görüntüleme verileri' : 'Page view data'}</li>
                        <li>
                          {isTurkish
                            ? 'Cihaz ve tarayıcı bilgileri'
                            : 'Device and browser information'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Veri Kullanımı */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Eye className='w-6 h-6 text-blue-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish
                      ? '2. Verilerinizi Nasıl Kullanıyoruz?'
                      : '2. How Do We Use Your Data?'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <ul className='list-disc list-inside space-y-2 ml-4'>
                      <li>
                        {isTurkish
                          ? 'Hizmetlerimizi sağlamak ve geliştirmek'
                          : 'To provide and improve our services'}
                      </li>
                      <li>
                        {isTurkish ? 'Kullanıcı hesaplarını yönetmek' : 'To manage user accounts'}
                      </li>
                      <li>
                        {isTurkish
                          ? 'AI asistan performansını optimize etmek'
                          : 'To optimize AI assistant performance'}
                      </li>
                      <li>
                        {isTurkish ? 'Müşteri desteği sağlamak' : 'To provide customer support'}
                      </li>
                      <li>
                        {isTurkish
                          ? 'Güvenlik ve dolandırıcılık önleme'
                          : 'Security and fraud prevention'}
                      </li>
                      <li>
                        {isTurkish
                          ? 'Yasal yükümlülükleri yerine getirmek'
                          : 'To fulfill legal obligations'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Veri Paylaşımı */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Users className='w-6 h-6 text-purple-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish
                      ? '3. Verilerinizi Kimlerle Paylaşıyoruz?'
                      : '3. Who Do We Share Your Data With?'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Hizmet Sağlayıcılar' : 'Service Providers'}
                      </h3>
                      <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>
                          {isTurkish
                            ? 'Supabase (veritabanı ve kimlik doğrulama)'
                            : 'Supabase (database and authentication)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'OpenAI (AI asistan hizmetleri)'
                            : 'OpenAI (AI assistant services)'}
                        </li>
                        <li>
                          {isTurkish ? 'Stripe (ödeme işlemleri)' : 'Stripe (payment processing)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Google Analytics (web analitik)'
                            : 'Google Analytics (web analytics)'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Yasal Durumlar' : 'Legal Situations'}
                      </h3>
                      <p className='ml-4'>
                        {isTurkish
                          ? 'Verilerinizi yalnızca yasal yükümlülüklerimizi yerine getirmek veya haklarımızı korumak için üçüncü taraflarla paylaşırız.'
                          : 'We only share your data with third parties to fulfill our legal obligations or protect our rights.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Veri Güvenliği */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Lock className='w-6 h-6 text-red-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '4. Veri Güvenliği' : '4. Data Security'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <ul className='list-disc list-inside space-y-2 ml-4'>
                      <li>{isTurkish ? 'End-to-end şifreleme' : 'End-to-end encryption'}</li>
                      <li>
                        {isTurkish ? 'SSL/TLS güvenlik protokolleri' : 'SSL/TLS security protocols'}
                      </li>
                      <li>{isTurkish ? 'Güvenli veri saklama' : 'Secure data storage'}</li>
                      <li>
                        {isTurkish ? 'Düzenli güvenlik denetimleri' : 'Regular security audits'}
                      </li>
                      <li>
                        {isTurkish ? 'Erişim kontrolü ve izleme' : 'Access control and monitoring'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Haklarınız */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Globe className='w-6 h-6 text-yellow-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '5. Haklarınız' : '5. Your Rights'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <ul className='list-disc list-inside space-y-2 ml-4'>
                      <li>
                        {isTurkish ? 'Verilerinize erişim hakkı' : 'Right to access your data'}
                      </li>
                      <li>
                        {isTurkish ? 'Verilerinizi düzeltme hakkı' : 'Right to correct your data'}
                      </li>
                      <li>
                        {isTurkish ? 'Verilerinizi silme hakkı' : 'Right to delete your data'}
                      </li>
                      <li>
                        {isTurkish
                          ? 'Veri işlemeyi kısıtlama hakkı'
                          : 'Right to restrict data processing'}
                      </li>
                      <li>
                        {isTurkish ? 'Veri taşınabilirliği hakkı' : 'Right to data portability'}
                      </li>
                      <li>{isTurkish ? 'İtiraz etme hakkı' : 'Right to object'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Çerezler */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-8'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <AlertTriangle className='w-6 h-6 text-orange-400' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-4'>
                    {isTurkish ? '6. Çerezler' : '6. Cookies'}
                  </h2>
                  <div className='space-y-4 text-gray-300'>
                    <p className='ml-4'>
                      {isTurkish
                        ? 'Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanıyoruz. Çerez ayarlarınızı tarayıcınızdan yönetebilirsiniz.'
                        : 'We use cookies on our website to improve user experience. You can manage your cookie settings from your browser.'}
                    </p>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        {isTurkish ? 'Çerez Türleri' : 'Cookie Types'}
                      </h3>
                      <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>
                          {isTurkish
                            ? 'Gerekli çerezler (site işlevselliği için)'
                            : 'Essential cookies (for site functionality)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Analitik çerezler (Google Analytics)'
                            : 'Analytics cookies (Google Analytics)'}
                        </li>
                        <li>
                          {isTurkish
                            ? 'Tercih çerezleri (kullanıcı ayarları)'
                            : 'Preference cookies (user settings)'}
                        </li>
                      </ul>
                    </div>
                  </div>
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
                    ? 'Gizlilik politikamız hakkında sorularınız varsa, bizimle iletişime geçin:'
                    : 'If you have questions about our privacy policy, please contact us:'}
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

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  return (
    <FeatureGuard feature='privacy' fallback={<div>Gizlilik politikası sayfası devre dışı</div>}>
      <PrivacyContent params={params} />
    </FeatureGuard>
  );
}
