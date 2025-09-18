'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Bot, Send, User, Loader2, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ContactAIAssistantProps {
  locale: string;
}

export function ContactAIAssistant({ locale }: ContactAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Merhaba! Ben MySonAI asistanınızım. Size nasıl yardımcı olabilirim? Projeniz hakkında sorularınızı sorabilir, hizmetlerimiz hakkında bilgi alabilir veya doğrudan iletişime geçmek için size yardımcı olabilirim.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // AI asistan API çağrısı
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          locale: locale,
          conversationHistory: messages.slice(-5) // Son 5 mesajı gönder
        }),
      });

      if (!response.ok) {
        throw new Error('AI asistan yanıt veremedi');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI asistan hatası:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Üzgünüm, şu anda teknik bir sorun yaşıyorum. Lütfen daha sonra tekrar deneyin veya doğrudan iletişime geçin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Hizmetleriniz nelerdir?',
    'AI çözümleri hakkında bilgi alabilir miyim?',
    'Proje süreci nasıl işliyor?',
    'Fiyatlandırma nasıl yapılıyor?',
    'Hemen iletişime geçmek istiyorum'
  ];

  return (
    <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
          <Bot className='w-6 h-6 text-white' />
        </div>
        <div>
          <h3 className='text-xl font-bold text-white'>MySonAI Asistanı</h3>
          <p className='text-sm text-purple-300'>Size yardımcı olmaya hazır</p>
        </div>
      </div>

      {/* Messages */}
      <div className='h-80 overflow-y-auto p-4 space-y-4 bg-black/20 rounded-lg mb-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              <div className='flex items-start space-x-2'>
                {message.role === 'assistant' && (
                  <Bot className='w-5 h-5 mt-1 flex-shrink-0' />
                )}
                {message.role === 'user' && (
                  <User className='w-5 h-5 mt-1 flex-shrink-0' />
                )}
                <div>
                  <p className='text-sm'>{message.content}</p>
                  <p className='text-xs opacity-70 mt-1'>
                    {message.timestamp.toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-white/20 rounded-2xl px-4 py-3 flex items-center space-x-2'>
              <Bot className='w-5 h-5' />
              <Loader2 className='w-4 h-4 animate-spin' />
              <span className='text-sm text-white'>Yanıt hazırlanıyor...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className='mb-4'>
          <p className='text-sm text-gray-300 mb-3'>Hızlı sorular:</p>
          <div className='flex flex-wrap gap-2'>
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                onClick={() => setInput(question)}
                variant='outline'
                size='sm'
                className='text-xs bg-white/10 border-white/20 text-white hover:bg-white/20'
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className='flex space-x-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Mesajınızı yazın...'
          className='flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400'
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg px-4'
          size='sm'
        >
          <Send className='w-4 h-4' />
        </Button>
      </div>

      {/* Contact Info */}
      <div className='mt-4 pt-4 border-t border-white/20'>
        <p className='text-xs text-gray-400 mb-2'>Hızlı iletişim:</p>
        <div className='flex flex-wrap gap-2'>
          <a
            href='tel:+905551234567'
            className='flex items-center space-x-1 text-xs text-purple-300 hover:text-purple-200 transition-colors'
          >
            <Phone className='w-3 h-3' />
            <span>+90 (555) 123 45 67</span>
          </a>
          <a
            href='mailto:info@mysonai.com'
            className='flex items-center space-x-1 text-xs text-purple-300 hover:text-purple-200 transition-colors'
          >
            <Mail className='w-3 h-3' />
            <span>info@mysonai.com</span>
          </a>
        </div>
      </div>
    </Card>
  );
}
