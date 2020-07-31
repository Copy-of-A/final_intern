import dispatcher from '../dispatcher.js';
import resizeStore from '../resize/resize.store.js';
// import slideStore from '../slide-scroll/slide-scroll.store.js';

var vhHeightCollection;
var vhMinHeightCollection;
var halfCellTopCollection;

var _resizeHandler = function () {
	var wh = window.innerHeight;
	var styles;
	var bt, bb, pt, pb, summ;
	var prev;
	// var slideData = slideStore.getData().items['main-slides'];

	var changed = false;

	if (vhHeightCollection && vhHeightCollection.length !== 0) {
		Array.prototype.forEach.call(vhHeightCollection, function (element) {
			// if (element.classList.contains('vh-slide')) {
			// 	if (slideData && !slideData.active) {
			// 		element.style.height = null;
			// 		return;
			// 	}
			// }
			styles = getComputedStyle(element);
			bt = parseInt(styles['border-top-width']);
			bb = parseInt(styles['border-bottom-width']);
			pt = parseInt(styles['padding-top']);
			pb = parseInt(styles['padding-bottom']);
			summ = bt + bb + pt + pb;

			if (element.clientHeight === wh) return;
			if (element.style.height === wh - summ + 'px') return;

			element.style.height = wh - summ + 'px';
			changed = true;
		});
	}
	if (vhMinHeightCollection && vhMinHeightCollection.length !== 0) {
		Array.prototype.forEach.call(vhMinHeightCollection, function (element) {
			styles = getComputedStyle(element);
			bt = parseInt(styles['border-top-width']);
			bb = parseInt(styles['border-bottom-width']);
			pt = parseInt(styles['padding-top']);
			pb = parseInt(styles['padding-bottom']);
			summ = bt + bb + pt + pb;

			if (element.style.minHeight === wh - summ + 'px') return;

			element.style.minHeight = wh - summ + 'px';
			changed = true;
		});
	}

	if (changed) {
		setTimeout(function () {
			dispatcher.dispatch({
				type: 'resize:store-fire',
			});
		}, 20);
	}

	// if (halfCellTopCollection && halfCellTopCollection.length !== 0) {
	// 	Array.prototype.forEach.call(halfCellTopCollection, function(element) {
	// 		var eh = element.clientHeight;

	// 		element.style.marginTop = (wh - eh)/2 + 'px';
	// 	});
	// }
};

var _dispatcherHandler = function () {};

var init = function () {
	vhHeightCollection = document.getElementsByClassName('vh-height');
	vhMinHeightCollection = document.getElementsByClassName('vh-min-height');
	// halfCellTopCollection = document.getElementsByClassName('half-cell-top');

	_resizeHandler();

	window.addEventListener('resize', _resizeHandler, { passive: true });
	window.addEventListener('orientationchange', _resizeHandler, {
		passive: true,
	});
	window.addEventListener('load', _resizeHandler, { passive: true });
};

export default {
	init: init,
};
