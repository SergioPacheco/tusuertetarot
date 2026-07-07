import { Skeleton } from '@/components/Skeleton';

export default function TiradaLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-3 w-32 mx-auto" />
        <Skeleton className="h-7 w-48 mx-auto" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 space-y-3">
            <Skeleton className="h-8 w-8 rounded-full mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
