import dispatcher from '../dispatcher.js';
import EventEmitter from '../utils/EventEmitter.js';
import pageLoadStore from '../page-load/page-load.store.js';

var eventEmitter = new EventEmitter();

var position = {
	top: 0,
	left: 0
}

var _scrollPositionTop = function() {
	var position = (window.pageYOffset || window.document.scrollTop) - (window.document.clientTop || 0);
	if (isNaN(position) || position === undefined) position = 0;
	return position;
}
var _scrollPositionLeft = function() {
	var position = (window.pageXOffset || window.document.scrollLeft) - (window.document.clientLeft || 0);
	if (isNaN(position) || position === undefined) position = 0;
	return position;
}

var _onScroll = function() {
	var loaded = pageLoadStore.getData().loaded;

	position.top = _scrollPositionTop();
	position.left = _scrollPositionLeft();

	if (loaded) {
		eventEmitter.dispatch();
	}
}

var _handleEvent = function(e) {

}

var getData = function() {
	return position;
}

var _init = function() {
	dispatcher.subscribe(_handleEvent);

	_onScroll();
	window.addEventListener('scroll', _onScroll, {passive: true});
	pageLoadStore.subscribe(_onScroll);
}

_init();

export default {
	subscribe: eventEmitter.subscribe.bind(eventEmitter),
	unsubscribe: eventEmitter.unsubscribe.bind(eventEmitter),
	getData: getData
}