/* eslint-disable no-restricted-globals */

const CACHE_NAME = "photos-app-cache-v1";
const urlsToCache = ["/", "/index.html"];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url);

  // Don’t cache API calls → let them fail offline
  if (requestURL.hostname.includes("api.escuelajs.co")) {
    event.respondWith(
      fetch(event.request).catch(() => Promise.reject("API fetch failed"))
    );
    return;
  }

  // Cache-first strategy for app shell
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
