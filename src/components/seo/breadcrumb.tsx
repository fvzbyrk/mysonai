'use client';

import { useSEOContext } from './seo-provider';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  homeUrl?: string;
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  className,
  showHome = true,
  homeUrl = '/',
  separator = <ChevronRight className="w-4 h-4" />
}: BreadcrumbProps) {
  const { generateBreadcrumbData, addStructuredData } = useSEOContext();

  // Generate structured data
  const structuredData = generateBreadcrumbData([
    ...(showHome ? [{ name: 'Ana Sayfa', url: homeUrl }] : []),
    ...items
  ]);

  // Add structured data to page
  useEffect(() => {
    addStructuredData(structuredData);
  }, [structuredData, addStructuredData]);

  const allItems = [
    ...(showHome ? [{ name: 'Ana Sayfa', url: homeUrl, current: false }] : []),
    ...items
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {item.current ? (
              <span
                className="text-gray-500 dark:text-gray-400"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {index === 0 && showHome ? (
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    {item.name}
                  </div>
                ) : (
                  item.name
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Breadcrumb for blog posts
export function BlogBreadcrumb({
  category,
  categoryUrl,
  title,
  className
}: {
  category: string;
  categoryUrl: string;
  title: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Blog', url: '/blog' },
    { name: category, url: categoryUrl },
    { name: title, url: '#', current: true }
  ];

  return (
    <Breadcrumb
      items={items}
      className={className}
    />
  );
}

// Breadcrumb for product pages
export function ProductBreadcrumb({
  category,
  categoryUrl,
  subcategory,
  subcategoryUrl,
  productName,
  className
}: {
  category: string;
  categoryUrl: string;
  subcategory?: string;
  subcategoryUrl?: string;
  productName: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: category, url: categoryUrl },
    ...(subcategory ? [{ name: subcategory, url: subcategoryUrl! }] : []),
    { name: productName, url: '#', current: true }
  ];

  return (
    <Breadcrumb
      items={items}
      className={className}
    />
  );
}

// Breadcrumb for service pages
export function ServiceBreadcrumb({
  serviceName,
  className
}: {
  serviceName: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { name: 'Hizmetler', url: '/services' },
    { name: serviceName, url: '#', current: true }
  ];

  return (
    <Breadcrumb
      items={items}
      className={className}
    />
  );
}
