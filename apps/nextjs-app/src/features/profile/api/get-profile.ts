import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

export type Profile = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export const getProfile = (id: string): Promise<Profile> => {
  return api.get(`/account/${id}`);
};


export const useProfile = (id: string, options = {}) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    ...options,
  });
};
