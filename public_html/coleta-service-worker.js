var dataCacheName = 'coletaDadosCache-v1';
var cacheName = 'coletaCache-v1';
var filesToCache = [
    './',
    'images/everis_favico.png',
    'plugins/jquery-3.1.1.min.js',
    'script/pwaColeta.js',
    'script/respond.js',
    'scss/style.scss',
    'styles/normalize.min.css',
    'styles/style.css',
    'index.html',
    'row_coleta.html'
];


var ORIGEM = 'http://localhost:8080/ColetaWS/';

self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        return cache.addAll(filesToCache);
    }).catch(function () {
        console.log(arguments);
    }));
});
;

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    }));
});

self.addEventListener('fetch', function (e) {
    if (e.request.url.startsWith(ORIGEM)) {
        e.respondWith(
                fetch(e.request)
                .then(function (response) {
                    return caches.open(dataCacheName).then(function (cache) {
                        cache.put(e.request.url, response.clone());
                        console.log('[ServiceWorker] Fetched & Cached', e.request.url);
                        return response;
                    });
                })
                );
    } 
    else {
        e.respondWith(
                caches.match(e.request).then(function (response) {
            console.log('[ServiceWorker] Fetch Only', e.request.url);
            return response || fetch(e.request);
        }));
    }
});