import { promises as fs } from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  category: string;
  tags: string[];
  source: string;
  priority: 'high' | 'medium' | 'low';
  author?: string;
  readTime?: number;
  imageUrl?: string;
  imageAlt?: string;
  createdAt: string;
  updatedAt: string;
}

class BlogStorage {
  private dataDir: string;
  private postsFile: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.postsFile = path.join(this.dataDir, 'blog-posts.json');
  }

  private async ensureDataDir(): Promise<void> {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      // console.error('Error creating data directory:', error);
    }
  }

  private async readPostsFile(): Promise<BlogPost[]> {
    try {
      await this.ensureDataDir();
      const data = await fs.readFile(this.postsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty array
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        return [];
      }
      // console.error('Error reading posts file:', error);
      return [];
    }
  }

  private async writePostsFile(posts: BlogPost[]): Promise<void> {
    try {
      await this.ensureDataDir();
      await fs.writeFile(this.postsFile, JSON.stringify(posts, null, 2), 'utf-8');
    } catch (error) {
      // console.error('Error writing posts file:', error);
      throw error;
    }
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return await this.readPostsFile();
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const posts = await this.readPostsFile();
    return posts.find(post => post.id === id) || null;
  }

  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const posts = await this.readPostsFile();
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await this.writePostsFile(posts);
    return newPost;
  }

  async updatePost(id: string, updateData: Partial<BlogPost>): Promise<BlogPost | null> {
    const posts = await this.readPostsFile();
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      return null;
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    await this.writePostsFile(posts);
    return posts[postIndex];
  }

  async deletePost(id: string): Promise<boolean> {
    const posts = await this.readPostsFile();
    const initialLength = posts.length;
    const filteredPosts = posts.filter(post => post.id !== id);

    if (filteredPosts.length === initialLength) {
      return false; // Post not found
    }

    await this.writePostsFile(filteredPosts);
    return true;
  }

  async getPostsByStatus(status: BlogPost['status']): Promise<BlogPost[]> {
    const posts = await this.readPostsFile();
    return posts.filter(post => post.status === status);
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.readPostsFile();
    return posts.filter(post => post.category === category);
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    const posts = await this.readPostsFile();
    const lowercaseQuery = query.toLowerCase();

    return posts.filter(
      post =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getPostsPaginated(
    limit: number = 10,
    offset: number = 0
  ): Promise<{
    posts: BlogPost[];
    total: number;
    hasMore: boolean;
  }> {
    const posts = await this.readPostsFile();
    const total = posts.length;
    const paginatedPosts = posts.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      posts: paginatedPosts,
      total,
      hasMore,
    };
  }

  // Backup and restore functionality
  async backupPosts(): Promise<string> {
    const posts = await this.readPostsFile();
    const backupFile = path.join(this.dataDir, `blog-posts-backup-${Date.now()}.json`);
    await fs.writeFile(backupFile, JSON.stringify(posts, null, 2), 'utf-8');
    return backupFile;
  }

  async restorePosts(backupFile: string): Promise<void> {
    const backupData = await fs.readFile(backupFile, 'utf-8');
    const posts = JSON.parse(backupData);
    await this.writePostsFile(posts);
  }

  // Initialize with default posts if empty
  async initializeDefaultPosts(): Promise<void> {
    const posts = await this.readPostsFile();

    if (posts.length === 0) {
      const defaultPosts: BlogPost[] = [
        {
          id: 'default-1',
          title: 'Günün Tech Gelişmeleri - 18.09.2025',
          content: `
            <h2>Yapay Zeka ve Gelecek</h2>
            <p>Bugün yapay zeka alanında önemli gelişmeler yaşandı. 
            OpenAI'nin yeni GPT-5 modeli duyuruldu ve performans testleri başladı.</p>
            
            <h3>Öne Çıkan Gelişmeler:</h3>
            <ul>
              <li>OpenAI GPT-5 duyurusu</li>
              <li>Google Gemini 2.0 beta sürümü</li>
              <li>Microsoft Copilot güncellemeleri</li>
              <li>AI güvenlik standartları</li>
            </ul>
            
            <p>Bu gelişmeler, yapay zeka teknolojisinin geleceğini şekillendirecek 
            önemli adımlar olarak değerlendiriliyor.</p>
          `,
          status: 'published',
          publishedAt: '2024-09-18T09:00:00Z',
          category: 'AI Teknolojisi',
          tags: ['tech', 'günlük', 'gelişmeler', 'ai'],
          source: 'Gemini AI',
          priority: 'high',
          author: 'MySonAI',
          readTime: 5,
          createdAt: '2024-09-18T09:00:00Z',
          updatedAt: '2024-09-18T09:00:00Z',
        },
        {
          id: 'default-2',
          title: 'Machine Learning Trendleri 2024',
          content: `
            <h2>Machine Learning'de Yeni Trendler</h2>
            <p>2024 yılında machine learning alanında önemli trendler ortaya çıktı. Bu trendler, gelecekteki teknoloji gelişmelerini etkileyecek.</p>
            
            <h3>Önemli Trendler:</h3>
            <ul>
              <li>Federated Learning</li>
              <li>AutoML platformları</li>
              <li>Edge AI uygulamaları</li>
              <li>Explainable AI</li>
            </ul>
          `,
          status: 'published',
          publishedAt: '2024-09-18T14:00:00Z',
          category: 'AI Teknolojisi',
          tags: ['ai', 'machine-learning', 'trend'],
          source: 'Gemini AI',
          priority: 'medium',
          author: 'MySonAI',
          readTime: 7,
          createdAt: '2024-09-18T14:00:00Z',
          updatedAt: '2024-09-18T14:00:00Z',
        },
      ];

      await this.writePostsFile(defaultPosts);
    }
  }
}

// Singleton instance
export const blogStorage = new BlogStorage();
