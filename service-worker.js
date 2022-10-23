const CACHE_NAME = "lovebirdpwa";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/src/pages/beranda.html",
  "/src/pages/cara.html",
  "/src/pages/spesies.html",
  "/src/pages/taksonomi.html",
  "/src/css/materialize.min.css",
  "/src/js/materialize.min.js",
  "/src/js/script.js",
  "/src/images/apple-touch-icon.png",
  "/src/images/android-chrome-192x192.png",
  "/src/images/android-chrome-512x512.png",
  "/src/images/seldat.png",
  "/src/images/species.png",
  "/src/images/species1.jpg",
  "/src/images/black_masked.png",
  "/src/images/fischer.jpg",
  "/src/images/lilian.jpg",
  "/src/images/black_checked.jpg",
  "/src/images/peach_faced.jpg",
  "/src/images/black_winged.jpg",
  "/src/images/red_faced.jpg",
  "/src/images/grey_headed.jpg",
  "/src/images/black_collared.jpg",
  "/src/images/favicon-16x16.png",
  "/src/images/favicon-32x32.png",
  "/src/images/logo.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
