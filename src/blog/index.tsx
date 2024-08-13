import { createElement } from 'react';
const modules = import.meta.glob('./**/*.mdx', { eager: true }) as any;

// The `routes` variable is used by react-router
const routes = [];

// The `links` variable is used to show a list of links
const links = [];

const topLevelRoute = 'post/';

for (const modulePath in modules) {
  const frontmatter =  modules[modulePath]?.frontmatter;
	const { slug, title, dateWritten } = frontmatter;
	const path = topLevelRoute + slug;

	routes.push({
		path: slug,
		element: createElement(modules[modulePath]?.default),
    handle: {
      frontmatter,
    },
	});

	links.push({
		title,
		dateWritten,
		link: `/${path}/`
	});
}

export { routes, links };
