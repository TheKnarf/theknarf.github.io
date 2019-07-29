// This provides symbolic names for the octal modes used by git trees.
const modes = require('js-git/lib/modes');

const createNewGitRepo = () => {
	let repo = {};

	require('js-git/mixins/mem-db')(repo);
	require('js-git/mixins/create-tree')(repo);
	require('js-git/mixins/pack-ops')(repo);
	require('js-git/mixins/formats')(repo);

	return repo;
};

module.exports = {
	createNewGitRepo,
	modes,
};
