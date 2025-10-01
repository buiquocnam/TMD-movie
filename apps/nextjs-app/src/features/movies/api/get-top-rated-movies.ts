import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { MoviesResponse } from '@/types/movie';

export const getTopRatedMovies = (params: { page?: number } = {}): Promise<MoviesResponse> => {
  const { page = 1 } = params;
  return api.get(`/movie/top_rated?page=${page}`);
};

export const getTopRatedMoviesQueryOptions = (params: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ['movie', 'top_rated', params],
    queryFn: () => getTopRatedMovies(params),
  });
};

type UseTopRatedMoviesOptions = {
  queryConfig?: QueryConfig<typeof getTopRatedMoviesQueryOptions>;
};

export const useTopRatedMovies = ({ queryConfig }: UseTopRatedMoviesOptions = {}) => {
  return useQuery({
    ...getTopRatedMoviesQueryOptions(),
    ...queryConfig,
  });
};

