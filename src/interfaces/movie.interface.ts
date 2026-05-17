export interface Movie {
  id?: number;

  name: string;

  originalName: string;

  description?: string;

  image?: string;

  trailerUrl?: string;

  duration: number;

  releaseDate: string;

  country: string;

  ageRating: string;

  status?: string;

  imdbRating?: number;

  actors: string;

  categoryList: string,
}