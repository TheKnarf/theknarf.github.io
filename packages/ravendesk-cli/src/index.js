#!/usr/bin/env node

const fs = require('fs'),
		commander = require('commander'),
		program = new commander.Command(),
		webpack = require('webpack'),
		middleware = require('webpack-dev-middleware'),
		express = require('express');

const { asyncReadFile } = require('./helpers/async.js');
const workspacesCommand = require('./command/workspaces');

program
	.version('0.0.1')
	.usage('[options]')
	.description('RavenDesk static site generator')

const initActino = () => {
	console.log("tbi init");
};

const setupCompiler = async () => {
	if(!fs.existsSync('./webpack.config.js')) {
		console.error('Can\'t find webpack.config.js');
		return false;
	}

	const config = await asyncReadFile('./webpack.config.js');
	return webpack(eval(config));
};

const buildAction = async () => {
	try {
		console.log("RavenDesk building");

		const compiler = await setupCompiler();
		if(!compiler) return;

		compiler.run((err, stats) => {
			if (err) {
				console.error(err.stack || err);
				if (err.details) {
					console.error(err.details);
				}
				return;
			}

			const info = stats.toJson();

			if (stats.hasErrors()) {
				console.error(info.errors);
			}

			if (stats.hasWarnings()) {
				console.warn(info.warnings);
			}
			console.log('Compiled');
		});
	} catch(e) {
		console.error(e);
	}
};

const devAction = async () => {
	console.log("Ravendesk dev server")

	const compiler = await setupCompiler();
	if(!compiler) return;

	const app = express();

	app.use(
		middleware(compiler, {})
	);

	const port=3000;
	await app.listen(port);
	console.log(`Server on http://localhost:${port}/`);

};

program.command('init').action(initActino);
program.command('build').action(buildAction);
program.command('dev').action(devAction);

workspacesCommand(program);

program.parse(process.argv);

if( process.argv.length < 3 )
	return program.outputHelp();
