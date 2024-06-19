import css from './app.module.css';
import { Outlet, NavLink } from 'react-router-dom';
import { links as blogLinks } from './blog';

const BlogPostsOverview = () => {
	return (
		<div className={css.posts}>
		{
			(blogLinks || []).map(({ title, dateWritten, link }) => (
				<div key={link}>
					<span>{dateWritten}</span>&nbsp;
					<NavLink to={link}>{title}</NavLink>
				</div>
			))
		}
		</div>
	);
}

export const Home = () => {
	return <>
		<h2> Blog </h2>
		<BlogPostsOverview />
	</>;
}

export const Blog = () => {
	return <>
		<h2> Blog </h2>
		<BlogPostsOverview />
	</>;
}

const App = () => {
  return (
		<div className={css.body}>
			<header>
				<h1><NavLink to="/">TheKnarf</NavLink></h1>
			</header>
			<div className={css.outlet}>
				<Outlet />
			</div>
			<footer>
				<hr />	
				<span>Checkout my <a href="https://github.com/theknarf/">Github</a> profile</span>
			</footer>
		</div>
  );
};

export default App;
