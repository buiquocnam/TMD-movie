import { profile } from "console";

export const paths = {
  home: {
    getHref: () => '/',
  },

  auth: {
    register: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  user: {
    profile: {
      getHref: () => '/profile',
    },
    
  
  },
  public: {
    discussions: {
      getHref: () => '/public/discussions',
    },
    discussion: {
      getHref: (id: string) => `/public/discussions/${id}`,
    },
  },

  movies: {
    popular: {
      getHref: (page?: number) => `/movies/popular${page ? `?page=${page}` : ''}`,
    },
    topRated: {
      getHref: (page?: number) => `/movies/top-rated${page ? `?page=${page}` : ''}`,
    },
    nowPlaying: {
      getHref: (page?: number) => `/movies/now-playing${page ? `?page=${page}` : ''}`,
    },
    upcoming: {
      getHref: (page?: number) => `/movies/upcoming${page ? `?page=${page}` : ''}`,
    },
    detail: {
      getHref: (id: string | number) => `/movies/${id}`,
    },
    search: {
      getHref: (query: string, page?: number) => 
        `/movies/search?q=${encodeURIComponent(query)}${page ? `&page=${page}` : ''}`,
    },
    genre: {
      getHref: (genreId: string | number, page?: number) => 
        `/movies/genre/${genreId}${page ? `?page=${page}` : ''}`,
    },
    actor: {
      getHref: (actorId: string | number) => `/movies/actor/${actorId}`,
    },
    director: {
      getHref: (directorId: string | number) => `/movies/director/${directorId}`,
    },
    watchlist: {
      getHref: () => '/movies/watchlist',
    },
    favorites: {
      getHref: () => '/movies/favorites',
    },
  },
} as const;
