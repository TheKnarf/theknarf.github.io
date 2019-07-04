const tmpFilename = 'WebpackExtractorPluginTmpFilename.js';

function Extractor(options) {}

Extractor.prototype.apply = function(compiler) {
	compiler.options.output.filename =  tmpFilename;
	compiler.options.output.libraryTarget= 'commonjs2';

	compiler.hooks.emit.tapAsync('ExtractorPlugin', (compilation, callback) => {

		if(typeof compilation['assets'][tmpFilename] !== 'undefined') {

			const source = compilation['assets'][tmpFilename].source(),
					filelist = eval(source);

			if(typeof filelist.length == 'number') {

				filelist.forEach( ({ route, content }) => {
					compilation.assets[route] = {
						source: () => content,
						size: () => content.length
					}
				});

			} else {

				for(var filename in filelist) {
					((f, c) => {
						compilation.assets[f] = {
							source: () => c,
							size: () => c.length
						}
					})(filename, filelist[filename]);
				}

			}

			delete compilation['assets'][tmpFilename];
		}
		
		callback();
	});	
};

module.exports = Extractor;
