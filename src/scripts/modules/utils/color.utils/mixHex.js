import hexToRgb from './hexToRgb.js';
import rgbToHex from './rgbToHex.js';
import mixRgb from './mixRgb.js';

function mixHex(a, b, mix) {
	return rgbToHex(mixRgb(hexToRgb(a), hexToRgb(b), mix));
}

export default mixHex;