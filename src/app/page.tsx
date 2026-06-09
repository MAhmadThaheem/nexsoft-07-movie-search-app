"use client";

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { getTrendingMovies, searchMovies } from '@/services/tmdb';
import HeroFeature from '@/components/HeroFeature';
import MovieGrid from '@/components/MovieGrid';
import { Loader2 } from 'lucide-react';

function HomeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';

  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movies', query],
    queryFn: ({ pageParam = 1 }) => 
      query ? searchMovies(query, { pageParam }) : getTrendingMovies({ pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) || [];
  const featuredMovie = !query ? movies[0] : undefined;
  
  const displayMovies = (!query && movies.length > 0) ? movies.slice(1) : movies;

  return (
    <div className="pb-20">
      {!query && <HeroFeature movie={featuredMovie} />}
      
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-zinc-800 pb-4">
          {query ? `Search Results for "${query}"` : "Trending Movies"}
        </h2>
        
        <MovieGrid 
          movies={displayMovies} 
          isLoading={isLoading} 
          isFetchingNextPage={isFetchingNextPage} 
        />
        
        {hasNextPage && (
          <div ref={ref} className="w-full flex justify-center py-8 mt-8">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center pt-20"><Loader2 className="w-10 h-10 animate-spin text-red-600" /></div>}>
      <HomeContent />
    </Suspense>
  );
}
