self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('core').then((cache) => {
			return cache.addAll([
				'/assets/fonts/roboto-v27-latin_greek-300.woff2',
				'/assets/fonts/roboto-v27-latin_greek-500.woff2',
				'/assets/fonts/roboto-v27-latin_greek-500italic.woff2',
				'/assets/fonts/roboto-v27-latin_greek-700.woff2',
				'/assets/fonts/roboto-v27-latin_greek-700italic.woff2',
				'/assets/fonts/merriweather-v30-latin-300italic.woff2'
			]);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});