import { Bot, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { t } from '@/lib/translations'

export default function HomePage({
  params,
}: {
  params: { locale: Locale }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              MySonAI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              {t(params.locale, 'hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${params.locale}/demo`} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span>{t(params.locale, 'hero.demo')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={`/${params.locale}/signup`} className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20">
                {t(params.locale, 'hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Showcase - Simplified */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t(params.locale, 'features.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t(params.locale, 'features.ai.desc')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Fevzi', role: 'Takım Lideri', icon: '👨‍💼' },
              { name: 'Elif', role: 'Ürün Müdürü', icon: '👩‍💼' },
              { name: 'Burak', role: 'Mimar', icon: '🏗️' },
              { name: 'Ayşe', role: 'Geliştirici', icon: '👩‍💻' },
              { name: 'Deniz', role: 'Analist', icon: '📊' },
              { name: 'Zeynep', role: 'E-ticaret', icon: '🛒' }
            ].map((agent) => (
              <div
                key={agent.name}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
              >
                <div className="text-3xl mb-2">{agent.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{agent.name}</h3>
                <p className="text-purple-300 text-xs">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t(params.locale, 'chat.title')}
            </h3>
            <p className="text-gray-300 mb-8">
              {t(params.locale, 'chat.desc')}
            </p>
            <Link href={`/${params.locale}/demo`} className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              <Sparkles className="w-6 h-6 mr-2" />
              {t(params.locale, 'chat.button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t(params.locale, 'cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t(params.locale, 'cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${params.locale}/signup`} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              {t(params.locale, 'cta.signup')}
            </Link>
            <Link href={`/${params.locale}/demo`} className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20">
              {t(params.locale, 'cta.demo')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">MySonAI</h3>
            <p className="text-gray-300 mb-6">
              {t(params.locale, 'footer.desc')}
            </p>
            <div className="flex justify-center space-x-6">
              <Link href={`/${params.locale}/demo`} className="text-gray-300 hover:text-white transition-colors">
                {t(params.locale, 'nav.demo')}
              </Link>
              <Link href={`/${params.locale}/pricing`} className="text-gray-300 hover:text-white transition-colors">
                Fiyatlandırma
              </Link>
              <Link href={`/${params.locale}/blog`} className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href={`/${params.locale}/contact`} className="text-gray-300 hover:text-white transition-colors">
                İletişim
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                {t(params.locale, 'footer.copyright')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
