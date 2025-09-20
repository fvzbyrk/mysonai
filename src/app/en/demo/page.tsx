'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Rocket,
  MessageCircle,
  Video,
  Music,
  GraduationCap,
} from 'lucide-react';
import { useState } from 'react';

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState('ai-chat');
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoData, setDemoData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const demos = [
    {
      id: 'ai-chat',
      name: 'AI Chatbot Demo',
      description: 'Experience our intelligent conversational AI',
      icon: <Bot className='w-8 h-8' />,
      color: 'from-blue-600 to-purple-600',
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        'Context Awareness',
        'Real-time Responses',
      ],
      status: 'Live Demo',
    },
    {
      id: 'video-ai',
      name: 'AI Video Generator',
      description: 'Create videos with artificial intelligence',
      icon: <Video className='w-8 h-8' />,
      color: 'from-red-600 to-pink-600',
      features: ['Script Generation', 'Voice Synthesis', 'Auto Editing', 'Template Library'],
      status: 'Interactive Demo',
    },
    {
      id: 'music-ai',
      name: 'AI Music Composer',
      description: 'Generate music with AI assistance',
      icon: <Music className='w-8 h-8' />,
      color: 'from-purple-600 to-violet-600',
      features: ['Beat Generation', 'Melody Creation', 'Style Adaptation', 'Export Options'],
      status: 'Coming Soon',
    },
    {
      id: 'education-ai',
      name: 'AI Learning Assistant',
      description: 'Personalized educational AI platform',
      icon: <GraduationCap className='w-8 h-8' />,
      color: 'from-green-600 to-emerald-600',
      features: [
        'Adaptive Learning',
        'Progress Tracking',
        'Content Generation',
        'Assessment Tools',
      ],
      status: 'Beta Demo',
    },
  ];

  const features = [
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Real-time Processing',
      description: 'Experience instant AI responses and processing',
    },
    {
      icon: <Shield className='w-6 h-6' />,
      title: 'Secure Environment',
      description: 'Safe demo environment with data protection',
    },
    {
      icon: <Globe className='w-6 h-6' />,
      title: 'Multi-language Support',
      description: 'Test our solutions in multiple languages',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Collaborative Features',
      description: 'Share and collaborate on demo projects',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content:
        'The AI chatbot demo was incredible! It understood context perfectly and provided relevant responses.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'InnovateLab',
      content:
        'The video generation AI saved us hours of production time. The quality is outstanding.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Education Manager',
      company: 'EduTech Solutions',
      content:
        'The learning assistant demo showed us how AI can personalize education effectively.',
      rating: 5,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDemoData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo request
    // Handle demo request submission
    alert('Demo request submitted successfully!');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='mb-8'>
            <Badge className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium'>
              🚀 Live Demo
            </Badge>
          </div>

          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Try Our AI Solutions
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            Experience the Power of AI Firsthand
          </p>

          <p className='text-lg text-gray-500 mb-12 max-w-4xl mx-auto'>
            Test our AI solutions in real-time. No signup required for basic demos. Experience how
            our artificial intelligence can transform your workflow and boost productivity.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg'
            >
              <Play className='w-5 h-5 mr-2' />
              Start Demo
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg'
            >
              <ArrowRight className='w-5 h-5 mr-2' />
              Request Custom Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Choose Your Demo</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Select an AI solution to experience its capabilities
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {demos.map(demo => (
              <Card
                key={demo.id}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedDemo === demo.id
                    ? 'border-2 border-blue-500 shadow-xl'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedDemo(demo.id)}
              >
                <div className='text-center'>
                  <div
                    className={`bg-gradient-to-r ${demo.color} text-white p-4 
                    rounded-xl w-fit mx-auto mb-4`}
                  >
                    {demo.icon}
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>{demo.name}</h3>
                  <p className='text-gray-600 mb-3 text-sm'>{demo.description}</p>
                  <Badge
                    className={`${
                      demo.status === 'Live Demo'
                        ? 'bg-green-500'
                        : demo.status === 'Interactive Demo'
                          ? 'bg-blue-500'
                          : demo.status === 'Beta Demo'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                    } text-white px-3 py-1 text-xs`}
                  >
                    {demo.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Demo */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Demo Interface */}
            <Card className='p-8'>
              <div className='mb-6'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  {demos.find(d => d.id === selectedDemo)?.name}
                </h2>
                <p className='text-gray-600'>
                  {demos.find(d => d.id === selectedDemo)?.description}
                </p>
              </div>

              {/* Demo Controls */}
              <div className='flex items-center gap-4 mb-6'>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                >
                  {isPlaying ? (
                    <Pause className='w-4 h-4 mr-2' />
                  ) : (
                    <Play className='w-4 h-4 mr-2' />
                  )}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button variant='outline' className='border-gray-300'>
                  <RotateCcw className='w-4 h-4 mr-2' />
                  Reset
                </Button>
                <Button variant='outline' className='border-gray-300'>
                  <Download className='w-4 h-4 mr-2' />
                  Export
                </Button>
                <Button variant='outline' className='border-gray-300'>
                  <Share className='w-4 h-4 mr-2' />
                  Share
                </Button>
              </div>

              {/* Demo Area */}
              <div className='bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center'>
                <div className='text-center'>
                  <div className='text-6xl mb-4'>🤖</div>
                  <h3 className='text-xl font-semibold text-gray-700 mb-2'>Demo Interface</h3>
                  <p className='text-gray-500'>
                    {selectedDemo === 'ai-chat' && 'Chat with our AI assistant'}
                    {selectedDemo === 'video-ai' && 'Generate AI-powered videos'}
                    {selectedDemo === 'music-ai' && 'Compose music with AI'}
                    {selectedDemo === 'education-ai' && 'Experience personalized learning'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Demo Features */}
            <div className='space-y-8'>
              <Card className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Features</h3>
                <div className='space-y-3'>
                  {demos
                    .find(d => d.id === selectedDemo)
                    ?.features.map((feature, index) => (
                      <div key={index} className='flex items-center'>
                        <CheckCircle className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                        <span className='text-gray-600'>{feature}</span>
                      </div>
                    ))}
                </div>
              </Card>

              <Card className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Demo Capabilities</h3>
                <div className='grid grid-cols-2 gap-4'>
                  {features.map((feature, index) => (
                    <div key={index} className='flex items-center'>
                      <div className='bg-blue-100 text-blue-600 p-2 rounded-lg mr-3'>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className='text-sm font-semibold text-gray-900'>{feature.title}</h4>
                        <p className='text-xs text-gray-600'>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>What Users Say</h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Feedback from users who tried our demos
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className='p-6'>
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 text-yellow-400 fill-current' />
                  ))}
                </div>
                <p className='text-gray-600 mb-4'>&quot;{testimonial.content}&quot;</p>
                <div>
                  <h4 className='font-semibold text-gray-900'>{testimonial.name}</h4>
                  <p className='text-sm text-gray-600'>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Request Custom Demo */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Need a Custom Demo?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Request a personalized demonstration tailored to your specific needs
            </p>
          </div>

          <Card className='p-8'>
            <form onSubmit={handleDemoRequest} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
                    Full Name *
                  </Label>
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    value={demoData.name}
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
                    value={demoData.email}
                    onChange={handleInputChange}
                    required
                    className='mt-2'
                    placeholder='your@email.com'
                  />
                </div>
              </div>

              <div>
                <Label htmlFor='company' className='text-sm font-medium text-gray-700'>
                  Company
                </Label>
                <Input
                  id='company'
                  name='company'
                  type='text'
                  value={demoData.company}
                  onChange={handleInputChange}
                  className='mt-2'
                  placeholder='Your company name'
                />
              </div>

              <div>
                <Label htmlFor='message' className='text-sm font-medium text-gray-700'>
                  Demo Requirements *
                </Label>
                <Textarea
                  id='message'
                  name='message'
                  value={demoData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className='mt-2'
                  placeholder="Describe what you'd like to see in the demo..."
                />
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3'
              >
                <MessageCircle className='w-4 h-4 mr-2' />
                Request Custom Demo
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Ready to Get Started?</h2>
          <p className='text-xl text-blue-100 mb-8'>
            Experience the full power of our AI solutions with a personalized demo
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg'
            >
              <Rocket className='w-5 h-5 mr-2' />
              Start Free Trial
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg'
            >
              <Users className='w-5 h-5 mr-2' />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
