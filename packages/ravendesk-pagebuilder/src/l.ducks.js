import * as L from 'partial.lenses';

export const put = (optic, value) => ({
	type: 'PUT',
	optic,
	value,
});

export default (state, action) => {
	if(action.type === 'PUT') {
		return L.set(action.optic, action.value, state);
	};

	return state;
};
