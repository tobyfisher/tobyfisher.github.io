import * as core from "core.js";


const navOverlay = {
	btn: document.getElementById('js-menu-btn'),
	pagesNav: document.getElementById('js-pages-nav'),
	open: false,

	/**
	 * init
	 */
	init(){
		// 2 different shapes in <svg> btn, menu and cross
		this.svgMenu = this.btn.querySelector('.svg-menu-icon');
		this.svgClose = this.btn.querySelector('.svg-close-icon');

		/**
		 * CSS Media Query for tablet collapse, must match CSS
		 * on init, check to see if we to activate the menu
		 */
		const mediaQueryList = window.matchMedia("(max-width: 799px)");
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
		core.userDown('#js-menu-btn', () => this.change());
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
		this.pagesNav.style.display = "flex";
		this.svgMenu.style.display = "none";
		this.svgClose.style.display = "block";

		// hmmm, not sure about this, depends on the overlay size and if it needs to scroll
		// document.body.style.overflow = "hidden"
	},

	hide(){
		this.open = false;
		this.pagesNav.style.cssText = "";
		this.svgMenu.style.display = "block";
		this.svgClose.style.display = "none";
	}
};


/**
 * Delay for a moment to set up the navigation
 */
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => navOverlay.init(), 100);
}, { once: true });


