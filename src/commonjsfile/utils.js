//  防抖函数，频繁调用事件影响性能时需要
export  function debounce(fn,delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}