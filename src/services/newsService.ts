import type { NewsApiResponse, Category } from "../types";

const API_BASE_URL = "https://newsapi.org/v2";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY  

// Warn developer if key not set
if (API_KEY === "YOUR_NEWS_API_KEY" && import.meta.env.NODE_ENV !== "test") {
  console.warn(
    "NewsAPI key is not configured. Please set the NEWS_API_KEY environment variable."
  );
}

// Common function to fetch and handle errors
async function fetchNews<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY,
  });

  const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        // ignore JSON parse error
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Failed fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Define allowed languages
export type Language = "en" | "fr";

// Fetch top headlines
export const getTopHeadlines = async (
  language: Language,
  category?: Category
): Promise<NewsApiResponse> => {
  // Use country to fetch top headlines (US or France)
  const country = language === "fr" ? "fr" : "us";

  const requestParams: Record<string, string> = {
    country,
    pageSize: "25",
  };

  if (category) {
    requestParams.category = category;
  }

  return fetchNews<NewsApiResponse>("top-headlines", requestParams);
};

// Search for news articles by keyword
export const searchArticles = async (
  query: string,
  language: Language
): Promise<NewsApiResponse> => {
  const requestParams = {
    q: query,
    language,
    sortBy: "publishedAt",
    pageSize: "25",
  };

  return fetchNews<NewsApiResponse>("everything", requestParams);
};