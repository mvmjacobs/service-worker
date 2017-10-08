const CACHE_NAME = 'v1';

const puppyCache = [
	'/service-worker/',
	'/service-worker/index.html',
	'/service-worker/js-logo.png',
	'/service-worker/images/puppy1.jpg',
	'/service-worker/images/puppy2.jpg',
	'/service-worker/images/puppy3.jpg',
	'/service-worker/images/puppy4.jpg'
];

/** events */
this.oninstall = (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(puppyCache);
			})
	);
};

this.onfetch = (event) => {
	event.respondWith(
		caches.open(CACHE_NAME)
			.then((cache) =>
				cache.match(event.request)
					.then(response => {
						// Cache hit
						if (response) {
							return response;
						}

						// Cache miss
						// 1. Fetch data
						// 2. Clone response
						// 3. Cache response
						// 4. Return response
						return fetch(event.request)
							.then((res) => {
								const r = res.clone();
								caches.open(CACHE_NAME)
									.then((c) => {
										c.put(event.request, r);
									});
								return res; // Don't wait for the request to cache
							});
					})
			)
	)
};