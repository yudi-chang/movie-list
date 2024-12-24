export type MoviesFetchPayload = {
  Title?: string;
  page?: number;
};

export type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
}