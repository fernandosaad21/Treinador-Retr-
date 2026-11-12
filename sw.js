const C='treinador-retro-v6';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  const doc=r.mode==='navigate'||/\/(index\.html)?$/.test(new URL(r.url).pathname);
  if(doc){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html').then(h=>h||caches.match('./'))));return}
  e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>hit);return hit||net}))});
