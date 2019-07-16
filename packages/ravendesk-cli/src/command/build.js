const { setupCompiler } = require('../helpers/compiler.js');

const action = async () => {
	try {
		console.log("RavenDesk building");

		const compiler = await setupCompiler();
		if(!compiler) return;

		compiler.run((err, stats) => {
			if (err) {
				console.error(err.stack || err);
				if (err.details) {
					console.error(err.details);
				}
				return;
			}

			const info = stats.toJson();

			if (stats.hasErrors()) {
				console.error(info.errors);
			}

			if (stats.hasWarnings()) {
				console.warn(info.warnings);
			}
			console.log('Compiled');
		});
	} catch(e) {
		console.error(e);
	}
};

module.exports = (program) => {
	program.command('build [workspace]').action(action);
};
