// 1) Написать свою реализацию встроенной функции массивов filter. 
// Назвать функцию myFilter и сделать так, чтобы любой массив мог использовать данную функцию как "родную". 
// В качестве параметров он должен принимать callback-функцию и как необязательный параметр объект,
// который станет на место this для этой функции. В общем работать должен точно также как и filter.
//  Внутренняя функция должна вызываться с теми же параметрами, что и оригинал (элемент, индекс, массив).

const myFilter = function (callback, context) {
   const arr = Array.prototype.slice.call(this)
   const newArr = []
   for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      
      callback.call(context, arr[i], i, this) && newArr.push(arr[i])
   }
   return newArr
}
Array.prototype.myFilter = myFilter;
// 2) Написать функцию createDebounceFunction. 
// Она должна принимать два аргумента: ссылку на функцию и задержку в мс.
//  Функция должна возвращать новую функцию, вызывающую переданную 
// в качестве параметра функцию с задержкой в переданное количество миллисекунд. 
// ПРИ ЭТОМ! Если за то время, пока функция ждёт своего вызова, она вызывается ещё раз, 
// то "счётчик" времени сбрасывается и начинается заново.
// > Пример:
 // снова сбрасываем таймер ещё через 200 мс
function createDebounceFunction (linkFunc, ms ){
   return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= linkFunc)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => linkFunc(args), ms);
    }
}
const log100 = () => console.log(100);
const debounceLog100 = createDebounceFunction(log100, 10000);
debounceLog100();
setTimeout(debounceLog100, 2000); // так как задержка в 1000мс и новый вызов этой же функции происходит через 200 мс, то таймер запускается заново
setTimeout(debounceLog100, 4000);