const myFilter = function (callback, context) {
   const arr = Array.prototype.slice.call(this)
   const newArr = []
   for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      
      callback.call(context, arr[i], i, this) && newArr.push(arr[i])
   }
   return newArr
}
Array.prototype.myFilter = myFilter

function createDebounceFunction (linkFunc, ms ){
   return function (args) {
      let previousCall = this.lastCall
      this.lastCall = Date.now()
      if (previousCall && ((this.lastCall - previousCall) <= linkFunc)) {
        clearTimeout(this.lastCallTimer)
      }
      this.lastCallTimer = setTimeout(() => linkFunc(args), ms)
    }
}
