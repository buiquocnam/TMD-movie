'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMovieVideos } from '@/features/movies/api/get-movie-details';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  movieTitle: string;
}

export const TrailerModal = ({ isOpen, onClose, movieId, movieTitle }: TrailerModalProps) => {
  const { data: videos } = useMovieVideos(movieId);
  
  const trailer = videos?.results.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trailer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <h2 className="text-xl font-bold text-white truncate pr-4">
              {movieTitle} - Trailer
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-800 flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Video Player */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
                title={`${movieTitle} Trailer`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
