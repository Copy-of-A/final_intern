import simpleEase from './simpleEase.js';
import simpleEaseArrays from './simpleEaseArrays.js';
import simpleEaseObjects from './simpleEaseObjects.js';

var PowerEase = function(options) {
	this._power = options.power || 2;
	this._easeValue = options.ease || 6;
	this._buffer = [];
	this._previuosEaseData = null;

	this.cloneValue = function(value) {
		if (Array.isArray(value)) {
			return value.slice();
		} else if (typeof value === 'number') {
			return value;
		} else if (typeof value === 'object') {
			return Object.assign({}, value);
		}
	}

	this.ease = function(vals) {
		var prevVals = [];

		if (vals === undefined && this._previuosEaseData !== null) {
			vals = this.cloneValue(this._previuosEaseData);
		} else if (vals) {
			this._previuosEaseData = this.cloneValue(vals);
		}

		for (var i = 0; i < this._power; i++) {
			if (this._buffer[i] === undefined) {
				this._buffer[i] = this.cloneValue(vals);
			} else {
				if (i === 0) {
					prevVals = this.cloneValue(vals);
				} else {
					prevVals = this.cloneValue(this._buffer[i - 1]);
				}

				if (Array.isArray(vals)) {
					this._buffer[i] = simpleEaseArrays(this._buffer[i], prevVals, this._easeValue);
				} else if (typeof vals === 'number') {
					this._buffer[i] = simpleEase(this._buffer[i], prevVals, this._easeValue);
				} else if (typeof vals === 'object') {
					this._buffer[i] = simpleEaseObjects(this._buffer[i], prevVals, this._easeValue);
				}
			}

			if (i === this._power - 1) {
				return this._buffer[i];
			}
		}


	}.bind(this);

	this.setProps = function(props) {
		if (props.hasOwnProperty('power')) this._power = props.power;
		if (props.hasOwnProperty('ease')) this._ease = props.ease;
	}.bind(this);
}

export default PowerEase;