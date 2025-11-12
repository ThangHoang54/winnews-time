import type { NewsApiResponse, Category } from "../types";

const API_BASE_URL = "https://newsapi.org/v2";
const API_KEYS_STRING = import.meta.env.VITE_NEWS_API_KEY;

// Split API keys by comma and clean them
const API_KEYS: string[] = API_KEYS_STRING
  ? API_KEYS_STRING.split(",").map((key: string) => key.trim()).filter((key: string) => key !== "")
  : [];

let currentKeyIndex = 0;

// Warn developer if no keys are set
if (API_KEYS.length === 0) {
  console.warn(
    "NewsAPI key is not configured. Please set VITE_NEWS_API_KEY in your .env file. You can provide multiple keys separated by commas."
  );
}

// Get next API key (round-robin)
function getNextApiKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error("No API keys configured");
  }
  
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

// Common function to fetch and handle errors with multiple API keys
async function fetchNews<T>(endpoint: string, params: Record<string, string>):Promise<T> {
  if (API_KEYS.length === 0) {
    throw new Error("No API keys configured");
  }

  let lastError: Error | null = null;

  // Try each API key until one works
  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = getNextApiKey();
    const queryParams = new URLSearchParams({
      ...params,
      apiKey,
    });
    const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`;

    try {
      const response = await fetch(url);

      // Handle HTTP errors
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorCode: string | undefined;
        try {
          const errorData = await response.json();
          if (errorData?.code) errorCode = errorData.code;
          if (errorData?.message) errorMessage = errorData.message;
        } catch {
          // ignore JSON parse error
        }

        // Retry if key is rate-limited or disabled
        if (
          errorCode === "rateLimited" ||
          errorCode === "apiKeyDisabled" ||
          errorCode === "apiKeyExhausted" ||
          errorMessage.toLowerCase().includes("rate limit")
        ) {
          console.warn(`API key #${i + 1} limit reached, trying next key...`);
          lastError = new Error("API key limit reached");
          continue; // try next key
        }

        throw new Error(errorMessage);
      }

      // Success — return JSON
      return (await response.json()) as T;
    } catch (error) {
      console.warn(`Failed fetching with API key #${i + 1}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      continue; // Try next key
    }
  }

  // All keys failed
  throw lastError || new Error("All API keys failed or rate-limited.");
}


// Define allowed languages
export type Language = "en" | "fr";

// Fetch top headlines
export const getTopHeadlines = async (
  language: Language,
  category?: Category
): Promise<NewsApiResponse> => {
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