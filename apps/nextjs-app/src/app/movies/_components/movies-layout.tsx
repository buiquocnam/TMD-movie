'use client';

import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

interface MoviesLayoutProps {
  children: React.ReactNode;
}

export const MoviesLayout = ({ children }: MoviesLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Movies</h2>
            <nav className="space-y-2">
              <Link
                href={paths.movies.popular.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Popular Movies
              </Link>
              <Link
                href={paths.movies.topRated.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Top Rated
              </Link>
              <Link
                href={paths.movies.nowPlaying.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Now Playing
              </Link>
              <Link
                href={paths.movies.upcoming.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Upcoming
              </Link>
              <Link
                href={paths.movies.watchlist.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                My Watchlist
              </Link>
              <Link
                href={paths.movies.favorites.getHref()}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                My Favorites
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};
