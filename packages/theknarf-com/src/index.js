import CNAME from 'file-loader?name=CNAME!./CNAME';
import { dom } from 'isomorphic-jsx';

const requireAll = r => r.keys().map(r);
var possible_routes = requireAll(require.context('./pages', true, /\.(js|jsx|md|mdx|html)$/));

const routes = possible_routes
	.filter(item => typeof item['frontmatter'] !== 'undefined'
                && typeof item['frontmatter']['route'] !== 'undefined')
	.map(item => {
		const route = item['frontmatter']['route'];

		const Func = (typeof item['default'] == 'function') ?
						item['default'] :
						() => item['default'];

		if(typeof item['layout'] == 'function') {
			const Layout = item['layout'];
			return { route, content: <Layout><Func /></Layout> };
		}

		return { route, content: <Func /> };
	});

module.exports = (addAsset) => {
	routes.map( ({ route, content }) =>
		addAsset(route, content)
	);
};