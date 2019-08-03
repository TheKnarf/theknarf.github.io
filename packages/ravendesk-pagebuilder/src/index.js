import { dom } from 'isomorphic-jsx';
import { createStore } from 'redux';
import reducer from './l.ducks.js';
import Pagebuilder from './pagebuilder.js';

const initialState = {

};

const store = createStore((state = initialState, action) => {
	return reducer(state, action);
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let lastUnmount = null;

const render = () => {
	if(lastUnmount !== null) {
		lastUnmount();
	}

	const props = {
		lifecycle: {
			onMount: new Promise((resolve, reject) => {
				setTimeout(() => { resolve() }, 0);	
			}),
			onUnmount: new Promise((resolve, reject) => {
				lastUnmount = () => {
					resolve();
				};
			})
		},
		store,
	};

	document.body.innerHTML = <Pagebuilder {...props} />
};

window.onload = render;
store.subscribe(() => render());
