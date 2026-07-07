export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton-shimmer rounded-xl ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <Skeleton className="w-full aspect-[520/910] rounded-xl" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
    </div>
  );
}

export function TextBlockSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
