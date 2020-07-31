function rgbToHex(a) {
	var r = Math.floor(a[0] * 255);
	var g = Math.floor(a[1] * 255);
	var b = Math.floor(a[2] * 255);
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default rgbToHex;