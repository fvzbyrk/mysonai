import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/footer';

// Mock the translations
jest.mock('@/lib/translations', () => ({
  t: (locale: string, key: string) => {
    const translations: Record<string, Record<string, string>> = {
      tr: {
        'nav.assistants': 'Asistanlar',
        'nav.demo': 'Demo',
        'nav.pricing': 'Fiyatlandırma',
        'nav.api': 'API',
        'nav.docs': 'Dokümantasyon',
        'nav.blog': 'Blog',
        'nav.faq': 'SSS',
        'nav.about': 'Hakkımızda',
        'nav.careers': 'Kariyer',
        'nav.contact': 'İletişim',
        'nav.press': 'Basın',
        'nav.privacy': 'Gizlilik',
        'nav.terms': 'Kullanım Koşulları',
        'nav.cookies': 'Çerezler',
        'nav.gdpr': 'GDPR',
      },
      en: {
        'nav.assistants': 'Assistants',
        'nav.demo': 'Demo',
        'nav.pricing': 'Pricing',
        'nav.api': 'API',
        'nav.docs': 'Documentation',
        'nav.blog': 'Blog',
        'nav.faq': 'FAQ',
        'nav.about': 'About',
        'nav.careers': 'Careers',
        'nav.contact': 'Contact',
        'nav.press': 'Press',
        'nav.privacy': 'Privacy',
        'nav.terms': 'Terms',
        'nav.cookies': 'Cookies',
        'nav.gdpr': 'GDPR',
      },
    };
    return translations[locale]?.[key] || key;
  },
}));

// Mock the i18n functions
jest.mock('@/lib/i18n', () => ({
  getLocaleFromPathname: jest.fn().mockReturnValue('tr'),
  locales: ['tr', 'en'],
}));

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders footer with all sections', () => {
    render(<Footer />);

    expect(screen.getByText('Ürün')).toBeInTheDocument();
    expect(screen.getByText('Kaynaklar')).toBeInTheDocument();
    expect(screen.getByText('Şirket')).toBeInTheDocument();
    expect(screen.getByText('Yasal')).toBeInTheDocument();
  });

  it('renders product links', () => {
    render(<Footer />);

    expect(screen.getByText('Asistanlar')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('Fiyatlandırma')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
  });

  it('renders resource links', () => {
    render(<Footer />);

    expect(screen.getByText('Dokümantasyon')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('SSS')).toBeInTheDocument();
  });

  it('renders company links', () => {
    render(<Footer />);

    expect(screen.getByText('Hakkımızda')).toBeInTheDocument();
    expect(screen.getByText('Kariyer')).toBeInTheDocument();
    expect(screen.getByText('İletişim')).toBeInTheDocument();
    expect(screen.getByText('Basın')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);

    expect(screen.getByText('Gizlilik')).toBeInTheDocument();
    expect(screen.getByText('Kullanım Koşulları')).toBeInTheDocument();
    expect(screen.getByText('Çerezler')).toBeInTheDocument();
    expect(screen.getByText('GDPR')).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);

    expect(screen.getByText('© 2024 MySonAI. Tüm hakları saklıdır.')).toBeInTheDocument();
  });

  it('renders location and language info', () => {
    render(<Footer />);

    expect(screen.getByText('Türkiye')).toBeInTheDocument();
    expect(screen.getByText('Türkçe')).toBeInTheDocument();
  });

  it('has correct footer structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-gray-900');
  });

  it('renders social media links', () => {
    render(<Footer />);

    // Check for social media icons (they should be present as Lucide icons)
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
  });
});
