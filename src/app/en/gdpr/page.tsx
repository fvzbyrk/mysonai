'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Users, Eye, Lock, Download, Trash2, Mail, Phone, CheckCircle } from 'lucide-react';

export default function GDPRPage() {
  const rights = [
    {
      title: 'Right to Access',
      description: 'You have the right to request access to your personal data',
      icon: <Eye className='w-6 h-6' />,
      color: 'from-blue-600 to-indigo-600',
      details: [
        'Request a copy of your personal data',
        'Information about how we process your data',
        'Purposes of data processing',
        'Data retention periods',
      ],
    },
    {
      title: 'Right to Rectification',
      description: 'You can request correction of inaccurate personal data',
      icon: <Users className='w-6 h-6' />,
      color: 'from-green-600 to-emerald-600',
      details: [
        'Correct inaccurate information',
        'Complete incomplete data',
        'Update outdated information',
        'Verify data accuracy',
      ],
    },
    {
      title: 'Right to Erasure',
      description: 'You have the right to request deletion of your personal data',
      icon: <Trash2 className='w-6 h-6' />,
      color: 'from-red-600 to-pink-600',
      details: [
        'Delete personal data when no longer needed',
        'Withdraw consent for data processing',
        'Object to unlawful data processing',
        'Request data deletion from all systems',
      ],
    },
    {
      title: 'Right to Portability',
      description: 'You can request transfer of your data to another service',
      icon: <Download className='w-6 h-6' />,
      color: 'from-purple-600 to-violet-600',
      details: [
        'Receive data in a structured format',
        'Transfer data to another service provider',
        'Machine-readable data format',
        'Direct transfer when technically feasible',
      ],
    },
  ];

  const dataProcessing = [
    {
      category: 'Personal Information',
      examples: [
        'Name, email address, phone number',
        'Company information and job title',
        'Billing and payment details',
      ],
      purpose: 'Service delivery and account management',
      legalBasis: 'Contract performance and legitimate interest',
    },
    {
      category: 'Usage Data',
      examples: [
        'Website interactions and page views',
        'Feature usage and preferences',
        'Device information and browser details',
      ],
      purpose: 'Service improvement and analytics',
      legalBasis: 'Legitimate interest and consent',
    },
    {
      category: 'Communication Data',
      examples: [
        'Support tickets and chat messages',
        'Email communications',
        'Feedback and survey responses',
      ],
      purpose: 'Customer support and service improvement',
      legalBasis: 'Contract performance and consent',
    },
  ];

  const securityMeasures = [
    {
      title: 'Technical Safeguards',
      icon: <Lock className='w-5 h-5' />,
      measures: [
        'End-to-end encryption for data transmission',
        'Secure data storage with encryption at rest',
        'Regular security updates and patches',
        'Access controls and authentication systems',
      ],
    },
    {
      title: 'Organizational Measures',
      icon: <Users className='w-5 h-5' />,
      measures: [
        'Staff training on data protection',
        'Data protection impact assessments',
        'Incident response procedures',
        'Regular security audits and reviews',
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🛡️ GDPR Compliance
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              GDPR Compliance
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Your Data Protection Rights
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            MySonAI is committed to protecting your privacy and ensuring compliance with the General
            Data Protection Regulation (GDPR). This page explains your rights and how we protect
            your personal data.
          </p>

          <div className='flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl'>
              <Shield className='w-8 h-8' />
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Your Data Protection Rights
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Under GDPR, you have specific rights regarding your personal data
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {rights.map((right, index) => (
              <Card key={index} className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className={`bg-gradient-to-r ${right.color} text-white p-3 rounded-lg mr-4`}>
                    {right.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>{right.title}</h3>
                    <p className='text-gray-600 text-sm'>{right.description}</p>
                  </div>
                </div>

                <ul className='space-y-2'>
                  {right.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className='flex items-start'>
                      <CheckCircle className='w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0' />
                      <span className='text-gray-600 text-sm'>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Processing */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              How We Process Your Data
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Transparent information about our data processing activities
            </p>
          </div>

          <div className='space-y-8'>
            {dataProcessing.map((processing, index) => (
              <Card key={index} className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>{processing.category}</h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Examples:</h4>
                    <ul className='space-y-1'>
                      {processing.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className='flex items-start'>
                          <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0'></div>
                          <span className='text-sm text-gray-600'>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Purpose:</h4>
                    <p className='text-sm text-gray-600'>{processing.purpose}</p>
                  </div>

                  <div>
                    <h4 className='font-semibold text-gray-900 mb-2'>Legal Basis:</h4>
                    <p className='text-sm text-gray-600'>{processing.legalBasis}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Data Security Measures
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              We implement comprehensive security measures to protect your data
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {securityMeasures.map((measure, index) => (
              <Card key={index} className='p-6'>
                <div className='flex items-center mb-4'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {measure.icon}
                  </div>
                  <h3 className='text-xl font-bold text-gray-900'>{measure.title}</h3>
                </div>

                <ul className='space-y-2'>
                  {measure.measures.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start'>
                      <CheckCircle className='w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0' />
                      <span className='text-gray-600'>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Your Rights */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Exercise Your Rights
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Contact us to exercise any of your data protection rights
            </p>
          </div>

          <Card className='p-8 max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Data Protection Officer</h3>
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 text-blue-600 mr-3' />
                    <span className='text-gray-600'>dpo@mysonai.com</span>
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 text-blue-600 mr-3' />
                    <span className='text-gray-600'>+90 (212) 555-0123</span>
                  </div>
                </div>
                <p className='text-gray-600 mt-4 text-sm'>
                  Our Data Protection Officer is available to help you with any questions or
                  requests regarding your personal data.
                </p>
              </div>

              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Request Form</h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  To exercise your rights, please provide the following information:
                </p>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-start'>
                    <CheckCircle className='w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0' />
                    <span className='text-gray-600'>Your full name and contact information</span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0' />
                    <span className='text-gray-600'>Specific right you wish to exercise</span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0' />
                    <span className='text-gray-600'>Description of your request</span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0' />
                    <span className='text-gray-600'>Identity verification documents</span>
                  </li>
                </ul>
                <Button className='mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'>
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-gray-600'>
            This GDPR compliance information was last updated on December 15, 2024. We are committed
            to maintaining the highest standards of data protection and will update this information
            as needed to ensure compliance.
          </p>
        </div>
      </section>
    </div>
  );
}
