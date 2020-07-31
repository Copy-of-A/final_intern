import simpleEase from './ease.utils/simpleEase.js';
import simpleEaseArrays from './ease.utils/simpleEaseArrays.js';
import simpleEaseObjects from './ease.utils/simpleEaseObjects.js';
import PowerEase from './ease.utils/PowerEase.js';

// набор изингов
// simple(a, b, ease) - простейшее замедление при приближении к цели
// 	a - откуда
// 	b - куда
//	ease - сила приближения. чем меньше, тем плавнее

// arrays(a, b, ease) - то же самое, но a и b - это массивы

// var powerEase = new Power({
//	power: 2,
//	ease: 10,
// });
//
// powerEase.ease(a)
//
// запоминает предыдущие значения и делает сглаживание степени (power)
// на практике дает разгон помимо замедления

export {
	simpleEase,
	simpleEaseArrays,
	simpleEaseObjects,
	PowerEase
}