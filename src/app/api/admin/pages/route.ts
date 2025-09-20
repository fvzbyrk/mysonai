import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PageStatus, Visibility } from '@prisma/client';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  visibility: 'public' | 'private' | 'password';
  seoTitle?: string;
  seoDescription?: string;
  lastModified: string;
  author: string;
  views: number;
  category: string;
  tags: string[];
}
// Helper function to convert Prisma page to API response format
const formatPage = (page: any): Page => ({
  id: page.id,
  title: page.title,
  slug: page.slug,
  content: page.content,
  status: page.status.toLowerCase(),
  visibility: page.visibility.toLowerCase(),
  seoTitle: page.seoTitle,
  seoDescription: page.seoDescription,
  lastModified: page.updatedAt.toISOString().split('T')[0],
  author: page.author?.name || 'Admin',
  views: page.views,
  category: page.category,
  tags: page.tags,
});

export async function GET(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    // Token doğrulama burada yapılacak
    // Şimdilik basit kontrol
    if (!token || token.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    // Query parametrelerini al
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    // Prisma query oluştur
    const where: any = {};

    // Durum filtresi
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    // Kategori filtresi
    if (category && category !== 'all') {
      where.category = category;
    }

    // Arama filtresi
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Sayfaları veritabanından al
    const pages = await prisma.page.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // İstatistikleri hesapla
    const stats = await prisma.page.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        views: true,
      },
    });

    const statusStats = await prisma.page.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const formattedStats = {
      total: stats._count.id,
      published: statusStats.find(s => s.status === 'PUBLISHED')?._count.id || 0,
      draft: statusStats.find(s => s.status === 'DRAFT')?._count.id || 0,
      archived: statusStats.find(s => s.status === 'ARCHIVED')?._count.id || 0,
      totalViews: stats._sum.views || 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        pages: pages.map(formatPage),
        stats: formattedStats,
        total: pages.length,
      },
    });

  } catch (error) {
    console.error('Pages API error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, slug, content, status, visibility, seoTitle, seoDescription, category, tags } = body;

    // Validasyon
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: 'Başlık, slug ve içerik gerekli' },
        { status: 400 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { success: false, error: 'Bu slug zaten kullanılıyor' },
        { status: 400 }
      );
    }

    // Yeni sayfa oluştur
    const newPage = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        status: (status?.toUpperCase() || 'DRAFT') as PageStatus,
        visibility: (visibility?.toUpperCase() || 'PUBLIC') as Visibility,
        seoTitle,
        seoDescription,
        category: category || 'Genel',
        tags: tags || [],
        publishedAt: status?.toLowerCase() === 'published' ? new Date() : null,
        authorId: 'admin-user-id', // Gerçek uygulamada token'dan alınacak
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: formatPage(newPage),
      message: 'Sayfa başarıyla oluşturuldu',
    });

  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title, slug, content, status, visibility, seoTitle, seoDescription, category, tags } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Sayfa ID gerekli' },
        { status: 400 }
      );
    }

    // Sayfayı bul
    const existingPage = await prisma.page.findUnique({
      where: { id },
    });

    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Sayfa bulunamadı' },
        { status: 404 }
      );
    }

    // Slug değiştiyse benzersizlik kontrolü
    if (slug && slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Bu slug zaten kullanılıyor' },
          { status: 400 }
        );
      }
    }

    // Sayfayı güncelle
    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(status && { status: status.toUpperCase() as PageStatus }),
        ...(visibility && { visibility: visibility.toUpperCase() as Visibility }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(status?.toLowerCase() === 'published' && !existingPage.publishedAt && { publishedAt: new Date() }),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: formatPage(updatedPage),
      message: 'Sayfa başarıyla güncellendi',
    });

  } catch (error) {
    console.error('Update page error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Sayfa ID gerekli' },
        { status: 400 }
      );
    }

    // Sayfayı bul
    const existingPage = await prisma.page.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!existingPage) {
      return NextResponse.json(
        { success: false, error: 'Sayfa bulunamadı' },
        { status: 404 }
      );
    }

    // Sayfayı sil
    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: formatPage(existingPage),
      message: 'Sayfa başarıyla silindi',
    });

  } catch (error) {
    console.error('Delete page error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
