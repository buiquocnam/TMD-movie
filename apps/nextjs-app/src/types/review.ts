export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
}

export interface ReviewResult {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface Review {
  id: number;
  page: number;
  results: ReviewResult[];
  total_pages: number;
  total_results: number;
}