const middleware = require('webpack-dev-middleware'),
		express = require('express'),
		path = require('path'),
		vhost = require('vhost');

const { setupCompiler } = require('../helpers/compiler.js');

const handle404 = (compiler) => (req, res) => {
	res.status(404);
	res.set('content-type','text/html');

	const filename = path.join(compiler.outputPath,'404.html');
	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if(err) {
			console.error(`Can't find custom 404.html page, just send plain 404 page`);
			res.send('<h1>404</h1>');
		} else {
			res.send(result);
		}

		res.end();
	});
}

const action = async (workspace, cmd) => {
	if(typeof workspace !== 'undefined')
		return console.log('Command `dev` does not support workspaces yet');

	console.log("Ravendesk dev server")

	const compiler = await setupCompiler(cmd.mode);
	if(!compiler) return;

	const app = express();

	if(cmd.hostname) {
		app.use( vhost(cmd.hostname, middleware(compiler, {}) ));
		app.use( vhost(cmd.hostname, handle404(compiler) ));

		await app.listen(cmd.port);
		console.log(`Server on http://${cmd.hostname}:${cmd.port}/`);
	} else {
		app.use( middleware(compiler, {}) );
		app.use( handle404(compiler) );

		await app.listen(cmd.port);
		console.log(`Server on http://localhost:${cmd.port}/`);
	}
};

module.exports = (program) =>
	program
		.command('dev [workspace]')
		.option('-m, --mode <mode>', 'production vs development build', 'development')
		.option('-p, --port <port>', 'port to run the devserver on', 3000)
		.option('-h, --hostname <host>', 'hostname to bind the devserver on')
		.action(action);
