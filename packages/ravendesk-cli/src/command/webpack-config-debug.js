const async = require('../helpers/async.js');
const { webpack_config_file } = require('../config.js');
const { setupWebpackConfig } = require('../helpers/compiler');

const action = async () => {
	console.log(
		'RavenDesk sets up a minimal Webpack config,',
		`\nthen it looks for a ${webpack_config_file} that may modify the config if needed.`,
		"\nIf you only wanted to see the minimal webpack setup run this comand with the --minimal flag."
	);
	
	if(await async.fileExists(webpack_config_file)) {
		console.log(`\n${webpack_config_file} found\n`);
	} else {
		console.log(`\n${webpack_config_file} not found\n`);
	}

	console.log(
		JSON.stringify(
			await setupWebpackConfig('production'),
			null,
			2
		)
	);
};

module.exports = program =>
	program
		.command('webpack-config-debug')
		.action(action);
