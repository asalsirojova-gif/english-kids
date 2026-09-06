'use strict';
/* Bolajonlar — Service Worker
   Ilovani internetsiz ishlatish uchun barcha fayllarni keshga saqlaydi. */

const CACHE_NAME = 'bolajonlar-cache-v3';

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

/* Ikkita strategiya:
   1) Asosiy fayllar (HTML/CSS/JS) — "network-first": internet bo'lsa har doim
      eng so'nggi versiyani oladi va keshni yangilaydi; internet bo'lmasa keshdan beradi.
      Shu tufayli fayllar yangilanganda foydalanuvchi eski versiyada "qotib qolmaydi".
   2) Qolgan hamma narsa (ikonkalar va h.k.) — "cache-first": tezroq va
      internetni tejaydi, chunki ular kamdan-kam o'zgaradi. */
const NETWORK_FIRST_FILES = ['/', '/index.html', '/style.css', '/app.js', '/manifest.json'];

function isNetworkFirst(url){
  return NETWORK_FIRST_FILES.some((path) => url.pathname.endsWith(path) || url.pathname === path);
}

self.addEventListener('fetch', (event) => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if(isNetworkFirst(url)){
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if(response && response.status === 200){
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

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
