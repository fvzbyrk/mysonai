import { autoBlogGenerator } from './auto-blog-generator';
import { grokAPI } from './grok-api';

// Cron job scheduler for automated blog posting
export class CronScheduler {
  private jobs: Map<string, NodeJS.Timeout> = new Map();
  private isRunning: boolean = false;

  constructor() {
    this.start();
  }

  // Start the scheduler
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Cron scheduler started');
    
    // Schedule daily tech news at 9 AM
    this.scheduleDailyTechNews();
    
    // Schedule trending topics at 2 PM
    this.scheduleTrendingTopics();
    
    // Schedule weekly summary on Sundays at 6 PM
    this.scheduleWeeklySummary();
  }

  // Stop the scheduler
  stop(): void {
    this.isRunning = false;
    
    // Clear all scheduled jobs
    this.jobs.forEach((job, name) => {
      clearTimeout(job);
      console.log(`Stopped job: ${name}`);
    });
    
    this.jobs.clear();
    console.log('Cron scheduler stopped');
  }

  // Schedule daily tech news
  private scheduleDailyTechNews(): void {
    const jobName = 'daily-tech-news';
    
    // Calculate next 9 AM
    const now = new Date();
    const next9AM = new Date();
    next9AM.setHours(9, 0, 0, 0);
    
    // If it's already past 9 AM today, schedule for tomorrow
    if (now >= next9AM) {
      next9AM.setDate(next9AM.getDate() + 1);
    }
    
    const timeUntilNext = next9AM.getTime() - now.getTime();
    
    const job = setTimeout(async () => {
      try {
        console.log('Running daily tech news job...');
        await this.generateDailyTechNews();
        
        // Schedule next day
        this.scheduleDailyTechNews();
      } catch (error) {
        console.error('Daily tech news job failed:', error);
      }
    }, timeUntilNext);
    
    this.jobs.set(jobName, job);
    console.log(`Scheduled daily tech news for: ${next9AM.toISOString()}`);
  }

  // Schedule trending topics
  private scheduleTrendingTopics(): void {
    const jobName = 'trending-topics';
    
    // Calculate next 2 PM
    const now = new Date();
    const next2PM = new Date();
    next2PM.setHours(14, 0, 0, 0);
    
    // If it's already past 2 PM today, schedule for tomorrow
    if (now >= next2PM) {
      next2PM.setDate(next2PM.getDate() + 1);
    }
    
    const timeUntilNext = next2PM.getTime() - now.getTime();
    
    const job = setTimeout(async () => {
      try {
        console.log('Running trending topics job...');
        await this.generateTrendingTopics();
        
        // Schedule next day
        this.scheduleTrendingTopics();
      } catch (error) {
        console.error('Trending topics job failed:', error);
      }
    }, timeUntilNext);
    
    this.jobs.set(jobName, job);
    console.log(`Scheduled trending topics for: ${next2PM.toISOString()}`);
  }

  // Schedule weekly summary
  private scheduleWeeklySummary(): void {
    const jobName = 'weekly-summary';
    
    // Calculate next Sunday at 6 PM
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(18, 0, 0, 0);
    
    // If it's already past 6 PM this Sunday, schedule for next Sunday
    if (now >= nextSunday) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }
    
    const timeUntilNext = nextSunday.getTime() - now.getTime();
    
    const job = setTimeout(async () => {
      try {
        console.log('Running weekly summary job...');
        await this.generateWeeklySummary();
        
        // Schedule next week
        this.scheduleWeeklySummary();
      } catch (error) {
        console.error('Weekly summary job failed:', error);
      }
    }, timeUntilNext);
    
    this.jobs.set(jobName, job);
    console.log(`Scheduled weekly summary for: ${nextSunday.toISOString()}`);
  }

  // Generate daily tech news
  private async generateDailyTechNews(): Promise<void> {
    try {
      const blogPost = await autoBlogGenerator.generateDailyTechPost();
      
      if (blogPost) {
        console.log(`Generated daily tech post: ${blogPost.title}`);
        
        // Here you would save to database and publish
        // await saveBlogPost(blogPost);
        // await publishBlogPost(blogPost);
        
        // Send notification
        await this.sendNotification('Daily tech news generated', blogPost.title);
      } else {
        console.log('No relevant news found for today');
      }
    } catch (error) {
      console.error('Error generating daily tech news:', error);
    }
  }

  // Generate trending topics
  private async generateTrendingTopics(): Promise<void> {
    try {
      const trendingTopics = await grokAPI.getTrendingTopics();
      
      if (trendingTopics.length > 0) {
        console.log(`Found ${trendingTopics.length} trending topics`);
        
        // Create blog post about trending topics
        const blogPost = await autoBlogGenerator.generateDailyTechPost();
        
        if (blogPost) {
          console.log(`Generated trending topics post: ${blogPost.title}`);
          
          // Here you would save to database and publish
          // await saveBlogPost(blogPost);
          // await publishBlogPost(blogPost);
          
          // Send notification
          await this.sendNotification('Trending topics post generated', blogPost.title);
        }
      } else {
        console.log('No trending topics found');
      }
    } catch (error) {
      console.error('Error generating trending topics:', error);
    }
  }

  // Generate weekly summary
  private async generateWeeklySummary(): Promise<void> {
    try {
      console.log('Generating weekly summary...');
      
      // Get news from the past week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      // Create weekly summary post
      const blogPost = await autoBlogGenerator.generateDailyTechPost();
      
      if (blogPost) {
        console.log(`Generated weekly summary: ${blogPost.title}`);
        
        // Here you would save to database and publish
        // await saveBlogPost(blogPost);
        // await publishBlogPost(blogPost);
        
        // Send notification
        await this.sendNotification('Weekly summary generated', blogPost.title);
      }
    } catch (error) {
      console.error('Error generating weekly summary:', error);
    }
  }

  // Send notification
  private async sendNotification(title: string, message: string): Promise<void> {
    try {
      // Here you would implement notification sending
      // e.g., email, Slack, Discord, etc.
      console.log(`Notification: ${title} - ${message}`);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Get job status
  getJobStatus(): { [key: string]: string } {
    const status: { [key: string]: string } = {};
    
    this.jobs.forEach((job, name) => {
      status[name] = 'scheduled';
    });
    
    return status;
  }

  // Manually trigger a job
  async triggerJob(jobName: string): Promise<void> {
    switch (jobName) {
      case 'daily-tech-news':
        await this.generateDailyTechNews();
        break;
      case 'trending-topics':
        await this.generateTrendingTopics();
        break;
      case 'weekly-summary':
        await this.generateWeeklySummary();
        break;
      default:
        throw new Error(`Unknown job: ${jobName}`);
    }
  }
}

// Export singleton instance
export const cronScheduler = new CronScheduler();
