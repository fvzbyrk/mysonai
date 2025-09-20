'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  Star,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Bot,
  Code,
  Cloud,
  Video,
  Music,
  GraduationCap,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      icon: <Zap className='w-8 h-8' />,
      color: 'from-blue-600 to-indigo-600',
      features: [
        'Basic AI Chatbot',
        '5,000 API Calls/Month',
        'Email Support',
        'Basic Analytics',
        'Standard Templates',
        'Mobile Responsive',
      ],
      limitations: ['Limited Customization', 'Basic AI Models', 'Standard Response Time'],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Ideal for growing businesses and teams',
      icon: <Star className='w-8 h-8' />,
      color: 'from-purple-600 to-pink-600',
      features: [
        'Advanced AI Solutions',
        '25,000 API Calls/Month',
        'Priority Support',
        'Advanced Analytics',
        'Custom Development',
        'White-label Options',
        'Team Collaboration',
        'API Access',
      ],
      limitations: ['Monthly Usage Limits', 'Standard SLA'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      icon: <Shield className='w-8 h-8' />,
      color: 'from-green-600 to-emerald-600',
      features: [
        'Unlimited AI Solutions',
        'Unlimited API Calls',
        '24/7 Dedicated Support',
        'Custom Analytics Dashboard',
        'Full Customization',
        'On-premise Deployment',
        'Advanced Security',
        'SLA Guarantee',
        'Dedicated Account Manager',
        'Custom Integrations',
      ],
      limitations: [],
      popular: false,
    },
  ];

  const services = [
    {
      icon: <Bot className='w-6 h-6' />,
      title: 'AI Solutions',
      description: 'Custom AI development and implementation',
      startingPrice: '$500',
    },
    {
      icon: <Code className='w-6 h-6' />,
      title: 'Web Development',
      description: 'Modern websites and web applications',
      startingPrice: '$1,000',
    },
    {
      icon: <Cloud className='w-6 h-6' />,
      title: 'Cloud Services',
      description: 'Scalable cloud infrastructure solutions',
      startingPrice: '$300',
    },
    {
      icon: <Video className='w-6 h-6' />,
      title: 'Digital Media',
      description: 'Video production and multimedia content',
      startingPrice: '$800',
    },
    {
      icon: <Music className='w-6 h-6' />,
      title: 'Audio Solutions',
      description: 'Music production and sound design',
      startingPrice: '$600',
    },
    {
      icon: <GraduationCap className='w-6 h-6' />,
      title: 'Education Technology',
      description: 'E-learning platforms and educational tools',
      startingPrice: '$1,500',
    },
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and bank transfers for enterprise clients.',
    },
    {
      question: 'Can I change my plan anytime?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all monthly plans.',
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for monthly plans. Custom projects may include setup costs.',
    },
    {
      question: 'Do you offer discounts for annual payments?',
      answer: 'Yes, we offer 20% discount for annual payments on all plans.',
    },
    {
      question: 'What happens if I exceed my usage limits?',
      answer:
        'We&apos;ll notify you before reaching limits and offer options to upgrade or purchase additional capacity.',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              💰 Pricing Plans
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Simple Pricing
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Choose the Perfect Plan for Your Needs
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Transparent pricing with no hidden fees. Start with our free trial and scale as your
            business grows. All plans include our core AI solutions and dedicated support.
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
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Choose Your Plan</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Flexible pricing options to fit your business needs
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative ${plan.popular ? 'border-2 border-purple-500 shadow-xl' : 'hover:shadow-lg'} transition-all duration-300`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <Badge className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2'>
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className='text-center mb-8'>
                  <div
                    className={`bg-gradient-to-r ${plan.color} text-white p-4 
                    rounded-xl w-fit mx-auto mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>{plan.name}</h3>
                  <p className='text-gray-600 mb-4'>{plan.description}</p>
                  <div className='flex items-baseline justify-center'>
                    <span className='text-4xl font-bold text-gray-900'>{plan.price}</span>
                    <span className='text-gray-600 ml-1'>{plan.period}</span>
                  </div>
                </div>

                <div className='space-y-4 mb-8'>
                  <h4 className='font-semibold text-gray-900'>What&apos;s Included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-center'>
                      <Check className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                      <span className='text-gray-600'>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className='space-y-2 mb-8'>
                    <h4 className='font-semibold text-gray-900'>Limitations:</h4>
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className='flex items-center'>
                        <div className='w-5 h-5 border border-gray-300 rounded mr-3 flex-shrink-0'></div>
                        <span className='text-gray-500 text-sm'>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href='/contact'>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    } text-white py-3`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Services */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Custom Services</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Tailored solutions for specific project requirements
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {services.map((service, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900'>{service.title}</h3>
                    <p className='text-gray-600 text-sm'>{service.description}</p>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold text-blue-600'>
                    From {service.startingPrice}
                  </span>
                  <Link href='/contact'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-blue-600 text-blue-600 hover:bg-blue-50'
                    >
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Common questions about our pricing and services
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {faqs.map((faq, index) => (
              <Card key={index} className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>{faq.question}</h3>
                <p className='text-gray-600'>{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Ready to Get Started?</h2>
          <p className='text-xl text-blue-100 mb-8'>
            Choose your plan today and start transforming your business with AI
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
              >
                <Users className='w-5 h-5 mr-2' />
                Contact Sales
              </Button>
            </Link>
            <Link href='/demo'>
              <Button
                size='lg'
                variant='outline'
                className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
              >
                <Rocket className='w-5 h-5 mr-2' />
                Try Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
