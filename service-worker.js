const CACHE_NAME='bs-bi-platform-v3-full-bilingual-ui';
const CORE_ASSETS=['/','/index.html','/manifest.json','/import-center.js','/ui-language.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().