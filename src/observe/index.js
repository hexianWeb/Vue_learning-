class Observe {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性 后增与删除不能劫持(即为 $set $delete)
    this.walk(data);
  }
  //循环对象 对属性依次劫持
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
}

// 这里 value引用了data[key]的属性 延长了函数的生命周期 随后又因为 get和set监听的是全局事件 闭包不被销毁
export function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      value = newValue;
    },
  });
}
export function observe(data) {
  // 1.判断是否为对象 只对对象进行劫持
  if (typeof data !== "object" || data === null) {
    return;
  }
  // 2.如果一个对象被劫持过了 则不需要再被劫持 可以增添一个实例用于判断是否被劫持
  return new Observe(data);
}
