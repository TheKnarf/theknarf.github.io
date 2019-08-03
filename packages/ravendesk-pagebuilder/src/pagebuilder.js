import { dom, fragment } from 'isomorphic-jsx';
import { put as putAction } from './l.ducks.js';
import * as L from 'partial.lenses';
import uId from './uid';

const Element = ({ element, children, ...attr }) => {
	return dom(element, attr, ...children);
}

const Pagebuilder = ({ lifecycle, store, lens }) => {
	if(lens === null || typeof lens == 'undefined' )
		return;

	const id = uId(),
			{ onMount, onUnmount } = lifecycle,
			put = (...v) => store.dispatch(putAction(...v)),
			get = (...v) => L.get(...v, store.getState());

	onMount.then(() => {
		const el = document.getElementById(id);
		if(el === null) return;

		function onClick() {
			const value = prompt('onclick');
			
			if(/^\"[^\"]*\"$/.test(value)) {
				put(lens, {
					type: 'string',
					value: value.substring(1, value.length - 1),
				});
			} else {
				put(lens, {
					type: 'element',
					element: value,
					children: null,
				});
			}
		}	
		el.addEventListener('click', onClick);

		onUnmount.then(() => {
			el.removeEventListener('click', onClick);
		});
	});

	const elData = get(lens);
	//console.log(lens, elData);
	if(elData === null) {
		return <button id={id}>Add content</button>;
	} else if(typeof elData == 'object' && elData.type == 'string') {
		return elData.value;
	} else if(typeof elData == 'object' && elData.type == 'element') {
		return <>
			<Element element={elData.element}>
				<Pagebuilder lifecycle={lifecycle} store={store} lens={[...lens, 'children']} />
			</Element>
			<button id={id}>Add content</button>
		</>;
	} else if(Array.isArray(elData)) {
		return 'array'; // TODO: handeling arrays
	}

	return <div>Unknown value</div>;
};

export default Pagebuilder;
