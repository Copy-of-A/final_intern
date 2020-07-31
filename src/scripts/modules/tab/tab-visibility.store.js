import dispatcher from '../dispatcher.js';
import EventEmitter from '../utils/EventEmitter.js';

// хранит значение hidden, которое true если окно НЕ активно

var eventEmitter = new utils.EventEmitter();
var hidden = false;

var _handleEvent = function (e) {
	if (e.type === 'page-visibility:hidden') {
		if (hidden) return;

		hidden = true;
		eventEmitter.dispatch();
	}
	if (e.type === 'page-visibility:visible') {
		if (!hidden) return;

		hidden = false;
		eventEmitter.dispatch();
	}
};

var getData = function () {
	return {
		hidden: hidden,
	};
};

var _init = function () {
	dispatcher.subscribe(_handleEvent);
};

_init();

export default {
	subscribe: eventEmitter.subscribe.bind(eventEmitter),
	unsubscribe: eventEmitter.unsubscribe.bind(eventEmitter),
	getData: getData,
};
