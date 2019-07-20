const async = require('../helpers/async.js'),
		webpack = require('webpack'),
		ExtractorPlugin = require('extractor-webpack-plugin');

const { config_file, webpack_config_file } = require('../config.js');

const minimalWebpackConfig = (mode = 'production') => {
	return {
		entry: './' + config_file,
		module: {
			rules: [
				{
					test: /\.jsx?$/, exclude: /node_modules/,
					use: [
						{ loader: 'babel-loader', options: {
							presets: [
								[ require.resolve('@babel/preset-react'), {
									pragma: 'dom',
									pragmaFrag: 'fragment',
									throwIfNamespace: false
								} ]
							]
						}}
					]
				}
			]
		},
		plugins: [
			new ExtractorPlugin()
		]
	};
}

const setupWebpackConfig = async (mode = 'production') => {
	if(await async.fileExists(webpack_config_file)) {
		const webpackConfigFunc = eval(await async.readFile(webpack_config_file));

		if(typeof webpackConfigFunc !== 'function')
			return console.error(`Loaded file ${webpack_config_file} but it didn't export a function`);

		return webpackConfigFunc({
			config: minimalWebpackConfig(mode),
			mode
		});
	}

	return minimalWebpackConfig(mode);
};

const setupCompiler = async () => {
	if(!(await async.fileExists(config_file))) {
		console.error(`Can't find ${config_file}`);
		return false;
	}

	const webpack_config = await setupWebpackConfig('production');
	return webpack({ ...webpack_config, mode: 'production' });
};

module.exports = {
	setupCompiler,
	setupWebpackConfig,
	minimalWebpackConfig,
};
