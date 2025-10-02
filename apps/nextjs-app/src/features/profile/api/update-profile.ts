import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Profile } from './get-profile';

export const updateProfileInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  bio: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ data }: { data: UpdateProfileInput }): Promise<Profile> => {
  return api.patch('/users/profile', data);
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.setQueryData(['profile'], data);
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
