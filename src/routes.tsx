import App, { Home, Blog, Post, Garden, Flower } from './app.tsx';
import { routes as blogRoutes } from './blog';
import { routes as gardenRoutes } from './garden';

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

      /* Garden */
      {
        path: 'garden/',
        element: <Garden />,
      },
			{
				path: 'garden/*',
				element: <Flower />,
				children: [
					...gardenRoutes,
				],
			},

		]
	},
]

export default routes;
