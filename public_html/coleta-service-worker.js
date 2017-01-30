
var cacheName = 'coletaCache-v3';
var filesToCache = [
    './',
    'images/everis_favico.png',
    'images/pause.png',
    'images/play.png',
    'plugins/jquery-3.1.1.min.js',
    'script/pwaColeta.js',
    'script/respond.js',
    'scss/style.scss',
    'styles/normalize.min.css',
    'styles/style.css',
    'index.html',
    'row_coleta.html'
];
 

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
    e.respondWith(caches.match(e.request).then(function (response) {
        return response || fetch(e.response);
    }));
//    if (e.request.mode === 'navigate' || (e.request.method === 'GET' &&
//            e.request.headers.get('accept').includes('text/html'))) {
//        e.respondWith(fetch(e.request).catch(function (error) {
//            return caches.match(cacheName);
//        }));
//    }

});
