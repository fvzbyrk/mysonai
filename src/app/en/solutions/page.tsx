'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  Briefcase,
  Scale,
  Baby,
  GraduationCap,
  Music,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Shield,
  Globe,
  Rocket,
  Target,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'myson-video',
      name: 'MySon Video',
      tagline: 'AI-Powered Video Production',
      description:
        'Revolutionary video creation platform that combines AI technology with professional video production tools.',
      icon: <Video className='w-8 h-8' />,
      color: 'from-red-600 to-pink-600',
      features: [
        'AI Script Generation',
        'Automated Video Editing',
        'Voice Synthesis',
        'Multi-language Support',
        'Template Library',
        'Cloud Rendering',
      ],
      status: 'Available',
      statusColor: 'bg-green-500',
      link: '/demo',
    },
    {
      id: 'myson-firmatch',
      name: 'MySon Firmatch',
      tagline: 'Business Matching Platform',
      description:
        'Intelligent platform connecting businesses with the right partners, suppliers, and opportunities.',
      icon: <Briefcase className='w-8 h-8' />,
      color: 'from-blue-600 to-indigo-600',
      features: [
        'AI-Powered Matching',
        'Business Profiles',
        'Opportunity Discovery',
        'Networking Tools',
        'Analytics Dashboard',
        'Secure Communication',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/contact',
    },
    {
      id: 'myson-avukat',
      name: 'MySon Avukat',
      tagline: 'Legal AI Assistant',
      description:
        'Comprehensive legal technology platform providing AI-powered legal research and document analysis.',
      icon: <Scale className='w-8 h-8' />,
      color: 'from-purple-600 to-violet-600',
      features: [
        'Legal Research AI',
        'Document Analysis',
        'Case Law Database',
        'Contract Review',
        'Legal Writing Assistant',
        'Compliance Monitoring',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/contact',
    },
    {
      id: 'myson-kids',
      name: 'MySon Kids',
      tagline: 'Educational AI for Children',
      description:
        'Safe and engaging AI-powered educational platform designed specifically for children and parents.',
      icon: <Baby className='w-8 h-8' />,
      color: 'from-green-600 to-emerald-600',
      features: [
        'Age-Appropriate Content',
        'Interactive Learning',
        'Parental Controls',
        'Progress Tracking',
        'Safe AI Chat',
        'Educational Games',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/contact',
    },
    {
      id: 'myson-education',
      name: 'MySon Education',
      tagline: 'AI Learning Management System',
      description:
        'Advanced educational platform with AI-powered personalized learning and assessment tools.',
      icon: <GraduationCap className='w-8 h-8' />,
      color: 'from-orange-600 to-red-600',
      features: [
        'Personalized Learning Paths',
        'AI Tutoring',
        'Automated Assessment',
        'Content Creation Tools',
        'Student Analytics',
        'Teacher Dashboard',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/contact',
    },
    {
      id: 'myson-music',
      name: 'MySon Music',
      tagline: 'AI Music Production Suite',
      description:
        'Professional music creation platform powered by artificial intelligence for musicians and producers.',
      icon: <Music className='w-8 h-8' />,
      color: 'from-pink-600 to-purple-600',
      features: [
        'AI Composition',
        'Beat Generation',
        'Voice Synthesis',
        'Music Mixing AI',
        'Collaboration Tools',
        'Royalty-Free Library',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/contact',
    },
  ];

  const upcomingSolutions = [
    {
      name: 'MySon Health',
      tagline: 'AI Healthcare Assistant',
      description: 'AI-powered healthcare platform for medical professionals and patients.',
      icon: <Heart className='w-6 h-6' />,
      color: 'from-red-600 to-pink-600',
      status: 'Coming Soon',
      statusColor: 'bg-gray-500',
    },
    {
      name: 'MySon Finance',
      tagline: 'AI Financial Advisor',
      description: 'Intelligent financial planning and investment advisory platform.',
      icon: <Target className='w-6 h-6' />,
      color: 'from-green-600 to-teal-600',
      status: 'Coming Soon',
      statusColor: 'bg-gray-500',
    },
    {
      name: 'MySon Travel',
      tagline: 'AI Travel Planner',
      description: 'Smart travel planning and booking platform with AI recommendations.',
      icon: <Globe className='w-6 h-6' />,
      color: 'from-blue-600 to-indigo-600',
      status: 'Coming Soon',
      statusColor: 'bg-gray-500',
    },
  ];

  const benefits = [
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'AI-Powered',
      description: 'Advanced artificial intelligence at the core of every solution',
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'User-Focused',
      description: 'Designed with user experience and accessibility in mind',
    },
    {
      icon: <Rocket className='w-6 h-6' />,
      title: 'Scalable',
      description: 'Solutions that grow with your business needs',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🚀 MySon Solutions
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Our Solutions
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            AI-Powered Products for Every Industry
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Discover our comprehensive suite of AI-powered solutions designed to transform
            industries and enhance productivity. From video production to legal assistance, we
            create intelligent tools that make complex tasks simple.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/demo'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
              >
                <Rocket className='w-5 h-5 mr-2' />
                Try Demo
              </Button>
            </Link>
            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
              >
                <ArrowRight className='w-5 h-5 mr-2' />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Solutions */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Featured Solutions
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Our flagship AI-powered products transforming industries
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {solutions.map(solution => (
              <Card
                key={solution.id}
                className='p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200'
              >
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Solution Info */}
                  <div className='flex-1'>
                    <div className='flex items-center mb-4'>
                      <div
                        className={`bg-gradient-to-r ${solution.color} text-white p-3 rounded-xl mr-4`}
                      >
                        {solution.icon}
                      </div>
                      <div>
                        <h3 className='text-2xl font-bold text-gray-900 mb-1'>{solution.name}</h3>
                        <p className='text-gray-600 mb-2'>{solution.tagline}</p>
                        <Badge className={`${solution.statusColor} text-white px-3 py-1 text-xs`}>
                          {solution.status}
                        </Badge>
                      </div>
                    </div>

                    <p className='text-gray-600 mb-4 text-sm leading-relaxed'>
                      {solution.description}
                    </p>

                    <div className='grid grid-cols-2 gap-2 mb-6'>
                      {solution.features.map((feature, index) => (
                        <div key={index} className='flex items-center text-gray-600'>
                          <CheckCircle className='w-3 h-3 text-green-500 mr-2 flex-shrink-0' />
                          <span className='text-xs'>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={solution.link}>
                      <Button
                        size='sm'
                        className={`bg-gradient-to-r ${solution.color} hover:opacity-90 
                        text-white px-6 py-2 text-sm`}
                      >
                        Learn More
                        <ArrowRight className='w-4 h-4 ml-2' />
                      </Button>
                    </Link>
                  </div>

                  {/* Solution Preview */}
                  <div className='lg:w-48'>
                    <div
                      className={`bg-gradient-to-br ${solution.color} rounded-xl p-4 
                      text-white h-full flex flex-col justify-center`}
                    >
                      <div className='text-center'>
                        <div className='text-4xl mb-2'>🚀</div>
                        <h4 className='text-lg font-bold mb-1'>{solution.name}</h4>
                        <p className='text-xs opacity-90'>{solution.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Solutions */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Coming Soon</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Exciting new solutions in development
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {upcomingSolutions.map((solution, index) => (
              <Card
                key={index}
                className='p-6 hover:shadow-lg transition-shadow duration-300 opacity-75'
              >
                <div className='text-center'>
                  <div
                    className={`bg-gradient-to-r ${solution.color} text-white p-4 rounded-xl w-fit mx-auto mb-4`}
                  >
                    {solution.icon}
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{solution.name}</h3>
                  <p className='text-gray-600 mb-3'>{solution.tagline}</p>
                  <p className='text-sm text-gray-500 mb-4'>{solution.description}</p>
                  <Badge className={`${solution.statusColor} text-white px-3 py-1`}>
                    {solution.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why Choose MySon Solutions
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The advantages of our AI-powered platform ecosystem
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {benefits.map((benefit, index) => (
              <Card key={index} className='p-6 text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                  {benefit.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>{benefit.title}</h3>
                <p className='text-gray-600'>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Experience the Future?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Try our solutions today and see how AI can transform your workflow
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/demo'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
              >
                <Rocket className='w-5 h-5 mr-2' />
                Try Demo
              </Button>
            </Link>
            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
