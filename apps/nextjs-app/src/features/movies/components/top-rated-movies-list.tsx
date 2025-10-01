'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { MovieCard } from '@/components/ui/movie-card';
import { Spinner } from '@/components/ui/spinner';
import { Movie } from '@/types/movie';
import { useTopRatedMovies } from '../api/get-top-rated-movies';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TopRatedMoviesListProps {
  variant?: 'horizontal' | 'grid';
  showActions?: boolean;
}

export const TopRatedMoviesList = ({ 
  variant = 'horizontal', 
  showActions = false,
}: TopRatedMoviesListProps = {}) => {
  const topRatedMoviesQuery = useTopRatedMovies();

  // Slider config chỉ khi variant là horizontal
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    variant === 'horizontal' ? {
      loop: true,
      slides: { perView: 3, spacing: 12 },
      breakpoints: {
        '(max-width: 768px)': { slides: { perView: 1.2, spacing: 8 } },
        '(max-width: 1024px)': { slides: { perView: 2, spacing: 10 } },
      },
      created: (s) => {
        let timeout: any;
        const play = () => {
          timeout = setTimeout(() => {
            s.next();
            play();
          }, 3000);
        };
        play();
        s.on('dragStarted', () => clearTimeout(timeout));
        s.on('dragEnded', () => play());
      },
    } : {}
  );

  if (topRatedMoviesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const movies = topRatedMoviesQuery.data?.results;
  if (!movies) return null;


  // Grid Layout
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            variant="default"
            showActions={showActions}
          />
        ))}
      </div>
    );
  }

  // Horizontal Slider Layout
  return (
    <div className="relative group">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {movies.slice(0, 10).map((movie: Movie) => (
          <div key={movie.id} className="keen-slider__slide">
            <MovieCard
              movie={movie}
              variant="horizontal"
              showActions={showActions}
              className="rounded-lg border border-white/10 bg-white/5 
                         hover:bg-white/10 hover:scale-[1.02] 
                         transition-all p-2"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-1/2 -translate-y-1/2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black/50 rounded-full"
        onClick={() => slider?.current?.prev()}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-1/2 -translate-y-1/2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black/50 rounded-full"
        onClick={() => slider?.current?.next()}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
