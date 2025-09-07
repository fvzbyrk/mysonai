import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context';

// Mock the translations
jest.mock('@/lib/translations', () => ({
  t: (locale: string, key: string) => {
    const translations: Record<string, Record<string, string>> = {
      tr: {
        'nav.home': 'Ana Sayfa',
        'nav.assistants': 'Asistanlar',
        'nav.demo': 'Demo',
        'nav.pricing': 'Fiyatlandırma',
        'nav.blog': 'Blog',
        'nav.docs': 'Dokümantasyon',
        'nav.signin': 'Giriş Yap',
        'nav.signup': 'Kayıt Ol',
      },
      en: {
        'nav.home': 'Home',
        'nav.assistants': 'Assistants',
        'nav.demo': 'Demo',
        'nav.pricing': 'Pricing',
        'nav.blog': 'Blog',
        'nav.docs': 'Documentation',
        'nav.signin': 'Sign In',
        'nav.signup': 'Sign Up',
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

// Mock the feature flags
jest.mock('@/hooks/useFeatureFlags', () => ({
  useFeatureFlag: jest.fn().mockReturnValue({ enabled: true }),
  useFeatureFlags: jest.fn().mockReturnValue({
    assistants: true,
    demo: true,
    pricing: true,
    blog: true,
    docs: true,
    auth: true,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with navigation links', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Asistanlar')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('Fiyatlandırma')).toBeInTheDocument();
  });

  it('renders sign in and sign up buttons', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
    expect(screen.getByText('Kayıt Ol')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Check for logo/brand
    const logo = screen.getByText('MySonAI');
    expect(logo).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const mobileButton = screen.getByRole('button', { name: /Ana menüyü aç/i });
    expect(mobileButton).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    const header = screen.getByRole('navigation');
    expect(header).toHaveClass('mx-auto', 'flex', 'max-w-7xl');
  });
});
