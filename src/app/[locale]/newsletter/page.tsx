import { Locale } from '@/lib/i18n';
import { NewsletterClient } from './newsletter-client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Newsletter - MySonAI | AI Güncellemeleri ve Haberler'
      : 'Newsletter - MySonAI | AI Updates and News',
    description: isTurkish
      ? "MySonAI newsletter'a abone olun. AI güncellemeleri, yeni özellikler ve özel içerikler."
      : 'Subscribe to MySonAI newsletter. AI updates, new features and exclusive content.',
    keywords: isTurkish
      ? 'newsletter, AI güncellemeleri, AI haberler, abone ol, e-posta bülteni'
      : 'newsletter, AI updates, AI news, subscribe, email newsletter',
  };
}

export default function NewsletterPage({ params }: { params: { locale: Locale } }) {
  return <NewsletterClient locale={params.locale} />;
}
