import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

import { MoviesResponse } from '@/types/movie';

export const getPopularMovies = (params: { page?: number } = {}): Promise<MoviesResponse> => {
  const { page = 1 } = params;
  return api.get(`/movie/popular?page=${page}`);
};

export const getPopularMoviesQueryOptions = (params: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ['movie', 'popular', params],
    queryFn: () => getPopularMovies(params),
  });
};

type UsePopularMoviesOptions = {
  queryConfig?: QueryConfig<typeof getPopularMoviesQueryOptions>;
};

export const usePopularMovies = ({ queryConfig }: UsePopularMoviesOptions = {}) => {
  return useQuery({
    ...getPopularMoviesQueryOptions(),
    ...queryConfig,
  });
};

