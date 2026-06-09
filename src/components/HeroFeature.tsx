"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Info, Play } from 'lucide-react';
import type { Movie } from '@/services/tmdb';

interface HeroFeatureProps {
  movie: Movie | undefined;
}

export default function HeroFeature({ movie }: HeroFeatureProps) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  if (!backdropUrl) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] flex items-end pb-12">
      <div className="absolute inset-0 z-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover object-top"
        />
        {/* Gradient overlays for cinematic fade effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl mb-8 line-clamp-3 drop-shadow-md">
            {movie.overview}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href={`/movie/${movie.id}`}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Trailer
            </Link>
            <Link 
              href={`/movie/${movie.id}`}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-md text-white px-6 py-3 rounded-md font-semibold transition-colors border border-zinc-700"
            >
              <Info className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
