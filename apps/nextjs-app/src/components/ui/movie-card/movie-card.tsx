'use client';

import { Star, Calendar, Play, Heart } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { cn } from '@/utils/cn';
import { paths } from '@/config/paths';
import { Movie } from '@/types/movie';
import { getTmdbImageUrl } from '@/utils/image';
import { formatGenres } from '@/utils/genres';

export type MovieCardVariant = 'default' | 'compact' | 'detailed' | 'horizontal';

export interface MovieCardProps {
  movie: Movie;
  variant?: MovieCardVariant;
  showActions?: boolean;
  className?: string;
  onFavorite?: (movieId: string) => void;
  onAddToWatchlist?: (movieId: string) => void;
}

export const MovieCard = React.forwardRef<HTMLDivElement, MovieCardProps>(
  (
    {
      movie,
      variant = 'default',
      showActions = false,
      className,
      onFavorite,
      onAddToWatchlist,
      ...props
    },
    ref
  ) => {
    const handleFavorite = () => onFavorite?.(movie.id?.toString() || '');
    const handleAddToWatchlist = () =>
      onAddToWatchlist?.(movie.id?.toString() || '');

    // --- Horizontal Card (Đề Cử) ---
if (variant === 'horizontal') {
  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]',
        className
      )}
      {...props}
    >
      <Link
        href={paths.movies.detail.getHref(movie.id?.toString() || '')}
        className="block"
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={getTmdbImageUrl(movie.backdrop_path || movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge Rated */}
          <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
            {movie.vote_average !== undefined && (
              <span className="bg-yellow-400/90 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Star className="w-3.5 h-3.5" />
                {movie.vote_average.toFixed(1)}
              </span>
            )}
            {movie.adult && (
              <span className="bg-red-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                18+
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genre_ids.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-1 z-10">
                <span
                  className="bg-white/80 text-gray-900 text-xs font-medium px-2 py-0.5 rounded shadow"
                >
                  {formatGenres(movie.genre_ids)}
                </span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm p-2 rounded-md">
          <h3 className="text-sm md:text-base font-bold text-white line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </Link>
    </div>
  );
}


   // --- Poster Card (default/compact/detailed) ---
const getVariantClasses = () => {
  switch (variant) {
    case 'compact':
      return 'max-w-xs';
    case 'detailed':
      return 'max-w-md';
    default:
      return 'max-w-sm';
  }
};

return (
  <div
    ref={ref}
    className={cn(
      'bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]',
      getVariantClasses(),
      className
    )}
    {...props}
  >
    {/* Poster */}
    <div className="relative group overflow-hidden rounded-t-2xl">
      <Image
        src={getTmdbImageUrl(movie.poster_path)}
        alt={movie.title}
        width={300}
        height={450}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        priority
      />

      {/* Overlay Play Button */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Button
          size="icon"
          className="rounded-full bg-white/90 text-black hover:bg-white w-12 h-12 shadow-lg"
        >
          <Play className="h-6 w-6" />
        </Button>
      </div>

      {/* Rating & Votes */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
        <div className="flex items-center gap-1 rounded-full px-3 py-1 bg-yellow-400/90 text-black font-semibold shadow-md">
          <Star className="h-4 w-4 fill-current text-black" />
          <span className="text-sm">{(movie.vote_average ?? 0).toFixed(1)}</span>
        </div>
        <span className="text-xs text-white/90 bg-black/40 px-2 py-0.5 rounded-full">
          {(movie.vote_count ?? 0).toLocaleString()} votes
        </span>
      </div>
    </div>

    {/* Info */}
    <div className="p-5 flex flex-col gap-2">
      <h3 className="font-bold text-lg md:text-xl text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
        {movie.title}
      </h3>

      {variant === 'detailed' && (
        <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
      )}

      {/* Meta info */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2">
        <Calendar className="h-4 w-4 text-indigo-500" />
        <span>{new Date(movie.release_date).getFullYear()}</span>

        {movie.genre_ids.length > 0 && (
          <>
            <span className="mx-1">•</span>
            <span className="truncate">{formatGenres(movie.genre_ids)}</span>
          </>
        )}

        <span className="mx-1">•</span>
        <span className="uppercase font-medium tracking-wide">{movie.original_language}</span>

        <span className="mx-1">•</span>
        <span>Popularity: {(movie.popularity ?? 0).toFixed(0)}</span>

        {movie.adult && (
          <span className="ml-1 px-2 py-0.5 bg-red-500 text-white rounded-full text-[10px] font-semibold">
            18+
          </span>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex space-x-3 mt-3">
          <Link href={paths.movies.detail.getHref(movie.id?.toString() || '')} className="flex-1">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              Xem Chi Tiết
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={handleFavorite}
            className="border-gray-300 hover:bg-pink-50"
          >
            <Heart className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      )}
    </div>
  </div>
);

  }
);

MovieCard.displayName = 'MovieCard';
