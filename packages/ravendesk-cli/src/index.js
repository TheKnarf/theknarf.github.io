#!/usr/bin/env node

const fs = require('fs'),
		commander = require('commander'),
		program = new commander.Command(),
		webpack = require('webpack'),
		middleware = require('webpack-dev-middleware'),
		express = require('express');

program
	.version('0.0.1')
	.usage('[options]')
	.description('RavenDesk static site generator')

const asyncReadFile = async (file, encoding='utf8') => new Promise((resolve, reject) =>
	fs.readFile(file, encoding, (err, content) => {
		if(err) return reject(err);
		resolve(content);
	})
);

const initActino = () => {
	console.log("tbi init");
};

const setupCompiler = async () => {
	if(!fs.existsSync('./webpack.config.js')) {
		console.error('Can\'t find webpack.config.js');
		return false;
	}

	const config = await asyncReadFile('webpack.config.js');
	return webpack(eval(config));
};

const buildAction = async () => {
	console.log("RavenDesk building");

	const compiler = await setupCompiler();
	if(!compiler) return;

	compiler.run((err, stats) => {
		if(err || stats.hasErrors()) {
			throw err;
		}
		console.log('Compiled');
	});
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

program.parse(process.argv);

if( process.argv.length < 3 )
	return program.outputHelp();
