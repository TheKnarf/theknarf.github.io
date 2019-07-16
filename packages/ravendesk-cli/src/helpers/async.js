const glob = require('glob'),
		fs = require('fs');

const asyncReadFile = async (file, encoding='utf8') => new Promise((resolve, reject) =>
	fs.readFile(file, encoding, (err, content) => {
		if(err) return reject(err);
		resolve(content);
	})
);

const asyncGlob = async (pattern) => new Promise((resolve, reject) =>
	glob(pattern, (err, files) => {
		if(err) return reject(err);
		resolve(files);
	})
);

// Based on: https://flaviocopes.com/how-to-check-if-file-exists-node/
const asyncFileExists = async (path) => new Promise((resolve, reject) =>
	fs.access(path, fs.F_OK, (err) => {
		if(err) return resolve(false);
		resolve(true);
	})
);

module.exports = {
	readFile: asyncReadFile,
	fileExists: asyncFileExists,
	glob: asyncGlob,
};
