'use client';

import { MovieCard } from '@/components/ui/movie-card';
import { Spinner } from '@/components/ui/spinner';

import { Movie } from '@/types/movie';

import { usePopularMovies } from '../api/get-popular-movies';

export const PopularMoviesList = () => {
  const popularMoviesQuery = usePopularMovies();

  if (popularMoviesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const movies = popularMoviesQuery.data?.results;

  if (!movies) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          variant="default"
          showActions={true}
        />
      ))}
    </div>
  );
};

