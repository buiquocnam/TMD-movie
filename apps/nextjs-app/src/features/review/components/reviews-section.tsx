'use client';

import { useState } from 'react';
import { useGetReviews } from '../api/get-reviews';
import { useCreateReview } from '../api/create-review';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';

interface ReviewsSectionProps {
  movieId: string;
}

export const ReviewsSection = ({ movieId }: ReviewsSectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const { data: reviewsData, isLoading, error, isFetching } = useGetReviews({ movieId });
  const createReviewMutation = useCreateReview({
    mutationConfig: {
      onSuccess: () => {
        setShowForm(false);
        // Invalidate reviews query to refetch
      }
    }
  });

  // Show loading only if no data exists (initial load)
  if (isLoading && !reviewsData) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Không thể tải reviews. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  const reviews = reviewsData?.results || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews ({reviewsData?.total_results || 0})
          </h2>
          {isFetching && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Hủy' : 'Viết Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="p-6">
          <ReviewForm 
            movieId={movieId}
            onSubmit={() => setShowForm(false)}
          />
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">Chưa có review nào. Hãy là người đầu tiên viết review!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

