import { z } from 'zod';

// Sayfa oluşturma/düzenleme için validation schema
export const pageSchema = z.object({
  title: z
    .string()
    .min(1, 'Başlık gerekli')
    .min(3, 'Başlık en az 3 karakter olmalı')
    .max(200, 'Başlık en fazla 200 karakter olabilir'),
  
  slug: z
    .string()
    .min(1, 'URL slug gerekli')
    .min(2, 'URL slug en az 2 karakter olmalı')
    .max(100, 'URL slug en fazla 100 karakter olabilir')
    .regex(/^[a-z0-9-]+$/, 'URL slug sadece küçük harf, rakam ve tire içerebilir')
    .refine((slug) => !slug.startsWith('-') && !slug.endsWith('-'), {
      message: 'URL slug tire ile başlayamaz veya bitemez',
    }),
  
  content: z
    .string()
    .min(1, 'İçerik gerekli')
    .min(10, 'İçerik en az 10 karakter olmalı')
    .max(50000, 'İçerik en fazla 50,000 karakter olabilir'),
  
  excerpt: z
    .string()
    .max(500, 'Özet en fazla 500 karakter olabilir')
    .optional(),
  
  status: z
    .enum(['published', 'draft', 'archived'], {
      errorMap: () => ({ message: 'Geçersiz durum seçimi' }),
    })
    .default('draft'),
  
  visibility: z
    .enum(['public', 'private', 'password'], {
      errorMap: () => ({ message: 'Geçersiz görünürlük seçimi' }),
    })
    .default('public'),
  
  password: z
    .string()
    .min(4, 'Şifre en az 4 karakter olmalı')
    .max(50, 'Şifre en fazla 50 karakter olabilir')
    .optional()
    .refine((password, ctx) => {
      if (ctx.parent.visibility === 'password' && !password) {
        return false;
      }
      return true;
    }, {
      message: 'Şifreli sayfalar için şifre gerekli',
    }),
  
  seoTitle: z
    .string()
    .max(60, 'SEO başlığı en fazla 60 karakter olabilir')
    .optional(),
  
  seoDescription: z
    .string()
    .max(160, 'SEO açıklaması en fazla 160 karakter olabilir')
    .optional(),
  
  seoKeywords: z
    .array(z.string().min(1, 'Etiket boş olamaz'))
    .max(10, 'En fazla 10 SEO etiketi eklenebilir')
    .optional(),
  
  featuredImage: z
    .string()
    .url('Geçerli bir resim URL\'si girin')
    .optional(),
  
  category: z
    .string()
    .min(1, 'Kategori gerekli')
    .max(50, 'Kategori en fazla 50 karakter olabilir'),
  
  tags: z
    .array(z.string().min(1, 'Etiket boş olamaz'))
    .max(20, 'En fazla 20 etiket eklenebilir')
    .default([]),
});

// Sayfa oluşturma için schema (ID gerektirmez)
export const createPageSchema = pageSchema;

// Sayfa güncelleme için schema (ID gerekir)
export const updatePageSchema = pageSchema.extend({
  id: z.string().min(1, 'Sayfa ID gerekli'),
});

// Sayfa silme için schema
export const deletePageSchema = z.object({
  id: z.string().min(1, 'Sayfa ID gerekli'),
});

// Sayfa arama/filtreleme için schema
export const pageFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'published', 'draft', 'archived']).default('all'),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Sayfa durumu değiştirme için schema
export const changePageStatusSchema = z.object({
  id: z.string().min(1, 'Sayfa ID gerekli'),
  status: z.enum(['published', 'draft', 'archived'], {
    errorMap: () => ({ message: 'Geçersiz durum seçimi' }),
  }),
});

// Bulk operations için schema
export const bulkPageOperationSchema = z.object({
  pageIds: z.array(z.string().min(1)).min(1, 'En az bir sayfa seçilmeli'),
  operation: z.enum(['publish', 'unpublish', 'archive', 'delete'], {
    errorMap: () => ({ message: 'Geçersiz işlem seçimi' }),
  }),
});

// Type exports
export type PageFormData = z.infer<typeof pageSchema>;
export type CreatePageData = z.infer<typeof createPageSchema>;
export type UpdatePageData = z.infer<typeof updatePageSchema>;
export type DeletePageData = z.infer<typeof deletePageSchema>;
export type PageFilterData = z.infer<typeof pageFilterSchema>;
export type ChangePageStatusData = z.infer<typeof changePageStatusSchema>;
export type BulkPageOperationData = z.infer<typeof bulkPageOperationSchema>;
