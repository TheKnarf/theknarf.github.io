#!/usr/bin/env node

const fs = require('fs'),
		commander = require('commander'),
		program = new commander.Command(),
		webpack = require('webpack');

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

const buildAction = async () => {
	console.log("RavenDesk building");

	if(!fs.existsSync('./webpack.config.js')) {
		return console.error('Can\'t find webpack.config.js');
	}

	const config = await asyncReadFile('webpack.config.js');
	const compiler = webpack(eval(config));
	compiler.run((err, stats) => {
		if(err || stats.hasErrors()) {
			throw err;
		}
		console.log('Compiled');
	});
};

const devAction = () => {
	console.log("Ravendesk dev server")
	console.log("To be implemented")
};

program
	.command('build')
	.action(buildAction);

program
	.command('dev')
	.action(devAction);

program.parse(process.argv);

if( process.argv.length < 3 )
	return program.outputHelp();
