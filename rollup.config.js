// Plugins
import { terser } from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';

/**
 * allows root aggregate modules to be
 * accessed anywhere,
 * e.g "utils.js" = "./src/js/utils.js"
 * However, if you want to use the ES2015 directly
 * these paths will need updating to relative paths (Rollup can do this!)
 */
let includePathOptions = {
	include: {},
	paths: [ './src/js' ],
	external: [],
	extensions: [ '.js' ]
};

/**
 * Output minified and normal JS
 */
export default {
	input: 'src/js/app.js', // required
	plugins: [ includePaths(includePathOptions) ],
	output: [ {
		file:'./docs/assets/js/oe.min.js',
		format: 'iife',
		plugins: [ terser()]
	}, {
		file:'./docs/assets/js/oe.js',
		format: 'iife'
	}],
};