const CACHE_NAME = 'adam-signage-v1';
const urlsToCache = [
  'index.html',
  'admin.html',
  'receiver.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith
