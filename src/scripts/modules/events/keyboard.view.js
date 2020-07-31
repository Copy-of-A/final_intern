import dispatcher from '../dispatcher.js';

var ctrl = false;
var shift = false;

var _onKeyDown = function(e) {
	var keyCode = e.which;

	dispatcher.dispatch({
		type: 'keyboard:any'
	});

	if (keyCode === 9) {
		if (e.shiftKey) {
			dispatcher.dispatch({
				type: 'keyboard:shift-tab',
				event: e
			});
		} else {
			dispatcher.dispatch({
				type: 'keyboard:tab',
				event: e
			});
		}
	} else if (keyCode === 13) {
		dispatcher.dispatch({
			type: 'keyboard:enter',
			event: e
		});
	}  else if (keyCode === 16) {
		dispatcher.dispatch({
			type: 'keyboard:shift',
			event: e
		});
	} else if (keyCode === 17) {
		dispatcher.dispatch({
			type: 'keyboard:ctrl',
			event: e
		});
	} else if (keyCode === 27) {
		dispatcher.dispatch({
			type: 'keyboard:esc',
			event: e
		});
	} else if (keyCode === 38 || keyCode === 33) {
		dispatcher.dispatch({
			type: 'keyboard:up',
			event: e
		});
	} else if (keyCode === 40 || keyCode === 34) {
		dispatcher.dispatch({
			type: 'keyboard:down',
			event: e
		});
	} else if (keyCode === 37) {
		dispatcher.dispatch({
			type: 'keyboard:left',
			event: e
		});
	} else if (keyCode === 39) {
		dispatcher.dispatch({
			type: 'keyboard:right',
			event: e
		});
	} else if (keyCode === 35) {
		dispatcher.dispatch({
			type: 'keyboard:end',
			event: e
		});
	} else if (keyCode === 36) {
		dispatcher.dispatch({
			type: 'keyboard:home',
			event: e
		});
	}
}

var _onKeyUp = function(e) {
	dispatcher.dispatch({
		type: 'keyboard:keyup'
	});
}

var _init = function() {
	document.addEventListener('keydown', _onKeyDown);
	document.addEventListener('keyup', _onKeyUp);
}

_init();

export default {};