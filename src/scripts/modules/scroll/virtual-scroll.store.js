import dispatcher from '../dispatcher.js';
import utils from '../utils.js';
import resizeStore from '../resize/resize.store.js';
import scrollStore from './scroll.store.js';
import pageLoadStore from '../page-load/page-load.store.js';

// сглаженный скролл для триггера элементов по скроллу

var eventEmitter = new utils.EventEmitter();
var scrolled = {
	top: 0,
	left: 0
};
var wh = resizeStore.getData().height;
var ww = resizeStore.getData().width;
var requestAnimationFrame = utils.getRequestAnimationFrame();
var virtualScroll = {
	top: 0,
	left: 0,
	right: ww,
	bottom: wh
}
var locked = false;

var ease = 10;

var _loop = function() {
	var scrolledWHeight = scrolled.top + wh;
	var scrolledWWidth = scrolled.left + ww;
	var loaded = pageLoadStore.getData().loaded;

	if (!loaded) {
		requestAnimationFrame(_loop);
		return;
	}

	if (isNaN(virtualScroll.top)) virtualScroll.top = 0;
	if (isNaN(virtualScroll.bottom)) virtualScroll.bottom = wh;
	if (isNaN(virtualScroll.left)) virtualScroll.left = 0;
	if (isNaN(virtualScroll.right)) virtualScroll.right = ww;

	if (Math.round(virtualScroll.top) !== scrolled.top 
			|| Math.round(virtualScroll.bottom) !== scrolledWHeight
			|| Math.round(virtualScroll.left) !== scrolled.left
			|| Math.round(virtualScroll.right) !== scrolledWWidth) {

		virtualScroll.top = virtualScroll.top + (scrolled.top - virtualScroll.top) / ease;
		virtualScroll.bottom = virtualScroll.bottom + (scrolledWHeight - virtualScroll.bottom) / ease;
		virtualScroll.left = virtualScroll.left + (scrolled.left - virtualScroll.left) / ease;
		virtualScroll.right = virtualScroll.right + (scrolledWWidth - virtualScroll.right) / ease;

		if (loaded) {
			eventEmitter.dispatch();
		}
	}

	requestAnimationFrame(_loop);
}

var _handleEvent = function(e) {
	if (e.type === 'vScroll:setY') {
		scrolled.top = e.position;
		virtualScroll.top = e.position;
		virtualScroll.bottom = wh + e.position;
	}
	if (e.type === 'vScroll:reset') {
		_reset();
	}
}

var _reset = function() {
	scrolled = {
		top: 0,
		left: 0
	};
	virtualScroll.top = 0;
	virtualScroll.left = 0;
	virtualScroll.right = ww;
	virtualScroll.bottom = 0;
}

var _handleResize = function() {
	wh = resizeStore.getData().height;
	ww = resizeStore.getData().width;
}

var _handleScroll = function() {
	scrolled = scrollStore.getData();
}

var getData = function() {
	return {
		top: virtualScroll.top,
		left: virtualScroll.left,
		right: virtualScroll.right,
		bottom: virtualScroll.bottom
	}
}

var _init = function() {
	// window.scrollTo(0, 0);
	dispatcher.subscribe(_handleEvent);

	_handleResize();
	resizeStore.subscribe(_handleResize);

	_reset();

	_handleScroll();
	scrollStore.subscribe(_handleScroll);
	
	_loop();
}

_init();

export default {
	subscribe: eventEmitter.subscribe.bind(eventEmitter),
	unsubscribe: eventEmitter.unsubscribe.bind(eventEmitter),
	getData: getData
}