import {
  openDB,
  addData,
  getDataByKey,
  cursorGetData,
  getDataByIndex,
  cursorGetDataByIndex,
  updateDB,
  deleteDB,
  deleteDBAll,
  closeDB,
  getDataAll,
  uuid,
} from "@/util/indexdDB";

chrome.contextMenus.create({
  'type': 'normal',
  'title': '加入笔记',
  'contexts': ['selection'],
  'id': 'luey',
  'onclick': translate
});
function translate(info, tab) {
  /* var url = 'http://translate.google.com.hk/#auto/zh-CN/'+info.selectionText ;
  window.open(url, '_blank'); */

  if (!tab) return; const contentWindowId = tab.windowId;
  openCollect(info.selectionText);
}

// 监听快捷键，打开收藏
chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case "select_panel":
      openCollect("");
      break;
  }
})


function openCollect(text) {
  text = encodeURIComponent(text);
  try {
    const panelWindowInfo = chrome.windows.create({
      url: chrome.runtime.getURL("/pricing.html") + `?text=${text}`,
      type: "popup",
      height: 800,
      width: 300,
    });
  } catch (error) { console.log(error); }
}



// 网页收藏

// 消息监听，用于写入句子
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cn && request.en) {// 插入 indexdDB
    saveToDb(request);
  }
});

function saveToDb({ en, cn }) {
  openDB("luey", "favorites").then((db) => {
    addData(db, "favorites", {
      word: en,
      tran: cn,
    });
  });
}

function sendToContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "Hello from background" });
  });
}



// 监听右键菜单项点击事件
/* chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "luey") {
    // 在此处处理您的点击事件逻辑
    console.log(info);
    console.log("Right-click menu item clicked!");
  }
});

// 模拟触发右键菜单点击事件
function triggerContextMenuClick() {
  var menuItemId = "luey"; // 替换为您的右键菜单项ID
  var tabId = null; // null表示当前选项卡

  // 更新右键菜单项，以触发点击事件
  chrome.contextMenus.update(menuItemId, { "documentUrlPatterns": ["<all_urls>"] }, function () {
    // 恢复原始右键菜单项
    chrome.contextMenus.update(menuItemId, { "documentUrlPatterns": [] });
  });
}

/* 
// content.js

// 监听来自后台页面的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("Received message from background script:", message);

  // 在这里可以执行一些逻辑，比如根据收到的消息做出相应的操作

  // 如果需要向后台页面发送响应，可以使用sendResponse函数
  sendResponse({response: "Message received successfully!"});
});


message参数是从后台页面发送过来的消息对象。

sender参数是一个包含有关消息发送者的信息的对象，包括tab属性，指示消息来自哪个标签页。

sendResponse参数是一个函数，用于向消息发送者（通常是后台页面）发送响应消息。在处理完消息后，您可以通过调用sendResponse来发送一个响应。

这样，当后台页面通过chrome.tabs.sendMessage发送消息时，内容脚本就会通过chrome.runtime.onMessage.addListener监听到，并且可以在回调函数中处理接收到的消息。


*/

// 剪切板内容
// 在后台页面中监听剪贴板内容改变事件
chrome.clipboard.onClipboardDataChanged.addListener(function () {
  // 获取剪贴板内容
  chrome.clipboard.readText(function (clipboardContent) {
    console.log("Clipboard content:", clipboardContent);

    // 在这里对剪贴板内容进行处理
  });
}); */

