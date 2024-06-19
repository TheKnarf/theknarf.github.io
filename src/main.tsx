import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { Home, Blog } from './app.tsx';
import { routes as blogRoutes } from './blog';

const router = createBrowserRouter([
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
			...blogRoutes,
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<RouterProvider router={router} />
  </React.StrictMode>,
);
