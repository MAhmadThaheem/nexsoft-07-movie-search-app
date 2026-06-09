"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Movie } from '@/services/tmdb';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link href={`/movie/${movie.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className="group relative flex flex-col h-full bg-zinc-900 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-red-900/20 transition-all"
      >
        <div className="relative aspect-[2/3] w-full bg-zinc-800">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-zinc-600 font-bold text-lg">{movie.title}</span>
              <span className="text-zinc-700 text-sm mt-2">No Image Available</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-white font-bold truncate" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown Year'}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
