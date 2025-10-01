import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

import { Review } from '@/types/review';


export const getReviews = (params: { movieId: string }): Promise<Review> => {
  return api.get(`/movie/${params.movieId}/reviews`);
};

export const getReviewsQueryOptions = (movieId: string) => {
  return queryOptions({
    queryKey: ['reviews', movieId],
    queryFn: () => getReviews({ movieId }),
  });
};

type UseGetReviewsOptions = {
  queryConfig?: QueryConfig<typeof getReviews>;
};

export const useGetReviews = (params: { movieId: string }, options: UseGetReviewsOptions = {}) => {
  return useQuery({
    ...getReviewsQueryOptions(params.movieId),
    ...options.queryConfig,
  });
};