const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/script.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event - cache necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch event - serve cached content if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(keyList.map(key => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        )
    );
});
