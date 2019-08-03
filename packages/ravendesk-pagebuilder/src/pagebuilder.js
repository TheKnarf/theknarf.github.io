import { dom, fragment } from 'isomorphic-jsx';
import { put as putAction } from './l.ducks.js';
import uId from './uid';

export default ({ lifecycle, store }) => {
	const id = uId(),
			{ onMount, onUnmount } = lifecycle;
	const put = (...v) => store.dispatch(putAction(...v));

	onMount.then(() => {
		const el = document.getElementById(id);
		function onClick() {
			const value = prompt('onclick');
			put(['test'], value);
		}	
		el.addEventListener('click', onClick);

		onUnmount.then(() => {
			el.removeEventListener('click', onClick);
		});
	});

	return <button id={id}>Add content</button>
}
