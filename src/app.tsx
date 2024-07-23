import css from './app.module.css';
import { Outlet, NavLink } from 'react-router';
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
	return <div className={css.home}>
		<h2> Blog </h2>
		<BlogPostsOverview />
	</div>;
}

export const Blog = () => {
	return <div className={css.blogOverview}>
		<h2> Blog </h2>
		<BlogPostsOverview />
	</div>;
}

export const Post = () => {
	return (
		<div className={css.postWrapper}>
      <div className={css.post}>
        <Outlet />
      </div>
		</div>
	);
}

const App = () => {
  return (
		<div className={css.body}>
			<header>
				<h1><NavLink to="/">TheKnarf</NavLink></h1>
			</header>
			<Outlet />
			<footer>
				<hr />	
				<span>Checkout my <a href="https://github.com/theknarf/">Github</a> profile</span>
			</footer>
		</div>
  );
};

export default App;
