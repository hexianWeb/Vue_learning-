(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);
      // Object.defineProperty只能劫持已经存在的属性 后增与删除不能劫持(即为 $set $delete)
      this.walk(data);
    }
    //循环对象 对属性依次劫持
    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observe;
  }(); // 这里 value引用了data[key]的属性 延长了函数的生命周期 随后又因为 get和set监听的是全局事件 闭包不被销毁
  function defineReactive(target, key, value) {
    observe(value); //递归 对子对象进行属性劫持
    Object.defineProperty(target, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
      }
    });
  }
  function observe(data) {
    // 1.判断是否为对象 只对对象进行劫持
    if (_typeof(data) !== "object" || data === null) {
      return;
    }
    // 2.如果一个对象被劫持过了 则不需要再被劫持 可以增添一个实例用于判断是否被劫持
    return new Observe(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.data) {
      initData(vm);
    }
  }
  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key];
      },
      set: function set(newValue) {
        vm[target][key] = newValue;
      }
    });
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === "function" ? data.call(vm) : data;
    vm._data = data;
    observe(data);
    for (var key in data) {
      proxy(vm, "_data", key);
    }
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
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
