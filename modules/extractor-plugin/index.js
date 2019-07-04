const tmpFilename = '_WebpackExtractorPluginTmpFilename.js';

function Extractor(options) {}

Extractor.prototype.apply = function(compiler) {
	compiler.options.output.filename =  tmpFilename;
	compiler.options.output.libraryTarget= 'commonjs2';

	compiler.hooks.emit.tapAsync('ExtractorPlugin', (compilation, callback) => {

		if(typeof compilation['assets'][tmpFilename] !== 'undefined') {

			const source = compilation['assets'][tmpFilename].source(),
					func = eval(source);

			if(typeof func !== 'function') {
				throw new Error('Not an function');
			}

			const addCompilationAsset = (name, content) => {
				compilation.assets[name] = {
					source: () => content,
					size: () => content.length
				};
			}

			func(addCompilationAsset);

			delete compilation['assets'][tmpFilename];
		}
		
		callback();
	});	
};

module.exports = Extractor;
