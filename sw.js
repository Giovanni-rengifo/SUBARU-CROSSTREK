const CACHE = 'crosstrek-v6';

self.addEventListener('install', evt => {
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  // HTML: nunca interceptar — siempre va a la red para garantizar versión fresca
  if (evt.request.mode === 'navigate') return;

  // Assets (imágenes, manifest): cache-first
  evt.respondWith(
    caches.match(evt.request).then(res => res ||
      fetch(evt.request).then(res => {
        if (res.ok && res.type === 'basic') {
          caches.open(CACHE).then(c => c.put(evt.request, res.clone()));
        }
        return res;
      })
    )
  );
});
