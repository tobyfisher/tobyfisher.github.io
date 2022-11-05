import * as utils from "utils.js";

/**
 * Handle DOM collections in modules
 * Create a Facade to Map to link the DOM data attribute
 * with the Map Key
 */
const Collection = {
	map: new Map(),
	dataAttr: 'data-blc',
	/**
	 * Add a new DOM Element to the collection
	 * this IS the whole point of the Facade; link the Key to DOM element.
	 * @param {*} value
	 * @param {Element} el
	 * @return {string | void}
	 */
	add( value, el ){
		const uniqueKey = utils.getUniqueToken();
		this.map.set(uniqueKey, value);
		el.setAttribute(this.dataAttr, uniqueKey);
		return uniqueKey;
	},

	/**
	 * Get Key from DOM element data attribute
	 * @param {Element} el - DOM Element to check
	 * @returns Key || False
	 */
	getKey( el ){
		let key = el.getAttribute(this.dataAttr);
		if ( key === null || key === "" ){
			return false;
		} else {
			return key;
		}
	},

	/**
	 * Get value by key
	 * @param key
	 * @returns value
	 */
	get( key ){
		return this.map.get(key);
	},

	/**
	 * Get the First added value
	 * @returns value
	 */
	getFirst(){
		const iterator = this.map.values();
		return iterator.next().value;
	},

	/**
	 * Get the 'next' value in collection
	 * @param {Key} startKey - next key from here
	 * @returns value
	 */
	getNext( myKey ){
		const it = this.map.keys();
		let key = it.next();

		while ( !key.done){
			if ( key.value === myKey ) return it.next().value;
			key = it.next();
		}

		return false;
	},

	/**
	 * Get the 'previous' value in collection
	 * @param {Key} startKey - previous key from here
	 * @returns value
	 */
	getPrev( myKey ){
		const it = this.map.keys();
		let value = false;

		for ( const key of it ){
			if ( key === myKey ) return value; //
			value = key.value;
		}

		return false;
	},

	/**
	 * Has Key?
	 * @returns {Boolean}
	 */
	has( key ){
		return this.map.has(key);
	},

	/**
	 * Remove to allow GC
	 * @returns {Boolean}
	 */
	delete( key ){
		return this.map.delete(key);
	},

	/**
	 * Get all entries
	 * @return iterator;
	 */
	all(){
		return this.map.entries();
	}
}

export const createCollection = () => Object.create(Collection);