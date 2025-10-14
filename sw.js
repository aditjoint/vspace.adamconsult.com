const CACHE_NAME = 'adam-signage-v3';
const DATA_FILES = [
  '/content-library.json',
  '/devices.json',
  '/layout.json',
  '/playlist.json',
  '/schedules.json',
  '/zones.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/admin.html',
          '/sender.html',
          '/receiver.html',
          '/player.html',
          '/manifest.json',
          '/sw.js',
          ...DATA_FILES
        ]);
      })
  );
});

self.addEventListener('fetch', event => {
  // Always fetch data files from network first
  if (event.request.url.includes('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Cache-first for other requests
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
