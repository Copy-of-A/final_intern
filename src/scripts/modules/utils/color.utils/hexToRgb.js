function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseFloat((parseInt(result[1], 16) / 255).toFixed(2)),
		parseFloat((parseInt(result[2], 16) / 255).toFixed(2)),
		parseFloat((parseInt(result[3], 16) / 255).toFixed(2))
	] : null;
}

export default hexToRgb;