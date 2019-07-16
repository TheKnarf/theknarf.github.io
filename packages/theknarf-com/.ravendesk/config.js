const { dom } = require('isomorphic-jsx');

module.exports = (addAsset) => {
	const sources = require.context('../src', true, /\.(js|jsx|md|mdx|html)$/);

	sources	
		.keys()
		.map(sources)
		.filter(item => typeof item['frontmatter'] !== 'undefined'
			&& typeof item['frontmatter']['route'] !== 'undefined')
		.map(item => {
			const route = item['frontmatter']['route'];

			const Func = (typeof item['default'] == 'function') ?
				item['default'] :
				() => item['default'];

			let Layout = ({ children }) => children;
			if(typeof item['layout'] == 'function');
				Layout = item['layout'];

			addAsset(route, <Layout><Func /></Layout>);
		});
};
