import dispatcher from './modules/dispatcher.js';
import domReady from './modules/domReady.js';
import mathUtils from './modules/utils/math.utils.js';
import keyboard from './modules/events/keyboard.view.js';
import resizeHelper from './modules/resize/resize-helper.view.js';
import outliner from './modules/accessibility/outliner.view.js';

import preloaderSimple from './modules/page-load/preloader-simple.view.js';

domReady(function() {
	dispatcher.dispatch({
		type: 'dom:ready'
	});

	preloaderSimple.init();
});