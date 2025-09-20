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
  ArrowRight,
  Rocket,
  Bot,
  Code,
  Cloud,
  Video,
  Music,
  GraduationCap,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - MySonAI | AI Solutions and Classic IT Services',
  description:
    'Learn about MySonAI. Technology company offering AI solutions and classic IT services. Our mission, vision and values.',
  keywords: 'about MySonAI, AI solutions, IT services, technology company, mission, vision',
};

// Team members data
const teamMembers = [
  {
    name: 'AI Development Team',
    role: 'Artificial Intelligence Specialists',
    image: '/team/ai-team.jpg',
    description:
      'Expert team in machine learning, natural language processing, and AI model development.',
    expertise: ['Machine Learning', 'NLP', 'Computer Vision', 'Deep Learning'],
  },
  {
    name: 'Software Engineering Team',
    role: 'Full-Stack Developers',
    image: '/team/dev-team.jpg',
    description:
      'Experienced developers specializing in modern web technologies and scalable applications.',
    expertise: ['React', 'Node.js', 'Python', 'Cloud Computing'],
  },
  {
    name: 'Product Management Team',
    role: 'Product Strategists',
    image: '/team/pm-team.jpg',
    description: 'Strategic thinkers focused on user experience and product innovation.',
    expertise: ['Product Strategy', 'UX Design', 'Market Analysis', 'Agile Management'],
  },
];

// Company values
const values = [
  {
    icon: <Heart className='w-8 h-8' />,
    title: 'User-Centric Approach',
    description: 'We prioritize user needs and create solutions that truly benefit our customers.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: <Zap className='w-8 h-8' />,
    title: 'Innovation',
    description: 'We constantly push boundaries and explore new technologies to stay ahead.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Shield className='w-8 h-8' />,
    title: 'Security & Privacy',
    description: 'We protect user data and ensure the highest security standards.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Globe className='w-8 h-8' />,
    title: 'Accessibility',
    description: 'We make technology accessible to everyone, regardless of background.',
    color: 'from-green-500 to-teal-500',
  },
];

// Services overview
const services = [
  {
    icon: <Bot className='w-6 h-6' />,
    title: 'AI Solutions',
    description: 'Custom AI models and intelligent automation systems',
  },
  {
    icon: <Code className='w-6 h-6' />,
    title: 'Software Development',
    description: 'Full-stack web and mobile application development',
  },
  {
    icon: <Cloud className='w-6 h-6' />,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and deployment solutions',
  },
  {
    icon: <Video className='w-6 h-6' />,
    title: 'Digital Media',
    description: 'Video production, graphic design, and content creation',
  },
  {
    icon: <Music className='w-6 h-6' />,
    title: 'Audio Solutions',
    description: 'Music production, sound design, and audio processing',
  },
  {
    icon: <GraduationCap className='w-6 h-6' />,
    title: 'Education Technology',
    description: 'E-learning platforms and educational content systems',
  },
];

// Statistics
const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '100+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🚀 About MySonAI
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              About Us
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Pioneering the Future of Technology
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            MySonAI is a technology company that combines artificial intelligence solutions with
            classic IT services. We create innovative products that make technology accessible and
            beneficial for everyone.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Get in Touch
              </Button>
            </Link>
            <Link href='/services'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
              >
                <ArrowRight className='w-5 h-5 mr-2' />
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <Card className='p-8'>
              <div className='flex items-center mb-6'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl mr-4'>
                  <Target className='w-8 h-8' />
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>Our Mission</h2>
              </div>
              <p className='text-lg text-gray-600 leading-relaxed'>
                To democratize artificial intelligence and make advanced technology accessible to
                businesses and individuals of all sizes. We believe that AI should enhance human
                capabilities, not replace them.
              </p>
            </Card>

            <Card className='p-8'>
              <div className='flex items-center mb-6'>
                <div className='bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-xl mr-4'>
                  <Rocket className='w-8 h-8' />
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>Our Vision</h2>
              </div>
              <p className='text-lg text-gray-600 leading-relaxed'>
                To become the leading provider of AI-powered solutions that transform how people
                work, learn, and create. We envision a future where technology seamlessly integrates
                into daily life.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Impact</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Numbers that reflect our commitment to excellence and innovation
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-4xl md:text-5xl font-bold text-blue-600 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Values</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The principles that guide everything we do
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <Card
                key={index}
                className='p-6 text-center hover:shadow-lg transition-shadow duration-300'
              >
                <div
                  className={`bg-gradient-to-r ${value.color} text-white p-4 
                  rounded-xl w-fit mx-auto mb-4`}
                >
                  {value.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>{value.title}</h3>
                <p className='text-gray-600'>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>What We Do</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Comprehensive technology solutions for modern businesses
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {service.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>{service.title}</h3>
                </div>
                <p className='text-gray-600'>{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Team</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Meet the talented individuals behind our success
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className='p-6 text-center hover:shadow-lg transition-shadow duration-300'
              >
                <div className='w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <Users className='w-12 h-12 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>{member.name}</h3>
                <p className='text-blue-600 font-medium mb-3'>{member.role}</p>
                <p className='text-gray-600 mb-4'>{member.description}</p>
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

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Work Together?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Let&apos;s discuss how we can help bring your ideas to life with cutting-edge technology
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Contact Us
              </Button>
            </Link>
            <Link href='/demo'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <Rocket className='w-5 h-5 mr-2' />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
