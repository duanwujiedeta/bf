chrome.contextMenus.create({
  'type':'normal',
  'title':'使用Google翻译……',
  'contexts':['selection'],
  'id':'luey',
  'onclick':translate
});
console.log("background");
function translate(info, tab){
  var url = 'http://translate.google.com.hk/#auto/zh-CN/'+info.selectionText ;
  window.open(url, '_blank');
}