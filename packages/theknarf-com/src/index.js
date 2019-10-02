---
route: 'index.html'
---

import { dom } from 'isomorphic-jsx';
import config from './config';
import github from './github.svg';

import Page from './default'; 
export const layout = Page;

export default <div>
  <span class="slogan">[this page is left intentionally blank]</span>
	<div class="center-vertical">
		<div class="profile">
			<div class="info">
				<a class="github fa fa-github" href="https://github.com/TheKnarf">
					<img src={github} alt="github logo" />
					<span>Github</span>
				</a>
				<a href={'//experiments.' + config.domain}>Experiments</a>
				<a href={'//notes.' + config.domain}>Notes</a>
				<a href={'//talks.' + config.domain}>Talks</a>
			</div>
		</div>
	</div>
</div>
