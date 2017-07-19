#!/usr/bin/env node

const webpack = require("webpack");

const yargs = require("yargs");
require("webpack/bin/config-yargs")(yargs);

const argv = yargs.argv;

const wpOpt = require("webpack/bin/convert-argv")(yargs, argv);

function processOptions(wpOpt) {
	let compiler;
	try {
		compiler = webpack(wpOpt);
	} catch(e) {
		if(e instanceof webpack.WebpackOptionsValidationError) {
			console.error(colorError(options.stats.colors, e.message));
			process.exit(1); // eslint-disable-line
		}
		throw e;
	}

	compiler.plugin("done", (stats) => {
		/*		
		var cache = [];
		console.log(JSON.stringify(stats.compilation.assets, function(key, value) {
		    if (typeof value === 'object' && value !== null) {
		        if (cache.indexOf(value) !== -1) {
		            // Circular reference found, discard key
		            return;
		        }
		        // Store value in our collection
		        cache.push(value);
		    }
		    return value;
		}));//*/


		Object.keys(stats.compilation.assets).forEach(function(key) {
			console.log(key);
		});

	});

	compiler.run(()=>{});
}
processOptions(wpOpt);