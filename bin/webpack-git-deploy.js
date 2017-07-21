#!/usr/bin/env node
const MemoryFS = require("memory-fs");
const webpack = require("webpack");

const AUTHOR_NAME='Webpack-git-deploy';
const AUTHOR_EMAIL='noreply@Webpack-git-deploy.github.io';

const yargs = require("yargs");
require("webpack/bin/config-yargs")(yargs);

const argv = yargs.argv;

const wpOpt = require("webpack/bin/convert-argv")(yargs, argv);

wpOpt.output.path = '/';

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

	// This provides symbolic names for the octal modes used by git trees.
	var modes = require('js-git/lib/modes');

	// Create a repo by creating a plain object.
	var repo = {};

	require('js-git/mixins/mem-db')(repo);
	require('js-git/mixins/create-tree')(repo);
	require('js-git/mixins/pack-ops')(repo);
	require('js-git/mixins/walkers')(repo);
	require('js-git/mixins/read-combiner')(repo);
	require('js-git/mixins/formats')(repo);

	const fs = new MemoryFS();
	compiler.outputFileSystem = fs;

	compiler.run((err, stats) => {
		var tree = {};
		var hashes = [];

		Object.keys(stats.compilation.assets).forEach((filename) => {
			const filecontent = fs.readFileSync('/' + filename);
			
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