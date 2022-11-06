(function () {
	'use strict';

	/**
	 * Event Aggregation Pattern
	 * To improve performance delegate all events for mouseEnter, mouseDown, mouseLeave, click, window.resize.
	 * Modules register selectors (to match) along with callbacks
	 */
	const mouseEnter = new Map();
	const mouseDown = new Map();
	const mouseLeave = new Map();
	const click = new Map();
	const resize = new Set(); // no selectors require for resize

	/**
	 * Register a Module 'listener' with a specific Event
	 * @param {Map} map each EventListener
	 * @param {String} selector to match
	 * @param {Function} callback - callback
	 */
	const addListener = ( map, selector, callback ) => {
		if( typeof callback !== "function" ){
			console.log( `eventDelegation, must be a Function. Search selector ${selector}`);
		}

		if ( map.has(selector) ){
			throw new TypeError('Event Delegation: selector already added : ' + selector);
		}
		map.set(selector, callback);
	};

	/**
	 * Exports
	 */
	const userDown = ( selector, callback ) => addListener(mouseDown, selector, callback);

	/**
	 * When Event fires check for registered listeners
	 * @param {Event} - event
	 * @param {Map} - listeners
	 */
	const notifyListeners = ( event, listeners ) => {
		const target = event.target;
		if (
			target === document ||
			target === document.documentElement ||
			target === document.body
		) return false;

		listeners.forEach(( moduleCallback, key ) => {
			if ( target.matches(key) ){
				moduleCallback(event);
			}
		});
	};
	/**
	 * Event handlers
	 * Static functions for each event
	 * Helpful for handling things with Touch
	 */
	const handleMouserEnter = ( e ) => notifyListeners(e, mouseEnter);
	const handleMouserDown = ( e ) => notifyListeners(e, mouseDown);
	const handleMouserLeave = ( e ) => notifyListeners(e, mouseLeave);
	const handleClick = ( e ) => notifyListeners(e, click);

	/**
	 * On a touch device event order is: touchstart, mouseenter then mousedown.
	 * This can mess up the interaction, consider a nav popup, where users can hover
	 * and then click to lock it open. On touch all we want is the 'lock' interaction
	 * Use a lazy load pattern to remove all the mouse event listeners and switch to touch
	 */

	let handleTouchStart = ( e ) => {
		document.removeEventListener('mouseenter', handleMouserEnter, { capture: true });
		document.removeEventListener('mousedown', handleMouserDown, { capture: true });
		document.removeEventListener('mouseleave', handleMouserLeave, { capture: true });
		notifyListeners(e, mouseDown);

		// update the handler
		handleTouchStart = ( e ) => {
			notifyListeners(e, mouseDown);
		};
	};

	/**
	 * Event Listeners
	 * Using capture to get the event first
	 */
	document.addEventListener('mouseenter', handleMouserEnter, { capture: true });
	document.addEventListener('mousedown', handleMouserDown, { capture: true });
	document.addEventListener('mouseleave', handleMouserLeave, { capture: true });
	document.addEventListener('touchstart', handleTouchStart, { capture: true });
	document.addEventListener('click', handleClick, { capture: true });

	/**
	 * Throttle Resize Event (high rate event)
	 */
	const resizeThrottle = (() => {
		let throttleID = 0;
		// public
		const delay = () => {
			clearTimeout(throttleID);
			throttleID = setTimeout(() => {
				resize.forEach(( cb ) => {
					cb();
				});
			}, 150);
		};
		return { delay }
	})();

	// Throttle high rate events
	window.onresize = () => resizeThrottle.delay();

	const navOverlay = {
		btn: document.querySelector(".overlay-menu-btn"),
		topNav: document.querySelector('.top-nav'),
		open: false,

		/**
		 * init
		 */
		init(){
			// 2 different shapes in <svg> btn, menu and cross
			this.svgMenu = this.btn.querySelector('.svg-menu');
			this.svgMenuClose = this.btn.querySelector('.svg-menu-close');

			/**
			 * CSS Media Query for tablet collapse, must match CSS
			 * on init, check to see if we to activate the menu
			 */
			const mediaQueryList = window.matchMedia("(max-width: 900px)");
			if ( mediaQueryList.matches ) this.activate();

			/**
			 * Watch for changes in browser width and change as appropriate
			 */
			mediaQueryList.addEventListener('change', () =>{
				if ( mediaQueryList.matches ){
					this.activate();
				} else {
					this.remove();
				}
			});

			/**
			 * Event delegation on svg.overlay-menu-btn
			 */
			userDown('.overlay-menu-btn', () => this.change());
		},

		remove(){
			this.hide();
			this.btn.style.cssText = "";
		},

		activate(){
			this.btn.style.display = "block";
		},

		change(){
			if( this.open ){
				this.hide();
			} else {
				this.show();
			}
		},

		show(){
			this.open = true;
			this.topNav.style.display = "flex";
			this.svgMenu.style.display = "none";
			this.svgMenuClose.style.display = "block";

			// hmmm, not sure about this, depends on the overlay size and if it needs to scroll
			// document.body.style.overflow = "hidden"
		},

		hide(){
			this.open = false;
			this.topNav.style.cssText = "";
			this.svgMenu.style.display = "block";
			this.svgMenuClose.style.display = "none";
		}
	};


	/**
	 * Delay for a moment to set up the navigation
	 */
	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => navOverlay.init(), 100);
	}, { once: true });

})();
