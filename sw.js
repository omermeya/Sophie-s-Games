// Service worker for the games hub.
// Strategy: try the network first (so updates show up right away when online),
// save every successful response, and fall back to the saved copy when offline.
// You never need to edit this file when adding a game.

const CACHE = 'games-hub';
const SHELL = ['./', 'index.html', 'games.json', 'manifest.json',
               'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const network = fetch(req).then((res) => {
    // 200 = normal file, opaque = file from another site (fonts, libraries).
    if (res && (res.status === 200 || res.type === 'opaque')) {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  });

  try {
    return await withTimeout(network, NETWORK_TIMEOUT_MS);
  } catch {
    const saved = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (saved) return saved;
    try {
      return await network; // slow network and nothing saved: keep waiting
    } catch {
      return new Response(
        '<meta charset="utf-8"><meta name="viewport" content="width=device-width">' +
        '<p style="font-family:sans-serif;padding:24px">' +
        'This game is not saved on this device yet. Open the app once while connected to the internet.</p>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
  }
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); },
                 (e) => { clearTimeout(t); reject(e); });
  });
}
