import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from 'sonner'
import { Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';
  
  return {
    title: isTurkish 
      ? 'MySonAI - Yapay Zeka Destekli Hukuki Danışmanlık'
      : 'MySonAI - AI-Powered Legal Consultation',
    description: isTurkish
      ? 'Yapay zeka teknolojisi ile hukuki sorularınıza anında yanıt alın. AI asistanlarınızla gerçek zamanlı sohbet edin.'
      : 'Get instant answers to your legal questions with artificial intelligence technology. Chat in real-time with AI assistants.',
    keywords: isTurkish
      ? 'yapay zeka, AI, hukuki danışmanlık, chatbot, makine öğrenmesi, hukuk, avukat, yapay zeka asistanı'
      : 'artificial intelligence, AI, legal consultation, chatbot, machine learning, law, lawyer, AI assistant',
    authors: [{ name: 'MySonAI Team' }],
    creator: 'MySonAI',
    publisher: 'MySonAI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://mysonai.com'),
    alternates: {
      canonical: '/',
      languages: {
        'tr': '/tr',
        'en': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isTurkish ? 'tr_TR' : 'en_US',
      url: 'https://mysonai.com',
      title: isTurkish 
        ? 'MySonAI - Yapay Zeka Destekli Hukuki Danışmanlık'
        : 'MySonAI - AI-Powered Legal Consultation',
      description: isTurkish
        ? 'Yapay zeka teknolojisi ile hukuki sorularınıza anında yanıt alın. AI asistanlarınızla gerçek zamanlı sohbet edin.'
        : 'Get instant answers to your legal questions with artificial intelligence technology. Chat in real-time with AI assistants.',
      siteName: 'MySonAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: isTurkish 
        ? 'MySonAI - Yapay Zeka Destekli Hukuki Danışmanlık'
        : 'MySonAI - AI-Powered Legal Consultation',
      description: isTurkish
        ? 'Yapay zeka teknolojisi ile hukuki sorularınıza anında yanıt alın.'
        : 'Get instant answers to your legal questions with artificial intelligence technology.',
      creator: '@mysonai',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  // Validate locale
  if (!locales.includes(params.locale)) {
    notFound()
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
