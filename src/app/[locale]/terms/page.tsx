import { Locale } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { Card } from '@/components/ui/card'
import { FeatureGuard } from '@/components/feature-guard'
import { FileText, Scale, Users, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';
  
  return {
    title: isTurkish 
      ? 'Kullanım Koşulları - MySonAI Hizmet Şartları'
      : 'Terms of Service - MySonAI Service Terms',
    description: isTurkish
      ? 'MySonAI kullanım koşulları ve hizmet şartları. Platformumuzu kullanırken uymanız gereken kurallar ve koşullar.'
      : 'MySonAI terms of service and service conditions. Rules and conditions you must follow when using our platform.',
    keywords: isTurkish
      ? 'kullanım koşulları, hizmet şartları, MySonAI, platform kuralları'
      : 'terms of service, service conditions, MySonAI, platform rules',
  };
}

function TermsContent({
  params,
}: {
  params: { locale: Locale }
}) {
  const isTurkish = params.locale === 'tr';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isTurkish ? 'Kullanım Koşulları' : 'Terms of Service'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {isTurkish 
                ? 'MySonAI platformunu kullanırken uymanız gereken kurallar ve koşullar. Hizmetlerimizi kullanarak bu koşulları kabul etmiş olursunuz.'
                : 'Rules and conditions you must follow when using the MySonAI platform. By using our services, you agree to these terms.'
              }
            </p>
            <p className="text-sm text-gray-400 mt-4">
              {isTurkish ? 'Son güncelleme: 15 Ocak 2024' : 'Last updated: January 15, 2024'}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* 1. Hizmet Tanımı */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '1. Hizmet Tanımı' : '1. Service Description'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      {isTurkish 
                        ? 'MySonAI, yapay zeka teknolojileri kullanarak çeşitli AI asistanları sunan bir platformdur. Hizmetlerimiz şunları içerir:'
                        : 'MySonAI is a platform that offers various AI assistants using artificial intelligence technologies. Our services include:'
                      }
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>{isTurkish ? 'AI asistan sohbet hizmetleri' : 'AI assistant chat services'}</li>
                      <li>{isTurkish ? 'Görsel üretim araçları' : 'Visual generation tools'}</li>
                      <li>{isTurkish ? 'Kod üretim yardımcıları' : 'Code generation assistants'}</li>
                      <li>{isTurkish ? 'Kullanıcı hesap yönetimi' : 'User account management'}</li>
                      <li>{isTurkish ? 'Ödeme ve abonelik hizmetleri' : 'Payment and subscription services'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Kullanıcı Yükümlülükleri */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '2. Kullanıcı Yükümlülükleri' : '2. User Obligations'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Yasaklanan Kullanımlar' : 'Prohibited Uses'}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{isTurkish ? 'Yasadışı içerik üretimi' : 'Illegal content generation'}</li>
                        <li>{isTurkish ? 'Zararlı yazılım geliştirme' : 'Malicious software development'}</li>
                        <li>{isTurkish ? 'Telif hakkı ihlali' : 'Copyright infringement'}</li>
                        <li>{isTurkish ? 'Spam veya kötüye kullanım' : 'Spam or abuse'}</li>
                        <li>{isTurkish ? 'Başkalarının haklarını ihlal etme' : 'Violating others\' rights'}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Kullanıcı Sorumlulukları' : 'User Responsibilities'}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{isTurkish ? 'Doğru ve güncel bilgi sağlama' : 'Providing accurate and up-to-date information'}</li>
                        <li>{isTurkish ? 'Hesap güvenliğini sağlama' : 'Maintaining account security'}</li>
                        <li>{isTurkish ? 'Kullanım limitlerine uyma' : 'Complying with usage limits'}</li>
                        <li>{isTurkish ? 'Ödeme yükümlülüklerini yerine getirme' : 'Fulfilling payment obligations'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 3. Hizmet Sağlayıcı Yükümlülükleri */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '3. Hizmet Sağlayıcı Yükümlülükleri' : '3. Service Provider Obligations'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{isTurkish ? 'Hizmetlerin sürekli erişilebilirliğini sağlama' : 'Ensuring continuous accessibility of services'}</li>
                      <li>{isTurkish ? 'Kullanıcı verilerinin güvenliğini koruma' : 'Protecting user data security'}</li>
                      <li>{isTurkish ? 'Gizlilik politikasına uygun hareket etme' : 'Acting in accordance with privacy policy'}</li>
                      <li>{isTurkish ? 'Teknik destek sağlama' : 'Providing technical support'}</li>
                      <li>{isTurkish ? 'Hizmet kalitesini sürekli iyileştirme' : 'Continuously improving service quality'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Ödeme ve Faturalandırma */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '4. Ödeme ve Faturalandırma' : '4. Payment and Billing'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Abonelik Modelleri' : 'Subscription Models'}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{isTurkish ? 'Ücretsiz Plan: Sınırlı kullanım' : 'Free Plan: Limited usage'}</li>
                        <li>{isTurkish ? 'Pro Plan: Aylık abonelik' : 'Pro Plan: Monthly subscription'}</li>
                        <li>{isTurkish ? 'Enterprise Plan: Kurumsal çözümler' : 'Enterprise Plan: Enterprise solutions'}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Ödeme Koşulları' : 'Payment Terms'}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>{isTurkish ? 'Ödemeler Stripe aracılığıyla işlenir' : 'Payments are processed via Stripe'}</li>
                        <li>{isTurkish ? 'Abonelikler otomatik yenilenir' : 'Subscriptions auto-renew'}</li>
                        <li>{isTurkish ? 'İptal işlemi 24 saat içinde gerçekleşir' : 'Cancellation takes effect within 24 hours'}</li>
                        <li>{isTurkish ? 'Para iadesi politikası geçerlidir' : 'Refund policy applies'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5. Sorumluluk Sınırları */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '5. Sorumluluk Sınırları' : '5. Liability Limitations'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Hizmet Kesintileri' : 'Service Interruptions'}
                      </h3>
                      <p className="ml-4">
                        {isTurkish 
                          ? 'Teknik sorunlar, bakım çalışmaları veya güvenlik güncellemeleri nedeniyle hizmet kesintileri yaşanabilir. Bu durumlarda sorumluluk kabul etmeyiz.'
                          : 'Service interruptions may occur due to technical issues, maintenance work or security updates. We do not accept responsibility in these cases.'
                        }
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'AI Yanıtları' : 'AI Responses'}
                      </h3>
                      <p className="ml-4">
                        {isTurkish 
                          ? 'AI asistanlarımızın verdiği yanıtlar bilgilendirme amaçlıdır. Önemli kararlar için profesyonel danışmanlık almanızı öneririz.'
                          : 'Responses from our AI assistants are for informational purposes. We recommend seeking professional advice for important decisions.'
                        }
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {isTurkish ? 'Maksimum Sorumluluk' : 'Maximum Liability'}
                      </h3>
                      <p className="ml-4">
                        {isTurkish 
                          ? 'Sorumluluğumuz, kullanıcının son 12 ayda ödediği toplam ücretle sınırlıdır.'
                          : 'Our liability is limited to the total amount paid by the user in the last 12 months.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. Hizmet Değişiklikleri */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {isTurkish ? '6. Hizmet Değişiklikleri' : '6. Service Changes'}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{isTurkish ? 'Hizmetlerimizi önceden bildirim yaparak değiştirebiliriz' : 'We may change our services with prior notice'}</li>
                      <li>{isTurkish ? 'Önemli değişiklikler 30 gün önceden bildirilir' : 'Important changes are notified 30 days in advance'}</li>
                      <li>{isTurkish ? 'Değişiklikleri kabul etmeyen kullanıcılar hizmeti iptal edebilir' : 'Users who do not accept changes can cancel the service'}</li>
                      <li>{isTurkish ? 'Güvenlik güncellemeleri anında uygulanabilir' : 'Security updates can be applied immediately'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 7. Uygulanacak Hukuk */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isTurkish ? '7. Uygulanacak Hukuk ve Yetki' : '7. Applicable Law and Jurisdiction'}
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {isTurkish 
                      ? 'Bu kullanım koşulları Türk hukukuna tabidir. Herhangi bir uyuşmazlık durumunda İstanbul mahkemeleri yetkilidir.'
                      : 'These terms of service are subject to Turkish law. In case of any dispute, Istanbul courts are authorized.'
                    }
                  </p>
                  <p>
                    {isTurkish 
                      ? 'Uyuşmazlıklar öncelikle dostane yollarla çözülmeye çalışılır.'
                      : 'Disputes are first attempted to be resolved through friendly means.'
                    }
                  </p>
                </div>
              </div>
            </Card>

            {/* 8. İletişim */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {isTurkish ? '8. İletişim' : '8. Contact'}
                </h2>
                <p className="text-gray-300 mb-6">
                  {isTurkish 
                    ? 'Kullanım koşulları hakkında sorularınız varsa, bizimle iletişime geçin:'
                    : 'If you have questions about the terms of service, please contact us:'
                  }
                </p>
                <div className="space-y-2">
                  <p className="text-white">
                    <strong>E-posta:</strong> legal@mysonai.com
                  </p>
                  <p className="text-white">
                    <strong>{isTurkish ? 'Adres:' : 'Address:'}</strong> {isTurkish ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}
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

export default function TermsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  return (
    <FeatureGuard feature="terms" fallback={<div>Kullanım koşulları sayfası devre dışı</div>}>
      <TermsContent params={params} />
    </FeatureGuard>
  )
}
