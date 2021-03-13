import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//다국어 지원
import local from 'element-ui/lib/locale/lang/ko';
import titleMixin from './mixins/titleMixin'

Vue.use(ElementUI, { local });
Vue.config.productionTip = false;
Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

