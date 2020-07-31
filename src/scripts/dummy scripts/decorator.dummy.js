import dispatcher from '../../dispatcher.js';

const name = null; // указать дефолтное имя декоратора

if (name === null) {
	console.error('decorator name is missing');
}

const defaultOptions = {
	name: name,
}

class Decorator {
	constructor(parent, options) {
		this._parent = parent;
		this._options = Object.assign({
		}, defaultOptions, options);
	}

	init() {}

	destroy() {}
}

let attach = function(parent, options) {
	let decorator;

	if (!parent._decorators) {
		parent._decorators = {};
	}

	options = Object.assign(defaultOptions, {
	}, options);

	if (parent._decorators[options.name]) {
		decorator = parent._decorators[options.name];
	} else {
		decorator = new Decorator(parent, options);
		parent._decorators[options.name] = decorator;
		decorator.init();
	}

	return decorator;
}

let detach = function(parent, options) {
	options = Object.assign(defaultOptions, options);

	if (!parent._decorators[options.name]) {
		console.error('no decorator with name "' + options.name + '"');
		return;
	}

	let decorator = parent._decorators[options.name];
	decorator.destroy();
}

export default {
	attach: attach,
	detach: detach
}