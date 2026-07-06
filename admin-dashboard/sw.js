const CACHE = 'liliadmin-v1';
const URLS = ['/admin/', '/admin/index.html', 'manifest.json', 'assets/logo.svg', 'assets/logo-icon.svg', 'css/style.css'];

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
