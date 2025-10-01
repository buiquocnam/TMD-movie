import { TopRatedMoviesList } from '@/features/movies/components/top-rated-movies-list';

export const metadata = {
  title: 'Top Rated Movies - Best Films of All Time',
  description: 'Discover the highest rated movies of all time. Explore critically acclaimed films, award winners, and cinematic masterpieces.',
  keywords: 'top rated movies, best movies, highest rated films, award winning movies, classic cinema',
  openGraph: {
    title: 'Top Rated Movies - Best Films of All Time',
    description: 'Discover the highest rated movies of all time. Explore critically acclaimed films and cinematic masterpieces.',
    type: 'website',
  },
};

const TopRatedMoviesPage = () => {
  return (
    <>
      {/* Server Component - Static Content */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Top Rated Movies
        </h1>
        <p className="text-lg text-gray-600">
          Discover the highest rated movies of all time
        </p>
      </div>

      {/* Client Component - Interactive Slider */}
      <TopRatedMoviesList 
          variant="grid" 
          showActions={true} 
          />
    </>
  );
};

export default TopRatedMoviesPage;
