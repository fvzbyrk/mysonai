'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPostPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    category: 'AI Teknolojisi',
    tags: [] as string[],
    priority: 'medium' as 'high' | 'medium' | 'low',
    author: 'MySonAI',
    imageUrl: '',
    imageAlt: ''
  });
  const [newTag, setNewTag] = useState('');

  const categories = ['AI Teknolojisi', 'İş Dünyası', 'Eğitimler', 'Vaka Çalışmaları', 'Haberler'];
  const statuses = ['draft', 'published', 'scheduled'];
  const priorities = ['low', 'medium', 'high'];

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'create',
          postData: {
            ...formData,
            readTime: Math.ceil(formData.content.length / 200), // Approximate reading time
            publishedAt: new Date().toISOString()
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Makale başarıyla oluşturuldu!');
        // Redirect to blog management
        window.location.href = '/tr/admin/blog';
      } else {
        alert('Makale oluşturulurken hata oluştu: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Makale oluşturulurken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/tr/admin/blog">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog Yönetimi
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Yeni Makale</h1>
              <p className="text-gray-300">Yeni makale oluştur</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Oluşturuluyor...' : 'Oluştur'}
            </Button>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Başlık</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Makale başlığı..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">İçerik</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Makale içeriği..."
                className="w-full h-64 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-gray-800">
                      {status === 'draft' ? 'Taslak' : 
                       status === 'published' ? 'Yayınlandı' : 
                       status === 'scheduled' ? 'Zamanlanmış' : status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Öncelik</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority} className="bg-gray-800">
                      {priority === 'high' ? 'Yüksek' : 
                       priority === 'medium' ? 'Orta' : 
                       priority === 'low' ? 'Düşük' : priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Yazar</label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Yazar adı..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Etiketler</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-white/10 border-white/30 text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Yeni etiket ekle..."
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button 
                  onClick={addTag}
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Ekle
                </Button>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Görsel URL</label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Görsel Açıklaması</label>
              <Input
                value={formData.imageAlt}
                onChange={(e) => setFormData(prev => ({ ...prev, imageAlt: e.target.value }))}
                placeholder="Görsel açıklaması..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

