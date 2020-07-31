import dispatcher from '../dispatcher.js';
import visibilityStore from './tab-visibility.store';

// проверяет является ли окно браузера активным и вызывает событие на смену активности окна

var hidden, visibilityChange;
if (typeof document.hidden !== 'undefined') {
	hidden = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
	hidden = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
	hidden = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
}

var handleVisibilityChange = function () {
	if (document[hidden]) {
		dispatcher.dispatch({
			type: 'page-visibility:hidden',
		});
	} else {
		dispatcher.dispatch({
			type: 'page-visibility:visible',
		});
	}
};

var _init = function () {
	if (typeof document.hidden === 'undefined') return;

	handleVisibilityChange();
	document.addEventListener(visibilityChange, handleVisibilityChange);
};

_init();

export default {};
