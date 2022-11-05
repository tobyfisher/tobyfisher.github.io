/**
 * Fetch to replace XMLHttpRequest
 * Promise returned is ALWAYS resolved, any errors are dealt with here!
 * @param {String} url - set up for same origin
 * @return {Promise}
 */
export const contentFetch = ( url ) => {
	console.log('[Fetching] - ' + url);

	/**
	 * Fetch promise does not reject on HTTP errors (404, etc.)
	 * it only rejects when a network error occurs, however, I need
	 * flag a 404 the same as network error. Pass back a DOM string
	 * as alert-box if this happens
	 */
	const flagNetworkError = document.createElement('div');
	flagNetworkError.className = "alert-box issue";

	/**
	 * promise captured (and returned by fetch) is from EITHER then() or catch()
	 * so it's always resolved...
	 */
	const promise = fetch(url, {
		mode: 'same-origin'
		// credentials: 'include',
	})
	.then(( response ) => {
		if ( response.ok ){
			return response.text();
		} else {
			flagNetworkError.innerHTML = `Oops can not find: ${url}`;
			return flagNetworkError.outerHTML;
		}
	})
	.catch(function ( error ){
		debug.log(`Fetch network failure: ${error}`);
		flagNetworkError.innerHTML = `Network failure ${url}`;
		return flagNetworkError.outerHTML;
	});

	return promise;
};