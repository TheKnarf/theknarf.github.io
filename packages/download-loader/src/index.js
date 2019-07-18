const { getOptions } = require('loader-utils'),
		validateOptions = require('schema-utils'),
		http = require('http'),
		https = require('https'),
		url = require('url');

const schema = {
	type: 'object',
	properties: {
		url: {
			type: 'string'
		}
	}
};

module.exports = function(source) {
	var callback = this.async();

	const options = getOptions(this);
	validateOptions(schema, options, 'Download Loader');

	const protocol = url.parse(options.url).protocol;
	const client = (protocol == 'https' || protocol == 'https:') ? https : http;

	client
		.get(options.url, res => {
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk });
			res.on('end', () => {
				callback(null, rawData);
			});
		})
		.on('error', (e) => {
			callback(e);		
		});
}
