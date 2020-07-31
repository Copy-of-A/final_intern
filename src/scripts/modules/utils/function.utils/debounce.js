let debounce = function (f, ms) {
	let state = null,
		  cooldown = 1;

	return function() {
		if (state) return;

		f.apply(this, arguments);

		state = cooldown;

		setTimeout(function() { state = null }, ms);
	}
};

export default debounce;