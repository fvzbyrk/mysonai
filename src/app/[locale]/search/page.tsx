'use client';

import { useState, useEffect, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Clock,
  TrendingUp,
  FileText,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  ArrowRight,
  X,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { blogPosts, blogCategories } from '@/lib/blog-data';
import type { Metadata } from 'next';

// Search result types
interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'category' | 'service' | 'solution';
  category?: string;
  tags?: string[];
  relevance: number;
  lastModified?: string;
}

// Search filters
interface SearchFilters {
  type: string[];
  category: string[];
  dateRange: string;
}

export default function SearchPage({ params }: { params: { locale: Locale } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: [],
    category: [],
    dateRange: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

  const isTurkish = params.locale === 'tr';

  // Sample search data
  const searchData: SearchResult[] = [
    // Pages
    {
      id: 'home',
      title: isTurkish ? 'Ana Sayfa' : 'Home',
      description: isTurkish
        ? 'MySonAI ana sayfası - AI asistanları ve çözümleri'
        : 'MySonAI homepage - AI assistants and solutions',
      url: '/',
      type: 'page',
      relevance: 1.0,
    },
    {
      id: 'about',
      title: isTurkish ? 'Hakkımızda' : 'About Us',
      description: isTurkish
        ? 'Şirket hakkında bilgiler, ekip, misyon ve vizyon'
        : 'Company information, team, mission and vision',
      url: '/about',
      type: 'page',
      relevance: 0.9,
    },
    {
      id: 'services',
      title: isTurkish ? 'Hizmetler' : 'Services',
      description: isTurkish
        ? 'AI çözümleri, klasik bilişim, yazılım ihtiyaçları'
        : 'AI solutions, classic IT, software needs',
      url: '/services',
      type: 'service',
      relevance: 0.9,
    },
    {
      id: 'solutions',
      title: isTurkish ? 'Çözümler' : 'Solutions',
      description: isTurkish
        ? 'MySon marka çözümleri - Video, Firmatch, Avukat, Kids, Education, Music'
        : 'MySon brand solutions - Video, Firmatch, Avukat, Kids, Education, Music',
      url: '/solutions',
      type: 'solution',
      relevance: 0.9,
    },
    {
      id: 'pricing',
      title: isTurkish ? 'Fiyatlandırma' : 'Pricing',
      description: isTurkish
        ? 'Plan fiyatları, özellikler ve karşılaştırma'
        : 'Plan prices, features and comparison',
      url: '/pricing',
      type: 'page',
      relevance: 0.8,
    },
    {
      id: 'contact',
      title: isTurkish ? 'İletişim' : 'Contact',
      description: isTurkish ? 'İletişim bilgileri ve form' : 'Contact information and form',
      url: '/contact',
      type: 'page',
      relevance: 0.8,
    },
    {
      id: 'demo',
      title: isTurkish ? 'Demo' : 'Demo',
      description: isTurkish ? 'AI asistanları demo ve deneme' : 'AI assistants demo and trial',
      url: '/demo',
      type: 'page',
      relevance: 0.9,
    },
    {
      id: 'faq',
      title: isTurkish ? 'Sık Sorulan Sorular' : 'FAQ',
      description: isTurkish
        ? 'Sık sorulan sorular ve cevapları'
        : 'Frequently asked questions and answers',
      url: '/faq',
      type: 'page',
      relevance: 0.7,
    },
    // Blog posts
    ...blogPosts.map(post => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'blog' as const,
      category: post.category,
      tags: post.tags,
      relevance: post.featured ? 0.9 : 0.7,
      lastModified: post.updatedAt,
    })),
    // Blog categories
    ...blogCategories.map(category => ({
      id: category.slug,
      title: category.name,
      description: category.description,
      url: `/blog/kategori/${category.slug}`,
      type: 'category' as const,
      relevance: 0.6,
    })),
  ];

  // Popular searches
  const popularSearchesData = [
    isTurkish ? 'AI asistanları' : 'AI assistants',
    isTurkish ? 'fiyatlandırma' : 'pricing',
    isTurkish ? 'demo' : 'demo',
    isTurkish ? 'blog' : 'blog',
    isTurkish ? 'iletişim' : 'contact',
    isTurkish ? 'hizmetler' : 'services',
    isTurkish ? 'çözümler' : 'solutions',
    isTurkish ? 'SSS' : 'FAQ',
  ];

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      const results = searchData
        .filter(item => {
          const searchText =
            `${item.title} ${item.description} ${item.tags?.join(' ') || ''}`.toLowerCase();
          const queryLower = query.toLowerCase();

          return searchText.includes(queryLower);
        })
        .sort((a, b) => b.relevance - a.relevance);

      setSearchResults(results);
      setIsSearching(false);

      // Add to recent searches
      if (query.trim() && !recentSearches.includes(query.trim())) {
        setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
      }
    }, 300);
  };

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  // Filter results
  const filteredResults = useMemo(() => {
    let results = searchResults;

    if (filters.type.length > 0) {
      results = results.filter(result => filters.type.includes(result.type));
    }

    if (filters.category.length > 0) {
      results = results.filter(
        result => result.category && filters.category.includes(result.category)
      );
    }

    return results;
  }, [searchResults, filters]);

  // Get search suggestions
  const getSearchSuggestions = (query: string) => {
    if (!query.trim()) {
      return popularSearchesData.slice(0, 5);
    }

    return searchData
      .filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(item => item.title);
  };

  const suggestions = getSearchSuggestions(searchQuery);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Header */}
      <section className='py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              {isTurkish ? 'Arama' : 'Search'}
            </h1>
            <p className='text-xl text-gray-300'>
              {isTurkish
                ? 'MySonAI web sitesinde aradığınızı bulun'
                : "Find what you're looking for on MySonAI website"}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className='relative mb-8'>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <Input
                type='text'
                placeholder={isTurkish ? 'Arama yapın...' : 'Search...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-500'
              />
              <Button
                type='submit'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700'
              >
                <Search className='w-4 h-4' />
              </Button>
            </div>
          </form>

          {/* Search Suggestions */}
          {searchQuery && suggestions.length > 0 && (
            <div className='bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6'>
              <h3 className='text-white font-semibold mb-3'>
                {isTurkish ? 'Öneriler' : 'Suggestions'}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      performSearch(suggestion);
                    }}
                    className='px-3 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors'
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className='flex items-center justify-between mb-6'>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant='outline'
              className='border-white/20 text-white hover:bg-white/10'
            >
              <Filter className='w-4 h-4 mr-2' />
              {isTurkish ? 'Filtreler' : 'Filters'}
            </Button>

            {searchResults.length > 0 && (
              <p className='text-gray-300'>
                {isTurkish
                  ? `${searchResults.length} sonuç bulundu`
                  : `${searchResults.length} results found`}
              </p>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6 mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='text-white font-semibold mb-2 block'>
                    {isTurkish ? 'Tür' : 'Type'}
                  </label>
                  <div className='space-y-2'>
                    {['page', 'blog', 'service', 'solution'].map(type => (
                      <label key={type} className='flex items-center text-white'>
                        <input
                          type='checkbox'
                          checked={filters.type.includes(type)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, type: [...prev.type, type] }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                type: prev.type.filter(t => t !== type),
                              }));
                            }
                          }}
                          className='mr-2'
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='text-white font-semibold mb-2 block'>
                    {isTurkish ? 'Kategori' : 'Category'}
                  </label>
                  <div className='space-y-2'>
                    {blogCategories.map(category => (
                      <label key={category.slug} className='flex items-center text-white'>
                        <input
                          type='checkbox'
                          checked={filters.category.includes(category.slug)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                category: [...prev.category, category.slug],
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                category: prev.category.filter(c => c !== category.slug),
                              }));
                            }
                          }}
                          className='mr-2'
                        />
                        {category.name}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='text-white font-semibold mb-2 block'>
                    {isTurkish ? 'Tarih Aralığı' : 'Date Range'}
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={e => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className='w-full p-2 bg-white/10 border border-white/20 text-white rounded'
                  >
                    <option value='all'>{isTurkish ? 'Tümü' : 'All'}</option>
                    <option value='today'>{isTurkish ? 'Bugün' : 'Today'}</option>
                    <option value='week'>{isTurkish ? 'Bu Hafta' : 'This Week'}</option>
                    <option value='month'>{isTurkish ? 'Bu Ay' : 'This Month'}</option>
                  </select>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Search Results */}
      <section className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {isSearching ? (
            <div className='text-center py-12'>
              <div className='w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
              <p className='text-gray-300'>{isTurkish ? 'Aranıyor...' : 'Searching...'}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className='space-y-6'>
              {filteredResults.map((result, index) => (
                <Card
                  key={index}
                  className='bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors'
                >
                  <div className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center mb-2'>
                          <Badge variant='secondary' className='mr-3'>
                            {result.type}
                          </Badge>
                          {result.category && (
                            <Badge variant='outline' className='mr-3'>
                              {result.category}
                            </Badge>
                          )}
                        </div>

                        <Link
                          href={`/${params.locale}${result.url}`}
                          className='text-xl font-semibold text-white hover:text-purple-300 transition-colors mb-2 block'
                        >
                          {result.title}
                        </Link>

                        <p className='text-gray-300 mb-3'>{result.description}</p>

                        <div className='flex items-center text-sm text-gray-400'>
                          <span className='mr-4'>{result.url}</span>
                          {result.lastModified && (
                            <span className='flex items-center'>
                              <Clock className='w-4 h-4 mr-1' />
                              {new Date(result.lastModified).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight className='w-5 h-5 text-gray-400' />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <div className='text-center py-12'>
              <Search className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-white mb-2'>
                {isTurkish ? 'Sonuç bulunamadı' : 'No results found'}
              </h3>
              <p className='text-gray-300 mb-6'>
                {isTurkish
                  ? 'Arama kriterlerinize uygun sonuç bulunamadı. Farklı anahtar kelimeler deneyin.'
                  : 'No results found matching your search criteria. Try different keywords.'}
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                variant='outline'
                className='border-white/20 text-white hover:bg-white/10'
              >
                {isTurkish ? 'Temizle' : 'Clear'}
              </Button>
            </div>
          ) : (
            <div className='text-center py-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                  <TrendingUp className='w-8 h-8 text-purple-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    {isTurkish ? 'Popüler Aramalar' : 'Popular Searches'}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {popularSearchesData.slice(0, 6).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(search);
                          performSearch(search);
                        }}
                        className='px-3 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors'
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className='bg-white/10 backdrop-blur-md border-white/20 p-6'>
                  <Clock className='w-8 h-8 text-purple-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    {isTurkish ? 'Son Aramalar' : 'Recent Searches'}
                  </h3>
                  {recentSearches.length > 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(search);
                            performSearch(search);
                          }}
                          className='px-3 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors'
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className='text-gray-400 text-sm'>
                      {isTurkish ? 'Henüz arama yapılmadı' : 'No recent searches'}
                    </p>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
