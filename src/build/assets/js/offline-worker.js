(() => {
	"use strict";
	if ( 'serviceWorker' in navigator ){
		navigator.serviceWorker.register('/assets/fonts/sw.js')
		.then(function ( reg ){

			if ( reg.installing ){
				console.log('*** SW - installing');
			} else if ( reg.waiting ){
				console.log('*** SW - installed');
			} else if ( reg.active ){
				console.log('*** SW - active');
			}

		}).catch(function ( error ){
			// registration failed
			console.log('*** SW failed :( - ' + error);
		});
	}

	// Check the font status using the Font API
	if( "fonts" in document ) {
		Promise.all([
			document.fonts.load("500 1em Roboto"),
			document.fonts.load("700 1em Roboto"),
			document.fonts.load("300 1em Merriweather")
		]).then(function () {
			document.documentElement.classList.add("fonts-loaded");
		});
	}
})();