const CACHE='local-pdf-tools-v6';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./vendor/pdf-lib/pdf-lib.min.js','./vendor/ghostscript/gs.mjs','./vendor/ghostscript/gs.js','./vendor/ghostscript/gs.wasm'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
