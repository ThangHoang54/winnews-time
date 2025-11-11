import type { WeatherApiResponse } from '../types';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

if (API_KEY === 'YOUR_OPENWEATHER_API_KEY' && import.meta.env.NODE_ENV !== 'test') {
    console.warn("OpenWeatherMap API key is not configured. Please set OPENWEATHER_API_KEY environment variable.");
}

export const getCurrentWeather = async (lat: number, lon: number, lang: 'en' | 'fr'): Promise<WeatherApiResponse> => {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    units: 'metric', // or 'imperial'
    lang: lang,
    appid: API_KEY,
  });

  const url = `${API_BASE_URL}/weather?${queryParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};