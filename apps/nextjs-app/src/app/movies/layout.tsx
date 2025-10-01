import { MoviesLayout } from './_components/movies-layout';

export const metadata = {
  title: 'Movies',
  description: 'Discover and explore movies',
};

const MoviesLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MoviesLayout>{children}</MoviesLayout>;
};

export default MoviesLayoutWrapper;
