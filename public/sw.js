// Farha's Birthday Surprise - High Performance Cache Service Worker
const CACHE_NAME = 'farha-birthday-v2';

const STATIC_EXTENSIONS = [
  '.js',
  '.css',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.svg',
  '.woff2',
  '.woff'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Do not interfere with chrome-extension, API calls, or socket connections
  if (!url.protocol.startsWith('http')) return;

  // Direct pass-through for streaming media (audio/video) and Range requests
  // This prevents browser caching conflicts and audio looping on refresh
  if (
    request.headers.get('range') ||
    url.pathname.endsWith('.mp3') ||
    url.pathname.endsWith('.mp4')
  ) {
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    STATIC_EXTENSIONS.some((ext) => url.pathname.endsWith(ext)) ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';

  if (isStaticAsset) {
    // Cache-first strategy for static assets (instantaneous response on slow mobile networks)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
            return networkResponse;
          })
          .catch(() => {
            if (cachedResponse) return cachedResponse;
            return new Response('', { status: 404, statusText: 'Not Found' });
          });
      })
    );
    return;
  }

  // Stale-while-revalidate / network-first for documents/HTML
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const indexCached = await caches.match('/');
          if (indexCached) return indexCached;
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
  }
});
