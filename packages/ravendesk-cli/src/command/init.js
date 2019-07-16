const action = (workspace) => {
	console.log('init');
	console.log(workspace);
};

module.exports = (program) => {
	program.command('init [workspace]').action(action);
};
