import axios from 'axios';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const getTrendingMovies = async ({ pageParam = 1 }): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbApi.get('/trending/movie/day', {
    params: { page: pageParam },
  });
  return response.data;
};

export const searchMovies = async (query: string, { pageParam = 1 }): Promise<PaginatedResponse<Movie>> => {
  if (!query) return { page: 1, results: [], total_pages: 0, total_results: 0 };
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page: pageParam },
  });
  return response.data;
};

export const getMovieDetails = async (id: string) => {
  const response = await tmdbApi.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  });
  return response.data;
};
