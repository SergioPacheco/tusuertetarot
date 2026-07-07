import { Skeleton, TextBlockSkeleton } from '@/components/Skeleton';

export default function CardDetailLoading() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Skeleton className="h-3 w-32" />

      {/* Hero */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start">
        <Skeleton className="w-[200px] sm:w-[240px] mx-auto sm:mx-0 aspect-[520/910]" />
        <div className="space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-48" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
          <TextBlockSkeleton />
          <TextBlockSkeleton />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <TextBlockSkeleton />
        <TextBlockSkeleton />
        <TextBlockSkeleton />
      </div>
    </div>
  );
}
