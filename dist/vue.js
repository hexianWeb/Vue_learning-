(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function initState(vm) {
    var opts = vm.$options;
    if (opts.data) {
      initData(vm);
    }
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === "function" ? data.call(vm) : data;
  }

  function initMixin(Vue) {
    // 给Vue增加init方法
    // 初始化操作
    Vue.prototype._init = function (options) {
      // 初始化操作 vm.$options 获取用户的配置
      // 使用vue的时候 $代表在Vue实例上
      var vm = this;
      this.$options = options; //将用户的选项挂在到实例上
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }

  // Vue.prototype._init = function(options){}

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
