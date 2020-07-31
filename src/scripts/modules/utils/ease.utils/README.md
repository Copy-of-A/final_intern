# Утилитарные скрипты для различных easing-ов
___

## simpleEase
___
Простейший изинг для использования в requestAnimationFrame loop-е.  

**Синтаксис**
```javaScript
x1 = simpleEase(x1, x2, 20);
```
x1: Number;  
x2: Number;  

Приближает x1 к x2 на 1/20 оставшегося расстояния.

## simpleEaseArrays
___
Аналогично предыдущему, но работает с массивами.  
**Синтаксис**  
```javaScript
a1 = simpleEaseArrays(a1, a2, 20);
```
a1: Array;  
a2: Array;  

## simpleEaseObjects
___
Аналогично предыдущему, но работает с объектами.  
Не работает с объектами с вложенностью! (можно пройтись рекурсией, но надо ли.. безопасней оставить неглубокие объекты)  
**Синтаксис**  
```javaScript
a1 = simpleEaseArrays(a1, a2, 20);
```
a1: Object (shallow)  
a2: Object (shallow) 

## PowerEase
___
Более мощный изинг для сглаживания значений в requestAnimationFrame loop-е. 
Позволяет задавать изинги более высоких степеней.  
Работает с числами, массивами, объектами.  
Позволяет менять параметры на лету.  

**Синтаксис**  
```javaScript
var easing = new PowerEase({
	power: 2,
	ease: 20
});

function loop() {
	x = easing.ease(x);
	requestAnimationFrame(loop);
}
```

**power** отвечает за степень сглаживания. При power = 1 сглаживание будет аналогично simpleEase, при более высокой степени применяет несколько итераций функции сглаживания (сглаживает функцию сглаживания), по факту давая так же разгон в начале, а не только замедление.  
**ease** сила приближения. Минимум 1. Приближает значения на 1/ease от оставшегося расстояния. 

## easings.preset
___
Пресеты различных изингов.  

**Набор изингов**  
ease, easeOut, easeIn, default, easeInOut2, easePower2, easePower3, easePower4, easeSine, easeInPower2, easeInPower3, easeOutPower2, easeOutPower3  

Возвращает 2 объекта **bezier** и **css**, 1-й для использования c gsap, 2-й для CSS transition-ов.  
Если в CSS были переопределены изинги через переменные, то вернет их вместо стандартных. Сейчас рабоает с ease, easeOut, easeIn.  

**синтаксис**  
**CSS**  
```CSS
root {
	--ease-in: cubic-bezier(0.71,0,0.65,0.34);
	--ease-out: cubic-bezier(0.19,1,0.22,1);
	--ease: cubic-bezier(0.77,0,0.175,1);
}
```
**javaScript**  
```javaScript
import {css, bezier} from '../utils/ease.utils/easings.preset.js';
var easeBezier = bezier;
var easeString = css;
```

