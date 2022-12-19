import { initMixin } from "./init";

function Vue(options) {
  this._init(options);
}

// Vue.prototype._init = function(options){}

initMixin(Vue);

export default Vue;
