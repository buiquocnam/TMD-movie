'use client';

import { ReviewResult } from '@/types/review';
import { Card } from '@/components/ui/card';
import { getTmdbImageUrl } from '@/utils/image';
import { useState } from 'react';

interface ReviewItemProps {
  review: ReviewResult;
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= numRating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      );
    }
    
    return stars;
  };

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {review.author_details.avatar_path ? (
            <img
              src={getTmdbImageUrl(review.author_details.avatar_path)}
              alt={review.author_details.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">
                {review.author_details.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">
                {review.author_details.name}
              </h3>
              <p className="text-sm text-gray-600">
                @{review.author_details.username}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(review.author_details.rating)}
              </div>
              <p className="text-sm text-gray-500">
                {formatDate(review.created_at)}
              </p>
            </div>
          </div>

          {/* Review Content */}
          {(() => {
            const [expanded, setExpanded] = useState(false);
            const MAX_LENGTH = 300;
            const isLong = review.content.length > MAX_LENGTH;
            const displayText = expanded || !isLong
              ? review.content
              : review.content.slice(0, MAX_LENGTH) + '...';

            return (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {displayText}
                  {isLong && (
                    <button
                      type="button"
                      className="ml-2 text-blue-600 hover:underline text-sm"
                      onClick={() => setExpanded((e) => !e)}
                    >
                      {expanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                  )}
                </p>
              </div>
            );
          })()}

          {/* Actions */}
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
              <span>👍</span>
              <span>Hữu ích</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
              <span>💬</span>
              <span>Trả lời</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
              <span>🔗</span>
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
