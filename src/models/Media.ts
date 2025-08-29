export interface Media {
  id?: number;
  title: string;
  description?: string;
  type: "movie" | "series";
  releaseYear?: number;
  genre?: string;
}
