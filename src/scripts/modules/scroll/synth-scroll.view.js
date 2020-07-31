import dispatcher from '../dispatcher.js';
import {offset} from '../utils/dom.utils.js';
import {TweenMax} from 'gsap';
import scrollStore from './scroll.store.js';
import resizeStore from '../resize/resize.store.js';

var _scroll = function(e) {
	var speed = 0.6;
	var pos;
	var pw = document.getElementsByClassName('page-wrapper')[0];
	var scrolled = scrollStore.getData().top;

	var animate = function() {
		var obj = {
			y: 0
		}
		
		obj.y = scrolled;

		if (pos > pw.clientHeight - resizeStore.getData().height) {
			pos =  pw.clientHeight - resizeStore.getData().height;
		}
		if (pos < 0) {
			pos = 0;
		}

		if (speed === 0) {
			window.scrollTo(0, Math.floor(pos));
		} else {
			TweenMax.to(obj, speed, {
				y: pos,
				ease: Sine.easeInOut,
				onUpdate: function() {
					window.scrollTo(0, obj.y);
					dispatcher.dispatch({
						type: 'scroll:synth-change',
						position: obj.y
					});
				}
			});
		}
	}

	if (e.hasOwnProperty('position') && typeof e.position === 'number') {
		pos = e.position;	
	} else if (e.position === 'home') {
		pos = 0;
	} else if (e.position === 'end') {
		pos = pw.clientHeight - resizeStore.getData().height;
	} else if (e.hasOwnProperty('element')) {
		pos = offset(e.element).top;
	} else {
		console.warn('no scroll position or element were specified');
		return;
	}

	if (e.speed === 'dynamic') {
		speed = Math.abs(scrolled - pos) / 4000 + 0.3;
	} else if (e.hasOwnProperty('speed') && typeof e.speed === 'number') {
		speed = e.speed;
	}


	animate();
}

var _init = function() {
	dispatcher.subscribe(function(e) {
		if (e.type === 'scroll:to') {
			_scroll(e);
		}
	});
}

_init();

export default {};