export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
      <div className="relative aspect-[2/3] w-full bg-zinc-800"></div>
      <div className="p-4 flex flex-col gap-2">
        <div className="h-5 bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/4 mt-1"></div>
      </div>
    </div>
  );
}
