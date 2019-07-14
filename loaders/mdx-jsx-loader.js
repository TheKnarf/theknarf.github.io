const mdx = require('@mdx-js/mdx');

module.exports = async function(content) {
	const callback = this.async();
	let result;

	try {
		result = await mdx(content)
	} catch (err) {
		return callback(err)
	}

	console.log(result);
	console.log();

	const code = `/* @jsx mdx */
	import { dom as mdx } from 'isomorphic-jsx';
	import { MDXTag } from 'mdxtag';
	//import { mdx } from '@mdx-js/react'
	${result}`;

	//const code = `/* @jsx mdx */
	//import React from 'react'
	//${result}
	//`

	return callback(null, code);
};
