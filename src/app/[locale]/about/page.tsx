import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Shield, 
  Globe, 
  Award, 
  ArrowRight,
  Star,
  CheckCircle,
  Lightbulb,
  Rocket
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const isTurkish = params.locale === 'tr';

  return {
    title: isTurkish
      ? 'Hakkımızda - MySonAI Ekibi ve Misyonumuz | Türkçe AI Asistanları'
      : 'About Us - MySonAI Team and Mission | Turkish AI Assistants',
    description: isTurkish
      ? 'MySonAI ekibi ve misyonumuz hakkında bilgi edinin. Türkçe AI asistanları geliştiren uzman ekibimiz ve vizyonumuz.'
      : 'Learn about MySonAI team and mission. Our expert team developing Turkish AI assistants and our vision.',
    keywords: isTurkish
      ? 'MySonAI hakkında, AI ekibi, Türkçe AI, yapay zeka misyonu, AI vizyonu'
      : 'about MySonAI, AI team, Turkish AI, artificial intelligence mission, AI vision',
  };
}

// Team members data
const teamMembers = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
    description: '10+ yıl yazılım geliştirme deneyimi. AI ve makine öğrenmesi uzmanı.',
    avatar: 'AY',
    expertise: ['AI/ML', 'Leadership', 'Strategy'],
  },
  {
    name: 'Elif Demir',
    role: 'CTO',
    description: 'Full-stack geliştirici ve sistem mimarı. Ölçeklenebilir çözümler uzmanı.',
    avatar: 'ED',
    expertise: ['Architecture', 'Backend', 'DevOps'],
  },
  {
    name: 'Burak Kaya',
    role: 'AI Araştırmacısı',
    description: 'Doğal dil işleme ve konuşma teknolojileri uzmanı. PhD sahibi.',
    avatar: 'BK',
    expertise: ['NLP', 'Speech', 'Research'],
  },
  {
    name: 'Ayşe Özkan',
    role: 'UX/UI Tasarımcı',
    description: 'Kullanıcı deneyimi ve arayüz tasarımı uzmanı. İnsan-AI etkileşimi odaklı.',
    avatar: 'AÖ',
    expertise: ['UX/UI', 'Design', 'Human-AI'],
  },
];

// Company values
const values = [
  {
    icon: Heart,
    title: 'Empati',
    description: 'AI asistanlarımızın insan gibi empati kurmasını sağlıyoruz. Her kullanıcının duygusal ihtiyaçlarını anlıyoruz.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Hız',
    description: 'Pi\'den 10x daha hızlı yanıtlar sunuyoruz. Zamanınız değerli, AI asistanınız da öyle olmalı.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Güvenlik',
    description: 'Verileriniz bizim için kutsal. En yüksek güvenlik standartları ile korunuyor.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Türkçe',
    description: 'Türkçe konuşan AI asistanları. Dil ve kültür uyumunu önemsiyoruz.',
    color: 'from-green-500 to-emerald-500',
  },
];

// Company milestones
const milestones = [
  {
    year: '2023',
    title: 'Kuruluş',
    description: 'MySonAI projesi başlatıldı. İlk AI asistanları geliştirilmeye başlandı.',
  },
  {
    year: '2024 Q1',
    title: 'İlk Sürüm',
    description: 'Beta sürümü yayınlandı. 1000+ kullanıcı ile test edildi.',
  },
  {
    year: '2024 Q2',
    title: 'Genel Yayın',
    description: 'Resmi lansman yapıldı. 18 AI asistanı ile hizmete başlandı.',
  },
  {
    year: '2024 Q3',
    title: 'Büyüme',
    description: '10,000+ aktif kullanıcıya ulaşıldı. Pro planı eklendi.',
  },
  {
    year: '2024 Q4',
    title: 'Kurumsal',
    description: 'Kurumsal çözümler sunulmaya başlandı. API entegrasyonları eklendi.',
  },
];

function AboutContent({ params }: { params: { locale: Locale } }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              Hakkımızda
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
              MySonAI, Türkçe konuşan AI asistanları ile insan-AI etkileşimini 
              yeniden tanımlıyor. Empati, hız ve güvenlik odaklı yaklaşımımızla 
              geleceğin AI deneyimini bugünden yaşıyoruz.
            </p>
            
            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>18</div>
                <div className='text-gray-400 text-sm'>AI Asistanı</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>10K+</div>
                <div className='text-gray-400 text-sm'>Aktif Kullanıcı</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>1M+</div>
                <div className='text-gray-400 text-sm'>Mesaj</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>4.8</div>
                <div className='text-gray-400 text-sm'>Kullanıcı Puanı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-bold text-white mb-6'>
                Misyonumuz
              </h2>
              <p className='text-lg text-gray-300 mb-6'>
                AI teknolojisini insan odaklı hale getiriyoruz. Türkçe konuşan, 
                empati kurabilen ve güvenilir AI asistanları ile kullanıcılarımızın 
                günlük hayatlarını kolaylaştırıyoruz.
              </p>
              <p className='text-lg text-gray-300 mb-8'>
                Pi gibi yabancı AI asistanlarının yaşadığı sorunları çözerek, 
                Türk kullanıcılar için özel olarak tasarlanmış bir deneyim sunuyoruz.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href={`/${params.locale}/demo`}
                  className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                >
                  Demo Dene
                </Link>
                <Link
                  href={`/${params.locale}/contact`}
                  className='bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300'
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
            <div className='relative'>
              <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
                <div className='text-center'>
                  <div className='w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <Target className='w-12 h-12 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold text-white mb-4'>
                    Vizyonumuz
                  </h3>
                  <p className='text-gray-300'>
                    Türkiye'nin en güvenilir ve kullanıcı dostu AI platformu olmak. 
                    Her Türk vatandaşının günlük hayatında AI asistanına sahip olmasını sağlamak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Değerlerimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'ı benzersiz kılan değerler ve ilkelerimiz
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{value.title}</h3>
                <p className='text-gray-300 text-sm'>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 bg-black/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Ekibimiz
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              MySonAI'ı hayata geçiren uzman ekibimizle tanışın
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <Card key={index} className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
                <div className='w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl font-bold text-white'>{member.avatar}</span>
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>{member.name}</h3>
                <p className='text-purple-300 text-sm mb-3'>{member.role}</p>
                <p className='text-gray-300 text-sm mb-4'>{member.description}</p>
                <div className='flex flex-wrap justify-center gap-2'>
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant='secondary' className='text-xs'>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Yolculuğumuz
            </h2>
            <p className='text-xl text-gray-300'>
              MySonAI'ın gelişim süreci ve kilometre taşları
            </p>
          </div>

          <div className='space-y-8'>
            {milestones.map((milestone, index) => (
              <div key={index} className='flex items-start space-x-6'>
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                    <span className='text-white font-bold text-sm'>{milestone.year}</span>
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-white mb-2'>{milestone.title}</h3>
                  <p className='text-gray-300'>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              MySonAI Ailesine Katılın
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              Türkçe AI asistanları ile tanışın ve geleceğin teknolojisini bugünden deneyimleyin
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/signup`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Rocket className='w-6 h-6 inline mr-2' />
                Hemen Başla
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Lightbulb className='w-6 h-6 inline mr-2' />
                Demo Dene
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  return <AboutContent params={params} />;
}
