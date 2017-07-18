#!/usr/bin/env node

const webpack = require("webpack");

const yargs = require("yargs");
require("webpack/bin/config-yargs")(yargs);

const argv = yargs.argv;

const wpOpt = require("webpack/bin/convert-argv")(yargs, argv, {
	outputFilename: "/bundle.js"
});

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
	console.log("compiler done");
});
//*/

//var shell = require("shelljs");
//shell.exec("echo test");

