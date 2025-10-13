const CACHE_NAME = 'adam-signage-v1';
const urlsToCache = ['index.html','sender.html','player.html','receiver.html','manifest.json','playlists.json'];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
