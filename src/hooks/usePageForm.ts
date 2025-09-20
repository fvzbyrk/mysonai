import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { pageSchema, type PageFormData } from '@/lib/validations/pages';

interface UsePageFormProps {
  defaultValues?: Partial<PageFormData>;
  onSubmit: (data: PageFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function usePageForm({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
}: UsePageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      status: 'draft',
      visibility: 'public',
      password: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      featuredImage: '',
      category: 'Genel',
      tags: [],
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: PageFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Slug otomatik oluşturma
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldır
      .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
      .replace(/-+/g, '-') // Çoklu tireleri tek tire yap
      .replace(/^-|-$/g, ''); // Başta ve sonda tire varsa kaldır
  };

  // Başlık değiştiğinde slug'ı otomatik güncelle
  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    
    // Eğer slug boşsa veya manuel olarak değiştirilmemişse otomatik oluştur
    const currentSlug = form.getValues('slug');
    if (!currentSlug || currentSlug === generateSlug(form.getValues('title'))) {
      const newSlug = generateSlug(title);
      form.setValue('slug', newSlug);
    }
  };

  // SEO başlığı otomatik oluşturma
  const generateSeoTitle = (title: string) => {
    return `${title} - MySonAI`;
  };

  // SEO açıklaması otomatik oluşturma
  const generateSeoDescription = (content: string) => {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // HTML taglarını kaldır
    return cleanContent.length > 160 
      ? cleanContent.substring(0, 157) + '...'
      : cleanContent;
  };

  // Başlık değiştiğinde SEO alanlarını otomatik güncelle
  const handleTitleBlur = () => {
    const title = form.getValues('title');
    const seoTitle = form.getValues('seoTitle');
    
    if (title && !seoTitle) {
      form.setValue('seoTitle', generateSeoTitle(title));
    }
  };

  // İçerik değiştiğinde SEO açıklamasını otomatik güncelle
  const handleContentBlur = () => {
    const content = form.getValues('content');
    const seoDescription = form.getValues('seoDescription');
    
    if (content && !seoDescription) {
      form.setValue('seoDescription', generateSeoDescription(content));
    }
  };

  // Etiket ekleme
  const addTag = (tag: string) => {
    const currentTags = form.getValues('tags') || [];
    const trimmedTag = tag.trim();
    
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      form.setValue('tags', [...currentTags, trimmedTag]);
    }
  };

  // Etiket kaldırma
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  // Form sıfırlama
  const resetForm = () => {
    form.reset();
  };

  // Form durumu kontrolü
  const isDirty = form.formState.isDirty;
  const isValid = form.formState.isValid;
  const errors = form.formState.errors;

  return {
    form,
    isSubmitting,
    isDirty,
    isValid,
    errors,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleTitleChange,
    handleTitleBlur,
    handleContentBlur,
    addTag,
    removeTag,
    resetForm,
    generateSlug,
    generateSeoTitle,
    generateSeoDescription,
  };
}
