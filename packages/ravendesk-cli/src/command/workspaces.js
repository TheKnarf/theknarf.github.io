const async = require('../helpers/async.js');

const workspacesAction = async () => {
	console.log('Workspaces');	

	if(!(await async.fileExists('./package.json'))) {
		console.error('Can\'t find package.json');
		return;
	}

	const packageJson = JSON.parse(
		await async.readFile('./package.json')
	);

	if(typeof packageJson.workspaces == 'undefined') {
		console.error('No filed called workspaces in package.json');
		return;
	}

	const packages = (await Promise.all(packageJson
		.workspaces
		.map(async (workspace) => await async.glob(workspace))
	)).flatMap(id=>id);

	console.log(packages);
	// TODO: figure out which of theese are ravendesk repos
}

module.exports = (program) => {
	program.command('workspaces').action(workspacesAction);
};
