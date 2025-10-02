'use client';

import { Star, Calendar, Clock, DollarSign, Play, Heart, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/cn';
import { getTmdbImageUrl } from '@/utils/image';
import { useMovieDetails, useMovieCredits } from '@/features/movies/api/get-movie-details';
import { TrailerModal } from '@/features/movies/components/trailer-modal';
import { ReviewsSection } from '@/features/review/components';

interface MovieDetailProps {
  movieId: string;
}

export const MovieDetail = ({ movieId }: MovieDetailProps) => {
  const { data: movie, isLoading: movieLoading, error: movieError, isFetching: movieFetching } = useMovieDetails(movieId);
  const { data: credits, isLoading: creditsLoading, isFetching: creditsFetching } = useMovieCredits(movieId);
  
  const [isTrailerModalOpen, setIsTrailerModalOpen] = React.useState(false);

  // Show loading only if no data exists (initial load)
  if (movieLoading && !movie) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không Tìm Thấy Phim</h2>
          <p className="text-gray-600">Bộ phim bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  const director = credits?.crew.find(person => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 8) || [];

  const formatCurrency = (amount: number) => {
    // Always use 'compact' notation with 'maximumFractionDigits: 1' to match both server and client
    // and avoid hydration mismatch (e.g., "$200M" instead of "$200.0M")
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Backdrop */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <Image
            src={getTmdbImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <Card className="overflow-hidden shadow-2xl">
                  <Image
                    src={getTmdbImageUrl(movie.poster_path)}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-48 md:w-64 h-auto"
                  />
                </Card>
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
                  {movieFetching && (
                    <div className="flex items-center space-x-1 text-sm text-gray-300">
                      <Spinner size="sm" />
                      <span>Đang tải...</span>
                    </div>
                  )}
                </div>
                {movie.tagline && (
                  <p className="text-lg md:text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                )}

                {/* Rating & Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-400/90 text-black px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-sm">({movie.vote_count.toLocaleString()})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                  
                  {movie.adult && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                      18+
                    </span>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-lg text-gray-200 mb-6 max-w-3xl leading-relaxed">
                  {movie.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    onClick={() => setIsTrailerModalOpen(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <Bookmark className="w-5 h-5 mr-2" />
                    Watchlist
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cast */}
            {!creditsLoading && mainCast.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cast</h2>
                  {creditsFetching && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Spinner size="sm" />
                      <span>Đang tải...</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mainCast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gray-200">
                        {actor.profile_path && (
                          <Image
                            src={getTmdbImageUrl(actor.profile_path)}
                            alt={actor.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <p className=" text-sm text-gray-900">{actor.name}</p>
                      <p className="text-xs text-gray-600">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Production Info */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Production</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {director && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Director</h3>
                    <p className="text-gray-600">{director.name}</p>
                  </div>
                )}
                
                {movie.production_companies.length > 0 && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Production Companies</h3>
                    <p className="text-gray-600">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </p>
                  </div>
                )}

                {movie.production_countries.length > 0 && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Countries</h3>
                    <p className="text-gray-600">
                      {movie.production_countries.map(country => country.name).join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className=" text-gray-900 mb-1">Original Language</h3>
                  <p className="text-gray-600 uppercase">{movie.original_language}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Stats */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Movie Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className=" text-gray-900 mb-1">Status</h3>
                  <p className="text-gray-600">{movie.status}</p>
                </div>

                <div>
                  <h3 className=" text-gray-900 mb-1">Release Date</h3>
                  <p className="text-gray-600">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <h3 className=" text-gray-900 mb-1">Runtime</h3>
                  <p className="text-gray-600">{formatRuntime(movie.runtime)}</p>
                </div>

                {movie.budget > 0 && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Budget</h3>
                    <p className="text-gray-600 flex items-center">
                      {formatCurrency(movie.budget)}
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Revenue</h3>
                    <p className="text-gray-600 flex items-center">
                      {formatCurrency(movie.revenue)}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className=" text-gray-900 mb-1">Popularity</h3>
                  <p className="text-gray-600">{movie.popularity.toFixed(1)}</p>
                </div>

                {movie.homepage && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">Homepage</h3>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm break-all"
                    >
                      Visit Official Site
                    </a>
                  </div>
                )}

                {movie.imdb_id && (
                  <div>
                    <h3 className=" text-gray-900 mb-1">IMDb</h3>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View on IMDb
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <Card className="p-6">
          <ReviewsSection movieId={movieId} />
        </Card>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        movieId={movieId}
        movieTitle={movie.title}
      />
    </div>
  );
};
