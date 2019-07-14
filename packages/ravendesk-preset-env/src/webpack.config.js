const path = require('path'),
	Extractor = require('extractor-webpack-plugin'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	target: 'node',
	externals: [ require('webpack-node-externals')() ],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader', options: {
						babelrc: false,
						configFile: false,
						presets: [
							[ require.resolve('@babel/preset-env'), {
								loose: true,
								modules: 'commonjs',
							}],
							[ require.resolve('@babel/preset-react'), {
								pragma: 'dom',
								pragmaFrag: 'fragment',
								throwIfNamespace: false
							}],
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
			{ test: /\.(png|jpg|gif)$/, loader: 'file-loader' },
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new Extractor(),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.md', '.mdx', '.html']
	}
};
