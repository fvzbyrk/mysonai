-- Pages Management Schema for Admin Panel
-- Bu dosya sayfa yönetimi için gerekli tabloları oluşturur

-- Create pages table
CREATE TABLE public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'password')),
  password TEXT, -- Şifreli sayfalar için
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  featured_image TEXT,
  category TEXT DEFAULT 'Genel',
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_versions table for version control
CREATE TABLE public.page_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_id, version_number)
);

-- Create page_comments table
CREATE TABLE public.page_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.page_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_analytics table
CREATE TABLE public.page_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  time_on_page INTEGER DEFAULT 0, -- seconds
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_id, date)
);

-- Create admin_logs table for audit trail
CREATE TABLE public.admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- 'page', 'user', 'settings', etc.
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages table
-- Admin users can do everything
CREATE POLICY "Admins can manage all pages" ON public.pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

-- Regular users can view published public pages
CREATE POLICY "Users can view published public pages" ON public.pages
  FOR SELECT USING (
    status = 'published' 
    AND visibility = 'public'
  );

-- Authors can manage their own pages
CREATE POLICY "Authors can manage own pages" ON public.pages
  FOR ALL USING (auth.uid() = author_id);

-- RLS Policies for page_versions table
CREATE POLICY "Admins can manage all page versions" ON public.page_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

CREATE POLICY "Authors can manage own page versions" ON public.page_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE id = page_id 
      AND author_id = auth.uid()
    )
  );

-- RLS Policies for page_comments table
CREATE POLICY "Users can view approved comments" ON public.page_comments
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can create comments" ON public.page_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.page_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments" ON public.page_comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

-- RLS Policies for page_analytics table
CREATE POLICY "Admins can view all analytics" ON public.page_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

CREATE POLICY "Authors can view own page analytics" ON public.page_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE id = page_id 
      AND author_id = auth.uid()
    )
  );

-- RLS Policies for admin_logs table
CREATE POLICY "Admins can view admin logs" ON public.admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

CREATE POLICY "Admins can create admin logs" ON public.admin_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND plan IN ('pro', 'enterprise')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_pages_status ON public.pages(status);
CREATE INDEX idx_pages_visibility ON public.pages(visibility);
CREATE INDEX idx_pages_category ON public.pages(category);
CREATE INDEX idx_pages_author_id ON public.pages(author_id);
CREATE INDEX idx_pages_published_at ON public.pages(published_at);
CREATE INDEX idx_pages_created_at ON public.pages(created_at);
CREATE INDEX idx_pages_tags ON public.pages USING GIN(tags);

CREATE INDEX idx_page_versions_page_id ON public.page_versions(page_id);
CREATE INDEX idx_page_versions_version_number ON public.page_versions(page_id, version_number);

CREATE INDEX idx_page_comments_page_id ON public.page_comments(page_id);
CREATE INDEX idx_page_comments_status ON public.page_comments(status);
CREATE INDEX idx_page_comments_created_at ON public.page_comments(created_at);

CREATE INDEX idx_page_analytics_page_id ON public.page_analytics(page_id);
CREATE INDEX idx_page_analytics_date ON public.page_analytics(date);

CREATE INDEX idx_admin_logs_admin_id ON public.admin_logs(admin_id);
CREATE INDEX idx_admin_logs_action ON public.admin_logs(action);
CREATE INDEX idx_admin_logs_resource_type ON public.admin_logs(resource_type);
CREATE INDEX idx_admin_logs_created_at ON public.admin_logs(created_at);

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_comments_updated_at BEFORE UPDATE ON public.page_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically set published_at when status changes to published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_pages_published_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION set_published_at();

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if user is admin
  IF EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND plan IN ('pro', 'enterprise')
  ) THEN
    INSERT INTO public.admin_logs (
      admin_id, 
      action, 
      resource_type, 
      resource_id, 
      old_values, 
      new_values
    ) VALUES (
      auth.uid(),
      TG_OP,
      'page',
      COALESCE(NEW.id, OLD.id),
      CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
      CASE WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW) ELSE to_jsonb(NEW) END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for admin logging
CREATE TRIGGER log_pages_admin_actions
  AFTER INSERT OR UPDATE OR DELETE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

-- Insert sample data
INSERT INTO public.pages (
  title, 
  slug, 
  content, 
  status, 
  visibility, 
  seo_title, 
  seo_description, 
  category, 
  tags,
  published_at
) VALUES 
(
  'Ana Sayfa',
  '/',
  'MySonAI ana sayfa içeriği...',
  'published',
  'public',
  'MySonAI - AI Destekli Blog Yazma Platformu',
  'AI teknolojisi ile profesyonel blog yazıları oluşturun',
  'Ana Sayfa',
  ARRAY['AI', 'Blog', 'Ana Sayfa'],
  NOW()
),
(
  'Hakkımızda',
  '/about',
  'MySonAI hakkında bilgiler...',
  'published',
  'public',
  'Hakkımızda - MySonAI',
  'MySonAI ekibi ve misyonumuz hakkında bilgiler',
  'Kurumsal',
  ARRAY['Hakkımızda', 'Ekip', 'Misyon'],
  NOW()
),
(
  'Blog Yazma Rehberi',
  '/blog-guide',
  'Blog yazma rehberi içeriği...',
  'draft',
  'public',
  'Blog Yazma Rehberi',
  'Etkili blog yazma teknikleri ve ipuçları',
  'Rehber',
  ARRAY['Blog', 'Rehber', 'Yazma'],
  NULL
),
(
  'AI Teknolojileri',
  '/ai-technologies',
  'AI teknolojileri hakkında detaylı bilgi...',
  'published',
  'public',
  'AI Teknolojileri - MySonAI',
  'Kullandığımız AI teknolojileri ve özellikleri',
  'Teknoloji',
  ARRAY['AI', 'Teknoloji', 'Makine Öğrenmesi'],
  NOW()
),
(
  'Gizlilik Politikası',
  '/privacy',
  'Gizlilik politikası metni...',
  'published',
  'public',
  'Gizlilik Politikası - MySonAI',
  'Kullanıcı verilerinin korunması ve gizlilik politikamız',
  'Yasal',
  ARRAY['Gizlilik', 'Yasal', 'KVKK'],
  NOW()
);
