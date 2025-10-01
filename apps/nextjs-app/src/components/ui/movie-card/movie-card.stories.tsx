import { Meta, StoryObj } from '@storybook/react';

import { MovieCard } from './movie-card';
import { Movie } from '@/types/movie';

const meta: Meta<typeof MovieCard> = {
  component: MovieCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

const sampleMovie: Movie = {
  id: 1,
  original_title: 'Spider-Man: No Way Home',
  overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.',
  poster_path: '1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  vote_average: 8.4,
  release_date: '2021-12-17',
  genre_ids: [1, 2, 3],
  original_language: 'en',
  backdrop_path: '1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  popularity: 8.4,
  vote_count: 100,
  video: false,
  adult: false,
  title: 'Spider-Man: No Way Home',
  };

export const Default: Story = {
  args: {
    movie: sampleMovie,
    variant: 'default',
    showActions: true,
  },
};

export const Compact: Story = {
  args: {
    movie: sampleMovie,
    variant: 'compact',
    showActions: false,
  },
};

export const Detailed: Story = {
  args: {
    movie: sampleMovie,
    variant: 'detailed',
    showActions: true,
  },
};

export const WithoutActions: Story = {
  args: {
    movie: sampleMovie,
    variant: 'default',
    showActions: false,
  },
};

export const WithCallbacks: Story = {
  args: {
    movie: sampleMovie,
    variant: 'default',
    showActions: true,
    onFavorite: (movieId) => console.log('Favorite clicked:', movieId),
    onAddToWatchlist: (movieId) => console.log('Add to watchlist:', movieId),
  },
};
