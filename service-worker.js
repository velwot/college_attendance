const CACHE_NAME = 'divo-attendance-v1';
const OFFLINE_URL = '/index.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/insights.html',
  '/save.html',
  '/manifest.json',
  '/assets/icon-192.svg',
  '/assets/icon-512.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// Only handle same-origin GET requests. Don't interfere with Google Identity or other third-party APIs.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Navigation requests -> serve cached index.html (app shell) fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(r => {
        // update the cache in background
        caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, r.clone()));
        return r;
      }).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // For other same-origin requests, try cache first then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      // cache successful responses for future
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      }
      return response;
    }).catch(() => cached || Promise.reject('no-response')))
  );
});
