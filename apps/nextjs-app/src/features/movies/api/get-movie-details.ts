// src/features/movies/api/movie-queries.ts
import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import type { MovieDetails, MovieCredits, MovieVideos } from '@/types/movie';

/* ---------- Generic Helpers ---------- */
const fetchMovie = <T>(path: string): Promise<T> =>
  api.get(path); // Server cache 60s

function createMovieQueryOptions<T>(
  key: string,
  movieId: string,
  fetcher: () => Promise<T>,
  staleTime?: number
) {
  return queryOptions({
    queryKey: ['movie', key, movieId],
    queryFn: fetcher,
    ...(staleTime !== undefined && { staleTime }), // Client cache (fresh window)
  });
}

function createMovieHook<T>(
  key: string,
  path: (id: string) => string,
  defaultStale?: number
) {
  return (movieId: string, { queryConfig }: { queryConfig?: QueryConfig<any> } = {}) =>
    useQuery({
      ...createMovieQueryOptions<T>(key, movieId, () => fetchMovie<T>(path(movieId)), defaultStale),
      ...queryConfig,
    });
}

/* ---------- API + QueryOptions ---------- */
export const getMovieDetails = (id: string) =>
  fetchMovie<MovieDetails>(`/movie/${id}`);
export const getMovieCredits = (id: string) =>
  fetchMovie<MovieCredits>(`/movie/${id}/credits`);
export const getMovieVideos = (id: string) =>
  fetchMovie<MovieVideos>(`/movie/${id}/videos`);

export const getMovieDetailsQueryOptions = (id: string) =>
  createMovieQueryOptions<MovieDetails>('details', id, () => getMovieDetails(id), 60000);
export const getMovieCreditsQueryOptions = (id: string) =>
  createMovieQueryOptions<MovieCredits>('credits', id, () => getMovieCredits(id));
export const getMovieVideosQueryOptions = (id: string) =>
  createMovieQueryOptions<MovieVideos>('videos', id, () => getMovieVideos(id));

/* ---------- Hooks ---------- */
export const useMovieDetails = createMovieHook<MovieDetails>(
  'details',
  (id) => `/movie/${id}`,
  60000
);
export const useMovieCredits = createMovieHook<MovieCredits>(
  'credits',
  (id) => `/movie/${id}/credits`
);
export const useMovieVideos = createMovieHook<MovieVideos>(
  'videos',
  (id) => `/movie/${id}/videos`
);
