import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherService';
import type { WeatherApiResponse } from '../types';

interface WeatherWidgetProps {
  language: 'en' | 'fr';
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ language }) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        language === 'fr'
          ? 'La géolocalisation n’est pas prise en charge par votre navigateur.'
          : 'Geolocation is not supported by your browser.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getCurrentWeather(
            position.coords.latitude,
            position.coords.longitude,
            language // Pass language to API
          );
          setWeather(data);
        } catch (err) {
          setError(
            language === 'fr'
              ? 'Échec du chargement de la météo.'
              : 'Failed to fetch weather.'
          );
        }
      },
      () => {
        setError(
          language === 'fr'
            ? 'Impossible de récupérer votre position.'
            : 'Unable to retrieve your location.'
        );
      }
    );
  }, [language]);

  if (error) {
    return (
      <div className="text-xs text-red-500 text-center" title={error}>
        {language === 'fr' ? 'Météo non disponible' : 'Weather unavailable'}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-sm text-center">
        {language === 'fr' ? 'Chargement...' : 'Loading...'}
      </div>
    );
  }

  const temperature = Math.round(weather.main.temp);
  const cityName = weather.name;
  const description =
    language === 'fr'
      ? weather.weather[0].description // already localized if API supports lang=fr
      : weather.weather[0].description;

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-300 dark:bg-transparent transition-colors duration-300">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description}
          className="w-10 h-10"
          title={weather.weather[0].description}
        />
      </div>
      <div className="text-left">
        <p className="font-bold text-xm text-ink dark:text-dark-ink leading-tight">{Math.round(weather.main.temp)}°C</p>
        <p className="text-xs text-ink/80 dark:text-dark-ink/80 capitalize">{weather.name}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;