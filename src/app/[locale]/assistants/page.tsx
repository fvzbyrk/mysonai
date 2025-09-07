import { Locale } from '@/lib/i18n'
import { t } from '@/lib/translations'
import { getAllAgents } from '@/lib/ai-agents'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { MessageCircle, Star, Users } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';
  
  return {
    title: isTurkish 
      ? 'AI Asistanlarımız - 18 Uzman Türkçe AI Yoldaşı | MySonAI'
      : 'Our AI Assistants - 18 Expert Turkish AI Companions | MySonAI',
    description: isTurkish
      ? '18 uzman AI asistanımızla tanışın: Fevzi, Elif, Burak, Ayşe, Pınar, Erdem ve daha fazlası. Her biri kendi alanında uzman, hızlı ve güvenli.'
      : 'Meet our 18 expert AI assistants: Fevzi, Elif, Burak, Ayşe, Pınar, Erdem and more. Each expert in their field, fast and secure.',
    keywords: isTurkish
      ? 'AI asistanları, yapay zeka asistanı, Türkçe AI, uzman asistanlar, AI yoldaşı, chatbot, kişisel asistan'
      : 'AI assistants, artificial intelligence assistant, Turkish AI, expert assistants, AI companion, chatbot, personal assistant',
  };
}

export default function AssistantsPage({
  const agents = getAllAgents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t(params.locale, 'assistants.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            {t(params.locale, 'assistants.subtitle')}
          </p>
          <div className="flex justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{agents.length} AI Asistanı</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Uzman Alanlar</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>7/24 Destek</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t(params.locale, 'assistants.search')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {agents.map((agent) => (
            <Card key={agent.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="p-6">
                {/* Agent Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{agent.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                    <p className="text-gray-400 text-sm">{agent.role}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {agent.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                      {skill}
                    </Badge>
                  ))}
                  {agent.expertise.length > 3 && (
                    <Badge variant="outline" className="text-gray-400 border-gray-500">
                      +{agent.expertise.length - 3} daha
                    </Badge>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                >
                  <Link href={`/${params.locale}/demo?agent=${agent.id}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t(params.locale, 'assistants.chat')}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t(params.locale, 'assistants.cta.title')}
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {t(params.locale, 'assistants.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <Link href={`/${params.locale}/demo`}>
                <MessageCircle className="h-5 w-5 mr-2" />
                {t(params.locale, 'assistants.cta.demo')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link href={`/${params.locale}/signup`}>
                {t(params.locale, 'assistants.cta.signup')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
