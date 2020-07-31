function mixRgb(a, b, mix) {
	return [
		a[0] * (1 - mix) + b[0] * mix,
		a[1] * (1 - mix) + b[1] * mix,
		a[2] * (1 - mix) + b[2] * mix
	]
}

export default mixRgb;