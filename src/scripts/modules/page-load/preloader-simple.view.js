import dispatcher from '../dispatcher.js';
import pageLoadStore from './page-load.store.js';

// заглушка прелоадера. нужна все равно, даже если прелоадер есть
// minTimeout - минимальное время
// потом ставит классы .load-complete и .load-complete-once
// через loadDelay ставит класс .load-complete-temedout и удаляет инлайновый прелоадер, если он был
// load-complete будет удаляться и добавляться динамически при переходах между страницами
// остальные 2 класса остаются навсегда

let loaded = false;
let minTimeout = 300;
let loadDelay = 1000;
let complete = false;
let completeOnce = false;

let _handleStore = function () {
	let storeData = pageLoadStore.getData();
	let initPreloader;
	let pageWrapper;

	if (complete === storeData.loaded) return;
	complete = storeData.loaded;

	pageWrapper = document.getElementsByClassName('page-wrapper')[0];

	if (!completeOnce && complete) {
		initPreloader = document.getElementById('init-preloader');

		completeOnce = true;

		if (initPreloader) {
			initPreloader.classList.remove('start');
			initPreloader.classList.add('end');
			setTimeout(function () {
				initPreloader.parentNode.removeChild(initPreloader);
			}, loadDelay);
		}

		pageWrapper.classList.add('load-complete-once');

		setTimeout(function () {
			pageWrapper.classList.add('load-complete-temedout');
		}, loadDelay);
		setTimeout(function () {
			// show content ?
			dispatcher.dispatch({
				type: 'page-load:interactive',
			});
		}, 1000);
	}

	if (complete) {
		pageWrapper.classList.add('load-complete');
	} else {
		pageWrapper.classList.remove('load-complete');
	}
};

let init = function () {
	pageLoadStore.subscribe(_handleStore);

	setTimeout(function () {
		let preloader = document.getElementsByTagName('preloader-full')[0];
		let initPreloader = document.getElementById('init-preloader');
		if (preloader) return;

		dispatcher.dispatch({
			type: 'page-load:load',
		});
	}, minTimeout);
};

export default {
	init: init,
};
