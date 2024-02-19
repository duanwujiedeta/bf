//css
import '@/assets/css/theme/index.css'
import '@/assets/css/icon/icon.css'
import '@/assets/css/dialog.less'
//其他
import Vue from 'vue'
import App from './pricing.vue'
// import './registerServiceWorker'
import http from './util/http'
import ElementUI from 'element-ui'
import store from './store'


//文件前缀

Vue.use(http);
ElementUI.Dialog.props.lockScroll.default=false;
Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')