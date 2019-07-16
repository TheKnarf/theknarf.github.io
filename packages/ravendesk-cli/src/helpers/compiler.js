const async = require('../helpers/async.js'),
		webpack = require('webpack');

const setupCompiler = async () => {
	if(!(await async.fileExists('./webpack.config.js'))) {
		console.error('Can\'t find webpack.config.js');
		return false;
	}

	const config = await async.readFile('./webpack.config.js');
	return webpack(eval(config));
};

module.exports = {
	setupCompiler,
};
