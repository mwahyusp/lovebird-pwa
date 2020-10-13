const CACHE_NAME = 'lovebirdpwa';
var urlsToCache = [
	'/',
	'/manifest.json',
	'/nav.html',
	'/index.html',
	'/pages/beranda.html',
	'/pages/cara.html',
	'/pages/spesies.html',
	'/pages/taksonomi.html',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/images/apple-touch-icon.png',
	'/images/android-chrome-192x192.png',
	'/images/android-chrome-512x512.png',
	'/images/seldat.png',
	'/images/species.png',
	'/images/species1.jpg',
	'/images/black_masked.png',
	'/images/fischer.jpg',
	'/images/lilian.jpg',
	'/images/black_checked.jpg',
	'/images/peach_faced.jpg',
	'/images/black_winged.jpg',
	'/images/red_faced.jpg',
	'/images/grey_headed.jpg',
	'/images/black_collared.jpg',
	'/images/favicon-16x16.png',
	'/images/favicon-32x32.png',
	'images/logo.png'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

