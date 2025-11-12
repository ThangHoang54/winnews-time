import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchNewsFromApi } from './lib/newsApiHelper';
import type { NewsApiResponse } from '../src/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { language, category } = req.query;
    const country = language === "fr" ? "fr" : "us";

    const requestParams: Record<string, string> = {
      country: country as string,
      pageSize: "25",
    };
    if (category) {
      requestParams.category = category as string;
    }

    const data = await fetchNewsFromApi<NewsApiResponse>("top-headlines", requestParams);
    res.status(200).json(data);

  } catch (error) {
    // Ensure we send a real string message
    const message = (error instanceof Error) ? error.message : "An unknown error occurred";
    res.status(500).json({ message });
  }
}