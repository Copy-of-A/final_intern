import simpleEase from './simpleEase.js';

function simpleEaseArrays(a, b, ease) {
	return a.map(function(v, valIndex) {
		return simpleEase(v, b[valIndex], ease);
	});
}

export default simpleEaseArrays;