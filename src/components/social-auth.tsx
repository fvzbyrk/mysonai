'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase-client';
import { Loader2, Chrome } from 'lucide-react';
import { toast } from 'sonner';

interface SocialAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function SocialAuth({ onSuccess, onError }: SocialAuthProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google') => {
    try {
      setLoading(provider);
      console.log('Google OAuth başlatılıyor...');

      const supabase = createClient();
      console.log('Supabase client oluşturuldu');

      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      console.log('OAuth response:', { data, error });

      if (authError) {
        console.error('OAuth error:', authError);
        throw authError;
      }

      if (data) {
        console.log('OAuth başarılı:', data);
        toast.success('Google ile giriş başarılı!');
        onSuccess?.();
      }
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      const errorMessage = error.message || 'Google ile giriş yapılırken bir hata oluştu';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: Chrome,
      color: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
      provider: 'google' as const,
    },
  ];

  return (
    <div className='space-y-4'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Veya Google ile devam edin
          </span>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        {socialProviders.map(provider => (
          <Button
            key={provider.id}
            variant='outline'
            className={`${provider.color} h-12 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
            onClick={() => handleSocialLogin(provider.provider)}
            disabled={loading !== null}
          >
            {loading === provider.id ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <provider.icon className='mr-2 h-4 w-4' />
            )}
            {provider.name} ile devam et
          </Button>
        ))}
      </div>
    </div>
  );
}
