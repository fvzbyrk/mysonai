'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname } from '@/lib/i18n';

interface JsonLdProps {
  type?: 'WebSite' | 'Organization' | 'WebPage';
  title?: string;
  description?: string;
  url?: string;
}

export function JsonLd({
  type = 'WebSite',
  title = 'MySonAI - AI Asistan Platformu',
  description = 'Türkçe AI asistanlarınızla gerçek zamanlı sohbet edin. 18 uzman AI asistanı ile projelerinizi bir üst seviyeye taşıyın.',
  url,
}: JsonLdProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) || 'tr';
  const currentUrl = url || `https://mysonai.com${pathname}`;

  const isTurkish = locale === 'tr';

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: isTurkish ? 'MySonAI' : 'MySonAI',
    description: isTurkish
      ? 'Türkçe AI asistanlarınızla gerçek zamanlı sohbet edin. 18 uzman AI asistanı ile projelerinizi bir üst seviyeye taşıyın.'
      : 'Chat in real-time with your Turkish AI assistants. 18 expert AI assistants to take your projects to the next level.',
    url: currentUrl,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'MySonAI',
      url: 'https://mysonai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mysonai.com/logo.png',
        width: 200,
        height: 200,
      },
      sameAs: [
        'https://twitter.com/mysonai',
        'https://linkedin.com/company/mysonai',
        'https://github.com/mysonai',
      ],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://mysonai.com/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const schema =
    type === 'WebSite'
      ? {
          ...baseSchema,
          '@type': 'WebSite',
          headline: title,
          description: description,
          mainEntity: {
            '@type': 'SoftwareApplication',
            name: 'MySonAI AI Assistants',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'TRY',
              description: isTurkish ? 'Ücretsiz plan mevcut' : 'Free plan available',
            },
            featureList: isTurkish
              ? [
                  'Türkçe AI asistanlar',
                  'Gerçek zamanlı sohbet',
                  '18 uzman asistan',
                  'Görsel üretim',
                  'Kod yazma desteği',
                ]
              : [
                  'Turkish AI assistants',
                  'Real-time chat',
                  '18 expert assistants',
                  'Visual generation',
                  'Code writing support',
                ],
          },
        }
      : baseSchema;

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
