const CACHE_NAME = 'bs-bi-platform-v3-bilingual-fix-2';
const CORE_ASSETS = ['/', '/index.html', '/manifest.json', '/import-center.js', '/ui-language.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function enhanceHtml(html) {
  let output = html;
  if (!output.includes('src="/import-center.js"')) {
    output = output.replace('</body>', '<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script><script src="/import-center.js"></script></body>');
  }
  if (!output.includes('src="/ui-language.js"')) {
    output = output.replace('</body>', '<script src="/ui-language.js"></script></body>');
  }
  return output;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html');

  if (isNavigation) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(async response => {
          if (!response || !response.ok) return response;
          const html = enhanceHtml(await response.text());
          return new Response(html, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store, must-revalidate'
            }
          });
        })
        .catch(async () => {
          const cached = await caches.match('/index.html');
          if (!cached) {
            return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
          }
          return new Response(enhanceHtml(await cached.text()), {
            headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }
          });
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
