self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activated');
});

self.addEventListener('fetch', event => {
  // Serve solo la cache base
  event.respondWith(fetch(event.request));
});