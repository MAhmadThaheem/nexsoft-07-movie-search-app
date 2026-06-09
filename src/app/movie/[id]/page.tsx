import { getMovieDetails } from '@/services/tmdb';
import Image from 'next/image';
import { Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);
  
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
    
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="relative min-h-screen bg-black pb-20 -mt-24 pt-24">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[60vh] z-0 opacity-40">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <span className="text-zinc-600">No Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-zinc-300 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{movie.vote_average.toFixed(1)}</span>
                <span>({movie.vote_count} votes)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{movie.runtime} min</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-white">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre: any) => (
                  <span key={genre.id} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm border border-zinc-700">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-white">Synopsis</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
            
            {/* Cast Section */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.credits.cast.slice(0, 10).map((person: any) => (
                    <div key={person.id} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors">
                      <div className="relative aspect-[2/3] w-full bg-zinc-800">
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                            alt={person.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
                            No Photo
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-white truncate" title={person.name}>{person.name}</p>
                        <p className="text-xs text-zinc-400 truncate" title={person.character}>{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
