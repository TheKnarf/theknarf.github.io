const MemoryFs = require('memory-fs');
// TODO: how do I unit test this?

// TODO: maybe move the createNewGitRepo stuff into its own file
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

function WebpackGitDeployPlugin(options) {
	if(typeof options == 'undefined' ||
		typeof options.author == 'undefined' ||
		typeof options.author.name == 'undefined' ||
		typeof options.author.email == 'undefined') {

		throw new Error('Problems setting up WebpackGitDeployPlugin, you need to set option author.name and author.email');
	}

	this.author = options.author;
}

WebpackGitDeployPlugin.prototype.apply = function(compiler) {
	compiler.outputFileSystem = new MemoryFs();

	compiler.hooks.done.tap('WebpackGitDeployPlugin', (stats) => {
		let repo = createNewGitRepo(),
			 tree = {},
			 hashes = [];

		// todo: Rewrite to use async-await
		// 		If not, it might write the tree and commit before processing all files
		Object.keys(stats.compilation.assets).forEach((filename) => {
			const filecontent = compiler.outputFileSystem.readFileSync(stats.compilation.assets[filename].existsAt);
			
			repo.saveAs("blob", filecontent, (err, blobHash) => {
				if (err) throw err;

				tree[filename] = { mode: modes.file, hash: blobHash };
				hashes.push(blobHash);
			});
		});

		repo.saveAs("tree", tree, (err, treeHash) => {
			if (err) throw err;
			hashes.push(treeHash);

			// TODO: this commit should link back to the previus commit
			// 		so I have to figure out where to get that from.
			// 		For no I should probably get it as an option to the plugin,
			// 		and then deal with the problem in ravendesk-cli
			repo.saveAs("commit", {
			    author: { name: this.author.name, email: this.author.email },
			    tree: treeHash,
			    message: "Webpack build\n"
			}, (err, commitHash) => {
				if (err) throw err;

				hashes.push(commitHash);
				
				repo.pack(hashes, {}, (err, stream) => {
					if (err) throw err;

					// TODO: writing it to stdout might be fine if I'm supposed to pipe it into git-unpack-objects
					//       but the goal is to push it right to the server, so I need to do something else here
					//
					//       I also need to keep track of the commitHash
					function readStream() {
						stream.take((err, data) => {
							if(err) throw err;
							if(data === undefined) return;
							process.stdout.write(data);
							readStream();
						});
					}
					readStream();
				});
			});
		});

	});
};

module.exports = WebpackGitDeployPlugin;
