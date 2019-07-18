const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ config, mode }) => {
	config.target = 'node';
	config.externals = [ require('webpack-node-externals')() ];

	config.module.rules = [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [
				{ loader: 'babel-loader', options: {
					presets: [
						[ require.resolve('@babel/preset-react'), {
							pragma: 'dom',
							pragmaFrag: 'fragment',
							throwIfNamespace: false
						}]
					]
				}},
				'simple-frontmatter-loader',
			]
		},
		{
			test: /\.html$/,
			use: [
				{
					loader: 'simple-frontmatter-loader',
					options: {
						use: [{ loader: 'html-loader', options: { exportAsEs6Default: 'es6' } }]
					}
				}
			]
		},
		{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
		{ test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader' },
	];

	config.plugins.push(new MiniCssExtractPlugin());

	config.resolve = config.resolve || {};
	config.resolve.extensions = ['.js', '.jsx', '.md', '.mdx', '.html'];

	return config;
};
