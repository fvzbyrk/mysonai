'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  Star,
  Target,
  Bell,
  MapPin,
  Shield,
  Smartphone,
  Globe,
  BarChart3,
  Heart,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
  Settings,
  Zap,
} from 'lucide-react';

export default function CoNestPage() {
  const features = [
    {
      icon: <Users className='w-6 h-6' />,
      title: 'User Management',
      items: [
        'Secure Registration/Login - Email, Google, Apple',
        'Flexible Family Structure - Single-parent or dual-parent',
        'Multiple Children Support - Track 1 or more children',
        'Detailed Profile Information - Work hours, emergency contacts',
        'Secure Password - Strong password policy',
      ],
    },
    {
      icon: <Calendar className='w-6 h-6' />,
      title: 'Smart Calendar System',
      items: [
        'Dynamic Schedule Creation - Work, school, training hours',
        'Flexible Training Hours - Automatic adaptation for variable hours',
        'Recurring Tasks - Daily, weekly, monthly repeats',
        'Smart Reminders - Time and location-based notifications',
        'Conflict Control - No time slot remains empty',
      ],
    },
    {
      icon: <Star className='w-6 h-6' />,
      title: 'Child Development & Motivation',
      items: [
        'Age Groups - Preschool, elementary, middle school, high school',
        'Gamification System - Stars, Badges, Level system',
        'Age-Appropriate Tasks - Special recommendations for each age group',
        'Progress Tracking - Detailed development reports',
        'Motivation Messages - Praise system based on success',
      ],
    },
    {
      icon: <Target className='w-6 h-6' />,
      title: 'Task Management',
      items: [
        'Daily Task List - Bed, teeth, breakfast, homework, reading',
        'Visual Controls - Empty / Completed marking',
        'Priority System - 1-5 importance level',
        'Difficulty Levels - Age-appropriate difficulty',
        'Reward Points - Points for task completion',
      ],
    },
    {
      icon: <MessageCircle className='w-6 h-6' />,
      title: 'Social Community',
      items: [
        'Single Parent Support Groups - Experience sharing',
        'Age Groups - Elementary Parents, Athlete Children',
        'Interest Areas - Hobby and activity-based groups',
        'Location-Based - Nearby parents',
        'Forum System - Q&A, experience sharing',
      ],
    },
    {
      icon: <BarChart3 className='w-6 h-6' />,
      title: 'Reporting & Statistics',
      items: [
        'Daily Progress - Completed task ratio',
        'Weekly Reports - Detailed development summary',
        'Monthly Statistics - Long-term trend analysis',
        'Success Charts - Visual progress tracking',
        'Development Recommendations - Personalized advice',
      ],
    },
    {
      icon: <Bell className='w-6 h-6' />,
      title: 'Notification System',
      items: [
        'Time-Based - Task reminders',
        'Location-Based - School exit, home arrival',
        'Smart Notifications - 10 minutes left until school exit',
        'Push Notifications - Mobile notifications',
        'Email Notifications - Important updates',
      ],
    },
    {
      icon: <MapPin className='w-6 h-6' />,
      title: 'Location & Security',
      items: [
        'Registered Locations - Home, school, work, gym',
        'Geofencing - Location-based automatic notifications',
        'Security Control - Child school exit notification',
        'Emergency Communication - Quick access information',
        'Location Sharing - Optional proximity feature',
      ],
    },
    {
      icon: <Heart className='w-6 h-6' />,
      title: 'Single Parent Support',
      items: [
        'Flexible Work Hours - Planning according to work schedule',
        'Emergency Plans - Situations when alone',
        'Support Network - Nearby other single parents',
        'Cost Optimization - Budget-friendly activities',
        'Time Management - Efficient daily routines',
      ],
    },
  ];

  const technicalFeatures = [
    {
      icon: <Shield className='w-5 h-5' />,
      title: 'Security & Privacy',
      items: ['JWT Authentication', 'Rate Limiting', 'Data Encryption', 'GDPR Compliant', 'HTTPS'],
    },
    {
      icon: <Smartphone className='w-5 h-5' />,
      title: 'Platform Support',
      items: ['Web Application', 'Mobile Application', 'Offline Mode', 'Sync', 'Backup'],
    },
    {
      icon: <Globe className='w-5 h-5' />,
      title: 'Multi-Language Support',
      items: ['Turkish', 'English', 'Auto Translation', 'Localization'],
    },
    {
      icon: <Zap className='w-5 h-5' />,
      title: 'Technical Features',
      items: ['RESTful API', 'Real-time Updates', 'Scalable Architecture', 'Performance Optimized'],
    },
  ];

  const roadmap = [
    {
      version: 'V2 Features',
      features: [
        { icon: <Zap className='w-4 h-4' />, text: 'AI Assistant - Personalized recommendations' },
        {
          icon: <MessageCircle className='w-4 h-4' />,
          text: 'Video Call - Parent-child communication',
        },
        {
          icon: <Award className='w-4 h-4' />,
          text: 'Educational Content - Age-appropriate materials',
        },
        {
          icon: <Heart className='w-4 h-4' />,
          text: 'Professional Support - Psychologist/pedagogue consultation',
        },
      ],
    },
    {
      version: 'V3 Features',
      features: [
        { icon: <Settings className='w-4 h-4' />, text: 'IoT Integration - Smart home devices' },
        { icon: <Globe className='w-4 h-4' />, text: 'AR/VR - Educational experiences' },
        { icon: <Shield className='w-4 h-4' />, text: 'Blockchain - Development certificates' },
        {
          icon: <Globe className='w-4 h-4' />,
          text: 'Global - Multi-language, multi-cultural support',
        },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🏠 MySonAI Sub-Brand
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              CoNest
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Parent Daily Planner
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Comprehensive platform designed for single-parent or dual-parent families. Track the
            development of one or more children, organize your daily plans. Simplify your family
            life with gamification, social community and smart notifications.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
            >
              <Calendar className='w-5 h-5 mr-2' />
              View Demo
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
            >
              <MessageCircle className='w-5 h-5 mr-2' />
              Get Info
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Comprehensive Features
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Platform equipped with 50+ features that make family life easier
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300'>
                <div className='flex items-center mb-4'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mr-4'>
                    {feature.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>{feature.title}</h3>
                </div>
                <ul className='space-y-2'>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start text-gray-600'>
                      <CheckCircle className='w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                      <span className='text-sm'>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Technical Infrastructure
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Secure, scalable and high-performance technology infrastructure
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className='p-6 text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg w-fit mx-auto mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>{feature.title}</h3>
                <ul className='space-y-1'>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-sm text-gray-600'>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Future Plans</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Future features with continuously evolving platform
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {roadmap.map((version, index) => (
              <Card key={index} className='p-8'>
                <div className='flex items-center mb-6'>
                  <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg mr-4'>
                    <Clock className='w-5 h-5' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>{version.version}</h3>
                </div>
                <div className='space-y-4'>
                  {version.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-start'>
                      <div className='bg-blue-100 text-blue-600 p-2 rounded-lg mr-3'>
                        {feature.icon}
                      </div>
                      <span className='text-gray-700'>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Simplify Your Family Life with CoNest
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Track your children&apos;s development with gamification, social community and smart
            notifications
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
            >
              <Calendar className='w-5 h-5 mr-2' />
              Get Started
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
            >
              <MessageCircle className='w-5 h-5 mr-2' />
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
