'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('=== LOGIN START ===');
      console.log('Username:', username);
      console.log('Password length:', password.length);

      // Test API endpoint first
      console.log('Testing API endpoint...');
      const testResponse = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test', password: 'test' }),
      });
      console.log('Test response status:', testResponse.status);

      // Real login attempt
      console.log('Attempting real login...');
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        console.log('Login successful, storing token...');
        localStorage.setItem('admin_token', result.token);
        console.log('Token stored:', result.token.substring(0, 20) + '...');

        // Test token storage
        const storedToken = localStorage.getItem('admin_token');
        console.log('Stored token verified:', !!storedToken);

        // Redirect to admin dashboard
        window.location.href = '/en/admin';
      } else {
        console.log('Login failed:', result.message);
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error.message);
      setError('Connection error: ' + error.message);
    } finally {
      setIsLoading(false);
      console.log('=== LOGIN END ===');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6'>
      <Card className='bg-white/10 backdrop-blur-md border-white/20 w-full max-w-md'>
        <div className='p-8'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Lock className='w-8 h-8 text-purple-400' />
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Admin Login</h1>
            <p className='text-gray-300'>MySonAI Admin Panel Access</p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div>
              <Label htmlFor='username' className='text-white text-sm font-medium'>
                Username
              </Label>
              <Input
                id='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='Enter your username'
                className='bg-white/10 border-white/20 text-white placeholder-gray-400 mt-2'
                required
              />
            </div>

            <div>
              <Label htmlFor='password' className='text-white text-sm font-medium'>
                Password
              </Label>
              <div className='relative mt-2'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                >
                  {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            {error && (
              <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-3'>
                <p className='text-red-300 text-sm'>{error}</p>
              </div>
            )}

            <Button
              type='submit'
              disabled={isLoading || !username || !password}
              className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
            >
              {isLoading ? (
                <div className='flex items-center'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-400 text-sm'>This area is for authorized personnel only</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
