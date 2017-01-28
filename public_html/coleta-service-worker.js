
var cacheName = 'coletaCache-v1';
var filesToCache = [
    '/ProjetoColetaPWA/',
    '/ProjetoColetaPWA/images/everis_favico.png',
    '/ProjetoColetaPWA/images/pause.png',
    '/ProjetoColetaPWA/images/play.png',
    '/ProjetoColetaPWA/plugins/jquery-3.1.1.min.js',
    '/ProjetoColetaPWA/script/pwaColeta.js',
    '/ProjetoColetaPWA/script/respond.js',
    '/ProjetoColetaPWA/scss/style.scss',
    '/ProjetoColetaPWA/styles/normalize.min.css',
    '/ProjetoColetaPWA/styles/style.css',
    '/ProjetoColetaPWA/index.html',
    '/ProjetoColetaPWA/row_coleta.html'
];


self.addEventListener('install', function(e){
    e.waitUntil(caches.open(cacheName).then(function(cache){
        return cache.addAll(filesToCache);
    }).catch(function(){
        console.log(arguments);
    }));
});;

self.addEventListener('activate', function(e){
    e.waitUntil(caches.keys().then(function(keyList){
        return Promise.all(keyList.map(function(key){
            if(key !== cacheName){
                return caches.delete(key);
            }
        }));
    }));
});

self.addEventListener('fetch', function(e){
   e.respondWith(caches.match(e.request).then(function(response){
       return response || fetch(e.response);
   })); 
});
