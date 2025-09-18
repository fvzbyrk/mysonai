// GPT + Gemini hybrid AI system for tech news
export interface HybridNewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  source: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
  author?: string;
  readTime: number;
  priority: 'high' | 'medium' | 'low';
  language: 'tr' | 'en';
  gptScore: number; // GPT's confidence score
  geminiScore: number; // Gemini's confidence score
  hybridScore: number; // Combined score
}

export interface HybridConfig {
  useGPT: boolean;
  useGemini: boolean;
  gptWeight: number; // 0-1, how much to rely on GPT
  geminiWeight: number; // 0-1, how much to rely on Gemini
  fallbackToGemini: boolean; // Use Gemini if GPT fails
  categories: string[];
  language: 'tr' | 'en';
  maxNews: number;
  qualityThreshold: number; // 0-1, minimum quality score
}

export interface HybridResult {
  success: boolean;
  data: HybridNewsItem[];
  total: number;
  sources: {
    gpt: number;
    gemini: number;
    hybrid: number;
  };
  quality: {
    average: number;
    gpt: number;
    gemini: number;
    hybrid: number;
  };
  lastUpdated: string;
  nextUpdate: string;
}

class GPTGeminiHybrid {
  private config: HybridConfig;
  private lastGenerated: Date | null = null;

  constructor(config: HybridConfig) {
    this.config = config;
  }

  // Generate hybrid tech news using GPT + Gemini
  async generateHybridTechNews(): Promise<HybridResult> {
    try {
      console.log('Generating hybrid tech news with GPT + Gemini...');
      
      const [gptNews, geminiNews] = await Promise.all([
        this.config.useGPT ? this.generateGPTNews() : Promise.resolve([]),
        this.config.useGemini ? this.generateGeminiNews() : Promise.resolve([])
      ]);

      // Combine and merge news
      const combinedNews = this.combineNews(gptNews, geminiNews);
      const qualityFilteredNews = this.filterByQuality(combinedNews);
      const finalNews = this.deduplicateAndSort(qualityFilteredNews);

      // Calculate quality metrics
      const qualityMetrics = this.calculateQualityMetrics(gptNews, geminiNews, finalNews);

      this.lastGenerated = new Date();

      return {
        success: true,
        data: finalNews,
        total: finalNews.length,
        sources: {
          gpt: gptNews.length,
          gemini: geminiNews.length,
          hybrid: finalNews.length
        },
        quality: qualityMetrics,
        lastUpdated: this.lastGenerated.toISOString(),
        nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error('Error generating hybrid tech news:', error);
      return {
        success: false,
        data: [],
        total: 0,
        sources: { gpt: 0, gemini: 0, hybrid: 0 },
        quality: { average: 0, gpt: 0, gemini: 0, hybrid: 0 },
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    }
  }

  // Generate news using GPT
  private async generateGPTNews(): Promise<HybridNewsItem[]> {
    try {
      console.log('Generating news with GPT...');
      
      const prompt = `
        Bugünün en önemli tech gelişmelerini Türkçe olarak detaylı bir şekilde özetle.
        Aşağıdaki kategorilerde güncel haberler ver:
        - AI ve Machine Learning
        - Web Development
        - Mobile Technology
        - Cybersecurity
        - Startup ve Entrepreneurship
        - Cloud Computing
        
        Her haber için JSON formatında:
        {
          "title": "Başlık",
          "content": "Detaylı içerik",
          "summary": "Özet",
          "category": "Kategori",
          "tags": ["tag1", "tag2"],
          "source": "Kaynak",
          "url": "https://example.com",
          "priority": "high/medium/low",
          "quality": 0.9
        }
      `;

      const response = await fetch(`${process.env.OPENAI_BASE_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Daha ekonomik model
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (content) {
        const newsData = JSON.parse(content);
        return Array.isArray(newsData) ? newsData.map((item: any, index: number) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: item.title || `GPT Haber ${index + 1}`,
          content: item.content || item.summary || '',
          summary: item.summary || item.content || '',
          category: item.category || 'Genel',
          tags: item.tags || ['tech'],
          source: item.source || 'GPT-4',
          url: item.url || '#',
          publishedAt: new Date().toISOString(),
          imageUrl: item.imageUrl,
          author: 'GPT-4',
          readTime: Math.ceil((item.content || '').split(' ').length / 200),
          priority: item.priority || 'medium',
          language: this.config.language,
          gptScore: item.quality || 0.9,
          geminiScore: 0,
          hybridScore: item.quality || 0.9
        })) : [];
      }

      return [];
    } catch (error) {
      console.error('Error generating GPT news:', error);
      return [];
    }
  }

  // Generate news using Gemini
  private async generateGeminiNews(): Promise<HybridNewsItem[]> {
    try {
      console.log('Generating news with Gemini...');
      
      const prompt = `
        Bugünün en önemli tech gelişmelerini Türkçe olarak hızlı bir şekilde özetle.
        Aşağıdaki kategorilerde güncel haberler ver:
        - AI ve Machine Learning
        - Web Development
        - Mobile Technology
        - Cybersecurity
        - Startup ve Entrepreneurship
        - Cloud Computing
        
        Her haber için JSON formatında:
        {
          "title": "Başlık",
          "content": "Detaylı içerik",
          "summary": "Özet",
          "category": "Kategori",
          "tags": ["tag1", "tag2"],
          "source": "Kaynak",
          "url": "https://example.com",
          "priority": "high/medium/low",
          "quality": 0.8
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3000,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates[0]?.content?.parts[0]?.text;
      
      if (content) {
        const newsData = JSON.parse(content);
        return Array.isArray(newsData) ? newsData.map((item: any, index: number) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: item.title || `Gemini Haber ${index + 1}`,
          content: item.content || item.summary || '',
          summary: item.summary || item.content || '',
          category: item.category || 'Genel',
          tags: item.tags || ['tech'],
          source: item.source || 'Gemini AI',
          url: item.url || '#',
          publishedAt: new Date().toISOString(),
          imageUrl: item.imageUrl,
          author: 'Gemini AI',
          readTime: Math.ceil((item.content || '').split(' ').length / 200),
          priority: item.priority || 'medium',
          language: this.config.language,
          gptScore: 0,
          geminiScore: item.quality || 0.8,
          hybridScore: item.quality || 0.8
        })) : [];
      }

      return [];
    } catch (error) {
      console.error('Error generating Gemini news:', error);
      return [];
    }
  }

  // Combine news from both sources
  private combineNews(gptNews: HybridNewsItem[], geminiNews: HybridNewsItem[]): HybridNewsItem[] {
    const combined: HybridNewsItem[] = [];
    
    // Add GPT news with weight
    gptNews.forEach(news => {
      combined.push({
        ...news,
        id: `gpt_${news.id}`,
        source: 'GPT-4',
        author: 'GPT-4',
        hybridScore: news.gptScore * this.config.gptWeight
      });
    });
    
    // Add Gemini news with weight
    geminiNews.forEach(news => {
      combined.push({
        ...news,
        id: `gemini_${news.id}`,
        source: 'Gemini AI',
        author: 'Gemini AI',
        hybridScore: news.geminiScore * this.config.geminiWeight
      });
    });
    
    return combined;
  }

  // Filter news by quality
  private filterByQuality(news: HybridNewsItem[]): HybridNewsItem[] {
    return news.filter(item => {
      const qualityScore = this.calculateQualityScore(item);
      return qualityScore >= this.config.qualityThreshold;
    });
  }

  // Calculate quality score for a news item
  private calculateQualityScore(item: HybridNewsItem): number {
    let score = 0.5; // Base score
    
    // Content length score
    if (item.content.length > 500) score += 0.2;
    else if (item.content.length > 200) score += 0.1;
    
    // Tags score
    if (item.tags.length > 3) score += 0.1;
    else if (item.tags.length > 1) score += 0.05;
    
    // Priority score
    if (item.priority === 'high') score += 0.2;
    else if (item.priority === 'medium') score += 0.1;
    
    // Category score
    if (this.config.categories.includes(item.category)) score += 0.1;
    
    // Hybrid score
    score += item.hybridScore * 0.2;
    
    return Math.min(score, 1.0);
  }

  // Deduplicate and sort news
  private deduplicateAndSort(news: HybridNewsItem[]): HybridNewsItem[] {
    // Remove duplicates based on title similarity
    const unique = news.filter((item, index, arr) => {
      return arr.findIndex(other => 
        this.calculateSimilarity(item.title, other.title) > 0.8
      ) === index;
    });
    
    // Sort by priority and hybrid score
    return unique.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return b.hybridScore - a.hybridScore;
    }).slice(0, this.config.maxNews);
  }

  // Calculate similarity between two strings
  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  }

  // Calculate quality metrics
  private calculateQualityMetrics(gptNews: HybridNewsItem[], geminiNews: HybridNewsItem[], finalNews: HybridNewsItem[]) {
    const gptQuality = gptNews.length > 0 ? 
      gptNews.reduce((sum, item) => sum + item.gptScore, 0) / gptNews.length : 0;
    
    const geminiQuality = geminiNews.length > 0 ? 
      geminiNews.reduce((sum, item) => sum + item.geminiScore, 0) / geminiNews.length : 0;
    
    const hybridQuality = finalNews.length > 0 ? 
      finalNews.reduce((sum, item) => sum + item.hybridScore, 0) / finalNews.length : 0;
    
    const averageQuality = finalNews.length > 0 ? 
      finalNews.reduce((sum, item) => sum + this.calculateQualityScore(item), 0) / finalNews.length : 0;
    
    return {
      average: averageQuality,
      gpt: gptQuality,
      gemini: geminiQuality,
      hybrid: hybridQuality
    };
  }

  // Get last generated time
  getLastGenerated(): Date | null {
    return this.lastGenerated;
  }
}

// Default configuration
export const defaultGPTGeminiConfig: HybridConfig = {
  useGPT: true,
  useGemini: true,
  gptWeight: 0.6,
  geminiWeight: 0.4,
  fallbackToGemini: true,
  categories: ['AI', 'Startup', 'Güvenlik', 'Web Development', 'Mobile', 'Cloud'],
  language: 'tr',
  maxNews: 25,
  qualityThreshold: 0.6
};

export const gptGeminiHybrid = new GPTGeminiHybrid(defaultGPTGeminiConfig);
