function onRequest(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
};

chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function(tab) {
  var storeId = localStorage['storeId'];
  var storeName = localStorage['storeName'];
  var storeArea = localStorage['storeArea'];
  if (!storeId || !storeName || !storeArea) {
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
      + "function fetchAvailability(code) {"
      + " var xmlHttp = new XMLHttpRequest();"
      + " var url = 'http://alko.fi/servlet/Saatavuus?doHaku=1&Kieli=FI&Tuotenumero=' + code + '&KuntaMaakunta=" + storeArea + "&';"
      + " xmlHttp.onload = function() {"
      + "  var alko = this.responseXML.querySelector('a[href=\"/myymalat/fi/" + storeId + "\"]');"
      + "  var link = document.getElementById('viini_' + code);"
      + "  link.href = url;"
      + "  var bottleCount = 0;"
      + "  if (alko) {"
      + "   bottleCount = alko.parentNode.nextSibling.innerText.trim();"
      + "  }"
      + "  link.innerText = '" + storeName + ": ' + bottleCount + ' kpl.';"
      + " };"
      + " xmlHttp.open('GET', url);"
      + " xmlHttp.responseType = 'document';"
      + " xmlHttp.send(null);"
      + "}"      
    }
  );
});
