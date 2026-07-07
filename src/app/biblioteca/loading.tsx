import { Skeleton, CardSkeleton } from '@/components/Skeleton';

export default function BibliotecaLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <Skeleton className="h-3 w-40 mx-auto" />
        <Skeleton className="h-7 w-56 mx-auto" />
      </div>
      <Skeleton className="h-10 w-full max-w-sm mx-auto" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
