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
  Rocket,
  Bot,
  Code,
  Cloud,
  Video,
  Music,
  GraduationCap,
  Briefcase
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
      ? 'Hakkımızda - MySonAI | AI Çözümleri ve Klasik Bilişim Hizmetleri'
      : 'About Us - MySonAI | AI Solutions and Classic IT Services',
    description: isTurkish
      ? 'MySonAI hakkında bilgi edinin. AI çözümleri ve klasik bilişim hizmetleri sunan teknoloji firması. Misyon, vizyon ve değerlerimiz.'
      : 'Learn about MySonAI. Technology company offering AI solutions and classic IT services. Our mission, vision and values.',
    keywords: isTurkish
      ? 'MySonAI hakkında, AI çözümleri, bilişim hizmetleri, teknoloji firması, misyon, vizyon'
      : 'about MySonAI, AI solutions, IT services, technology company, mission, vision',
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
    title: 'Müşteri Odaklılık',
    description: 'Her projede müşteri memnuniyetini ön planda tutuyoruz. İhtiyaçlarını anlayıp en uygun çözümleri sunuyoruz.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'İnovasyon',
    description: 'Sürekli gelişen teknoloji dünyasında yenilikçi çözümler üretiyoruz. Geleceği bugünden şekillendiriyoruz.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Projelerimizde güvenilirlik ve kalite standartlarını en üst seviyede tutuyoruz. Verileriniz güvende.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Uzmanlık',
    description: 'AI ve klasik bilişim alanında derin uzmanlık. Her projede en iyi çözümleri sunuyoruz.',
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
              MySonAI, AI çözümleri ve klasik bilişim hizmetleri sunan teknoloji firmasıdır. 
              Geleceği bugün şekillendiren yenilikçi yaklaşımımızla, işletmelerin dijital 
              dönüşüm yolculuğunda güvenilir partneri oluyoruz.
            </p>
            
            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-12'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>6</div>
                <div className='text-gray-400 text-sm'>Alt Marka</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>50+</div>
                <div className='text-gray-400 text-sm'>Tamamlanan Proje</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>100+</div>
                <div className='text-gray-400 text-sm'>Mutlu Müşteri</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white mb-2'>5</div>
                <div className='text-gray-400 text-sm'>Yıl Deneyim</div>
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
                AI çözümleri ve klasik bilişim hizmetleri ile işletmelerin dijital 
                dönüşüm yolculuğunda güvenilir partner olmak. Her projede mükemmellik 
                ve müşteri memnuniyeti odaklı yaklaşım sergiliyoruz.
              </p>
              <p className='text-lg text-gray-300 mb-8'>
                Teknolojinin gücünü iş süreçlerine entegre ederek, müşterilerimizin 
                rekabet avantajı elde etmelerini sağlıyoruz.
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
                    Türkiye'nin önde gelen teknoloji firması olmak. AI ve klasik bilişim 
                    alanında yenilikçi çözümlerle iş dünyasının dijital dönüşümüne 
                    öncülük etmek.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt Markalar Bölümü */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Alt Markalarımız
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              Her biri kendi alanında uzmanlaşmış 6 alt markamızla hizmet veriyoruz
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* MySon Video */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Video className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Video</h3>
              <p className='text-gray-300 text-sm mb-4'>AI destekli animasyon & medya üretimi</p>
              <div className='text-sm text-red-400 font-semibold'>🎬 Animasyon & Medya</div>
            </Card>

            {/* MySon Firmatch */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Briefcase className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Firmatch</h3>
              <p className='text-gray-300 text-sm mb-4'>Akıllı dış ticaret asistanı</p>
              <div className='text-sm text-blue-400 font-semibold'>🌍 Dış Ticaret</div>
            </Card>

            {/* MySon Avukat */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Avukat</h3>
              <p className='text-gray-300 text-sm mb-4'>AI hukuk çözümleri</p>
              <div className='text-sm text-yellow-400 font-semibold'>⚖️ Hukuk</div>
            </Card>

            {/* MySon Kids */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Kids</h3>
              <p className='text-gray-300 text-sm mb-4'>Çocuk hikâyeleri, animasyon, sesli kitaplar</p>
              <div className='text-sm text-green-400 font-semibold'>👶 Çocuk İçerikleri</div>
            </Card>

            {/* MySon Education */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <GraduationCap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Education</h3>
              <p className='text-gray-300 text-sm mb-4'>AI tabanlı eğitim çözümleri</p>
              <div className='text-sm text-purple-400 font-semibold'>🎓 Eğitim</div>
            </Card>

            {/* MySon Music */}
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <div className='w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Music className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>MySon Music</h3>
              <p className='text-gray-300 text-sm mb-4'>AI tabanlı müzik düzenlemeleri</p>
              <div className='text-sm text-indigo-400 font-semibold'>🎵 Müzik</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 bg-black/20'>
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
              Projenizi Hayata Geçirin
            </h2>
            <p className='text-xl text-gray-300 mb-8'>
              AI çözümleri ve klasik bilişim hizmetlerimizle işinizi bir üst seviyeye taşıyın
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href={`/${params.locale}/contact`}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                <Rocket className='w-6 h-6 inline mr-2' />
                Teklif Al
              </Link>
              <Link
                href={`/${params.locale}/demo`}
                className='bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300'
              >
                <Lightbulb className='w-6 h-6 inline mr-2' />
                Demo İncele
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
