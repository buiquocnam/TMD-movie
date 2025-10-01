
export interface Movie {
    adult?: boolean; // Defaults to true
    backdrop_path: string;
    genre_ids: number[];
    id?: number; // Defaults to 0
    original_language: string;
    original_title: string;
    overview: string;
    popularity?: number; // Defaults to 0
    poster_path: string;
    release_date: string;
    title: string;
    video?: boolean; // Defaults to true
    vote_average?: number; // Defaults to 0
    vote_count?: number; // Defaults to 0
  }
  
  export interface MoviesResponse {
    page?: number; // Defaults to 0
    results: Movie[];
    total_pages?: number; // Defaults to 0
    total_results?: number; // Defaults to 0
  }

  
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieCredits {
  id: number;
  cast: Array<{
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }>;
  crew: Array<{
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }>;
}

export interface MovieVideos {
  id: number;
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }>;
}