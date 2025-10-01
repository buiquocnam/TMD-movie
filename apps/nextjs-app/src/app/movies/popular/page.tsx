import { PopularMoviesList } from '@/features/movies/components/popular-movies-list';

export const metadata = {
  title: 'Popular Movies - Trending Films & Cinema',
  description: 'Discover the most popular movies right now. Find trending films, blockbusters, and must-watch cinema with ratings and reviews.',
  keywords: 'popular movies, trending movies, blockbuster films, cinema trends, movie ratings',
  openGraph: {
    title: 'Popular Movies - Trending Films & Cinema',
    description: 'Discover the most popular movies right now. Find trending films, blockbusters, and must-watch cinema.',
    type: 'website',
  },
};

const PopularMoviesPage = () => {
  return (
    <>
      {/* Server Component - Static Content */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Popular Movies
        </h1>
        <p className="text-lg text-gray-600">
          Discover the most popular movies right now
        </p>
      </div>
      
      {/* Client Component - Interactive Content */}
      <PopularMoviesList />
    </>
  );
};

export default PopularMoviesPage;
