"use client"

import { motion } from 'framer-motion'
import { Bot, Code, Palette, MessageSquare, Zap, Shield } from 'lucide-react'

const features = [
     {
     icon: Bot,
     title: "AI Asistanlar",
     description: "Fevzi, Elif, Burak, Ayşe ve Deniz ile 7/24 çalışan AI ekibiniz. Her biri kendi uzmanlık alanında size yardımcı olur.",
     color: "from-purple-500 to-pink-500"
   },
  {
    icon: Code,
    title: "Kod Üretimi",
    description: "Doğal dil ile kod yazın. Frontend, backend, mobil uygulama - AI sizin için kodlar.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Görsel Üretim",
    description: "DALL-E ile görseller, animasyonlar ve sanat eserleri oluşturun. Hayalinizi gerçeğe dönüştürün.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: MessageSquare,
    title: "Akıllı Chatbot",
    description: "Özelleştirilebilir chatbot'lar oluşturun. Müşteri hizmetleri, eğitim ve daha fazlası.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Hızlı Prototipleme",
    description: "Fikirlerinizi dakikalar içinde çalışan prototiplere dönüştürün. Hızlı iterasyon ve geliştirme.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Güvenli & Özel",
    description: "Verileriniz güvende. End-to-end şifreleme ve gizlilik koruması ile güvenle çalışın.",
    color: "from-indigo-500 to-purple-500"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            MySonAI ile Neler Yapabilirsiniz?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Yapay zeka teknolojilerinin gücünü keşfedin ve projelerinizi bir üst seviyeye taşıyın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                   style={{ background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}>
              </div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">5</div>
            <div className="text-gray-600 dark:text-gray-300">AI Asistan</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
            <div className="text-gray-600 dark:text-gray-300">Hazır Şablon</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Destek</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">∞</div>
            <div className="text-gray-600 dark:text-gray-300">Olasılık</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
