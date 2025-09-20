'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Award, CheckCircle, ArrowRight, Shield, Target } from 'lucide-react';
import Link from 'next/link';

export default function ReferencesPage() {
  const clients = [
    {
      name: 'TechCorp Solutions',
      industry: 'Technology',
      logo: '🏢',
      project: 'AI Chatbot Implementation',
      testimonial:
        'MySonAI transformed our customer service with their intelligent chatbot. Response times improved by 80%.',
      rating: 5,
      results: ['80% faster response', '95% satisfaction', '50% cost reduction'],
    },
    {
      name: 'EduTech Academy',
      industry: 'Education',
      logo: '🎓',
      project: 'Learning Management System',
      testimonial:
        'The AI-powered learning platform personalized education for our 10,000+ students.',
      rating: 5,
      results: ['25% better engagement', '40% faster learning', '90% student satisfaction'],
    },
    {
      name: 'HealthCare Plus',
      industry: 'Healthcare',
      logo: '🏥',
      project: 'Medical AI Assistant',
      testimonial: 'Their AI solution helps our doctors make faster, more accurate diagnoses.',
      rating: 5,
      results: ['30% faster diagnosis', '95% accuracy rate', '60% time savings'],
    },
    {
      name: 'FinanceFlow',
      industry: 'Finance',
      logo: '💰',
      project: 'Financial Analytics AI',
      testimonial: 'The predictive analytics helped us identify market trends with 90% accuracy.',
      rating: 5,
      results: ['90% prediction accuracy', '35% revenue increase', '45% risk reduction'],
    },
    {
      name: 'MediaMasters',
      industry: 'Media',
      logo: '🎬',
      project: 'AI Video Production',
      testimonial:
        'Automated video creation reduced our production time by 70% while maintaining quality.',
      rating: 5,
      results: ['70% time reduction', '100% quality maintained', '200% output increase'],
    },
    {
      name: 'RetailMax',
      industry: 'Retail',
      logo: '🛍️',
      project: 'E-commerce AI',
      testimonial:
        'Personalized recommendations increased our sales by 45% and customer satisfaction by 60%.',
      rating: 5,
      results: ['45% sales increase', '60% satisfaction boost', '35% conversion rate'],
    },
  ];

  const stats = [
    { number: '100+', label: 'Happy Clients', icon: <Users className='w-8 h-8' /> },
    { number: '500+', label: 'Projects Completed', icon: <Award className='w-8 h-8' /> },
    { number: '99%', label: 'Client Satisfaction', icon: <Star className='w-8 h-8' /> },
    { number: '24/7', label: 'Support Available', icon: <Shield className='w-8 h-8' /> },
  ];

  const industries = [
    { name: 'Technology', count: 25, icon: '💻' },
    { name: 'Healthcare', count: 18, icon: '🏥' },
    { name: 'Education', count: 15, icon: '🎓' },
    { name: 'Finance', count: 12, icon: '💰' },
    { name: 'Media', count: 10, icon: '🎬' },
    { name: 'Retail', count: 8, icon: '🛍️' },
    { name: 'Manufacturing', count: 7, icon: '🏭' },
    { name: 'Other', count: 5, icon: '🌟' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🏆 Our References
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Client Success Stories
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Trusted by Leading Companies Worldwide
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Discover how we&apos;ve helped businesses across various industries transform their
            operations with AI solutions. Our clients consistently achieve remarkable results and
            improved efficiency.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Become a Client
              </Button>
            </Link>
            <Link href='/demo'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
              >
                <ArrowRight className='w-5 h-5 mr-2' />
                See Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Our Impact</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Numbers that reflect our commitment to client success
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                  {stat.icon}
                </div>
                <div className='text-4xl md:text-5xl font-bold text-blue-600 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Client Testimonials
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              What our clients say about working with us
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {clients.map((client, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='text-3xl mr-4'>{client.logo}</div>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>{client.name}</h3>
                    <p className='text-sm text-gray-600'>{client.industry}</p>
                  </div>
                </div>

                <div className='flex items-center mb-3'>
                  {[...Array(client.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 text-yellow-400 fill-current' />
                  ))}
                </div>

                <p className='text-gray-600 mb-4 italic'>&quot;{client.testimonial}&quot;</p>

                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900 text-sm'>Key Results:</h4>
                  {client.results.map((result, resultIndex) => (
                    <div key={resultIndex} className='flex items-center'>
                      <CheckCircle className='w-3 h-3 text-green-500 mr-2 flex-shrink-0' />
                      <span className='text-xs text-gray-600'>{result}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Industries We Serve
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Expertise across diverse sectors and industries
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {industries.map((industry, index) => (
              <Card
                key={index}
                className='p-6 text-center hover:shadow-lg transition-shadow duration-300'
              >
                <div className='text-4xl mb-3'>{industry.icon}</div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{industry.name}</h3>
                <p className='text-sm text-gray-600'>{industry.count} clients</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Join Our Success Stories?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Let&apos;s discuss how we can help transform your business with AI solutions
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Start Your Project
              </Button>
            </Link>
            <Link href='/demo'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <Target className='w-5 h-5 mr-2' />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
