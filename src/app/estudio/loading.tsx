import { Skeleton } from '@/components/Skeleton';

export default function EstudioLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-7 w-40 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto" />
      </div>
      <div className="flex gap-2 justify-center">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-5 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
