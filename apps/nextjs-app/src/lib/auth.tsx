import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';

import { 
  AuthResponse, 
  User, 
  TMDBAccountDetails, 
  TMDBAuthResponse, 
  TMDBLoginInput,
  TMDBError,
  TMDBRequestTokenResponse,
  TMDBValidateTokenResponse,
  TMDBSessionResponse
} from '@/types/api';
import { getTMDBSessionCookie, setTMDBSessionCookie, clearTMDBSessionCookie } from '@/utils/auth';
import { api } from './api-client';

// Định nghĩa các hàm gọi API cho auth (kiểu, schema, request):
// những hàm này không nằm trong các tính năng mà là mô-đun chia sẻ giữa các tính năng

// TMDB Login schema
export const loginInputSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = TMDBLoginInput;

// TMDB API functions
const getRequestToken = async (): Promise<string> => {
  const response = (await api.get('/tmdb/request-token')) as TMDBRequestTokenResponse;
  return response.request_token;
};

const validateToken = async (
  username: string,
  password: string,
  requestToken: string
): Promise<string> => {
  const response = (await api.post('/tmdb/validate-token', {
    username,
    password,
    request_token: requestToken,
  })) as TMDBValidateTokenResponse;
  return response.request_token;
};

const createSession = async (requestToken: string): Promise<string> => {
  const response = (await api.post('/tmdb/create-session', {
    request_token: requestToken,
  })) as TMDBSessionResponse;
  return response.session_id;
};

const getAccountDetails = async (sessionId: string): Promise<TMDBAccountDetails> => {
  const response = (await api.get('/tmdb/account', {
    params: { session_id: sessionId },
  })) as TMDBAccountDetails;
  return response;
};

const authenticateUser = async (
  username: string,
  password: string
): Promise<TMDBAuthResponse> => {
  // Bước 1: Lấy request token
  const requestToken = await getRequestToken();
  
  // Bước 2: Xác thực token với thông tin đăng nhập
  const validatedToken = await validateToken(username, password, requestToken);
  
  // Bước 3: Tạo session
  const sessionId = await createSession(validatedToken);
  
  // Bước 4: Lấy thông tin tài khoản
  const accountDetails = await getAccountDetails(sessionId);
  
  return { sessionId, accountDetails };
};

// Convert TMDB AccountDetails to our User type
const convertTMDBUserToUser = (tmdbUser: TMDBAccountDetails): User => ({
  id: tmdbUser.id.toString(),
  firstName: tmdbUser.name || tmdbUser.username,
  lastName: '',
  email: '', // TMDB doesn't provide email
  role: 'USER' as const,
  teamId: '',
  bio: '',
  createdAt: Date.now(),
});

export const getUser = async (): Promise<User> => {
  // Get TMDB session from cookie
  const tmdbSessionId = getTMDBSessionCookie();

  if (!tmdbSessionId) {
    throw new Error('No TMDB session found. Please login.');
  }

  try {
    const tmdbAccount = await getAccountDetails(tmdbSessionId);
    return convertTMDBUserToUser(tmdbAccount);
  } catch (error) {
    // If TMDB session is invalid, clear it
    clearTMDBSessionCookie();
    throw new Error('Invalid TMDB session. Please login again.');
  }
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

// TMDB Login function
const loginWithTMDB = async (data: TMDBLoginInput): Promise<AuthResponse> => {
  try {
    const tmdbAuth = await authenticateUser(data.username, data.password);
    
    // Store TMDB session in cookie
    setTMDBSessionCookie(tmdbAuth.sessionId);
    
    // Convert TMDB user to our User type
    const user = convertTMDBUserToUser(tmdbAuth.accountDetails);
    
    return {
      jwt: tmdbAuth.sessionId, // Use session ID as JWT
      user,
    };
  } catch (error) {
    if (error instanceof TMDBError) {
      throw new Error(`TMDB Authentication failed: ${error.message}`);
    }
    throw error;
  }
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithTMDB,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
};

// TMDB doesn't support registration, so we remove registration
// Users need to create TMDB account on TMDB website

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear TMDB session from cookie
      clearTMDBSessionCookie();
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

const logout = (): Promise<void> => {
  // TMDB logout - just clear the cookie
  clearTMDBSessionCookie();
  return Promise.resolve();
};

// Registration schema (for backward compatibility)
export const registerInputSchema = z
  .object({
    username: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(5, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

// Registration function (placeholder - TMDB doesn't support registration)
const registerWithusernameAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  throw new Error('Registration is not supported with TMDB authentication. Please create an account on TMDB website.');
};

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWithusernameAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
};
