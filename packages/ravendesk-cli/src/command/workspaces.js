const async = require('../helpers/async.js');

const printTable = (arrayOfObjects, mapHeaders = id => id) => {
	if(arrayOfObjects.length < 1) return;

	const logWithPadding = padding =>
		(...data) => {
			const updatedData = data.map(d => {
				const l = padding - ('' + d).length;
				return `${d}${' '.repeat(l>0?l:0)}`
			});
			console.log(...updatedData);
		};

	const log_ = logWithPadding(30);

	const headers = Object.keys(arrayOfObjects[0]);
	log_(...(headers.map(mapHeaders)));
	console.log();

	arrayOfObjects
		.map(obj => headers.map(header => obj[header]))
		.forEach(obj => log_(...obj));
};

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

	const isNodeRepo = (await Promise.all(packages
		.map(path => ({ path }))
		.map(async (obj) => {
			const isNodeRepo = await async.fileExists(`${obj.path}/package.json`);
			return { ...obj, isNodeRepo };
		})
	))
		.flatMap(id=>id)
		.filter(({ isNodeRepo }) => isNodeRepo)
		.map(({ isNodeRepo, ...obj }) => obj); //*/

	const isRavenDeskRepo = (await Promise.all(isNodeRepo
		.map(async (obj) => {
			const isRavenDeskRepo = await async.fileExists(`${obj.path}/.ravendesk`);
			return { ...obj, isRavenDeskRepo };
		})
	)).flatMap(id=>id);

	printTable(isRavenDeskRepo, header =>
		header === 'path' ? 'Path' :
		header === 'isNodeRepo' ? 'Contains package.json' :
		header === 'isRavenDeskRepo' ? 'RavenDesk Repo' :
		header
	);
}

module.exports = (program) => {
	program.command('workspaces').action(workspacesAction);
};
