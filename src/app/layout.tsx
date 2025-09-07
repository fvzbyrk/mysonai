import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MySonAI - Yapay Zeka ile Geleceği Keşfedin',
  description: 'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
  keywords: 'yapay zeka, AI, chatbot, görsel üretim, makine öğrenmesi',
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
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://mysonai.com',
    title: 'MySonAI - Yapay Zeka ile Geleceği Keşfedin',
    description: 'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
    siteName: 'MySonAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySonAI - Yapay Zeka ile Geleceği Keşfedin',
    description: 'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
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
