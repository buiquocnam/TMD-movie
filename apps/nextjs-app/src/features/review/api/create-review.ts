import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Review } from '@/types/review';
import { queryOptions, useMutation } from '@tanstack/react-query';

export const createReview = (params: { movieId: string, review: Review }): Promise<Review> => {
  return api.post(`/reviews/${params.movieId}`, params.review);
};


export const createReviewQueryOptions = (movieId: string, review: Review) => {
    return queryOptions({
        queryKey: ['reviews', movieId],
        queryFn: () => createReview({ movieId, review }),
    });
};

type UseCreateReviewOptions = {
    mutationConfig?: MutationConfig<typeof createReview>;
  };    

export const useCreateReview = ( {mutationConfig}: UseCreateReviewOptions = {} ) => {
  return useMutation({
    mutationFn: createReview,
    ...mutationConfig,
  });
};  
