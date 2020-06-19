import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters';
import extend from './utils/extend';
import 'vant/lib/index.css';
import VantUI from './components/vant';
import FastClick from 'fastclick';
import wechat from './utils/wechat';

Vue.use(VantUI);
Vue.use(extend);
Vue.use(wechat);

//全局注入filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//解决移动端300毫秒延迟
document.addEventListener('DOMContentLoaded', function () {
	FastClick.attach(document.body);
}, false);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
