'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Code,
  Cloud,
  Video,
  Music,
  GraduationCap,
  Briefcase,
  Shield,
  Zap,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  Rocket,
  Target,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const aiServices = [
    {
      icon: <Bot className='w-8 h-8' />,
      title: 'AI Chatbots',
      description: 'Intelligent conversational agents for customer service and support',
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        '24/7 Availability',
        'Custom Training',
      ],
      color: 'from-blue-600 to-purple-600',
    },
    {
      icon: <Lightbulb className='w-8 h-8' />,
      title: 'AI Content Generation',
      description: 'Automated content creation for blogs, social media, and marketing materials',
      features: [
        'SEO Optimization',
        'Brand Voice Consistency',
        'Multi-format Output',
        'Quality Control',
      ],
      color: 'from-green-600 to-teal-600',
    },
    {
      icon: <Target className='w-8 h-8' />,
      title: 'Predictive Analytics',
      description: 'Data-driven insights and forecasting for business decision making',
      features: ['Trend Analysis', 'Risk Assessment', 'Performance Metrics', 'Custom Dashboards'],
      color: 'from-orange-600 to-red-600',
    },
    {
      icon: <Zap className='w-8 h-8' />,
      title: 'Process Automation',
      description: 'Streamline workflows and reduce manual tasks with intelligent automation',
      features: ['Workflow Optimization', 'Error Reduction', 'Time Savings', 'Scalable Solutions'],
      color: 'from-purple-600 to-pink-600',
    },
  ];

  const classicServices = [
    {
      icon: <Code className='w-8 h-8' />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications',
      features: ['React/Next.js', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <Cloud className='w-8 h-8' />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment services',
      features: ['AWS/Azure', 'Auto Scaling', 'Security', 'Monitoring'],
      color: 'from-green-600 to-emerald-600',
    },
    {
      icon: <Video className='w-8 h-8' />,
      title: 'Digital Media',
      description: 'Professional video production and multimedia content',
      features: ['Video Editing', 'Motion Graphics', 'Live Streaming', 'Content Strategy'],
      color: 'from-red-600 to-pink-600',
    },
    {
      icon: <Music className='w-8 h-8' />,
      title: 'Audio Solutions',
      description: 'Music production, sound design, and audio processing',
      features: ['Music Production', 'Sound Design', 'Audio Editing', 'Podcast Creation'],
      color: 'from-purple-600 to-violet-600',
    },
    {
      icon: <GraduationCap className='w-8 h-8' />,
      title: 'Education Technology',
      description: 'E-learning platforms and educational content systems',
      features: [
        'Learning Management',
        'Interactive Content',
        'Progress Tracking',
        'Assessment Tools',
      ],
      color: 'from-yellow-600 to-orange-600',
    },
    {
      icon: <Briefcase className='w-8 h-8' />,
      title: 'Business Consulting',
      description: 'Strategic technology consulting and digital transformation',
      features: [
        'Technology Strategy',
        'Digital Transformation',
        'Process Improvement',
        'Training',
      ],
      color: 'from-gray-600 to-slate-600',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We analyze your needs and current systems to understand your requirements.',
      icon: <Target className='w-6 h-6' />,
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description: 'We develop a comprehensive strategy and detailed project plan.',
      icon: <Lightbulb className='w-6 h-6' />,
    },
    {
      step: '03',
      title: 'Development & Implementation',
      description: 'Our team builds and implements the solution according to specifications.',
      icon: <Code className='w-6 h-6' />,
    },
    {
      step: '04',
      title: 'Testing & Quality Assurance',
      description: 'Thorough testing ensures everything works perfectly before launch.',
      icon: <CheckCircle className='w-6 h-6' />,
    },
    {
      step: '05',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing support and maintenance.',
      icon: <Rocket className='w-6 h-6' />,
    },
  ];

  const benefits = [
    {
      icon: <Star className='w-6 h-6' />,
      title: 'Proven Expertise',
      description: 'Years of experience in AI and traditional IT solutions',
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Security First',
      description: 'Enterprise-grade security and data protection',
    },
    {
      icon: <Globe className='w-6 h-6' />,
      title: 'Global Reach',
      description: 'Serving clients worldwide with localized solutions',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Dedicated Support',
      description: '24/7 support and dedicated account management',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🚀 Our Services
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Technology Services
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            AI Solutions & Classic IT Services
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            We offer comprehensive technology solutions combining cutting-edge artificial
            intelligence with proven IT services. From AI-powered automation to traditional software
            development, we have the expertise to bring your vision to life.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Get Started
              </Button>
            </Link>
            <Link href='/demo'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
              >
                <ArrowRight className='w-5 h-5 mr-2' />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>AI Solutions</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cutting-edge artificial intelligence services to transform your business
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {aiServices.map((service, index) => (
              <Card key={index} className='p-8 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-6'>
                  <div
                    className={`bg-gradient-to-r ${service.color} text-white p-4 rounded-xl mr-4`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>{service.title}</h3>
                    <p className='text-gray-600'>{service.description}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-center text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Classic IT Services */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Classic IT Services
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Proven technology solutions for modern businesses
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {classicServices.map((service, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div
                    className={`bg-gradient-to-r ${service.color} text-white p-3 rounded-lg mr-4`}
                  >
                    {service.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>{service.title}</h3>
                </div>
                <p className='text-gray-600 mb-4'>{service.description}</p>
                <div className='space-y-2'>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-center text-gray-600'>
                      <CheckCircle className='w-3 h-3 text-green-500 mr-2 flex-shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Process</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              A structured approach to delivering exceptional results
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
            {processSteps.map((step, index) => (
              <div key={index} className='text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold'>
                  {step.step}
                </div>
                <div className='bg-white p-4 rounded-lg shadow-lg'>
                  <div className='flex justify-center mb-3'>
                    <div className='bg-blue-100 text-blue-600 p-2 rounded-lg'>{step.icon}</div>
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-2'>{step.title}</h3>
                  <p className='text-gray-600 text-sm'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Why Choose Us</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The advantages of working with MySonAI
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
            Ready to Transform Your Business?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Let&apos;s discuss how our AI and IT services can help you achieve your goals
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
            <Link href='/pricing'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <Award className='w-5 h-5 mr-2' />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
