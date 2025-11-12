import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchNewsFromApi } from './lib/newsApiHelper';
import type { NewsApiResponse } from '../src/types'; 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { q, language } = req.query;

    if (typeof q !== 'string' || typeof language !== 'string') {
       return res.status(400).json({ message: 'Missing query (q) or language' });
    }

    const requestParams = {
      q,
      language,
      sortBy: "publishedAt",
      pageSize: "25",
    };

    const data = await fetchNewsFromApi<NewsApiResponse>("everything", requestParams);
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error });
  }
}