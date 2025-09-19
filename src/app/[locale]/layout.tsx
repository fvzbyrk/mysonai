import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';
import { Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import { HreflangTags } from '@/components/hreflang';
import { JsonLd } from '@/components/json-ld';
import { CookieConsent } from '@/components/cookie-consent';
import { AIAssistantChat } from '@/components/ai-assistant-chat';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'MySonAI - Hızlı, Güvenli ve Empatik AI Yoldaşı | Türkçe AI Asistanlar'
      : 'MySonAI - Fast, Secure and Empathetic AI Companion | Turkish AI Assistants',
    description: isTurkish
      ? "Türkçe AI asistanlarınızla gerçek zamanlı sohbet edin. 18 uzman AI asistanı - Pi'den 10x daha hızlı, %100 güvenli, empatik yoldaş. Hemen deneyin!"
      : 'Chat in real-time with your Turkish AI assistants. 18 expert AI assistants - 10x faster than Pi, 100% secure, empathetic companion. Try now!',
    keywords: isTurkish
      ? 'yapay zeka asistanı, AI yoldaşı, Türkçe AI, hızlı AI, güvenli AI, empatik AI, AI sohbet, yapay zeka, chatbot, kişisel asistan'
      : 'AI assistant, AI companion, Turkish AI, fast AI, secure AI, empathetic AI, AI chat, artificial intelligence, chatbot, personal assistant',
    authors: [{ name: 'MySonAI Team' }],
    creator: 'MySonAI',
    publisher: 'MySonAI',
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
      shortcut: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
      apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://mysonai.com'),
    alternates: {
      canonical: '/',
      languages: {
        tr: '/tr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isTurkish ? 'tr_TR' : 'en_US',
      url: 'https://mysonai.com',
      title: isTurkish
        ? 'MySonAI - Hızlı, Güvenli ve Empatik AI Yoldaşı'
        : 'MySonAI - Fast, Secure and Empathetic AI Companion',
      description: isTurkish
        ? "Türkçe AI asistanlarınızla gerçek zamanlı sohbet edin. 18 uzman AI asistanı - Pi'den 10x daha hızlı, %100 güvenli."
        : 'Chat in real-time with your Turkish AI assistants. 18 expert AI assistants - 10x faster than Pi, 100% secure.',
      siteName: 'MySonAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: isTurkish
        ? 'MySonAI - Hızlı, Güvenli ve Empatik AI Yoldaşı'
        : 'MySonAI - Fast, Secure and Empathetic AI Companion',
      description: isTurkish
        ? "Türkçe AI asistanlarınızla gerçek zamanlı sohbet edin. Pi'den 10x daha hızlı!"
        : 'Chat in real-time with your Turkish AI assistants. 10x faster than Pi!',
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
  return locales.map(locale => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Validate locale
  if (!locales.includes(params.locale)) {
    notFound();
  }

  return (
    <>
      {/* Set HTML lang attribute */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${params.locale}';`,
        }}
      />

      {/* SEO Tags */}
      <HreflangTags />
      <JsonLd />

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            strategy='afterInteractive'
          />
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <AuthProvider>
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
            {/* Global AI Assistant */}
            <AIAssistantChat locale={params.locale} />
          </div>
          <Toaster position='top-right' richColors />
          <CookieConsent />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
