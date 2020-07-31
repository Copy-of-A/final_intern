import EventEmitter from '../EventEmitter.js';
import {TweenMax} from '/node_modules/gsap/index.js';

var name = 'resolve-property';

// EXAMPLE

// parent can be any object. will create _resolveProperty property
// will create non-writable property on object for each property passed prefixed by "_"

// resolveProperty.attach(parent, {
//		property: 'y', // if not specified will work but without short version
//		namespace: 'parallax',
// 		setStyles: true // if true will automatically set corresponding css styles. check method
// })

// setting property. can pass array or value

// parent._resolveProperty.set({
//		property: ['y', 'x'],
//		namespace: 'parallax',
//		value: [100, 50]
// });

// to get. equivalent to basic usage but with predetermined property.
// can be overwritten with passing object.

// gets final summ <---- thats what you'll mostly use
// parent._resolveProperty.get({
//		property: 'y'
// });

// or just parent._y <---- the same as previous

// gets property only by namespace
// parent._resolveProperty.get({
//		property: 'y',
//		namespace: 'parallax'
// });

// gets all properties by namespace. returns object. ex: {y: 20, opacity: 1}. good for animating
// parent._resolveProperty.get({
//		namespace: 'parallax'
// });

// utils

// getTreeSumm - get total summ of property throgh all element DOM parents (HTML only)
// resolveProperty.utils.getTreeSumm(parent, {
//		property: 'y'	
// })

// tween - animates property. Uses TweenMax for now
// resolveProperty.utils.tween(parent, {
//		namespace: 'parallax',
//		speed: 0.3,
//		ease: Power2.easeInOut,
//		property: ['y', 'opacity'],
//		value: [0.3, 1]
// })

var ResolveProperty = function(parent, options) {
	this._parent = parent;
	this._options = {
		setStyles: options.setStyles
	}

	this._properties = {}
	this._eventEmitter = new EventEmitter();

	this.subscribe = this._eventEmitter.subscribe;
	this.unsubscribe = this._eventEmitter.unsubscribe;

	this._setStyles = function() {
		var val;
		var transformSet = false;
		var x, y, z;

		for (var pr in this._properties) {
			val = this.get({
				property: pr
			});

			if ((pr === 'x' || pr === 'y' || pr === 'z') && !transformSet) {
				transformSet = true;
				x = this.get({property: 'x'});
				y = this.get({property: 'y'});
				z = this.get({property: 'z'});

				if (x === 0 && y === 0 && z === 0) {
					this._parent.style.transform = null;
				} else {
					this._parent.style.transform = 
						'translateX(' + this.get({property: 'x'}) + 'px)' +
						'translateY(' + this.get({property: 'y'}) + 'px)' + 
						'translateZ(' + this.get({property: 'z'}) + 'px)';
				}
			} else if (pr === 'opacity') {
				this._parent.style.opacity = this.get({property: 'opacity'});
			}
		}
	}.bind(this);

	this.set = function(options) {
		var namespace = options.namespace;
		var property = options.property;
		var value = options.value;
		var changed = false;
		var self = this;

		if (!namespace) {
			console.warn('namespace should be specified (╯ಠ_ಠ)╯︵ ┻━┻');
			return;
		}
		if (!property) {
			console.warn('property should be specified (╯ಠ_ಠ)╯︵ ┻━┻');
			return;
		}	

		if (!Array.isArray(property)) {
			property = [property];
		}
		if (!Array.isArray(value)) {
			value = [value];
		}

		value.forEach(function(val) {
			if (typeof val !== 'number') {
				console.warn('setProperty value should be a number (╯ಠ_ಠ)╯︵ ┻━┻');
				console.warn(options);
				return;
			}
		});

		property.forEach(function(property, index) {
			if (!self._properties[property]) {
				self._properties[property] = {}
			}

			if (self._properties[property][namespace] === value[index]) return;
			self._properties[property][namespace] = value[index];

			Object.defineProperty(self._parent, '_' + property, {
				value: self.get({property: property}),
				writable: false,
				configurable: true
			});

			changed = true;
		});

		if (this._options.setStyles && changed) {
			this._setStyles();
		}
		if (changed) {
			this._eventEmitter.dispatch();
		}
	}.bind(this);

	this.get = function(options) {
		var property = options.property;
		var namespace = options.namespace;
		var summ = 0;
		var nameSpaceObject = {}

		if (!namespace && !property) {
			console.warn('namespace OR property should be specified (╯ಠ_ಠ)╯︵ ┻━┻');
			return;
		}	

		if (namespace) {
			if (property === undefined) {
				// get all propertyes by namespace
				nameSpaceObject = {}
				for (property in this._properties) {
					if (this._properties[property][namespace] !== undefined) {
						nameSpaceObject[property] = this._properties[property][namespace]
					}
				}
				return nameSpaceObject;
			} else {
				// get single property by namespace
				return this._properties[property][namespace];
			}
		}

		if (property === 'opacity') {
			// opacity is multiplicative
			summ = 1;
		}

		if (!this._properties[property]) return summ;

		for (namespace in this._properties[property]) {
			// getting calculated final property
			if (property === 'opacity') {
				summ *= this._properties[property][namespace];
			} else {
				summ += this._properties[property][namespace];
			}
		}

		return summ;
	}.bind(this);

	this.subscribeGlobal = function(handler) {
		var parent = this._parent;

		while (parent) {
			if (parent._resolveProperty) {
				parent._resolveProperty.subscribe(handler);
			}

			parent = parent.parentNode;
		}
	}.bind(this);

	this.getGlobal = function(options) {
		var property = options.property;
		var parent = this._parent;
		var def = property === 'opacity' ? 1 : 0;
		var summ = def;

		function getValue() {
			if (parent._resolveProperty) {
				return parent._resolveProperty.get({property: property});
			} else {
				return def;
			}
		}

		while (parent) {
			if (property === 'opacity') {
				summ *= getValue(parent);
			} else {
				summ += getValue(parent);
			}

			parent = parent.parentNode;
		}

		return summ;
	}.bind(this);
}

var getTreeSumm = function(parent, options) {
	var property = options.property;
	var def = property === 'opacity' ? 1 : 0;
	var summ = def;

	function getValue() {
		if (parent._resolveProperty) {
			return parent._resolveProperty.get({property: property});
		} else {
			return def;
		}
	}

	while (parent) {
		if (property === 'opacity') {
			summ *= getValue(parent);
		} else {
			summ += getValue(parent);
		}
		
		if (parent.hasOwnProperty(parentNode)) {
			parent = parent.parentNode;
		} else if (parent.hasOwnProperty(parent)) {
			parent = parent.parent;
		} else if (parent.__proto__) {
			parent = parent.__proto__;
		} else {
			parent = null;
		}
	}

	return summ;
}

var tween = function(parent, options) {
	var namespace = options.namespace;
	var property = options.property;
	var value = options.value;
	var duration = options.duration;
	var tweenObject = {};
	var ease = options.ease;

	if (!Array.isArray(property)) {
		property = [property];
	}
	if (!Array.isArray(value)) {
		value = [value];
	}

	if (!namespace) {
		console.warn('namespace should be specified (╯ಠ_ಠ)╯︵ ┻━┻');
		return;
	}

	property.forEach(function(property, index) {
		tweenObject[property] = value[index];
	});

	if (!parent._resolveProperty._tweens) {
		parent._resolveProperty._tweens = [];
	}

	// should probably make multy tweens possible somehow in the future
	if (parent._resolveProperty._tweens[namespace]) {
		parent._resolveProperty._tweens[namespace].kill();
	}

	tweenObject.ease = ease;
	tweenObject.onUpdate = function() {
		var self = this;
		parent._resolveProperty.set({
			property: property,
			namespace: 'scroll-trigger',
			value: property.map(function(property) {
				return self.target[property]
			})
		});
	}

	parent._resolveProperty._tweens[namespace] = 
		TweenMax.to(parent._resolveProperty.get({
			namespace: namespace
		}), duration, tweenObject);
}

var attach = function(parent, options) {
	var property = options.property;
	var decorator;

	if (!parent._decorators) {
		parent._decorators = {};
	}

	if (!parent._decorators[name]) {
		parent._decorators[name] = new ResolveProperty(parent, options);
		parent._resolveProperty = parent._decorators[name];
		if (property) {
			parent['_' + property] = 0;
		}
	}

	decorator = parent._decorators[name];

	if (options.setStyles === true) {
		decorator._options.setStyles = true;
	}

	return decorator;
}

var detach = function(parent, options) {
	var property = options.property;
	var decorator = parent._decorators[name];

	return decorator;
}

export default {
	attach: attach,
	detach: detach,
	utils: {
		getTreeSumm: getTreeSumm,
		tween: tween
	}
}