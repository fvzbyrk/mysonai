import { Skeleton } from './skeleton';

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Skeleton className="h-16 w-64 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Grid Skeleton
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

// Service Card Skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
      <Skeleton className="h-6 w-32 mx-auto mb-4" />
      <Skeleton className="h-4 w-full mb-4" />
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Team Member Skeleton
export function TeamMemberSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
      <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
      <Skeleton className="h-5 w-24 mx-auto mb-2" />
      <Skeleton className="h-4 w-20 mx-auto mb-3" />
      <Skeleton className="h-4 w-full mb-4" />
      <div className="flex flex-wrap justify-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

// Blog Post Skeleton
export function BlogPostSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <Skeleton className="h-48 w-full mb-4 rounded-lg" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

// Chat Message Skeleton
export function ChatMessageSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-5 py-4 rounded-2xl bg-white/15 border border-white/20">
        <div className="flex items-start space-x-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <div className="flex-1">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-3 w-16 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-12 w-32 mx-auto" />
      </div>
    </div>
  );
}
