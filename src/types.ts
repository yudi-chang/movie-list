export type MoviesFetchPayload = {
  Title?: string;
  page?: number | string;
};

export type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
}