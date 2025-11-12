import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchNewsFromApi } from './lib/newsApiHelper';
import type { NewsApiResponse, Category } from '../src/types';

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
    res.status(500).json({ message: error });
  }
}