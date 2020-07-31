import dispatcher from '../dispatcher.js';
import pageLoadStore from '../page-load/page-load.store.js';
import { transition } from '../utils/animation.utils.js';
import { TweenMax } from '../../libs/TweenMax.js';

// бойлерплэйт большого прелоадера.
// главное в конце вызвать
// dispatcher.dispatch({
//		type: 'page-load:load'
// });

const time = window._vars.time;
const ease = window._vars.ease.css;

class ElementClass extends HTMLElement {
	constructor(self) {
		self = super(self);
		self.init.call(self);
	}

	init() {}
	connectedCallback() {
		var self = this;
		setTimeout(function () {
			// собственно здесь можно делать что угодно

			setTimeout(function () {
				dispatcher.dispatch({
					type: 'page-load:load',
				});
			}, time.load);
		}, 20);
	}
	disconnectedCallback() {}
}

customElements.define('preloader-full', ElementClass);

export default ElementClass;
