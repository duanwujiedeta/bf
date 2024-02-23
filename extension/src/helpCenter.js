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

  // 检查是否按下了您所定义的快捷键（例如 Ctrl + Shift + S）
  if (event.ctrlKey && event.altKey && event.key === 'q') {
    $("hcfy-result").append(`<span class="luey-elm" style="cursor:pointer;">CP</span>`);
  }
});
$(document).on("click", ".luey-elm", function () {
  var cn = $(this).parent().find("hcfy-result-content").text();
  var parent_node = $(this).parents(".sentence-item__text").clone();
  parent_node.find("hcfy-result").remove();
  var en = parent_node.text();
  chrome.runtime.sendMessage({ cn, en });

  /* let ele = $(this).eq(0);
  copyText(ele); */
})
/* function copyText(ele) {
  var res = $(ele).parent().find("hcfy-result-content").text();
  copyTextToClipboard(res);
} 
window.copyText = copyText;
*/

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // 将文本域添加到文档中
  document.body.appendChild(textArea);

  // 选择文本域中的文本
  textArea.select();

  // 执行复制命令
  document.execCommand('copy');

  // 删除临时文本域
  document.body.removeChild(textArea);
}



// 监听键盘事件
document.addEventListener('mouseup', function (event) {
  // 检查是否按下了您所定义的快捷键（例如 Ctrl + Shift + S）
  // 获取选中的文本
  var selectedText = window.getSelection().toString();
  if (event.ctrlKey && event.altKey && selectedText) {
    // 发送消息到后台页面
    // 获取选中的文本
    window.open(`https://sentence.yourdictionary.com/${selectedText}`, "_blank");
  }
});


//  content脚本监听来自 background 的消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message from background script:", request);
    // 在这里可以执行您的逻辑
  }
);




//文件前缀

Vue.use(http);
ElementUI.Dialog.props.lockScroll.default = false;
Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#lueycontent')