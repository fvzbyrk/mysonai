'use client';

import { AlertTriangle, CheckCircle, XCircle, User, Crown } from 'lucide-react';
import { Button } from './ui/button';

interface UsageLimitsProps {
  usage: any;
  isGuest: boolean;
  onUpgrade?: () => void;
}

export function UsageLimits({ usage, isGuest, onUpgrade }: UsageLimitsProps) {
  if (!usage) {
    return null;
  }

  const getUsageIcon = (percentage: number) => {
    if (percentage >= 90) {
      return <XCircle className='w-4 h-4' />;
    }
    if (percentage >= 75) {
      return <AlertTriangle className='w-4 h-4' />;
    }
    return <CheckCircle className='w-4 h-4' />;
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          {isGuest ? (
            <User className='w-5 h-5 text-gray-500' />
          ) : (
            <Crown className='w-5 h-5 text-purple-500' />
          )}
          <h3 className='font-semibold text-gray-900 dark:text-white'>
            {isGuest ? 'Misafir Kullanımı' : 'Kullanım Limitleri'}
          </h3>
        </div>
        {isGuest && (
          <Button
            size='sm'
            className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            onClick={onUpgrade}
          >
            Üye Ol
          </Button>
        )}
      </div>

      <div className='space-y-3'>
        {/* Messages */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600 dark:text-gray-300'>Mesajlar</span>
          <div className='flex items-center space-x-2'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              {usage.totalMessages} /{' '}
              {usage.monthlyLimit.messages === -1 ? '∞' : usage.monthlyLimit.messages}
            </span>
            {getUsageIcon((usage.totalMessages / usage.monthlyLimit.messages) * 100)}
          </div>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              usage.monthlyLimit.messages === -1
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{
              width: `${usage.monthlyLimit.messages === -1 ? 100 : Math.min((usage.totalMessages / usage.monthlyLimit.messages) * 100, 100)}%`,
            }}
          />
        </div>

        {/* Tokens */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600 dark:text-gray-300'>Tokenlar</span>
          <div className='flex items-center space-x-2'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              {usage.totalTokens.toLocaleString()} /{' '}
              {usage.monthlyLimit.tokens === -1 ? '∞' : usage.monthlyLimit.tokens.toLocaleString()}
            </span>
            {getUsageIcon((usage.totalTokens / usage.monthlyLimit.tokens) * 100)}
          </div>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              usage.monthlyLimit.tokens === -1
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}
            style={{
              width: `${usage.monthlyLimit.tokens === -1 ? 100 : Math.min((usage.totalTokens / usage.monthlyLimit.tokens) * 100, 100)}%`,
            }}
          />
        </div>

        {/* Images */}
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600 dark:text-gray-300'>Görseller</span>
          <div className='flex items-center space-x-2'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              {usage.totalImages} /{' '}
              {usage.monthlyLimit.images === -1 ? '∞' : usage.monthlyLimit.images}
            </span>
            {getUsageIcon((usage.totalImages / usage.monthlyLimit.images) * 100)}
          </div>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              usage.monthlyLimit.images === -1
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
            style={{
              width: `${usage.monthlyLimit.images === -1 ? 100 : Math.min((usage.totalImages / usage.monthlyLimit.images) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {isGuest && (
        <div className='mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
          <p className='text-sm text-yellow-800 dark:text-yellow-200'>
            Ücretsiz kullanım limitlerinizi aştınız. Daha fazla özellik için üye olun.
          </p>
        </div>
      )}
    </div>
  );
}
