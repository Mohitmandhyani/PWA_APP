var staticCacheName = "mohit";

self.addEventListener("install", function (event) {
  event.waitUntil(
    Promise.all([
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(["/", "/index.html"]);
      }),
      self.skipWaiting()
    ])
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (matching) {
        return matching || caches.match("offline.html");
      });
    })
  );
});

self.addEventListener("push", function (event) {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method === "pushMessage") {
      // Check if notification permission is granted
      if (Notification.permission === "granted") {
        // Show the notification
        self.registration.showNotification("Test App", {
          body: data.message,
        });
      } else {
        console.log("Notification permission not granted.");
      }
    }
  }
});

self.addEventListener('sync', event => {
  if (event.tag === 'syncMessage') {
    console.log("Sync successful!");
  }
});
