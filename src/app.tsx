import css from './app.module.css';
import { Outlet, NavLink, useMatches } from 'react-router';
import { links as blogLinks } from './blog';
import { links as gardenLinks } from './garden';

const GardenOverview = () => {
	return (
		<div className={css.posts}>
      <ul>
      {
        (gardenLinks || []).map(({ title, link }) => (
          <li key={link}>
            <NavLink to={link}>{title}</NavLink>
          </li>
        ))
      }
      </ul>
		</div>
	);
}

export const Garden = () => {
	return <div className={css.gardenOverview}>
		<h2> Garden </h2>
    <p>
      A garden is a form of personal wiki that grows over time.
      Unlike a blog its not sorted by publication date,
      instead its a set of loosly organized pages that link between each other.
      Maggie Appleton have a <a href="https://maggieappleton.com/garden-history">good article around the idea of a digital garden</a>.
    </p>
    <GardenOverview />
    <h3> Other gardens </h3>
    <p> Here is a list of some other people's digital garden that I find interesting: </p>
    <ul>
      <li><a href="https://maggieappleton.com/">Maggie Appleton</a></li>
      <li><a href="https://szymonkaliski.com/">Szymon Kaliski</a></li>
      <li><a href="https://notes.andymatuschak.org/About_these_notes">Andy's working notes</a></li>
    </ul>
	</div>;
}

export const Flower = () => {
	return (
		<div className={css.postWrapper}>
      <div className={css.post}>
        <Outlet />
      </div>
		</div>
	);
}

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

export const Blog = () => {
	return <div className={css.blogOverview}>
		<h2> Posts </h2>
		<BlogPostsOverview />
	</div>;
}

export const Post = () => {
  const matches = useMatches();
  const frontmatter = (matches as any).at(-1).handle.frontmatter;
	const { title, dateWritten } = frontmatter;

	return (
		<div className={css.postWrapper}>
      <div className={css.post}>
        <title>{title}</title>
        <h1>{title}</h1>
        <div className={css.postMeta}>
          <span>Written on {dateWritten}</span>
        </div>
        <Outlet />
      </div>
		</div>
	);
}

export const Home = () => {
	return <div className={css.home}>
    <h2> Welcome </h2>
    <p> Welcome to my personal website. Take a look around and see if you can find something of interest! </p>
		<h2> Posts </h2>
		<BlogPostsOverview />
	</div>;
}

const App = () => {
  return (
		<div className={css.body}>
			<header>
				<h1><NavLink to="/">TheKnarf</NavLink></h1>
        <nav>
          <NavLink to="/post">Posts</NavLink>
          <NavLink to="/garden">Garden</NavLink>
        </nav>
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
