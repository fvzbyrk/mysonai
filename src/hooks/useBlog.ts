"use client"

import { useState, useEffect } from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: string
  image?: string
  featured: boolean
  content?: string
  relatedPosts?: Array<{
    id: string
    title: string
  }>
}

export interface BlogCategory {
  id: string
  name: string
  count: number
}

export function useBlog() {
  const { enabled: blogEnabled } = useFeatureFlag('blog')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock blog data - In real app, this would come from API/CMS
  const mockPosts: BlogPost[] = [
    {
      id: 'mysonai-vs-pi-analysis',
      title: 'MySonAI vs Pi: Hız, Gizlilik ve Empati Analizi',
      excerpt: 'Pi kullanıcılarının yaşadığı sorunları çözen MySonAI\'ın avantajlarını detaylı analiz ediyoruz.',
      category: 'Karşılaştırma',
      readTime: '8 dk',
      date: '2024-01-15',
      author: 'MySonAI Ekibi',
      featured: true,
      content: `
        <h2>Giriş</h2>
        <p>Kişisel AI asistanı pazarında Pi, kullanıcıların empatik bir yoldaş aradığında ilk tercih ettikleri platformlardan biri. Ancak son zamanlarda kullanıcı geri bildirimleri, Pi'nin bazı kritik alanlarda yetersiz kaldığını gösteriyor.</p>
        
        <h2>Hız Karşılaştırması</h2>
        <p><strong>Pi'nin Sorunu:</strong> Kullanıcılar Pi ile sohbet ederken yarım ila bir dakika arasında yanıt beklemek zorunda kalıyor.</p>
        <p><strong>MySonAI'ın Çözümü:</strong> Optimize edilmiş altyapı sayesinde MySonAI, Pi'den <strong>10 kat daha hızlı</strong> yanıt veriyor.</p>
      `,
      relatedPosts: [
        { id: 'ai-privacy-guide', title: 'Kişisel AI Asistanınız Güvenli Mi?' },
        { id: 'ai-companion-guide', title: 'AI Yoldaşı Nasıl Kullanılır?' }
      ]
    },
    {
      id: 'ai-privacy-guide',
      title: 'Kişisel AI Asistanınız Güvenli Mi? Gizlilik Rehberi',
      excerpt: 'AI asistanlarında veri güvenliği nasıl sağlanır? MySonAI\'ın gizlilik politikası ve güvenlik önlemleri.',
      category: 'Güvenlik',
      readTime: '6 dk',
      date: '2024-01-12',
      author: 'Güvenlik Uzmanı',
      featured: true,
      content: `
        <h2>AI Asistanlarında Veri Güvenliği</h2>
        <p>Kişisel AI asistanları kullanırken en önemli endişelerden biri veri güvenliği. Bu yazıda, MySonAI'ın verilerinizi nasıl koruduğunu detaylı olarak açıklıyoruz.</p>
        
        <h2>End-to-End Şifreleme</h2>
        <p>MySonAI, tüm konuşmalarınızı end-to-end şifreleme ile koruyor.</p>
      `,
      relatedPosts: [
        { id: 'mysonai-vs-pi-analysis', title: 'MySonAI vs Pi Analizi' },
        { id: 'turkish-ai-assistants', title: 'Türkçe AI Asistanları' }
      ]
    },
    {
      id: 'ai-companion-guide',
      title: 'AI Yoldaşı Nasıl Kullanılır? Başlangıç Kılavuzu',
      excerpt: 'Yapay zeka asistanınızla daha etkili iletişim kurma yolları ve profesyonel kullanım ipuçları.',
      category: 'Rehber',
      readTime: '10 dk',
      date: '2024-01-10',
      author: 'AI Uzmanı',
      featured: false
    },
    {
      id: 'turkish-ai-assistants',
      title: 'Türkçe AI Asistanları: Dil ve Kültür Uyumu',
      excerpt: 'Türkçe konuşan AI asistanlarının avantajları ve MySonAI\'ın dil anlayışındaki farklar.',
      category: 'Teknoloji',
      readTime: '7 dk',
      date: '2024-01-08',
      author: 'Dil Uzmanı',
      featured: false
    },
    {
      id: 'ai-productivity-tips',
      title: 'AI Asistanınızla Verimliliği Artırmanın 10 Yolu',
      excerpt: 'Günlük görevlerinizi AI asistanınızla nasıl optimize edersiniz? Pratik ipuçları ve stratejiler.',
      category: 'Verimlilik',
      readTime: '9 dk',
      date: '2024-01-05',
      author: 'Verimlilik Uzmanı',
      featured: false
    },
    {
      id: 'ai-education-benefits',
      title: 'Öğrenciler İçin AI Asistanı: Eğitimde Devrim',
      excerpt: 'MySonAI\'ın öğrencilere sunduğu avantajlar ve eğitim sürecini nasıl dönüştürdüğü.',
      category: 'Eğitim',
      readTime: '8 dk',
      date: '2024-01-03',
      author: 'Eğitim Uzmanı',
      featured: false
    }
  ]

  // Fetch blog posts
  const fetchPosts = async () => {
    if (!blogEnabled) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setPosts(mockPosts)
      
      // Generate categories from posts
      const categoryMap = new Map<string, number>()
      mockPosts.forEach(post => {
        const count = categoryMap.get(post.category) || 0
        categoryMap.set(post.category, count + 1)
      })
      
      const categoryList: BlogCategory[] = [
        { id: 'all', name: 'Tümü', count: mockPosts.length },
        ...Array.from(categoryMap.entries()).map(([name, count]) => ({
          id: name.toLowerCase(),
          name,
          count
        }))
      ]
      
      setCategories(categoryList)
    } catch (err) {
      setError('Blog yazıları yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Get post by ID
  const getPost = (id: string): BlogPost | undefined => {
    return posts.find(post => post.id === id)
  }

  // Get posts by category
  const getPostsByCategory = (category: string): BlogPost[] => {
    if (category === 'all' || category === 'Tümü') {
      return posts
    }
    return posts.filter(post => post.category === category)
  }

  // Get featured posts
  const getFeaturedPosts = (): BlogPost[] => {
    return posts.filter(post => post.featured)
  }

  // Get regular posts
  const getRegularPosts = (): BlogPost[] => {
    return posts.filter(post => !post.featured)
  }

  // Search posts
  const searchPosts = (query: string): BlogPost[] => {
    if (!query.trim()) return posts
    
    const lowercaseQuery = query.toLowerCase()
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Get related posts
  const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
    const currentPost = getPost(postId)
    if (!currentPost) return []
    
    return posts
      .filter(post => 
        post.id !== postId && 
        post.category === currentPost.category
      )
      .slice(0, limit)
  }

  // Get recent posts
  const getRecentPosts = (limit: number = 5): BlogPost[] => {
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }

  // Fetch posts on mount
  useEffect(() => {
    if (blogEnabled) {
      fetchPosts()
    }
  }, [blogEnabled])

  return {
    posts,
    categories,
    loading,
    error,
    blogEnabled,
    fetchPosts,
    getPost,
    getPostsByCategory,
    getFeaturedPosts,
    getRegularPosts,
    searchPosts,
    getRelatedPosts,
    getRecentPosts,
  }
}
