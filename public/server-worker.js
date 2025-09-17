const CACHE_NAME = "photos-app-cache-v1";
const urlsToCache = ["/"];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached files when offline
self.addEventListener("fetch", (event) => {
  // Skip caching API calls → force them to fail offline
  if (event.request.url.includes("api.escuelajs.co")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // let it fail so React shows "Error: failed to fetch"
        return Promise.reject("API fetch failed");
      })
    );
    return;
  }

  // Cache-first for app shell (HTML, CSS, JS)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
