const action = () => {
	console.log('deploy, to be implemented');
};

module.exports = program =>
	program
		.command('deploy')
		.action(action);
