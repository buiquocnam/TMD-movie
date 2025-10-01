import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { MovieDetail } from '@/features/movies/components/movie-detail';
import {
  getMovieDetails,
  getMovieDetailsQueryOptions,
  getMovieCreditsQueryOptions,
  getMovieVideosQueryOptions,
} from '@/features/movies/api/get-movie-details';

interface MoviePageProps {
  params: { movieId: string };
}

/* ------------------ Shared QueryClient ------------------ */
// Create a shared QueryClient per request to avoid duplicate API calls
const sharedQueryClients = new Map<string, QueryClient>();

function getSharedQueryClient(movieId: string): QueryClient {
  if (!sharedQueryClients.has(movieId)) {
    sharedQueryClients.set(movieId, new QueryClient());
  }
  return sharedQueryClients.get(movieId)!;
}

/* ------------------ Helpers ------------------ */
async function buildMovieMetadata(movieId: string): Promise<Metadata> {
  try {
    const queryClient = getSharedQueryClient(movieId);
    
    // Prefetch data using QueryClient (will be shared with page component)
    await queryClient.prefetchQuery(getMovieDetailsQueryOptions(movieId));
    
    // Get data from cache
    const queryKey = getMovieDetailsQueryOptions(movieId).queryKey;
    const movie = queryClient.getQueryData(queryKey);
    
    if (!movie) {
      throw new Error('Movie not found');
    } 
    
    const releaseYear = new Date(movie.release_date).getFullYear();
    const description = movie.overview || `Watch ${movie.title} and discover more about this movie.`;
    const keywords = [movie.title, 'movie', ...movie.genres.map(g => g.name), releaseYear].join(', ');
    const poster = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
    const backdrop = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

    return {
      title: `${movie.title} (${releaseYear}) - Movie Details`,
      description,
      keywords,
      openGraph: {
        title: `${movie.title} (${releaseYear})`,
        description,
        type: 'video.movie',
        images: [
          { url: poster, width: 1280, height: 1920, alt: movie.title },
          { url: backdrop, width: 1280, height: 720, alt: `${movie.title} backdrop` },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${movie.title} (${releaseYear})`,
        description,
        images: [poster],
      },
    };
  } catch {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    };
  }
}

async function prefetchMovieData(queryClient: QueryClient, movieId: string) {
  // Only prefetch credits and videos since details are already prefetched in metadata
  await Promise.allSettled([
    queryClient.prefetchQuery(getMovieCreditsQueryOptions(movieId)),
    queryClient.prefetchQuery(getMovieVideosQueryOptions(movieId)),
  ]);
}

/* ------------------ Metadata ------------------ */
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  return buildMovieMetadata(params.movieId);
}

/* ------------------ Page ------------------ */
export default async function MoviePage({ params }: MoviePageProps) {
  const { movieId } = params;
  if (!/^\d+$/.test(movieId)) notFound();

  // Use the same shared QueryClient that was used in generateMetadata
  const queryClient = getSharedQueryClient(movieId);
  
  // Prefetch additional data (movie details already cached from metadata)
  await prefetchMovieData(queryClient, movieId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="sr-only">
        <h1>Chi Tiết Phim ID: {movieId}</h1>
      </div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <MovieDetail movieId={movieId} />
      </Suspense>
    </HydrationBoundary>
  );
}
