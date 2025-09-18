import { grokAPI, GrokNewsItem } from './grok-api';

export interface AutoBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
  featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  source: string;
  originalUrl: string;
  imageUrl?: string;
  readTime: number;
  priority: 'high' | 'medium' | 'low';
  language: 'tr' | 'en';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface BlogGenerationConfig {
  autoPublish: boolean;
  publishSchedule: string; // cron expression
  categories: string[];
  tags: string[];
  language: 'tr' | 'en';
  maxPostsPerDay: number;
  contentTemplate: string;
  seoOptimization: boolean;
  imageGeneration: boolean;
  socialSharing: boolean;
}

class AutoBlogGenerator {
  private config: BlogGenerationConfig;
  private generatedPosts: AutoBlogPost[] = [];

  constructor(config: BlogGenerationConfig) {
    this.config = config;
  }

  // Generate daily tech news post
  async generateDailyTechPost(): Promise<AutoBlogPost | null> {
    try {
      const newsItems = await grokAPI.getDailyTechNews();
      
      if (newsItems.length === 0) {
        console.log('No news items found from Grok');
        return null;
      }

      // Filter and prioritize news
      const filteredNews = this.filterAndPrioritizeNews(newsItems);
      
      if (filteredNews.length === 0) {
        console.log('No relevant news items found');
        return null;
      }

      // Generate blog post content
      const blogPost = await this.createBlogPostFromNews(filteredNews);
      
      if (blogPost) {
        this.generatedPosts.push(blogPost);
        console.log(`Generated blog post: ${blogPost.title}`);
      }

      return blogPost;
    } catch (error) {
      console.error('Error generating daily tech post:', error);
      return null;
    }
  }

  // Filter and prioritize news items
  private filterAndPrioritizeNews(newsItems: GrokNewsItem[]): GrokNewsItem[] {
    return newsItems
      .filter(item => {
        // Filter by categories
        if (this.config.categories.length > 0) {
          return this.config.categories.some(cat => 
            item.category.toLowerCase().includes(cat.toLowerCase())
          );
        }
        return true;
      })
      .filter(item => {
        // Filter by language
        return item.language === this.config.language;
      })
      .sort((a, b) => {
        // Sort by priority
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, this.config.maxPostsPerDay);
  }

  // Create blog post from news items
  private async createBlogPostFromNews(newsItems: GrokNewsItem[]): Promise<AutoBlogPost | null> {
    if (newsItems.length === 0) return null;

    const mainNews = newsItems[0];
    const otherNews = newsItems.slice(1);

    // Generate title
    const title = this.generateTitle(mainNews, otherNews);
    
    // Generate content
    const content = await this.generateContent(mainNews, otherNews);
    
    // Generate excerpt
    const excerpt = this.generateExcerpt(content);
    
    // Generate slug
    const slug = this.generateSlug(title);
    
    // Generate SEO data
    const seoData = this.generateSEOData(title, content, mainNews.tags);
    
    // Generate tags
    const tags = this.generateTags(mainNews, otherNews);
    
    // Generate category
    const category = this.generateCategory(mainNews.category);

    const blogPost: AutoBlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      publishedAt: new Date().toISOString(),
      author: 'MySonAI Bot',
      featured: mainNews.priority === 'high',
      status: this.config.autoPublish ? 'published' : 'draft',
      source: 'Grok AI',
      originalUrl: mainNews.url,
      imageUrl: mainNews.imageUrl,
      readTime: this.calculateReadTime(content),
      priority: mainNews.priority,
      language: this.config.language,
      seoTitle: seoData.title,
      seoDescription: seoData.description,
      seoKeywords: seoData.keywords
    };

    return blogPost;
  }

  // Generate title
  private generateTitle(mainNews: GrokNewsItem, otherNews: GrokNewsItem[]): string {
    const date = new Date().toLocaleDateString('tr-TR');
    
    if (otherNews.length > 0) {
      return `Günün Tech Gelişmeleri - ${date}`;
    }
    
    return `${mainNews.title} - ${date}`;
  }

  // Generate content
  private async generateContent(mainNews: GrokNewsItem, otherNews: GrokNewsItem[]): Promise<string> {
    let content = '';
    
    // Main news
    content += `## ${mainNews.title}\n\n`;
    content += `${mainNews.content}\n\n`;
    content += `**Kaynak:** [${mainNews.source}](${mainNews.url})\n\n`;
    
    // Other news
    if (otherNews.length > 0) {
      content += `## 📰 Diğer Önemli Gelişmeler\n\n`;
      
      otherNews.forEach((news, index) => {
        content += `### ${index + 1}. ${news.title}\n\n`;
        content += `${news.summary}\n\n`;
        content += `**Kaynak:** [${news.source}](${news.url})\n\n`;
      });
    }
    
    // Add footer
    content += `---\n\n`;
    content += `*Bu içerik Grok AI tarafından otomatik olarak oluşturulmuştur.*\n`;
    content += `*Güncel tech gelişmeleri için bizi takip etmeye devam edin!*`;
    
    return content;
  }

  // Generate excerpt
  private generateExcerpt(content: string): string {
    const words = content.split(' ').slice(0, 30);
    return words.join(' ') + '...';
  }

  // Generate slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Generate SEO data
  private generateSEOData(title: string, content: string, tags: string[]): {
    title: string;
    description: string;
    keywords: string[];
  } {
    const description = content.substring(0, 160) + '...';
    const keywords = tags.slice(0, 10);
    
    return {
      title: `${title} | MySonAI Tech Blog`,
      description,
      keywords
    };
  }

  // Generate tags
  private generateTags(mainNews: GrokNewsItem, otherNews: GrokNewsItem[]): string[] {
    const allTags = new Set<string>();
    
    // Add main news tags
    mainNews.tags.forEach(tag => allTags.add(tag));
    
    // Add other news tags
    otherNews.forEach(news => {
      news.tags.forEach(tag => allTags.add(tag));
    });
    
    // Add default tags
    allTags.add('tech');
    allTags.add('günlük');
    allTags.add('gelişmeler');
    allTags.add('otomatik');
    
    return Array.from(allTags).slice(0, 15);
  }

  // Generate category
  private generateCategory(newsCategory: string): string {
    const categoryMap: { [key: string]: string } = {
      'ai': 'Yapay Zeka',
      'machine-learning': 'Yapay Zeka',
      'web': 'Web Development',
      'mobile': 'Mobile',
      'security': 'Güvenlik',
      'startup': 'Startup',
      'blockchain': 'Blockchain',
      'cloud': 'Cloud',
      'devops': 'DevOps'
    };
    
    return categoryMap[newsCategory.toLowerCase()] || 'Genel';
  }

  // Calculate read time
  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Get generated posts
  getGeneratedPosts(): AutoBlogPost[] {
    return this.generatedPosts;
  }

  // Clear generated posts
  clearGeneratedPosts(): void {
    this.generatedPosts = [];
  }
}

// Default configuration
export const defaultBlogConfig: BlogGenerationConfig = {
  autoPublish: true,
  publishSchedule: '0 9 * * *', // Every day at 9 AM
  categories: ['ai', 'web', 'mobile', 'security', 'startup'],
  tags: ['tech', 'günlük', 'gelişmeler'],
  language: 'tr',
  maxPostsPerDay: 3,
  contentTemplate: 'daily-tech-news',
  seoOptimization: true,
  imageGeneration: true,
  socialSharing: true
};

export const autoBlogGenerator = new AutoBlogGenerator(defaultBlogConfig);
