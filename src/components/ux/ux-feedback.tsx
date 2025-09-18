'use client';

import { useState, useEffect } from 'react';
import { useUXContext } from './ux-provider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  MessageCircle, 
  Send, 
  X, 
  CheckCircle,
  AlertCircle,
  Info,
  Heart,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UXFeedbackProps {
  onFeedback?: (feedback: FeedbackData) => void;
  showRating?: boolean;
  showComments?: boolean;
  showEmoji?: boolean;
  showQuickActions?: boolean;
  className?: string;
}

interface FeedbackData {
  rating: number;
  comment: string;
  emoji: string;
  quickActions: string[];
  timestamp: number;
  userAgent: string;
  screenSize: { width: number; height: number };
  pageUrl: string;
  sessionData: any;
}

export function UXFeedback({
  onFeedback,
  showRating = true,
  showComments = true,
  showEmoji = true,
  showQuickActions = true,
  className
}: UXFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [emoji, setEmoji] = useState('');
  const [quickActions, setQuickActions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    screenSize,
    sessionStart,
    pageViews,
    interactions,
    scrollDepth,
    timeOnPage,
    getUXScore,
    getEngagementLevel,
    getBehaviorInsights,
    getRecommendations,
    getSessionSummary
  } = useUXContext();

  // Quick action options
  const quickActionOptions = [
    'Çok hızlı',
    'Kolay kullanım',
    'Güzel tasarım',
    'Yavaş yükleme',
    'Karmaşık navigasyon',
    'Eksik bilgi',
    'Teknik sorun',
    'Mükemmel deneyim'
  ];

  // Emoji options
  const emojiOptions = [
    { emoji: '😍', label: 'Mükemmel' },
    { emoji: '😊', label: 'İyi' },
    { emoji: '😐', label: 'Orta' },
    { emoji: '😕', label: 'Kötü' },
    { emoji: '😢', label: 'Çok kötü' }
  ];

  // Handle feedback submission
  const handleSubmit = async () => {
    if (rating === 0 && !comment.trim() && quickActions.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      rating,
      comment: comment.trim(),
      emoji,
      quickActions,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      screenSize,
      pageUrl: window.location.href,
      sessionData: getSessionSummary()
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onFeedback?.(feedbackData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setRating(0);
        setComment('');
        setEmoji('');
        setQuickActions([]);
      }, 3000);
    } catch (error) {
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle quick action toggle
  const handleQuickActionToggle = (action: string) => {
    setQuickActions(prev => 
      prev.includes(action) 
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  };

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get rating icon
  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <ThumbsUp className="w-5 h-5" />;
    if (rating >= 3) return <Meh className="w-5 h-5" />;
    return <ThumbsDown className="w-5 h-5" />;
  };

  if (isSubmitted) {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        <Card className="bg-green-500 text-white p-4 shadow-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Teşekkürler! Geri bildiriminiz alındı.</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Feedback Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300',
            className
          )}
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      )}

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Deneyiminizi Değerlendirin
                </h3>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Rating Section */}
              {showRating && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Genel değerlendirme
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={cn(
                          'p-1 rounded transition-colors',
                          star <= rating 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-300 hover:text-yellow-500'
                        )}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className={cn('ml-2 text-sm font-medium', getRatingColor(rating))}>
                        {rating}/5
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Emoji Section */}
              {showEmoji && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Nasıl hissediyorsunuz?
                  </label>
                  <div className="flex space-x-2">
                    {emojiOptions.map((option) => (
                      <button
                        key={option.emoji}
                        onClick={() => setEmoji(option.emoji)}
                        className={cn(
                          'p-2 rounded-lg border-2 transition-all hover:scale-110',
                          emoji === option.emoji
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        )}
                        title={option.label}
                      >
                        <span className="text-2xl">{option.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {showQuickActions && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Hızlı seçenekler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickActionOptions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleQuickActionToggle(action)}
                        className={cn(
                          'px-3 py-1 text-sm rounded-full border transition-colors',
                          quickActions.includes(action)
                            ? 'bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                            : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                        )}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              {showComments && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Yorumlarınız
                  </label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Deneyiminiz hakkında detaylı yorum yapabilirsiniz..."
                    className="w-full"
                    rows={3}
                  />
                </div>
              )}

              {/* Session Info */}
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Oturum Bilgileri
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Sayfa görüntüleme: {pageViews}</div>
                  <div>Etkileşim: {interactions}</div>
                  <div>Kaydırma: %{Math.round(scrollDepth)}</div>
                  <div>Süre: {Math.round(timeOnPage / 1000)}s</div>
                  <div>UX Skoru: {getUXScore()}/100</div>
                  <div>Katılım: {getEngagementLevel()}</div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (rating === 0 && !comment.trim() && quickActions.length === 0)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Gönderiliyor...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Gönder
                    </div>
                  )}
                </Button>
                
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="px-4"
                >
                  İptal
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
