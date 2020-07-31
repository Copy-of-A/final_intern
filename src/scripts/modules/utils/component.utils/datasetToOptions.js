function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return '';
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export default function(dataset, options) {
	let result = {};
	let namespace = options.__namespace ? options.__namespace : '';

	for (let key in options) {
		let camelKey;
		if (options.__namespace) {
			camelKey = camelize(namespace + ' ' + key);
		} else {
			camelKey = camelize(key);
		}

		if (!dataset[camelKey]) {
			result[key] = options[key];
		} else if (typeof options[key] === 'number') {
			result[key] = parseInt(dataset[camelKey]);
		} else if (typeof options[key] === 'boolean') {
			result[key] = dataset[camelKey] === 'true';
		} else {
			result[key] = dataset[camelKey];
		}
	}

	return result;
}