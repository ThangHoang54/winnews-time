import type { WeatherApiResponse } from '@/types';

const API_BASE_URL = '/api'; 
 
export const getCurrentWeather = async (lat: number, lon: number, lang: 'en' | 'fr'): Promise<WeatherApiResponse> => {
  const queryParams = new URLSearchParams({
     lat: lat.toString(),
     lon: lon.toString(),
     lang: lang,
   });
 
  // Call your own proxy
  const url = `${API_BASE_URL}/weather?${queryParams.toString()}`;
  const response = await fetch(url);
   
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
   }
 
   return response.json();
};