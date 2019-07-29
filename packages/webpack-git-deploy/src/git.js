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

//repo.saveAs("blob", filecontent, (err, blobHash) => {
const saveAs = (repo, type, content) => new Promise((resolve, reject) => {
	repo.saveAs(type, content, (err, hash) => {
		if(err) return reject(err);
		resolve(hash);
	});
});

const saveAsBlob =   (repo, content) => saveAs(repo, 'blob',   content);
const saveAsTree =   (repo, content) => saveAs(repo, 'tree',   content);
const saveAsCommit = (repo, content) => saveAs(repo, 'commit', content);

module.exports = {
	createNewGitRepo,
	modes,
	saveAsBlob,
	saveAsTree,
	saveAsCommit,
};
