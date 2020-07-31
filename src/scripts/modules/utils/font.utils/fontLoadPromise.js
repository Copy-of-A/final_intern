// Ждет загрузки шрифта. Определяет по ширине строки текста,
// то есть надо сначала померить (раскомментить console.log)
// Принимает название шрифта, размер шрифта и ширину строки
// fontLoadPromise('arial', { 
// 		width: 1234, ширина текста
//		size: 100	
// }).then(...)

let _globalFlags = {}

let fontLoadPromise = function(font, options) {
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	let testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let testSize = options.size;
	let testWidth = options.width;

	if (!testSize) {
		console.warn('you need to specify test font size');
	}

	if (!testWidth) {
		console.warn('you need to specify test string width');
	}

	return new Promise(function(resolve, reject) {
		if (!_globalFlags[font]) {
			_globalFlags[font] = false;
		} else if (_globalFlags[font] === true) {
			resolve();
			return;
		}

		let fontInterval = setInterval(function() {
			let measure;

			if (_globalFlags[font] === true) {
				resolve();
				clearInterval(fontInterval);
				return;
			}

			ctx.font = testSize + 'px ' + font;
			measure = ctx.measureText(testString);

			// console.log(measure);

			if (measure.width > testWidth - 5 && measure.width < testWidth + 5) {
				clearInterval(fontInterval);
				_globalFlags[font] = true;
				resolve();
			}
		}, 30);
	});
}

export default fontLoadPromise;