'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, ArrowLeft, Send, Loader2, Paperclip, X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAgentById, getAllAgents } from '@/lib/ai-agents';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  agentId?: string;
  timestamp: Date;
  files?: File[];
}

interface FileAttachment {
  file: File;
  id: string;
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgentSelection, setShowAgentSelection] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agents = getAllAgents();
  const searchParams = useSearchParams();

  // Check for agent parameter in URL
  useEffect(() => {
    const agentParam = searchParams.get('agent');
    if (agentParam && getAgentById(agentParam)) {
      selectAgent(agentParam);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || (attachedFiles.length > 0 ? `${attachedFiles.length} dosya gönderildi` : ''),
      role: 'user',
      timestamp: new Date(),
      files: attachedFiles.map(f => f.file),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsLoading(true);

    // Scroll to bottom immediately after user message
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          selectedAgent: selectedAgent || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('API yanıtı başarısız');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        agentId: data.agent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Scroll to bottom after assistant response
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      // console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Scroll to bottom after error message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    setShowAgentSelection(false);

    const agent = getAgentById(agentId);
    if (agent) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Merhaba! Ben ${agent.name}, ${agent.role}. Size nasıl yardımcı olabilirim?`,
        role: 'assistant',
        agentId: agent.id,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedAgent('');
    setShowAgentSelection(true);
    setAttachedFiles([]);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles: FileAttachment[] = Array.from(files).map(file => ({
      file,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    
    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className='h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col'>
      {/* Header */}
      <div className='bg-white/10 backdrop-blur-md border-b border-white/20 flex-shrink-0'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-white hover:text-purple-300 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>Ana Sayfa</span>
            </Link>

            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                <Bot className='w-4 h-4 text-white' />
              </div>
              <span className='text-white font-semibold'>MySonAI Demo</span>
            </div>

            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-white text-sm'>Canlı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-hidden'>
        <div className='h-full'>
          {/* Agent Selection */}
          {showAgentSelection && (
            <div className='h-full flex flex-col items-center justify-center px-4'>
              <div className='text-center mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                  AI Asistanınızı Seçin
                </h1>
                <p className='text-lg text-gray-300 mb-8'>
                  Hangi AI asistanıyla sohbet etmek istiyorsunuz?
                </p>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl'>
                  {agents.map(agent => (
                    <button
                      key={agent.id}
                      onClick={() => selectAgent(agent.id)}
                      className='bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-200 group'
                    >
                      <div className='text-3xl mb-2 group-hover:scale-110 transition-transform'>
                        {agent.icon}
                      </div>
                      <h3 className='text-white font-semibold text-sm mb-1'>{agent.name}</h3>
                      <p className='text-purple-300 text-xs'>{agent.role}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          {!showAgentSelection && (
            <div className='h-full flex flex-col'>
              {/* Chat Header */}
              <div className='bg-white/10 backdrop-blur-md border-b border-white/20 flex-shrink-0 px-6 py-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    {selectedAgent && (
                      <>
                        <div className='text-2xl'>{getAgentById(selectedAgent)?.icon}</div>
                        <div>
                          <h3 className='text-white font-semibold'>
                            {getAgentById(selectedAgent)?.name}
                          </h3>
                          <p className='text-purple-300 text-sm'>
                            {getAgentById(selectedAgent)?.role}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={resetChat}
                    className='text-gray-300 hover:text-white transition-colors text-sm'
                  >
                    Yeni Sohbet
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-6 space-y-4'>
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      <div className='flex items-start space-x-2'>
                        {message.role === 'assistant' && message.agentId && (
                          <div className='text-lg mt-1'>{getAgentById(message.agentId)?.icon}</div>
                        )}
                        <div className='flex-1'>
                          <div className='text-sm whitespace-pre-wrap'>
                            {message.content.split(/(\[.*?\]\(.*?\))/g).map((part, index) => {
                              const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                              if (linkMatch) {
                                const [, linkText, linkUrl] = linkMatch;
                                return (
                                  <a
                                    key={index}
                                    href={linkUrl}
                                    className='text-blue-300 hover:text-blue-200 underline'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (linkUrl.includes('demo?agent=')) {
                                        const agentId = linkUrl.split('agent=')[1];
                                        selectAgent(agentId);
                                      }
                                    }}
                                  >
                                    {linkText}
                                  </a>
                                );
                              }
                              return part;
                            })}
                          </div>
                          {message.files && message.files.length > 0 && (
                            <div className='mt-2 space-y-1'>
                              {message.files.map((file, index) => (
                                <div key={index} className='text-xs bg-white/20 rounded px-2 py-1'>
                                  📎 {file.name}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className='text-xs opacity-70 mt-2'>
                            {message.timestamp.toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-white/10 border border-white/20 rounded-lg px-4 py-3'>
                      <div className='flex items-center space-x-2'>
                        <Loader2 className='w-4 h-4 text-white animate-spin' />
                        <span className='text-white text-sm'>Yazıyor...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Attached Files */}
              {attachedFiles.length > 0 && (
                <div className='bg-white/5 px-6 py-3 border-t border-white/20 flex-shrink-0'>
                  <div className='flex flex-wrap gap-2'>
                    {attachedFiles.map(file => (
                      <div key={file.id} className='flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2'>
                        <span className='text-white text-sm'>📎 {file.file.name}</span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className='text-gray-400 hover:text-white transition-colors'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div 
                className={`bg-white/5 px-6 py-4 border-t border-white/20 flex-shrink-0 ${isDragOver ? 'bg-purple-500/20' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className='flex space-x-3'>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='text-gray-400 hover:text-white transition-colors p-2'
                    disabled={isLoading}
                  >
                    <Paperclip className='w-5 h-5' />
                  </button>
                  
                  <div className='flex-1 relative'>
                    <textarea
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isDragOver ? 'Dosyaları buraya bırakın...' : 'Mesajınızı yazın...'}
                      className='w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
                      rows={1}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={(!inputValue.trim() && attachedFiles.length === 0) || isLoading}
                    className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Send className='w-5 h-5' />
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type='file'
                  multiple
                  onChange={e => handleFileSelect(e.target.files)}
                  className='hidden'
                  accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif'
                />
              </div>
            </div>
          )}

          {/* Features - Only show when agent selection is visible */}
          {showAgentSelection && (
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Sparkles className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-white font-semibold mb-2'>Gerçek Zamanlı</h3>
                <p className='text-gray-300 text-sm'>AI asistanlarınızla anında iletişim kurun</p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Bot className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-white font-semibold mb-2'>Türkçe Destek</h3>
                <p className='text-gray-300 text-sm'>Tamamen Türkçe AI asistanlar</p>
              </div>

              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Sparkles className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-white font-semibold mb-2'>Uzman Asistanlar</h3>
                <p className='text-gray-300 text-sm'>Her biri kendi alanında uzman</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
