const CACHE_NAME = 'jut-ece-v1';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'hub.html',
  'lab.html',
  'lab.css',
  'lab-worker.js',
  'zone1.html',
  'zone3.html',
  'syllabus.html',
  'calculator.html',
  'gemini-chat.js',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;800&family=Space+Grotesk:wght@400;600;700&display=swap'
];

// Install: Cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Some assets could not be cached on install:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-While-Revalidate / Cache-First strategy
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Don't cache Gemini live API endpoints
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for html pages
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('index.html');
        }
      });
    })
  );
});
