'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <CheckCircle className='w-6 h-6' />,
      content: [
        'By accessing and using MySonAI services, you accept and agree to be bound by these terms',
        'If you do not agree to these terms, you may not use our services',
        'We reserve the right to modify these terms at any time',
        'Continued use after changes constitutes acceptance of new terms',
        'You are responsible for reviewing these terms periodically',
      ],
    },
    {
      title: 'Service Description',
      icon: <Users className='w-6 h-6' />,
      content: [
        'MySonAI provides AI-powered solutions and IT services',
        'Services include but are not limited to chatbots, automation, and consulting',
        'We reserve the right to modify or discontinue services at any time',
        'Service availability may vary based on technical requirements',
        'We strive to maintain high service quality and uptime',
      ],
    },
    {
      title: 'User Responsibilities',
      icon: <Shield className='w-6 h-6' />,
      content: [
        'Provide accurate and complete information when required',
        'Use services in compliance with applicable laws and regulations',
        'Not engage in illegal, harmful, or unauthorized activities',
        'Respect intellectual property rights of others',
        'Maintain the security of your account credentials',
      ],
    },
    {
      title: 'Prohibited Uses',
      icon: <AlertTriangle className='w-6 h-6' />,
      content: [
        'Violating any applicable laws or regulations',
        'Transmitting harmful, offensive, or inappropriate content',
        'Attempting to gain unauthorized access to our systems',
        'Interfering with or disrupting our services',
        'Using services for fraudulent or deceptive purposes',
      ],
    },
    {
      title: 'Intellectual Property',
      icon: <FileText className='w-6 h-6' />,
      content: [
        'All content and materials on our platform are protected by copyright',
        'Users retain ownership of their original content',
        'We may use anonymized data to improve our services',
        'Unauthorized use of our intellectual property is prohibited',
        'Users grant us necessary licenses to provide services',
      ],
    },
    {
      title: 'Limitation of Liability',
      icon: <Scale className='w-6 h-6' />,
      content: [
        'Our services are provided "as is" without warranties',
        'We are not liable for indirect or consequential damages',
        'Liability is limited to the amount paid for services',
        'We do not guarantee uninterrupted or error-free service',
        'Users assume responsibility for their use of our services',
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
              📋 Terms of Service
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Terms of Service
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Legal Terms and Conditions
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            These terms of service govern your use of MySonAI&apos;s products and services. Please
            read them carefully before using our platform. By using our services, you agree to be
            bound by these terms.
          </p>

          <div className='flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl'>
              <Scale className='w-8 h-8' />
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
                <p className='text-gray-600'>These terms were last updated on December 15, 2024</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Terms */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <Card className='p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Additional Terms</h2>

            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Payment Terms</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Payment is due according to your selected plan
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>Refunds are subject to our refund policy</span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Late payments may result in service suspension
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Termination</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Either party may terminate services with notice
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      We may suspend services for violations of these terms
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Data retention policies apply after termination
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Governing Law</h3>
                <p className='text-gray-600 ml-6'>
                  These terms are governed by the laws of Turkey. Any disputes will be resolved in
                  the courts of Istanbul, Turkey.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Questions About Terms?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Contact us if you have any questions about these terms of service
            </p>
          </div>

          <Card className='p-8 max-w-2xl mx-auto text-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
              <FileText className='w-8 h-8' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Legal Department</h3>
            <p className='text-gray-600 mb-4'>
              For questions about these terms, please contact our legal team
            </p>
            <p className='text-blue-600 font-medium'>legal@mysonai.com</p>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-gray-600'>
            These terms of service are effective as of the date listed above and will remain in
            effect until modified or terminated. We reserve the right to update these terms at any
            time.
          </p>
        </div>
      </section>
    </div>
  );
}
