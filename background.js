function onRequest(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function(tab) {
  var storeId = localStorage['storeId'];
  var storeCity = localStorage['storeCity'];
  var storeName = localStorage['storeName'];
  if (!storeId || !storeName || !storeCity) {
    chrome.tabs.create({url: "options.html"});
  }
  chrome.tabs.executeScript(
    null, 
    { code: 
      "var links = document.querySelectorAll('.viini_wine .related a:first-child:not(.wineStatus)');"
      + "if (links.length==0) {links=document.querySelectorAll('a.wineCode');}"
      + "for (var i=0;i<links.length;i++) {"
      + " var link = links[i];"
      + " link.className += ' wineCode';"
      + " var text = link.innerText;"
      + " var code = text.substr(0,text.indexOf(','));"
      + " var elId = 'viini_' + code;"
      + " var el = document.getElementById(elId);"
      + " if (!el) {"
      + "  el = document.createElement('a');"
      + "  el.className = 'wineStatus';"
      + "  el.id = 'viini_' + code;"
      + "  el.style.lineHeight = '200%';"
      + "  link.parentElement.insertBefore(el, link);"
      + " }"
      + " el.innerText = 'Saatavuutta haetaan';"
      + " fetchAvailability(code);"
      + "};"
      + "function findStoreData(data) {"
      + " for (var i=0; i<data.length; i++) {"
      + "  if (data[i].StoreLink === '/myymalat/'+" + storeId + "+'/') { return data[i]; }"
      + " }"
      + "}"
      + "function fetchAvailability(code) {"
      + " var xmlHttp = new XMLHttpRequest();"
      + " var url = 'http://www.alko.fi/api/product/availability?productId=' + code + '&cityId=" + storeCity + "&languageId=fi';"
      + " xmlHttp.onload = function() {"
      + " var link = document.getElementById('viini_' + code);"
      + " var storeData = findStoreData(JSON.parse(this.responseText));"
      + " var bottleCount = 0;"
      + " if (storeData) {"
      + "  bottleCount = storeData.Amount;"
      + " }"
      + " link.innerText = '" + storeName + ": ' + bottleCount + ' kpl.';"
      + " };"
      + " xmlHttp.open('GET', url);"
      + " xmlHttp.responseType = 'json';"
      + " xmlHttp.send(null);"
      + "}"      
    }
  );
});
