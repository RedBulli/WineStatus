function onRequest(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: 'inject_script.js'});
});
