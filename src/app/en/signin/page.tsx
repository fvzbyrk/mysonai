'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Bot, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SocialAuth } from '@/components/social-auth';
import { AuthGuard } from '@/components/auth-guard';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      router.push('/en/dashboard');
    }

    setLoading(false);
  };

  const handleSocialSuccess = () => {
    router.push('/en/dashboard');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='bg-white/10 backdrop-blur-md border-white/20'>
          <div className='p-8'>
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Bot className='w-8 h-8 text-purple-400' />
              </div>
              <h1 className='text-2xl font-bold text-white mb-2'>Welcome Back</h1>
              <p className='text-gray-300'>Sign in to your MySonAI account</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                  >
                    {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                  </button>
                </div>
              </div>

              {error && (
                <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
                  <div className='flex items-center'>
                    <AlertCircle className='w-5 h-5 text-red-400 mr-2' />
                    <p className='text-red-300 text-sm'>{error}</p>
                  </div>
                </div>
              )}

              <Button
                type='submit'
                disabled={loading || !email || !password}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-white/20'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-transparent text-gray-400'>Or continue with</span>
                </div>
              </div>

              <div className='mt-6'>
                <SocialAuth onSuccess={handleSocialSuccess} />
              </div>
            </div>

            <div className='mt-6 text-center'>
              <p className='text-gray-400'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/en/signup'
                  className='text-purple-400 hover:text-purple-300 transition-colors'
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className='mt-4 text-center'>
              <Link
                href='/en/forgot-password'
                className='text-sm text-gray-400 hover:text-gray-300 transition-colors'
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <AuthGuard>
      <SignInForm />
    </AuthGuard>
  );
}
