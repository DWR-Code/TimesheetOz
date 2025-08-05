const CACHE = 'ts-cache-v1';
const ASSETS = [
  '/', 
  '/TimesheetOz/',
  '/TimesheetOz/index.html',
  '/TimesheetOz/manifest.json',
  '/TimesheetOz/icon192.png',
  '/TimesheetOz/icon512.png',
  '/TimesheetOz/sw.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r =>
      r || fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      })
    )
  );
});
