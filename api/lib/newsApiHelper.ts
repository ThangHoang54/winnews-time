// Get keys securely from server environment variables
const API_KEYS_STRING = process.env.NEWS_API_KEY; 

const API_KEYS: string[] = API_KEYS_STRING
  ? API_KEYS_STRING.split(",").map((key: string) => key.trim()).filter((key: string) => key !== "")
  : [];

let currentKeyIndex = 0;

if (API_KEYS.length === 0) {
  console.error(
    "FATAL: NEWS_API_KEY is not configured in server environment variables."
  );
}

function getNextApiKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error("No API keys configured on server");
  }
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

// This is your fetchNews function, now running on the server
export async function fetchNewsFromApi<T>(
  endpoint: string, 
  params: Record<string, string>
): Promise<T> {
  const API_BASE_URL = "https://newsapi.org/v2";
  
  if (API_KEYS.length === 0) {
    throw new Error("No API keys configured on server");
  }

  let lastError: Error | null = null;

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = getNextApiKey();
    const queryParams = new URLSearchParams({
      ...params,
      apiKey,
    });
    const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`;

    try {
      // Server-to-server fetch
      const response = await fetch(url); 

      if (!response.ok) {
        // ... (your identical error handling logic) ...
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorCode: string | undefined;
        try {
          const errorData = await response.json();
          if (errorData?.code) errorCode = errorData.code;
          if (errorData?.message) errorMessage = errorData.message;
        } catch {}

        if (
          errorCode === "rateLimited" ||
          errorCode === "apiKeyDisabled" ||
          errorCode === "apiKeyExhausted"
        ) {
          console.warn(`Server: API key #${i + 1} limit reached, trying next...`);
          lastError = new Error("API key limit reached");
          continue; // try next key
        }
        throw new Error(errorMessage);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.warn(`Server: Failed fetching with API key #${i + 1}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }
  }
  throw lastError || new Error("Server: All API keys failed or rate-limited.");
}