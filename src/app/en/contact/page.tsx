'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Globe,
  CheckCircle,
  Bot,
  Zap,
  Shield,
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className='w-6 h-6' />,
      title: 'Email',
      details: ['info@mysonai.com', 'support@mysonai.com'],
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: <Phone className='w-6 h-6' />,
      title: 'Phone',
      details: ['+90 (212) 555-0123', '+90 (532) 555-0123'],
      color: 'from-green-600 to-emerald-600',
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Address',
      details: ['Istanbul, Turkey', 'Global Remote Support'],
      color: 'from-purple-600 to-violet-600',
    },
    {
      icon: <Clock className='w-6 h-6' />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00-18:00', 'Sat: 10:00-16:00'],
      color: 'from-orange-600 to-red-600',
    },
  ];

  const services = [
    {
      icon: <Bot className='w-5 h-5' />,
      title: 'AI Solutions',
      description: 'Custom AI development and implementation',
    },
    {
      icon: <Globe className='w-5 h-5' />,
      title: 'Web Development',
      description: 'Modern websites and web applications',
    },
    {
      icon: <Zap className='w-5 h-5' />,
      title: 'Digital Media',
      description: 'Video production and multimedia content',
    },
    {
      icon: <Shield className='w-5 h-5' />,
      title: 'Consulting',
      description: 'Technology strategy and digital transformation',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days.',
    },
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes, we provide free initial consultations to discuss your project requirements.',
    },
    {
      question: 'What industries do you serve?',
      answer:
        'We serve clients across various industries including healthcare, education, finance, and technology.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive support and maintenance services for all our solutions.',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              📞 Contact Us
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Get in Touch
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Let&apos;s Discuss Your Project
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Ready to transform your ideas into reality? We&apos;re here to help you with AI
            solutions, web development, digital media, and technology consulting. Contact us today
            for a free consultation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <Card className='p-8'>
              <div className='mb-6'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>Send us a Message</h2>
                <p className='text-gray-600'>We&apos;ll get back to you within 24 hours</p>
              </div>

              {isSubmitted ? (
                <div className='text-center py-8'>
                  <div className='bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                    <CheckCircle className='w-8 h-8' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>Message Sent!</h3>
                  <p className='text-gray-600'>
                    Thank you for contacting us. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
                        Full Name *
                      </Label>
                      <Input
                        id='name'
                        name='name'
                        type='text'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className='mt-2'
                        placeholder='Your full name'
                      />
                    </div>
                    <div>
                      <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                        Email Address *
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='mt-2'
                        placeholder='your@email.com'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <Label htmlFor='company' className='text-sm font-medium text-gray-700'>
                        Company
                      </Label>
                      <Input
                        id='company'
                        name='company'
                        type='text'
                        value={formData.company}
                        onChange={handleInputChange}
                        className='mt-2'
                        placeholder='Your company name'
                      />
                    </div>
                    <div>
                      <Label htmlFor='subject' className='text-sm font-medium text-gray-700'>
                        Subject *
                      </Label>
                      <Input
                        id='subject'
                        name='subject'
                        type='text'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className='mt-2'
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='message' className='text-sm font-medium text-gray-700'>
                      Message *
                    </Label>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className='mt-2'
                      placeholder='Tell us about your project or requirements...'
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3'
                  >
                    {isSubmitting ? (
                      <div className='flex items-center justify-center'>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Sending...
                      </div>
                    ) : (
                      <div className='flex items-center justify-center'>
                        <Send className='w-4 h-4 mr-2' />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Information */}
            <div className='space-y-8'>
              <Card className='p-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-6'>Contact Information</h2>
                <div className='space-y-6'>
                  {contactInfo.map((info, index) => (
                    <div key={index} className='flex items-start'>
                      <div
                        className={`bg-gradient-to-r ${info.color} text-white p-3 
                        rounded-lg mr-4`}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-1'>{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className='text-gray-600'>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className='p-8'>
                <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Services</h2>
                <div className='grid grid-cols-2 gap-4'>
                  {services.map((service, index) => (
                    <div key={index} className='flex items-center'>
                      <div className='bg-blue-100 text-blue-600 p-2 rounded-lg mr-3'>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className='text-sm font-semibold text-gray-900'>{service.title}</h3>
                        <p className='text-xs text-gray-600'>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Quick answers to common questions about our services
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
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Start Your Project?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Let&apos;s discuss how we can help bring your ideas to life with cutting-edge technology
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
            >
              <MessageCircle className='w-5 h-5 mr-2' />
              Start Conversation
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
            >
              <Users className='w-5 h-5 mr-2' />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
