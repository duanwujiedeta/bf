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


// 网页收藏

// 消息监听
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "shortcutPressed") {
    openCollect(request.selectedText);
  }
});

function openCollect(text) {
  text = encodeURIComponent(text);
  try {
    const panelWindowInfo = chrome.windows.create({
      url: chrome.runtime.getURL("/pricing.html") + `?text=${text}`,
      type: "popup",
      height: 500,
      width: 300,
    });
  } catch (error) { console.log(error); }
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



// 剪切板内容
// 在后台页面中监听剪贴板内容改变事件
chrome.clipboard.onClipboardDataChanged.addListener(function () {
  // 获取剪贴板内容
  chrome.clipboard.readText(function (clipboardContent) {
    console.log("Clipboard content:", clipboardContent);

    // 在这里对剪贴板内容进行处理
  });
}); */

