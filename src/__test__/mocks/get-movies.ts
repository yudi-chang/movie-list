import type { Movie } from '@/types';

type MoviesResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
};

const moviesResponse: MoviesResponse = {
  "page": 1,
  "per_page": 10,
  "total": 2770,
  "total_pages": 277,
  "data": [
    {
      "Title": "Waterworld",
      "Year": 1995,
      "imdbID": "tt0114898"
    },
    {
      "Title": "Waterworld",
      "Year": 1995,
      "imdbID": "tt0189200"
    },
    {
      "Title": "The Making of 'Waterworld'",
      "Year": 1995,
      "imdbID": "tt2670548"
    },
    {
      "Title": "Waterworld 4: History of the Islands",
      "Year": 1997,
      "imdbID": "tt0161077"
    },
    {
      "Title": "Waterworld",
      "Year": 1997,
      "imdbID": "tt0455840"
    },
    {
      "Title": "Waterworld",
      "Year": 1997,
      "imdbID": "tt0390617"
    },
    {
      "Title": "Swordquest: Waterworld",
      "Year": 1983,
      "imdbID": "tt2761086"
    },
    {
      "Title": "Behind the Scenes of the Most Fascinating Waterworld on Earth: The Great Backwaters, Kerala.",
      "Year": 2014,
      "imdbID": "tt5847056"
    },
    {
      "Title": "Louise's Waterworld",
      "Year": 1997,
      "imdbID": "tt0298417"
    },
    {
      "Title": "Waterworld",
      "Year": 2001,
      "imdbID": "tt0381702"
    }
  ]
}

export default moviesResponse;