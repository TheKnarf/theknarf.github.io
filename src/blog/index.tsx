import { createElement } from 'react';
const modules = import.meta.glob('./**/*.mdx', { eager: true }) as any;

// The `routes` variable is used by react-router
const routes = [];

// The `links` variable is used to show a list of links
const links = [];

const topLevelRoute = 'post/';

for (const modulePath in modules) {
	const { slug, title, dateWritten } = modules[modulePath]?.frontmatter;
	const path = topLevelRoute + slug;

	routes.push({
		path: slug,
		element: createElement(modules[modulePath]?.default),
	});

	links.push({
		title,
		dateWritten,
		link: `/${path}/`
	});
}

export { routes, links };
