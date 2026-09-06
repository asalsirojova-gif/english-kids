'use strict';
/* Bolajonlar — Service Worker
   Ilovani internetsiz ishlatish uchun barcha fayllarni keshga saqlaydi. */

const CACHE_NAME = 'bolajonlar-cache-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/icons/logo.svg',
  './assets/icons/letters.svg',
  './assets/icons/numbers.svg',
  './assets/icons/colors.svg',
  './assets/icons/shapes.svg',
  './assets/icons/body.svg',
  './assets/icons/time.svg',
  './assets/icons/animals.svg',
  './assets/icons/fruits.svg',
  './assets/icons/nature.svg',
  './assets/icons/transport.svg',
  './assets/icons/quiz.svg',
  './assets/icons/ranking.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* Cache-first strategiya: avval keshdan beradi, topilmasa tarmoqdan
   oladi va keyingi safar uchun keshga qo'shadi. Tarmoq ham bo'lmasa,
   ilova baribir ochilishi uchun index.html bilan javob beradi. */
self.addEventListener('fetch', (event) => {
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if(cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if(!response || response.status !== 200 || response.type !== 'basic'){
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
