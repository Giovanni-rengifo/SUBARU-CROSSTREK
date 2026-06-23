const CACHE = 'crosstrek-v5';
const PRECACHE = ['./', './index.html', './manifest.json', './subaru-logo.png'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  // Network-first para HTML: siempre descarga la versión más reciente
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(evt.request, copy));
          return res;
        })
        .catch(() => caches.match(evt.request))
    );
    return;
  }
  // Cache-first para assets (imágenes, manifest, sw)
  evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request))
  );
});
