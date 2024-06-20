import App, { Home, Blog, Post } from './app.tsx';
import { routes as blogRoutes } from './blog';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},

			/* blog */
			{
				path: 'post/',
				element: <Blog />,
			},
			{
				path: 'post/*',
				element: <Post />,
				children: [
					...blogRoutes,
				],
			},
		]
	},
]

export default routes;
