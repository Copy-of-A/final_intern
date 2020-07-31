import dispatcher from '../dispatcher.js';
import scrollStore from './scroll.store.js';

let body;
let pw;
let fixedElements;
let fakeScrollbar;
let lockLocked = false;
let bodyShift = 0;

let _setIndents = function(diff) {
	Array.prototype.forEach.call(fixedElements, function(el) {
		let indent = el.getAttribute('data-indent') || 'margin';
		if (diff < 0) diff = 0;
		if (indent === 'padding') {
			el.style.paddingRight = diff + 'px';
		} else if (indent === 'margin') {
			el.style.marginRight = diff + 'px';
		} else if (indent === 'right') {
			el.style.right = diff + 'px';
		}
	});
}

let _setBodyFixed = function() {
	let scrolled = scrollStore.getData().top;

	bodyShift = scrolled;
	body.style.top = (-scrolled) + 'px';
	window.scrollTo(0, 0);

	dispatcher.dispatch({
		type: 'scroll:prevent'
	});
}

let _removeBodyFixed = function() {
	body.style.top = '';
	window.scrollTo(0, bodyShift);

	dispatcher.dispatch({
		type: 'scroll:release'
	});
}

let _block = function() {
	let dw1 = pw.clientWidth;
	body.classList.add('prevent-scroll');
	let diff = pw.clientWidth - dw1;

	if (diff !== 0) {
		if (fakeScrollbar) {
			fakeScrollbar.style.width = diff + 'px';
			fakeScrollbar.style.display = 'block';
		}

		_setIndents(diff);

		dispatcher.dispatch({
			type: 'resize:soft-resize'
		});
	}
	
	_setBodyFixed();
}

let _unblock = function() {
	if (fakeScrollbar) {
		fakeScrollbar.style.width = 0 + 'px';
		fakeScrollbar.style.display = 'none';
	}

	_setIndents(0);

	let dw1 = pw.clientWidth;
	body.classList.remove('prevent-scroll');
	let diff = pw.clientWidth - dw1;

	if (diff !== 0) {
		dispatcher.dispatch({
			type: 'resize:soft-resize'
		});
	}

	_removeBodyFixed();
}

let init = function() {
	body = document.getElementsByTagName('body')[0];
	pw = document.getElementsByClassName('page-wrapper')[0];
	fixedElements = document.getElementsByClassName('fx');
	fakeScrollbar = document.getElementsByClassName('fake-scrollbar')[0];


	dispatcher.subscribe(function(e) {
		if (e.type === 'scroll:lock-lock') {
			lockLocked = true;
		}
		if (e.type === 'scroll:unlock-lock') {
			lockLocked = false;
		}
		if (lockLocked) return;
		if (e.type === 'scroll:lock') {
			_block();
		}
		if (e.type === 'scroll:unlock') {
			_unblock();
		}
	});
}

export default {
	init: init
};