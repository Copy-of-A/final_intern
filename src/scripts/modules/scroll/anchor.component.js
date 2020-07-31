import dispatcher from '../dispatcher.js';
import resizeStore from '../resize/resize.store.js';
import { offset } from '../utils/dom.utils.js';

var _handleCkick = function(e) {
	var offsetTop;
	var anchorElement;
	var pw = document.getElementsByClassName('page-wrapper')[0];
	var pwHeight = pw.clientHeight;

	if (this._anchorId) {
		anchorElement = document.getElementById(this._anchorId);
		if (!anchorElement) {
			console.warn('anchor element is missing');
			return;
		}

		offsetTop = offset(anchorElement).top;
	} else if (this._position) {
		offsetTop = parseInt(position);
	}

	dispatcher.dispatch({
		type: 'popup:close'
	});

	e.preventDefault();
	if (offsetTop + resizeStore.getData().height > pwHeight) {
		dispatcher.dispatch({
			type: 'scroll:to',
			position: pwHeight - resizeStore.getData().height
		});
	} else {
		dispatcher.dispatch({
			type: 'scroll:to',
			position: offsetTop
		});
	}
}

class ElementClass extends HTMLAnchorElement {
	constructor(self) {
		self = super(self);
		self.init.call(self);
	}

	init() {
		this.handleClick = _handleCkick.bind(this);
	}
	connectedCallback() {
		this._position = this.getAttribute('data-position');
		this._anchorId = this.getAttribute('href');
		
		if (!this._position && !this._anchorId) {
			console.warn('anchor data is missing');
			return;
		}

		if (this._anchorId) {
			this._anchorId = this._anchorId.substr(1);
		}

		this.addEventListener('click', this.handleClick);
	}
	disconnectedCallback() {

	}
}

customElements.define('scroll-ancor', ElementClass, {extends: 'a'});

export default ElementClass;