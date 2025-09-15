'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, ArrowLeft, Send, Loader2, Paperclip, X, Maximize2, Minimize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAgentById, getAllAgents } from '@/lib/ai-agents';
import { findSuitableTeam, getAllTeams, getTeamById, type AgentTeam } from '@/lib/agent-collaboration';
import { type MultiAgentMode } from '@/lib/advanced-gpt-features';
import { AdvancedAgentSelector } from '@/components/advanced-agent-selector';
import JSZip from 'jszip';

// Speech API tipleri
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    speechSynthesis: SpeechSynthesis;
  }
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  agentId?: string;
  teamId?: string;
  timestamp: Date;
  files?: File[];
}

interface FileAttachment {
  file: File;
  id: string;
  content?: string;
  type: 'text' | 'image' | 'pdf' | 'udf' | 'other';
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgentSelection, setShowAgentSelection] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false); // Sesli sohbet modu
  const [selectedTeam, setSelectedTeam] = useState<string>(''); // Seçili takım
  const [showTeamSelection, setShowTeamSelection] = useState(false); // Takım seçimi göster
  const [suggestedTeam, setSuggestedTeam] = useState<AgentTeam | null>(null); // Önerilen takım
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]); // Çoklu ajan seçimi
  const [multiAgentMode, setMultiAgentMode] = useState<MultiAgentMode>('collaborative'); // Çoklu ajan modu - varsayılan işbirliği
  const [activeFeatures, setActiveFeatures] = useState<Record<string, boolean>>({
    functionCalling: true,
    vision: false,
    codeInterpreter: false,
    webSearch: false,
    fileAnalysis: false,
    memory: false,
    streaming: false
  }); // Aktif özellikler
  const [showAdvancedSelector, setShowAdvancedSelector] = useState(false); // Gelişmiş seçici göster
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agents = getAllAgents();
  const teams = getAllTeams();
  const searchParams = useSearchParams();

  // Speech Recognition ve Synthesis için refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Speech API desteğini kontrol et
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const SpeechSynthesis = window.speechSynthesis;
      
      if (SpeechRecognition && SpeechSynthesis) {
        setSpeechSupported(true);
        
        // Speech Recognition ayarları
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'tr-TR';
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
        };
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
  }, []);

  // File reading utilities
  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        
        // UDF dosyaları için özel işlem
        if (file.name.toLowerCase().endsWith('.udf')) {
          if (result instanceof ArrayBuffer) {
            parseUDFContent(result).then(content => {
              resolve(content);
            }).catch(error => {
              reject(error);
            });
          } else {
            reject(new Error('UDF file must be read as ArrayBuffer'));
          }
        } else if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };
      
      reader.onerror = () => reject(new Error('File reading failed'));
      
      if (file.name.toLowerCase().endsWith('.udf')) {
        // UDF dosyalarını binary olarak oku
        reader.readAsArrayBuffer(file);
      } else if (file.type.startsWith('text/') || file.type === 'application/json') {
        reader.readAsText(file);
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll read as text (basic text extraction)
        // TODO: Implement PDF.js for better text extraction
        reader.readAsText(file);
      } else {
        // For other files, try to read as text
        reader.readAsText(file);
      }
    });
  };

  const getFileType = (file: File): 'text' | 'image' | 'pdf' | 'udf' | 'other' => {
    if (file.name.toLowerCase().endsWith('.udf')) {
      return 'udf';
    } else if (file.type.startsWith('text/') || file.type === 'application/json') {
      return 'text';
    } else if (file.type.startsWith('image/')) {
      return 'image';
    } else if (file.type === 'application/pdf') {
      return 'pdf';
    } else {
      return 'other';
    }
  };

  // UDF Parser - UYAP Doküman Formatı (ZIP-based)
  const parseUDFContent = async (buffer: ArrayBuffer): Promise<string> => {
    try {
      // UDF dosyası aslında ZIP arşivi
      const zip = new JSZip();
      const zipFile = await zip.loadAsync(buffer);
      
      // content.xml dosyasını bul
      const contentXml = zipFile.file('content.xml');
      if (!contentXml) {
        return `UDF Dosyası: content.xml bulunamadı\n\nBu dosya UYAP sistemi tarafından oluşturulmuş bir hukuki belgedir.\n\nDosya boyutu: ${(buffer.byteLength / 1024).toFixed(2)} KB\n\nNot: Bu dosya UYAP Doküman Editör ile açılabilir.`;
      }
      
      // XML içeriğini oku
      const xmlContent = await contentXml.async('text');
      
      // XML'i parse et ve metin çıkar
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Tüm paragraf ve başlık metinlerini çıkar
      const paragraphs: string[] = [];
      
      // text:p etiketlerini bul (paragraflar)
      const textPs = xmlDoc.querySelectorAll('text\\:p, p');
      textPs.forEach(p => {
        if (p.textContent && p.textContent.trim()) {
          paragraphs.push(p.textContent.trim());
        }
      });
      
      // text:h etiketlerini bul (başlıklar)
      const textHs = xmlDoc.querySelectorAll('text\\:h, h1, h2, h3, h4, h5, h6');
      textHs.forEach(h => {
        if (h.textContent && h.textContent.trim()) {
          paragraphs.push(h.textContent.trim());
        }
      });
      
      // Eğer hiç metin bulunamadıysa, tüm text node'ları al
      if (paragraphs.length === 0) {
        const allTextNodes = xmlDoc.querySelectorAll('*');
        allTextNodes.forEach(node => {
          if (node.textContent && node.textContent.trim() && !node.children.length) {
            paragraphs.push(node.textContent.trim());
          }
        });
      }
      
      // Metinleri birleştir
      let fullText = paragraphs.join('\n\n');
      
      // Kişisel verileri maskele
      fullText = maskPersonalData(fullText);
      
      // Eğer içerik çok kısa ise, XML'i ham olarak göster
      if (fullText.length < 100) {
        return `UDF Dosyası: ${buffer.byteLength} byte\n\nBu dosya UYAP sistemi tarafından oluşturulmuş bir hukuki belgedir.\n\nDosya boyutu: ${(buffer.byteLength / 1024).toFixed(2)} KB\n\nXML İçeriği:\n${xmlContent.substring(0, 1000)}...`;
      }
      
      return fullText;
    } catch (error) {
      console.error('UDF parsing error:', error);
      return `UDF Dosyası okuma hatası: ${error}\n\nBu dosya UYAP sistemi tarafından oluşturulmuş bir hukuki belgedir.\n\nDosya boyutu: ${(buffer.byteLength / 1024).toFixed(2)} KB`;
    }
  };

  // Kişisel veri maskeleme fonksiyonu
  const maskPersonalData = (text: string): string => {
    // TCKN maskeleme (11 haneli sayı)
    text = text.replace(/\b\d{11}\b/g, '***');
    
    // Telefon numarası maskeleme (10-11 haneli sayı)
    text = text.replace(/\b\d{10,11}\b/g, '***');
    
    // E-posta maskeleme
    text = text.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '***');
    
    return text;
  };

  // Check for agent parameter in URL
  useEffect(() => {
    const agentParam = searchParams.get('agent');
    if (agentParam && getAgentById(agentParam)) {
      selectAgent(agentParam);
    }
  }, [searchParams]);

  // Handle ESC key for fullscreen exit
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && attachedFiles.length === 0) || isLoading) return;

    // Prepare file information for the message
    const fileInfo = attachedFiles.length > 0 
      ? `\n\n📎 Eklenen Dosyalar:\n${attachedFiles.map(f => 
          `• ${f.file.name} (${f.type})\n${f.content ? `İçerik: ${f.content.substring(0, 500)}${f.content.length > 500 ? '...' : ''}` : 'İçerik okunamadı'}`
        ).join('\n\n')}`
      : '';

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue + fileInfo,
      role: 'user',
      timestamp: new Date(),
      files: attachedFiles.map(f => f.file),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsLoading(true);

    // Scroll to bottom immediately after user message
    scrollToBottom();

    try {
      // Önce uygun takım var mı kontrol et
      const suitableTeam = findSuitableTeam(inputValue);
      setSuggestedTeam(suitableTeam);
      
      // Eğer takım önerisi varsa ve kullanıcı henüz takım seçmediyse
      if (suitableTeam && !selectedTeam && !selectedAgent) {
        // Takım önerisi göster ama kullanıcıyı zorlamadan
        const teamSuggestionMessage: Message = {
          id: Date.now().toString(),
          content: `💡 **Ajan İşbirliği Önerisi**\n\n"${inputValue}" konusunda **${suitableTeam.name}** takımımız size daha kapsamlı yardım sağlayabilir.\n\n**Takım Üyeleri:**\n${suitableTeam.agents.map(agentId => {
            const agent = getAgentById(agentId);
            return `• ${agent?.icon} ${agent?.name} (${agent?.role})`;
          }).join('\n')}\n\n**İşbirliği Tipi:** ${suitableTeam.collaborationType === 'integrated' ? 'Entegre' : suitableTeam.collaborationType === 'sequential' ? 'Sıralı' : suitableTeam.collaborationType === 'parallel' ? 'Paralel' : 'Danışmanlık'}\n\n**Seçenekleriniz:**\n1. 🚀 Takım ile devam et (önerilen)\n2. 👤 Tek ajan ile devam et\n3. 🔄 Farklı takım seç`,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, teamSuggestionMessage]);
        setShowTeamSelection(true);
        setIsLoading(false);
        return;
      }

      // API endpoint'i belirle
      let apiEndpoint = '/api/chat';
      if (selectedTeam) {
        apiEndpoint = '/api/chat/team';
      } else if (selectedAgents.length > 1) {
        apiEndpoint = '/api/chat/advanced';
      }
      
      const response = await fetch(apiEndpoint, {
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
          selectedAgents: selectedAgents.length > 0 ? selectedAgents : undefined,
          teamId: selectedTeam || undefined,
          multiAgentMode: selectedAgents.length > 1 ? multiAgentMode : undefined,
          userQuery: inputValue,
          enableFeatures: activeFeatures,
          gptParams: {
            model: 'gpt-4',
            temperature: 0.7,
            maxTokens: 2000,
            stream: false
          },
          files: attachedFiles.map(f => ({
            name: f.file.name,
            type: f.file.type,
            size: f.file.size,
            content: f.content || 'Dosya içeriği okunamadı'
          }))
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
      scrollToBottom();
      
      // Sesli cevap sadece sesli sohbet modunda otomatik verilir
      if (voiceMode && speechSupported) {
        setTimeout(() => {
          speakResponse(data.message);
        }, 500);
      }
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
      scrollToBottom();
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
      // Scroll to show welcome message
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSelectedAgent('');
    setSelectedTeam('');
    setSelectedAgents([]);
    setShowAgentSelection(true);
    setShowTeamSelection(false);
    setShowAdvancedSelector(false);
    setAttachedFiles([]);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    
    const newFiles: FileAttachment[] = [];
    
    for (const file of Array.from(files)) {
      try {
        const content = await readFileContent(file);
        const type = getFileType(file);
        
        newFiles.push({
          file,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          content: content.substring(0, 10000), // Limit content to 10KB
          type
        });
      } catch (error) {
        console.error('Error reading file:', error);
        // Still add the file even if reading fails
        newFiles.push({
          file,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: getFileType(file)
        });
      }
    }
    
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

  // Ses tanıma başlat/durdur
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Sesli cevap ver
  const speakResponse = (text: string) => {
    if (!speechSupported || !window.speechSynthesis) return;
    
    // Önceki konuşmayı durdur
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Sesli cevabı durdur
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col`}>
      {/* Header */}
      {!isFullscreen && (
        <div className='bg-white/10 backdrop-blur-md border-b border-white/20 flex-shrink-0'>
          <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3'>
            <div className='flex items-center justify-between'>
              <Link
                href='/'
                className='flex items-center space-x-1 sm:space-x-2 text-white hover:text-purple-300 transition-colors min-h-[44px]'
              >
                <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                <span className='text-sm sm:text-base'>Ana Sayfa</span>
              </Link>

              <div className='flex items-center space-x-2 sm:space-x-3'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                  <Bot className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                </div>
                <span className='text-white font-semibold text-sm sm:text-base'>MySonAI Demo</span>
              </div>

              <div className='flex items-center space-x-1 sm:space-x-2'>
                <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-white text-xs sm:text-sm'>Canlı</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1 overflow-hidden'>
        <div className='h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Agent Selection */}
          {showAgentSelection && (
            <div className='h-full flex flex-col px-4 py-8 overflow-y-auto'>
              <div className='text-center mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                  AI Asistanınızı Seçin
                </h1>
                <p className='text-lg text-gray-300 mb-8'>
                  Hangi AI asistanıyla sohbet etmek istiyorsunuz?
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto'>
                {agents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => selectAgent(agent.id)}
                    className='bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 text-center hover:bg-white/20 transition-all duration-200 group min-h-[120px] sm:min-h-[140px]'
                  >
                    <div className='text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform'>
                      {agent.icon}
                    </div>
                    <h3 className='text-white font-semibold text-sm sm:text-base mb-1'>{agent.name}</h3>
                    <p className='text-purple-300 text-xs sm:text-sm'>{agent.role}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Selection */}
          {showTeamSelection && suggestedTeam && (
            <div className='h-full flex flex-col px-4 py-8 overflow-y-auto'>
              <div className='text-center mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                  Ajan İşbirliği Önerisi
                </h1>
                <p className='text-lg text-gray-300 mb-8'>
                  Bu konu için en uygun takımımızı öneriyoruz
                </p>
              </div>

              <div className='max-w-4xl mx-auto'>
                {/* Suggested Team Card */}
                <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8'>
                  <div className='text-center mb-6'>
                    <div className='text-4xl mb-4'>{suggestedTeam.icon}</div>
                    <h2 className='text-2xl font-bold text-white mb-2'>{suggestedTeam.name}</h2>
                    <p className='text-gray-300 mb-4'>{suggestedTeam.description}</p>
                    <div className='inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm'>
                      {suggestedTeam.collaborationType === 'integrated' ? 'Entegre İşbirliği' : 
                       suggestedTeam.collaborationType === 'sequential' ? 'Sıralı İşbirliği' : 
                       suggestedTeam.collaborationType === 'parallel' ? 'Paralel İşbirliği' : 'Danışmanlık İşbirliği'}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    {suggestedTeam.agents.map(agentId => {
                      const agent = getAgentById(agentId);
                      if (!agent) return null;
                      return (
                        <div key={agentId} className='bg-white/5 rounded-xl p-4 border border-white/10'>
                          <div className='flex items-center space-x-3'>
                            <div className='text-2xl'>{agent.icon}</div>
                            <div>
                              <h3 className='text-white font-semibold'>{agent.name}</h3>
                              <p className='text-gray-300 text-sm'>{agent.role}</p>
                              <p className='text-gray-400 text-xs mt-1'>{agent.expertise.join(', ')}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <button
                      onClick={() => {
                        setSelectedTeam(suggestedTeam.id);
                        setShowTeamSelection(false);
                        setShowAgentSelection(false);
                        // Takım seçimi mesajı ekle
                        const teamSelectionMessage: Message = {
                          id: Date.now().toString(),
                          content: `🚀 **${suggestedTeam.name}** takımı seçildi!\n\nTakım üyelerimiz birlikte size yardımcı olacak. Ne yapmak istiyorsunuz?`,
                          role: 'assistant',
                          timestamp: new Date(),
                        };
                        setMessages(prev => [...prev, teamSelectionMessage]);
                      }}
                      className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold'
                    >
                      🚀 Bu Takım ile Devam Et
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowTeamSelection(false);
                        setShowAgentSelection(true);
                      }}
                      className='bg-white/10 text-white px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-semibold border border-white/20'
                    >
                      👤 Tek Ajan Seç
                    </button>
                  </div>
                </div>

                {/* Other Teams */}
                <div className='text-center'>
                  <h3 className='text-white font-semibold mb-4'>Diğer Takımlar</h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {teams.filter(team => team.id !== suggestedTeam.id).map(team => (
                      <button
                        key={team.id}
                        onClick={() => {
                          setSelectedTeam(team.id);
                          setShowTeamSelection(false);
                          setShowAgentSelection(false);
                          // Takım seçimi mesajı ekle
                          const teamSelectionMessage: Message = {
                            id: Date.now().toString(),
                            content: `🚀 **${team.name}** takımı seçildi!\n\nTakım üyelerimiz birlikte size yardımcı olacak. Ne yapmak istiyorsunuz?`,
                            role: 'assistant',
                            timestamp: new Date(),
                          };
                          setMessages(prev => [...prev, teamSelectionMessage]);
                        }}
                        className='bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/10 transition-all duration-200 group'
                      >
                        <div className='text-2xl mb-2 group-hover:scale-110 transition-transform'>{team.icon}</div>
                        <h4 className='text-white font-semibold text-sm mb-1'>{team.name}</h4>
                        <p className='text-gray-300 text-xs'>{team.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          {!showAgentSelection && !showTeamSelection && (
            <div className={`${isFullscreen ? 'h-full w-full' : 'h-full max-w-4xl mx-auto'} flex flex-col`}>
              {/* Chat Header - Minimal GPT Style */}
              <div className='bg-white/5 backdrop-blur-md border-b border-white/10 flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2 sm:space-x-3'>
                    {selectedTeam && (
                      <>
                        <div className='text-lg sm:text-xl'>{getTeamById(selectedTeam)?.icon}</div>
                        <div>
                          <h3 className='text-white font-medium text-sm sm:text-base'>
                            {getTeamById(selectedTeam)?.name}
                          </h3>
                          <p className='text-gray-300 text-xs'>
                            {getTeamById(selectedTeam)?.collaborationType === 'integrated' ? 'Entegre İşbirliği' : 
                             getTeamById(selectedTeam)?.collaborationType === 'sequential' ? 'Sıralı İşbirliği' : 
                             getTeamById(selectedTeam)?.collaborationType === 'parallel' ? 'Paralel İşbirliği' : 'Danışmanlık İşbirliği'}
                          </p>
                        </div>
                      </>
                    )}
                    {selectedAgent && !selectedTeam && (
                      <>
                        <div className='text-lg sm:text-xl'>{getAgentById(selectedAgent)?.icon}</div>
                        <div>
                          <h3 className='text-white font-medium text-sm sm:text-base'>
                            {getAgentById(selectedAgent)?.name}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='flex items-center space-x-2'>
                    {/* Gelişmiş Seçici Toggle */}
                    <button
                      onClick={() => setShowAdvancedSelector(!showAdvancedSelector)}
                      className={`transition-colors text-xs px-2 py-1 rounded min-h-[32px] ${
                        showAdvancedSelector 
                          ? 'text-blue-400 bg-blue-500/20 hover:bg-blue-500/30' 
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={showAdvancedSelector ? 'Gelişmiş Seçici: Açık' : 'Gelişmiş Seçici: Kapalı'}
                    >
                      {showAdvancedSelector ? '🚀 Gelişmiş' : '⚙️ Basit'}
                    </button>
                    
                    {/* Sesli Sohbet Modu Toggle */}
                    {speechSupported && (
                      <button
                        onClick={() => setVoiceMode(!voiceMode)}
                        className={`transition-colors text-xs px-2 py-1 rounded min-h-[32px] ${
                          voiceMode 
                            ? 'text-green-400 bg-green-500/20 hover:bg-green-500/30' 
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                        title={voiceMode ? 'Sesli Sohbet Modu: Açık' : 'Sesli Sohbet Modu: Kapalı'}
                      >
                        {voiceMode ? '🔊 Sesli' : '🔇 Yazılı'}
                      </button>
                    )}
                    <button
                      onClick={resetChat}
                      className='text-gray-400 hover:text-white transition-colors text-xs px-2 py-1 rounded hover:bg-white/10 min-h-[32px]'
                    >
                      Yeni
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className='text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10 min-h-[32px] min-w-[32px] flex items-center justify-center'
                      title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                    >
                      {isFullscreen ? <Minimize2 className='w-3 h-3' /> : <Maximize2 className='w-3 h-3' />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Agent Selector */}
              {showAdvancedSelector && (
                <div className='px-3 sm:px-6 py-4 border-b border-white/10'>
                  <AdvancedAgentSelector
                    onAgentSelect={(agentId) => {
                      setSelectedAgent(agentId);
                      setSelectedTeam('');
                      setSelectedAgents([]);
                      setShowAgentSelection(false);
                      setShowTeamSelection(false);
                      setShowAdvancedSelector(false); // Advanced selector'ı kapat
                      // Tek ajan seçimi mesajı ekle
                      const agent = getAgentById(agentId);
                      if (agent) {
                        const agentSelectionMessage: Message = {
                          id: Date.now().toString(),
                          content: `Merhaba! Ben ${agent.name}, ${agent.role}. Size nasıl yardımcı olabilirim?`,
                          role: 'assistant',
                          agentId: agent.id,
                          timestamp: new Date(),
                        };
                        setMessages([agentSelectionMessage]);
                      }
                    }}
                    onTeamSelect={(teamId) => {
                      setSelectedTeam(teamId);
                      setSelectedAgent('');
                      setSelectedAgents([]);
                      setShowAgentSelection(false);
                      setShowTeamSelection(false);
                      setShowAdvancedSelector(false); // Advanced selector'ı kapat
                      // Takım seçimi mesajı ekle
                      const team = getTeamById(teamId);
                      if (team) {
                        const teamSelectionMessage: Message = {
                          id: Date.now().toString(),
                          content: `🚀 **${team.name}** takımı seçildi!\n\nTakım üyelerimiz birlikte size yardımcı olacak. Ne yapmak istiyorsunuz?`,
                          role: 'assistant',
                          timestamp: new Date(),
                        };
                        setMessages([teamSelectionMessage]);
                      }
                    }}
                    onMultiAgentSelect={(agentIds, mode) => {
                      setSelectedAgents(agentIds);
                      setMultiAgentMode(mode);
                      setSelectedAgent('');
                      setSelectedTeam('');
                      setShowAgentSelection(false);
                      setShowTeamSelection(false);
                      setShowAdvancedSelector(false); // Advanced selector'ı kapat
                      // Çoklu ajan seçimi mesajı ekle
                      if (agentIds.length > 0) {
                        const multiAgentMessage: Message = {
                          id: Date.now().toString(),
                          content: `🚀 **${agentIds.length} Ajan** seçildi! (${mode === 'collaborative' ? 'İşbirliği' : mode === 'race' ? 'Yarış' : mode === 'consensus' ? 'Fikir Birliği' : mode === 'debate' ? 'Tartışma' : mode === 'sequential' ? 'Sıralı' : 'Paralel'} modu)\n\nSeçilen ajanlar: ${agentIds.map(id => getAgentById(id)?.name).join(', ')}\n\nNe yapmak istiyorsunuz?`,
                          role: 'assistant',
                          timestamp: new Date(),
                        };
                        setMessages([multiAgentMessage]);
                      }
                    }}
                    onFeatureToggle={(feature, enabled) => {
                      setActiveFeatures(prev => ({
                        ...prev,
                        [feature]: enabled
                      }));
                    }}
                    selectedAgents={selectedAgents}
                    selectedTeam={selectedTeam}
                    selectedMode={multiAgentMode}
                    activeFeatures={activeFeatures}
                  />
                </div>
              )}

              {/* Messages - GPT Style */}
              <div ref={messagesContainerRef} className={`flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-6 ${isFullscreen ? '' : 'max-h-96'}`}>
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-5 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-white/15 text-white border border-white/20 shadow-lg backdrop-blur-sm'
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
                          <div className='flex items-center justify-between mt-2'>
                            <p className='text-xs opacity-70'>
                              {message.timestamp.toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            
                            {/* Sesli Oynatma Butonu (Sadece AI mesajları için) */}
                            {message.role === 'assistant' && speechSupported && (
                              <button
                                onClick={() => {
                                  if (isSpeaking) {
                                    stopSpeaking();
                                  } else {
                                    speakResponse(message.content);
                                  }
                                }}
                                className={`transition-colors p-1 rounded ${
                                  isSpeaking 
                                    ? 'text-red-400 hover:text-red-300' 
                                    : 'text-gray-400 hover:text-white'
                                }`}
                                title={isSpeaking ? 'Sesli Cevabı Durdur' : 'Sesli Dinle'}
                              >
                                {isSpeaking ? <VolumeX className='w-3 h-3' /> : <Volume2 className='w-3 h-3' />}
                              </button>
                            )}
                          </div>
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
                <div className='bg-white/5 px-3 sm:px-6 py-3 border-t border-white/20 flex-shrink-0'>
                  <div className='flex flex-wrap gap-2'>
                    {attachedFiles.map(file => (
                      <div key={file.id} className='flex items-center space-x-2 bg-white/10 rounded-lg px-2 sm:px-3 py-2'>
                        <span className='text-white text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none'>
                          {file.type === 'udf' ? '⚖️' : '📎'} {file.file.name}
                          {file.type === 'udf' && <span className='ml-1 sm:ml-2 text-xs text-blue-300'>(UYAP)</span>}
                        </span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className='text-gray-400 hover:text-white transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input - GPT Style */}
              <div 
                className={`bg-white/5 px-3 sm:px-6 py-4 border-t border-white/10 flex-shrink-0 ${isDragOver ? 'bg-purple-500/20' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className='flex space-x-3 items-end'>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='text-gray-400 hover:text-white transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/10'
                    disabled={isLoading}
                  >
                    <Paperclip className='w-5 h-5' />
                  </button>
                  
                  {/* Ses Tanıma Butonu */}
                  {speechSupported && (
                    <button
                      onClick={toggleListening}
                      disabled={isLoading}
                      className={`transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/10 ${
                        isListening 
                          ? 'text-red-400 bg-red-500/20' 
                          : voiceMode 
                            ? 'text-green-400 bg-green-500/20 hover:bg-green-500/30' 
                            : 'text-gray-400 hover:text-white'
                      }`}
                      title={isListening ? 'Dinlemeyi Durdur' : voiceMode ? 'Sesli Sohbet - Mikrofon' : 'Sesli Mesaj Gönder'}
                    >
                      {isListening ? <MicOff className='w-5 h-5' /> : <Mic className='w-5 h-5' />}
                    </button>
                  )}
                  
                  <div className='flex-1 relative'>
                    <textarea
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isDragOver ? 'Dosyaları buraya bırakın...' : voiceMode ? 'Sesli sohbet modu - Mikrofon butonuna basın veya yazın...' : 'Mesajınızı yazın...'}
                      className='w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base min-h-[44px] max-h-32'
                      rows={1}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={(!inputValue.trim() && attachedFiles.length === 0) || isLoading}
                    className='bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg'
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
                  accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.udf'
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
