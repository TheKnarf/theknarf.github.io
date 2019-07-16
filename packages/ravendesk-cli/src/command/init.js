const async = require('../helpers/async.js');

const action = async (workspace) => {
	console.log('Initializing RavenDesk repo');

	if(typeof workspace !== 'undefined') {
		console.log('`init` does not support workspace yet');
		return;
	}

	if(!(await async.fileExists('./package.json'))) {
		console.error('Can\'t find package.json, run npm init first');
		return;
	}

	if(await async.fileExists('./.ravendesk')) {
		console.error('Folder .ravendesk allready exists');
		return;
	}

	await async.mkdir('./.ravendisk');

		
};

module.exports = program =>
	program
		.command('init [workspace]')
		.action(action);
