 import type { NewsApiResponse, Category } from "../types";

 // This is your OWN backend, not NewsAPI
 const API_BASE_URL = "/api";
 
 // Define allowed languages
 export type Language = "en" | "fr";
 
 // A simple, new fetcher for your own API
 async function fetchNews<T>(endpoint: string, params: Record<string, string>):Promise<T> {
   const queryParams = new URLSearchParams(params);
   const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`;
 
   const response = await fetch(url);
   
   if (!response.ok) {
     // Get the error message from our own server
     const errorData = await response.json();
     throw new Error(errorData.message || 'Failed to fetch news');
   }
   
   return (await response.json()) as T;
 }
 
 // Fetch top headlines from YOUR proxy
 export const getTopHeadlines = async (
   language: Language,
   category?: Category
 ): Promise<NewsApiResponse> => {
   const requestParams: Record<string, string> = {
     language,
   };
   if (category) {
     requestParams.category = category;
   }
   return fetchNews<NewsApiResponse>("headlines", requestParams);
 };
 
 // Search for news articles from YOUR proxy
 export const searchArticles = async (
   query: string,
   language: Language
 ): Promise<NewsApiResponse> => {
   const requestParams = {
     q: query,
     language,
   };
   return fetchNews<NewsApiResponse>("search", requestParams);
 };