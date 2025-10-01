export function getTmdbImageUrl(path: string, size = "w500") {
    if (!path) return ""; 
    const baseUrl = "https://image.tmdb.org/t/p";
    return `${baseUrl}/${size}${path}`;
  }