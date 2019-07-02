// 防抖
export function debounce(fn, wait) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

// 节流
export function throttle (func, delay) {
  var timer = null;
  var startTime = Date.now();
  return function () {
    var curTime = Date.now();
    var remaining = delay - (curTime - startTime);
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  }
}