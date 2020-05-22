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
		<a href={'http://experiments.' + config.domain}>Experiments</a>
		<a href={'http://notes.' + config.domain}>Notes</a>
		<a href={'http://talks.' + config.domain}>Talks</a>
	</div>
</>;
