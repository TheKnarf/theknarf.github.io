const { dom } = require('isomorphic-jsx');

module.exports = (addAsset) => {
	const sources = require.context('../src', true, /\.page\.(js|jsx|md|mdx|html)$/);
	const addPage = item => {
		const route = item['frontmatter']['route'];

		const Func = (typeof item['default'] == 'function') ?
			item['default'] :
			() => item['default'];

		if(typeof item['layout'] == 'function') {
			const Layout = item['layout'];
			addAsset(route, <Layout><Func /></Layout>);
		} else {
			addAsset(route, <Func />);
		}
	};

	sources	
		.keys()
		.map(sources)
		.filter(item => typeof item['frontmatter'] !== 'undefined'
			&& typeof item['frontmatter']['route'] !== 'undefined')
		.forEach(addPage);

	// This will let GitHub Pages know that it's not an Jekyll page
	// ref: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/
	addAsset('.nojekyll', '');

	// For Github Pages you can set a custom CNAME record
	// see: https://help.github.com/en/articles/using-a-custom-domain-with-github-pages
	//addAsset('CNAME', 'your-domain.com');
};
