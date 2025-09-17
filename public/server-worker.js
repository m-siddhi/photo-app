const CACHE_NAME = "photos-app-cache-v1";
const urlsToCache = ["/", "/index.html"];

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
  const requestURL = new URL(event.request.url);

  // Skip caching API calls → force them to fail offline
  if (requestURL.hostname.includes("api.escuelajs.co")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Reject so React shows "Error: failed to fetch"
        return Promise.reject("API fetch failed");
      })
    );
    return;
  }

  // Cache-first for app shell (HTML, CSS, JS, images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // fallback to index.html for SPA routes
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
