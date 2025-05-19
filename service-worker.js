// 缓存名称
const CACHE_NAME = 'digit-sum-calculator-v1';
// 需要缓存的文件
const urlsToCache = [
    'index.html',
    'manifest.json',
    'service-worker.js'
];

// 安装Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// 激活Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                );
            })
    );
});

// 拦截请求并使用缓存
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果缓存中有匹配的资源，直接返回
                if (response) {
                    return response;
                }
                
                // 否则，从网络获取资源
                return fetch(event.request);
            })
    );
});    