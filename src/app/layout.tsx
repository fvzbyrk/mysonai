import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MySonAI - Yapay Zeka ile Geleceği Keşfedin',
  description:
    'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
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
    description:
      'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
    siteName: 'MySonAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MySonAI - Yapay Zeka ile Geleceği Keşfedin',
    description:
      'MySonAI ile yapay zeka teknolojilerini keşfedin. AI araçları, chatbot, görsel üretim ve daha fazlası.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
