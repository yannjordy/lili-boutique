const CACHE = 'lilistore-v1';
const URLS = ['/', 'index.html', 'manifest.json', 'lili.jpg', 'mtn-logo.png', 'orange-money.png', 'css/style.css', 'js/payment.js', 'js/pwa.js'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => (r.ok ? caches.open(CACHE).then(c => { c.put(e.request, r.clone()); return r; }) : r))
      .catch(() => caches.match(e.request))
  );
});
