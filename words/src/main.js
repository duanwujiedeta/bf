//css
import '@/assets/css/global.css'
import '@/assets/css/theme/index.css'
import '@/assets/css/common.less'
import '@/assets/css/theme.less'
import '@/assets/css/iconfont/iconfont.css'
import '@/assets/css/icon/icon.css'
//其他
import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import http from './util/http'
import ElementUI from 'element-ui'


//文件前缀
// Vue.prototype.$fileCdn = "https://open-file.mysail.shop/";

Vue.config.productionTip = false
Vue.use(http);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')