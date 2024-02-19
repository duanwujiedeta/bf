//css
import '@/assets/css/theme/index.css'
import '@/assets/css/icon/icon.css'
import '@/assets/css/dialog.less'
//其他
import Vue from 'vue'
import App from './helpCenter.vue'
// import './registerServiceWorker'
import http from './util/http'
import ElementUI from 'element-ui'
import store from './store'
import $ from "jquery";

$("body").append(`<div id="lueycontent" style="height:1px;"></div>`);




// 监听鼠标抬起事件
/* document.addEventListener('mouseup', function () {
  // 获取选中的文本
  var selectedText = window.getSelection().toString();

  // 将选中的文本发送到后台页面
  chrome.runtime.sendMessage({ action: "getSelectedText", text: selectedText });
}); */

// 监听键盘事件
document.addEventListener('keydown', function (event) {
  // 检查是否按下了您所定义的快捷键（例如 Ctrl + Shift + S）
  if (event.ctrlKey && event.altKey && event.key === 'A') {
    // 发送消息到后台页面
    // 获取选中的文本
    var selectedText = window.getSelection().toString();
    chrome.runtime.sendMessage({ action: "shortcutPressed", selectedText });
  }
});



//文件前缀

Vue.use(http);
ElementUI.Dialog.props.lockScroll.default = false;
Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#lueycontent')