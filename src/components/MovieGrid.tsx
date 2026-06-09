import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import type { Movie } from '@/services/tmdb';
import React from 'react';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  isFetchingNextPage?: boolean;
}

export default function MovieGrid({ movies, isLoading, isFetchingNextPage }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-zinc-400">No movies found</h2>
        <p className="text-zinc-600 mt-2">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}
      
      {isFetchingNextPage && (
        <React.Fragment>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`fetching-${i}`} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
