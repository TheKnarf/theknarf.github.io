#!/usr/bin/env node

const AUTHOR_NAME='Webpack-git-deploy';
const AUTHOR_EMAIL='noreply@Webpack-git-deploy.github.io';

const yargs = require("yargs");
require("webpack/bin/config-yargs")(yargs);
//require("./config-yargs")(yargs);

const argv = yargs.argv;

const wpOpt = require("webpack/bin/convert-argv")(yargs, argv);

function processOptions(wpOpt) {
	let compiler;
	const webpack = require("webpack");
	try {
		wpOpt.output.path = '/';
		compiler = webpack(wpOpt);
		compiler.outputFileSystem = new (require("memory-fs"));
	} catch(e) {
		if(e instanceof webpack.WebpackOptionsValidationError) {
			console.error(colorError(options.stats.colors, e.message));
			process.exit(1); // eslint-disable-line
		}
		throw e;
	}

	// This provides symbolic names for the octal modes used by git trees.
	var modes = require('js-git/lib/modes');

	// Create a repo by creating a plain object.
	var repo = {};

	require('js-git/mixins/mem-db')(repo);
	require('js-git/mixins/create-tree')(repo);
	require('js-git/mixins/pack-ops')(repo);
	require('js-git/mixins/formats')(repo);

	compiler.run((err, stats) => {
		var tree = {};
		var hashes = [];

		Object.keys(stats.compilation.assets).forEach((filename) => {
			const filecontent = compiler.outputFileSystem.readFileSync('/' + filename);
			
			repo.saveAs("blob", filecontent, (err, blobHash) => {
				if (err) throw err;

				tree[filename] = { mode: modes.file, hash: blobHash };
				hashes.push(blobHash);
			});
		});

		repo.saveAs("tree", tree, (err, treeHash) => {
			if (err) throw err;
			hashes.push(treeHash);

			repo.saveAs("commit", {
			    author: { name: AUTHOR_NAME, email: AUTHOR_EMAIL },
			    tree: treeHash,
			    message: "Webpack build\n"
			}, (err, commitHash) => {
				if (err) throw err;

				hashes.push(commitHash);
				
				repo.pack(hashes, {}, (err, stream) => {
					if (err) throw err;

					function readStream() {
						stream.take((err, data) => {
							if(err) throw err;
							if(data === undefined) return;
							process.stdout.write(data);
							readStream();
						});
					}
					readStream();
				});
			});
		});
	});
}
processOptions(wpOpt);