const middleware = require('webpack-dev-middleware'),
		express = require('express');

const { setupCompiler } = require('../helpers/compiler.js');

const action = async () => {
	console.log("Ravendesk dev server")

	const compiler = await setupCompiler();
	if(!compiler) return;

	const app = express();
	app.use( middleware(compiler, {}) );

	const port=3000;
	await app.listen(port);
	console.log(`Server on http://localhost:${port}/`);
};

module.exports = (program) => {
	program.command('dev [workspace]').action(action);
};
