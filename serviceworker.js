var staticCacheName = "pwa";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("install", function (event) {});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    // Perform cleanup tasks or cache management here
    // For example, deleting outdated caches
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            // Check if the cache name is outdated and needs to be deleted
            // For example, you might compare cache names with the current cache version
          })
          .map(function (cacheName) {
            // Delete the outdated cache
            return caches.delete(cacheName);
          })
      );
    })
  );
});
