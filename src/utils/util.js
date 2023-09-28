// 防抖
export function debounce(fn, delay) {
  let time = null; //time用来控制事件的触发
  return function (agrs) {
    if (time !== null) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.call(this, agrs);
      //利用call(),让this的指针从指向window 转成指向input
    }, delay);
  };
}

// 节流函数
export function throttle(fn, delay, isImmediate = true){
  // isImmediate 为 true 时使用前缘节流，首次触发会立即执行，为 false 时使用延迟节流，首次触发不会立即执行
  let last = Date.now();
  return function (){
      let now = Date.now();
      if(isImmediate){
          fn.apply(this, arguments);
          isImmediate = false;
          last = now;
      }
      if(now - last >= delay){
          fn.apply(this, arguments);
          last = now;
      }
  }
}
