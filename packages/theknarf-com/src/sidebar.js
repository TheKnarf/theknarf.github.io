import { dom } from 'isomorphic-jsx';
import img from './img/profile.png';
import config from './config.js';

export default () => <div class="center-vertical">
	<div class="profile">
		<div class="profile-img">
			<img src={img} alt="" />
		</div>
		<div class="info">
			<span class="name"> Frank Lyder Bredland </span>
			<span class="title"> Consultant, Fullstack </span>
			<a class="github fa fa-github" href="https://github.com/TheKnarf"> Github </a>
			<a class="linkedin fa fa-linkedin" href="https://no.linkedin.com/in/bredland"> Linkedin </a>
			<br />
			<a href="blog/"> Blog </a>
			<a href={'//experiments.' + config.domain}> Experiments </a>
			<a href={'//notes.' + config.domain}> Notes </a>
			<a href={'//talks.' + config.domain}> Talks </a>
		</div>
	</div>
</div>
