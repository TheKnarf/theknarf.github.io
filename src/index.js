---
route: 'index.html'
---

import { dom, fragment } from 'isomorphic-jsx';
import config from './config';
import github from './github.svg';

import Page from './default';
export const layout = Page;

export default <>
  <span class="slogan">[this page is left intentionally blank]</span>
	<div>
		<a href="https://github.com/TheKnarf">
			<img src={github} alt="github logo" />
			<span>Github</span>
		</a>
		<a href='/experiments'>Experiments</a>
		<a href='/talks'>Talks</a>
	</div>
</>;