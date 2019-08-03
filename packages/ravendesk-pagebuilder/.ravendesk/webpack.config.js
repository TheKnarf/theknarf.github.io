module.exports = ({ config, mode }) => {
	const presetBlog = require('@ravendesk/preset-blog')({ config, mode });

	return [
		presetBlog,
		{
			entry: './src/index.js',
			mode,
			module: presetBlog.module
		}
	];
};
