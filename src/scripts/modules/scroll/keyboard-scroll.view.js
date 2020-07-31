import dispatcher from '../dispatcher.js';
import keyboard from '../events/keyboard.view.js'

var _handleKey = function(e) {
	if (e.type === 'keyboard:end') {
		dispatcher.dispatch({
			type: 'scroll:to',
			position: 'end'
		})
	} else if (e.type === 'keyboard:home') {
		dispatcher.dispatch({
			type: 'scroll:to',
			position: 'home'
		})
	}
}

var _init = function() {
	dispatcher.subscribe(_handleKey);
}

_init();

export default {};