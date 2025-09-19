// Gemini AI chat integration
export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeminiResponse {
  success: boolean;
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

class GeminiChat {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com';
  }

  // Get status
  async getStatus() {
    return {
      available: !!this.apiKey,
      error: this.apiKey ? null : 'GEMINI_API_KEY not set',
    };
  }

  // Generate response using Gemini
  async generateResponse(
    messages: GeminiMessage[],
    systemPrompt?: string,
    temperature: number = 0.7,
    maxTokens: number = 3000
  ): Promise<GeminiResponse> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          content: 'Gemini API key not configured',
          error: 'API_KEY_MISSING',
        };
      }

      // Convert messages to Gemini format
      const geminiMessages = this.convertMessagesToGemini(messages, systemPrompt);

      const response = await fetch(
        `${this.baseUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: geminiMessages,
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens,
              topP: 0.8,
              topK: 40,
              stopSequences: [],
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          content: `Gemini API error: ${response.status}`,
          error: errorData.error?.message || 'UNKNOWN_ERROR',
        };
      }

      const data = await response.json();
      const content = data.candidates[0]?.content?.parts[0]?.text;

      if (!content) {
        return {
          success: false,
          content: 'No response generated',
          error: 'NO_RESPONSE',
        };
      }

      // Calculate usage (approximate)
      const promptTokens = this.estimateTokens(messages.map(m => m.content).join(' '));
      const completionTokens = this.estimateTokens(content);
      const totalTokens = promptTokens + completionTokens;

      return {
        success: true,
        content,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens,
        },
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        success: false,
        content: 'An error occurred while generating response',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
      };
    }
  }

  // Convert messages to Gemini format
  private convertMessagesToGemini(messages: GeminiMessage[], systemPrompt?: string): any[] {
    const contents: any[] = [];

    // Add system prompt if provided
    if (systemPrompt) {
      contents.push({
        parts: [
          {
            text: systemPrompt,
          },
        ],
      });
    }

    // Convert conversation messages
    for (const message of messages) {
      contents.push({
        parts: [
          {
            text: message.content,
          },
        ],
      });
    }

    return contents;
  }

  // Estimate token count (rough approximation)
  private estimateTokens(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  // Generate tech news using Gemini
  async generateTechNews(
    categories: string[] = ['AI', 'Web Development', 'Mobile', 'Security']
  ): Promise<GeminiResponse> {
    const prompt = `
      Bugünün en önemli tech gelişmelerini Türkçe olarak özetle.
      Aşağıdaki kategorilerde güncel haberler ver:
      ${categories.map(cat => `- ${cat}`).join('\n')}
      
      Her haber için:
      - Başlık
      - Özet (2-3 cümle)
      - Kategori
      - Etiketler
      - Öncelik (high/medium/low)
      
      JSON formatında döndür.
    `;

    return this.generateResponse([
      {
        role: 'user',
        content: prompt,
      },
    ]);
  }

  // Generate blog post using Gemini
  async generateBlogPost(
    topic: string,
    style: 'formal' | 'casual' | 'technical' = 'casual'
  ): Promise<GeminiResponse> {
    const prompt = `
      "${topic}" konusunda ${style} tarzda bir blog yazısı yaz.
      Türkçe olarak yaz ve şu yapıyı kullan:
      - Giriş paragrafı
      - Ana konular (3-4 paragraf)
      - Sonuç paragrafı
      - SEO dostu başlık önerisi
      
      Blog yazısı 500-800 kelime arasında olsun.
    `;

    return this.generateResponse([
      {
        role: 'user',
        content: prompt,
      },
    ]);
  }

  // Generate SEO content using Gemini
  async generateSEOContent(
    keyword: string,
    targetAudience: string = 'genel'
  ): Promise<GeminiResponse> {
    const prompt = `
      "${keyword}" anahtar kelimesi için SEO dostu içerik oluştur.
      Hedef kitle: ${targetAudience}
      
      İçerik şunları içermeli:
      - SEO dostu başlık
      - Meta description
      - Ana başlıklar (H1, H2, H3)
      - Anahtar kelime yoğunluğu %2-3
      - İç link önerileri
      - Call-to-action
      
      Türkçe olarak yaz.
    `;

    return this.generateResponse([
      {
        role: 'user',
        content: prompt,
      },
    ]);
  }

  // Generate social media content using Gemini
  async generateSocialMediaContent(
    platform: 'twitter' | 'linkedin' | 'instagram',
    topic: string
  ): Promise<GeminiResponse> {
    const platformLimits = {
      twitter: '280 karakter',
      linkedin: '1300 karakter',
      instagram: '2200 karakter',
    };

    const prompt = `
      "${topic}" konusunda ${platform} için sosyal medya içeriği oluştur.
      Maksimum ${platformLimits[platform]} kullan.
      
      İçerik şunları içermeli:
      - Çekici başlık
      - Ana mesaj
      - Hashtag önerileri
      - Call-to-action
      
      Türkçe olarak yaz.
    `;

    return this.generateResponse([
      {
        role: 'user',
        content: prompt,
      },
    ]);
  }

  // Check if Gemini is available
  isAvailable(): boolean {
    return !!this.apiKey;
  }

  // Get API status
  async getStatus(): Promise<{ available: boolean; error?: string }> {
    try {
      if (!this.apiKey) {
        return { available: false, error: 'API key not configured' };
      }

      // Test with a simple request
      const response = await this.generateResponse([
        {
          role: 'user',
          content: 'Merhaba',
        },
      ]);

      return {
        available: response.success,
        error: response.error,
      };
    } catch (error) {
      return {
        available: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const geminiChat = new GeminiChat();
export { GeminiChat };
