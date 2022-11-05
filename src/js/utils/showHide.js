/**
 * Show a DOM Element, the default setting of "" allows
 * the CSS to be used, stopping inline style override
 * @param {Element} el
 * @param {String} displayType - optional, e,g "block","flex",'table-row',etc
 */
const show = ( el, displayType = "" ) => {
	if ( el === null ) return;
	el.style.display = displayType;
};

/**
 * Hide a DOM Element ()
 * @param {Element} el
 */
const hide = ( el ) => {
	if ( el === null ) return;
	el.style.display = "none";
};

/**
 * is Hidden
 * @param {Element} el
 * @return {Boolean}
 */
const isHidden = ( el ) => {
	return (el.offsetParent === null);
};

export { show, hide, isHidden };