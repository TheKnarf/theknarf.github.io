var CONFIG_GROUP = "Config options:";

module.exports = function(yargs) {
	yargs
		.options({
			"author-name": {
				type: "string",
				describe: "Name of author for the git commit",
				group: CONFIG_GROUP,
				requiresArg: true
			},
			"author-email": {
				type: "string",
				describe: "Email for author for the git commit",
				group: CONFIG_GROUP,
				requiresArg: true
			},
			"git-branch": {
				type: "string",
				describe: "Name of git branch to commit to",
				group: CONFIG_GROUP,
				requiresArg: true
			},
		}).strict();
};
