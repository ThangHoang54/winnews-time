export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export type Reactions = Record<string, Record<string, number>>;

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherApiResponse {
  weather: Weather[];
  main: MainWeather;
  name: string;
};