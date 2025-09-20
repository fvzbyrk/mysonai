'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield, Eye, Globe, Users, Target, CheckCircle } from 'lucide-react';

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for basic website functionality',
      icon: <Shield className='w-6 h-6' />,
      color: 'from-green-600 to-emerald-600',
      examples: [
        'Authentication and login status',
        'Shopping cart and checkout process',
        'Security and fraud prevention',
        'Load balancing and performance',
      ],
      necessary: true,
    },
    {
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      icon: <Eye className='w-6 h-6' />,
      color: 'from-blue-600 to-indigo-600',
      examples: [
        'Page views and user interactions',
        'Traffic sources and referral data',
        'Popular content and features',
        'User journey and behavior patterns',
      ],
      necessary: false,
    },
    {
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements',
      icon: <Target className='w-6 h-6' />,
      color: 'from-purple-600 to-pink-600',
      examples: [
        'Ad personalization and targeting',
        'Campaign performance tracking',
        'Cross-site advertising',
        'Social media integration',
      ],
      necessary: false,
    },
    {
      name: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      icon: <Settings className='w-6 h-6' />,
      color: 'from-orange-600 to-red-600',
      examples: [
        'Language and region settings',
        'Theme and display preferences',
        'Customized content delivery',
        'User interface preferences',
      ],
      necessary: false,
    },
  ];

  const purposes = [
    {
      title: 'Website Functionality',
      description: 'Essential cookies ensure our website works properly and securely',
      icon: <Globe className='w-5 h-5' />,
    },
    {
      title: 'User Experience',
      description: 'Preference cookies remember your choices for a better experience',
      icon: <Users className='w-5 h-5' />,
    },
    {
      title: 'Performance Analytics',
      description: 'Analytics cookies help us improve our website performance',
      icon: <Eye className='w-5 h-5' />,
    },
    {
      title: 'Marketing Optimization',
      description: 'Marketing cookies help us show relevant content and ads',
      icon: <Target className='w-5 h-5' />,
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🍪 Cookie Policy
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Cookie Policy
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            How We Use Cookies and Similar Technologies
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            This cookie policy explains how MySonAI uses cookies and similar technologies when you
            visit our website. We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content.
          </p>

          <div className='flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl'>
              <Cookie className='w-8 h-8' />
            </div>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <Card className='p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>What Are Cookies?</h2>
            <div className='space-y-4'>
              <p className='text-gray-600'>
                Cookies are small text files that are stored on your device when you visit a
                website. They help websites remember information about your visit, such as your
                preferred language and other settings, making your next visit easier and more
                personalized.
              </p>
              <p className='text-gray-600'>
                We use both session cookies (which expire when you close your browser) and
                persistent cookies (which remain on your device for a set period or until you delete
                them).
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Cookie Types */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Types of Cookies We Use
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Different cookies serve different purposes on our website
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {cookieTypes.map((cookie, index) => (
              <Card key={index} className='p-6'>
                <div className='flex items-center mb-4'>
                  <div
                    className={`bg-gradient-to-r ${cookie.color} text-white p-3 
                    rounded-lg mr-4`}
                  >
                    {cookie.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>{cookie.name}</h3>
                    <p className='text-gray-600 text-sm'>{cookie.description}</p>
                  </div>
                </div>

                <div className='mb-4'>
                  <Badge
                    className={`${cookie.necessary ? 'bg-green-500' : 'bg-blue-500'} text-white px-3 py-1 text-xs`}
                  >
                    {cookie.necessary ? 'Necessary' : 'Optional'}
                  </Badge>
                </div>

                <div>
                  <h4 className='font-semibold text-gray-900 mb-2'>Examples:</h4>
                  <ul className='space-y-1'>
                    {cookie.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className='flex items-start'>
                        <CheckCircle className='w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0' />
                        <span className='text-sm text-gray-600'>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Purposes */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Why We Use Cookies
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Cookies help us provide better services and user experience
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {purposes.map((purpose, index) => (
              <Card key={index} className='p-6 text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
                  {purpose.icon}
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>{purpose.title}</h3>
                <p className='text-gray-600 text-sm'>{purpose.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <Card className='p-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              Managing Your Cookie Preferences
            </h2>

            <div className='space-y-6'>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Browser Settings</h3>
                <p className='text-gray-600 mb-4'>
                  You can control and delete cookies through your browser settings. Most browsers
                  allow you to refuse cookies or delete them individually.
                </p>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Chrome: Settings → Privacy and Security → Cookies
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Firefox: Settings → Privacy & Security → Cookies
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Safari: Preferences → Privacy → Manage Website Data
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                    <span className='text-gray-600'>
                      Edge: Settings → Cookies and Site Permissions
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>Cookie Consent</h3>
                <p className='text-gray-600 mb-4'>
                  When you first visit our website, you&apos;ll see a cookie consent banner. You can
                  choose which types of cookies to accept or reject.
                </p>
                <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'>
                  <Settings className='w-4 h-4 mr-2' />
                  Manage Cookie Preferences
                </Button>
              </div>

              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  Impact of Disabling Cookies
                </h3>
                <p className='text-gray-600'>
                  Please note that disabling certain cookies may affect the functionality of our
                  website. Essential cookies cannot be disabled as they are necessary for the
                  website to function properly.
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
              Questions About Cookies?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Contact us if you have any questions about our cookie policy
            </p>
          </div>

          <Card className='p-8 max-w-2xl mx-auto text-center'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl w-fit mx-auto mb-4'>
              <Cookie className='w-8 h-8' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Privacy Team</h3>
            <p className='text-gray-600 mb-4'>
              For questions about cookies and privacy, please contact our privacy team
            </p>
            <p className='text-blue-600 font-medium'>privacy@mysonai.com</p>
          </Card>
        </div>
      </section>

      {/* Footer Note */}
      <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-gray-600'>
            This cookie policy was last updated on December 15, 2024. We may update this policy from
            time to time to reflect changes in our practices or for other operational, legal, or
            regulatory reasons.
          </p>
        </div>
      </section>
    </div>
  );
}
