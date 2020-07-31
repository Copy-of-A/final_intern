import simpleEase from './simpleEase.js';

function simpleEaseObjects(a, b, ease) {
	let result = {};

	Object.keys(a).forEach(function(key) {
		if (typeof a[key] === 'number' &&
			typeof b[key] === 'number') {
			result[key] = simpleEase(a[key], b[key], ease);
		} else {
			console.error('non Number property');
		}
	});

	return result;
}

export default simpleEaseObjects;