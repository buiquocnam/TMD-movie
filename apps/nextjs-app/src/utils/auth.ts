// Client-side cookie utilities
export const TMDB_SESSION_COOKIE_NAME = 'tmdb_session_id';

export const getTMDBSessionCookie = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split('; ');
  const tmdbCookie = cookies.find(row => row.startsWith(`${TMDB_SESSION_COOKIE_NAME}=`));
  return tmdbCookie ? tmdbCookie.split('=')[1] : null;
};

export const setTMDBSessionCookie = (sessionId: string): void => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${TMDB_SESSION_COOKIE_NAME}=${sessionId}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
};

export const clearTMDBSessionCookie = (): void => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${TMDB_SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const checkLoggedIn = (): boolean => {
  return !!getTMDBSessionCookie();
};
