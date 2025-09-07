"use client"

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Check, Star, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'
import { getStripe } from '@/lib/stripe'
import { trackPlanUpgrade, trackBeginCheckout, trackPricingPageView } from '@/lib/analytics'
import { FeatureGuard } from './feature-guard'

const plans = [
  {
    id: "free",
    name: "Ücretsiz",
    price: "0₺",
    period: "/ay",
    description: "Bireysel kullanıcılar için",
    features: [
      "5 AI asistan erişimi",
      "100 mesaj/ay",
      "Temel chatbot",
      "Email desteği",
      "Topluluk forumu"
    ],
    popular: false,
    cta: "Ücretsiz Başla",
    highlight: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "99₺",
    period: "/ay",
    description: "Profesyonel geliştiriciler için",
    features: [
      "Tüm 18 AI asistan",
      "1000 mesaj/ay",
      "Gelişmiş chatbot",
      "Görsel üretim",
      "Öncelikli destek",
      "API erişimi",
      "Özel entegrasyonlar"
    ],
    popular: true,
    cta: "Pro'ya Geç",
    highlight: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "299₺",
    period: "/ay",
    description: "Büyük ekipler için",
    features: [
      "Sınırsız her şey",
      "Özel AI modelleri",
      "White-label çözümler",
      "7/24 destek",
      "SLA garantisi",
      "Özel eğitim",
      "Dedicated sunucu"
    ],
    popular: false,
    cta: "İletişime Geç",
    highlight: false
  }
]

function PricingContent() {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  // Track pricing page view
  React.useEffect(() => {
    trackPricingPageView(user?.plan || 'free')
  }, [user?.plan])

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      // Handle free plan - redirect to signup
      window.location.href = '/signup'
      return
    }

    if (planId === 'enterprise') {
      // Handle enterprise - redirect to contact
      window.location.href = '/contact'
      return
    }

    if (!user) {
      // Redirect to signup if not logged in
      window.location.href = '/signup'
      return
    }

    setLoading(planId)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planId,
          userId: user.id
        }),
      })

      const { sessionId } = await response.json()

      if (sessionId) {
        const stripe = await getStripe()
        await stripe?.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(null)
    }
  }
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Her ihtiyaca uygun esnek fiyatlandırma. İstediğiniz zaman planınızı değiştirebilirsiniz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 ${
                plan.popular 
                  ? 'border-purple-500 shadow-xl scale-105' 
                  : 'border-gray-200 dark:border-gray-700 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    En Popüler
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">
                    {plan.period}
                  </span>
                </div>
                {plan.highlight && (
                  <div className="mt-2 flex items-center justify-center text-sm text-purple-600 dark:text-purple-400">
                    <Zap className="w-4 h-4 mr-1" />
                    Pi'den 10x daha hızlı
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 text-lg font-semibold ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                {loading === plan.id ? 'Yükleniyor...' : plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Tüm planlar 14 gün ücretsiz deneme içerir. İstediğiniz zaman iptal edebilirsiniz.
          </p>
          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            SSS&apos;yi Görüntüle
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <FeatureGuard feature="pricing" fallback={<div>Fiyatlandırma sayfası devre dışı</div>}>
      <PricingContent />
    </FeatureGuard>
  )
}
