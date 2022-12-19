import { initState } from "./state";
export function initMixin(Vue) {
  // 给Vue增加init方法
  // 初始化操作
  Vue.prototype._init = function (options) {
    // 初始化操作 vm.$options 获取用户的配置
    // 使用vue的时候 $代表在Vue实例上
    const vm = this;
    this.$options = options; //将用户的选项挂在到实例上
    // 初始化状态
    initState(vm);
  };
}
