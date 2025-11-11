const CACHE_NAME = 'winnews-time-cache-v1';
const API_CACHE_NAME = 'winnews-time-api-cache-v1';

// Pre-cache essential static assets
const STATIC_ASSETS_TO_PRECACHE = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Lato:wght@400;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching static assets');
      return cache.addAll(STATIC_ASSETS_TO_PRECACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Use a stale-while-revalidate strategy for APIs, CDNs, and weather icons
  const isApiUrl = url.hostname === 'newsapi.org' || url.hostname === 'api.openweathermap.org';
  const isCdnUrl = url.hostname === 'aistudiocdn.com' || url.hostname === 'openweathermap.org';

  if (isApiUrl || isCdnUrl) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request).then((networkResponse) => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }).catch(err => {
          console.error("Fetch failed:", err);
          // If fetch fails (offline), and we have a cached response, serve it.
          if (cachedResponse) {
            return cachedResponse;
          }
          throw err;
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Use a cache-first strategy for all other requests
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (request.url.startsWith('http')) {
            cache.put(request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    })
  );
});