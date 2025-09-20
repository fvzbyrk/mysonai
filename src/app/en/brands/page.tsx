'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  Star,
  Shield,
  Globe,
  BarChart3,
  Heart,
  CheckCircle,
  Award,
  MessageCircle,
  ArrowRight,
  Bot,
  Home,
} from 'lucide-react';
import Link from 'next/link';

export default function BrandsPage() {
  const subBrands = [
    {
      id: 'conest',
      name: 'CoNest',
      tagline: 'Parent Daily Planner',
      description:
        'Comprehensive platform designed for single-parent or dual-parent families. Track the development of one or more children, organize your daily plans.',
      icon: <Home className='w-8 h-8' />,
      color: 'from-blue-600 to-purple-600',
      features: [
        'Multiple Children Support',
        'Single Parent Support',
        'Gamification System',
        'Social Community',
        'Smart Notifications',
        'Location Tracking',
      ],
      status: 'In Development',
      statusColor: 'bg-yellow-500',
      link: '/conest',
    },
  ];

  const upcomingBrands = [
    {
      name: 'EduMind',
      tagline: 'AI-Powered Education Platform',
      description:
        'AI-powered education platform offering personalized learning experiences for students.',
      icon: <Award className='w-6 h-6' />,
      color: 'from-green-600 to-teal-600',
      status: 'In Planning',
      statusColor: 'bg-gray-500',
    },
    {
      name: 'HealthAI',
      tagline: 'Health & Wellness Assistant',
      description:
        'AI-powered health platform offering personal health tracking and wellness recommendations.',
      icon: <Heart className='w-6 h-6' />,
      color: 'from-red-600 to-pink-600',
      status: 'In Planning',
      statusColor: 'bg-gray-500',
    },
    {
      name: 'BizAI',
      tagline: 'Business AI Solutions',
      description: 'Customized AI solutions and automation tools for corporate businesses.',
      icon: <BarChart3 className='w-6 h-6' />,
      color: 'from-purple-600 to-indigo-600',
      status: 'In Planning',
      statusColor: 'bg-gray-500',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🏢 MySonAI Ecosystem
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Our Sub-Brands
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Specialized solutions for different needs
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Under the MySonAI ecosystem, we develop AI-powered solutions customized for different
            sectors and user groups. Each sub-brand offers specialized features and experiences in
            its own field.
          </p>
        </div>
      </section>

      {/* Active Sub-Brands */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Active Sub-Brands</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Projects currently in development and coming soon
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
            {subBrands.map(brand => (
              <Card
                key={brand.id}
                className='p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200'
              >
                <div className='flex flex-col lg:flex-row gap-8'>
                  {/* Brand Info */}
                  <div className='flex-1'>
                    <div className='flex items-center mb-6'>
                      <div
                        className={`bg-gradient-to-r ${brand.color} text-white p-4 rounded-xl mr-4`}
                      >
                        {brand.icon}
                      </div>
                      <div>
                        <h3 className='text-3xl font-bold text-gray-900 mb-2'>{brand.name}</h3>
                        <p className='text-xl text-gray-600 mb-3'>{brand.tagline}</p>
                        <Badge className={`${brand.statusColor} text-white px-3 py-1`}>
                          {brand.status}
                        </Badge>
                      </div>
                    </div>

                    <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
                      {brand.description}
                    </p>

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-8'>
                      {brand.features.map((feature, index) => (
                        <div key={index} className='flex items-center text-gray-600'>
                          <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                          <span className='text-sm'>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={brand.link}>
                      <Button
                        size='lg'
                        className={`bg-gradient-to-r ${brand.color} hover:opacity-90 text-white px-8 py-4 text-lg`}
                      >
                        View Details
                        <ArrowRight className='w-5 h-5 ml-2' />
                      </Button>
                    </Link>
                  </div>

                  {/* Brand Preview */}
                  <div className='lg:w-96'>
                    <div
                      className={`bg-gradient-to-br ${brand.color} rounded-xl p-6 text-white h-full flex flex-col justify-center`}
                    >
                      <div className='text-center'>
                        <div className='text-6xl mb-4'>🏠</div>
                        <h4 className='text-2xl font-bold mb-2'>{brand.name}</h4>
                        <p className='text-blue-100 mb-4'>{brand.tagline}</p>
                        <div className='space-y-2 text-sm'>
                          <div className='flex items-center'>
                            <Users className='w-4 h-4 mr-2' />
                            <span>Multi-User</span>
                          </div>
                          <div className='flex items-center'>
                            <Calendar className='w-4 h-4 mr-2' />
                            <span>Smart Calendar</span>
                          </div>
                          <div className='flex items-center'>
                            <Star className='w-4 h-4 mr-2' />
                            <span>Gamification</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Brands */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Upcoming Projects</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Sub-brands in planning phase and coming soon
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {upcomingBrands.map((brand, index) => (
              <Card
                key={index}
                className='p-6 hover:shadow-lg transition-shadow duration-300 opacity-75'
              >
                <div className='text-center'>
                  <div
                    className={`bg-gradient-to-r ${brand.color} text-white p-4 rounded-xl w-fit mx-auto mb-4`}
                  >
                    {brand.icon}
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{brand.name}</h3>
                  <p className='text-gray-600 mb-3'>{brand.tagline}</p>
                  <p className='text-sm text-gray-500 mb-4'>{brand.description}</p>
                  <Badge className={`${brand.statusColor} text-white px-3 py-1`}>
                    {brand.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>MySonAI Ecosystem</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              All our sub-brands are built on MySonAI&apos;s powerful AI infrastructure
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='p-6 text-center'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                <Bot className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>AI Infrastructure</h3>
              <p className='text-gray-600'>All sub-brands powered by strong AI technology</p>
            </Card>

            <Card className='p-6 text-center'>
              <div className='bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                <Shield className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Security</h3>
              <p className='text-gray-600'>Same security standards across all platforms</p>
            </Card>

            <Card className='p-6 text-center'>
              <div className='bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                <Globe className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Integration</h3>
              <p className='text-gray-600'>Seamless data sharing between sub-brands</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Join the MySonAI Ecosystem
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Explore one of our sub-brands or learn about our new projects
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/conest'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
              >
                <Home className='w-5 h-5 mr-2' />
                Explore CoNest
              </Button>
            </Link>
            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <MessageCircle className='w-5 h-5 mr-2' />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
