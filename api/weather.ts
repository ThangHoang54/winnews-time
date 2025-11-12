// UPDATED FILE: api/weather.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  // 1. Get the key *inside* the handler
  const API_KEY = process.env.OPENWEATHER_API_KEY; 

  // 2. Add a type guard that stops execution
  if (!API_KEY) {
    console.error("Server Error: OPENWEATHER_API_KEY is not configured.");
    // This 'return' ensures the code below only runs if API_KEY is a string
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const { lat, lon, lang } = req.query;

    if (!lat || !lon || !lang) {
      return res.status(400).json({ message: 'Missing required query parameters: lat, lon, lang' });
    }

    const queryParams = new URLSearchParams({
      lat: lat as string,
      lon: lon as string,
      units: 'metric',
      lang: lang as string,
      appid: API_KEY, // <-- TypeScript is now happy, it knows API_KEY is a string
    });

    const url = `${API_BASE_URL}/weather?${queryParams.toString()}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error });
  }
}