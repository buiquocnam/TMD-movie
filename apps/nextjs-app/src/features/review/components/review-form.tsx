'use client';

import { useState } from 'react';
import { useCreateReview } from '../api/create-review';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

interface ReviewFormProps {
  movieId: string;
  onSubmit?: () => void;
}

export const ReviewForm = ({ movieId, onSubmit }: ReviewFormProps) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || rating === 0) return;

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Đánh giá của bạn
        </label>
        <div className="flex space-x-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                star <= rating 
                  ? 'text-yellow-400 hover:text-yellow-500' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-600">
            {rating === 1 && 'Rất tệ'}
            {rating === 2 && 'Tệ'}
            {rating === 3 && 'Bình thường'}
            {rating === 4 && 'Tốt'}
            {rating === 5 && 'Xuất sắc'}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chia sẻ suy nghĩ của bạn về bộ phim này..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setContent('');
            setRating(0);
            onSubmit?.();
          }}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim() || rating === 0}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi Review'}
        </Button>
      </div>
    </form>
  );
};
