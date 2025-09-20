'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, Globe, Users, FileText, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <FileText className='w-6 h-6' />,
      content: [
        'Personal information you provide (name, email, phone number)',
        'Usage data and analytics information',
        'Device information and browser details',
        'Cookies and similar tracking technologies',
        'Communication records and support interactions',
      ],
    },
    {
      title: 'How We Use Your Information',
      icon: <Users className='w-6 h-6' />,
      content: [
        'Provide and improve our services',
        'Process transactions and manage accounts',
        'Send important service updates and notifications',
        'Analyze usage patterns to enhance user experience',
        'Comply with legal obligations and protect our rights',
      ],
    },
    {
      title: 'Information Sharing',
      icon: <Globe className='w-6 h-6' />,
      content: [
        'We do not sell your personal information to third parties',
        'We may share data with trusted service providers',
        'Information may be disclosed for legal compliance',
        'Aggregated, anonymized data may be used for research',
        'Your consent is required for any other sharing',
      ],
    },
    {
      title: 'Data Security',
      icon: <Lock className='w-6 h-6' />,
      content: [
        'Industry-standard encryption for data transmission',
        'Secure servers with regular security updates',
        'Access controls and authentication measures',
        'Regular security audits and assessments',
        'Incident response and breach notification procedures',
      ],
    },
    {
      title: 'Your Rights',
      icon: <Eye className='w-6 h-6' />,
      content: [
        'Access and review your personal information',
        'Request correction of inaccurate data',
        'Request deletion of your personal information',
        'Opt-out of marketing communications',
        'Data portability and transfer rights',
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className='w-5 h-5' />,
      method: 'Email',
      details: 'privacy@mysonai.com',
    },
    {
      icon: <Phone className='w-5 h-5' />,
      method: 'Phone',
      details: '+90 (212) 555-0123',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🔒 Privacy Policy
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Privacy Policy
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Your Privacy Matters to Us
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            At MySonAI, we are committed to protecting your privacy and ensuring the security of
            your personal information. This policy explains how we collect, use, and safeguard your
            data when you use our services.
          </p>

          <div className='flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl'>
              <Shield className='w-8 h-8' />
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className='py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <Card className='p-6 bg-blue-50 border-blue-200'>
            <div className='flex items-center'>
              <div className='bg-blue-600 text-white p-2 rounded-lg mr-4'>
                <FileText className='w-5 h-5' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>Last Updated</h3>
                <p className='text-gray-600'>
                  This privacy policy was last updated on December 15, 2024
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='space-y-8'>
            {sections.map((section, index) => (
              <Card key={index} className='p-8'>
                <div className='flex items-start mb-6'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {section.icon}
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900'>{section.title}</h2>
                </div>
                <ul className='space-y-3'>
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                      <span className='text-gray-600'>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies Policy */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <Card className='p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Cookies and Tracking</h2>
            <div className='space-y-4'>
              <p className='text-gray-600'>
                We use cookies and similar technologies to enhance your experience on our website.
                Cookies are small text files stored on your device that help us:
              </p>
              <ul className='space-y-2 ml-6'>
                <li className='flex items-start'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                  <span className='text-gray-600'>Remember your preferences and settings</span>
                </li>
                <li className='flex items-start'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                  <span className='text-gray-600'>Analyze website traffic and usage patterns</span>
                </li>
                <li className='flex items-start'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                  <span className='text-gray-600'>
                    Provide personalized content and recommendations
                  </span>
                </li>
                <li className='flex items-start'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                  <span className='text-gray-600'>
                    Improve website functionality and performance
                  </span>
                </li>
              </ul>
              <p className='text-gray-600 mt-4'>
                You can control cookie settings through your browser preferences. Note that
                disabling cookies may affect website functionality.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Questions About Privacy?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Contact us if you have any questions about this privacy policy
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {contactInfo.map((contact, index) => (
              <Card key={index} className='p-6 text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                  {contact.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>{contact.method}</h3>
                <p className='text-gray-600'>{contact.details}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-gray-600'>
            This privacy policy is effective as of the date listed above and will remain in effect
            except with respect to any changes in its provisions in the future, which will be in
            effect immediately after being posted on this page.
          </p>
        </div>
      </section>
    </div>
  );
}
