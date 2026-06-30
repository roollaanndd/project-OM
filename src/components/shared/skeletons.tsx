"use client";

/**
 * Reusable skeleton loaders for async content.
 * These match the layout of actual components to prevent layout shift.
 */

export function SectionSkeleton() {
  return (
    <div className="py-20" role="status" aria-label="Memuat konten">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto h-6 w-48 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        <div className="mx-auto mt-4 h-10 w-72 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-3xl bg-pink-200/60 dark:bg-pink-900/40"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Sedang memuat...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm dark:border-pink-900/40 dark:bg-pink-950/30"
      role="status"
      aria-label="Memuat kartu"
    >
      <div className="aspect-[4/3] animate-pulse bg-pink-200/60 dark:bg-pink-900/40" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        <div className="h-3 w-full animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        <div className="flex justify-between pt-3">
          <div className="h-6 w-20 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" role="status">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-pink-100 dark:border-pink-900/40" role="status">
      <div className="border-b border-pink-100 bg-pink-50/40 px-4 py-3 dark:border-pink-900/40 dark:bg-pink-950/20">
        <div className="h-4 w-32 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
      </div>
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-pink-50 px-4 py-3 dark:border-pink-900/30"
        >
          <div className="h-9 w-9 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
            <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-pink-200/40 dark:bg-pink-900/30" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-pink-200/60 dark:bg-pink-900/40" />
        </div>
      ))}
    </div>
  );
}
