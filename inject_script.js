chrome.storage.sync.get(['cityId', 'storeName'], function(vals) {
  findWines(vals['cityId'], vals['storeName']);
});

function findWines(cityId, storeName) {
  var links = document.querySelectorAll('.viini_wine .related a:first-child:not(.wineStatus)');
  if (links.length==0) {links=document.querySelectorAll('a.wineCode');}
    for (var i=0;i<links.length;i++) {
      var link = links[i];
      link.className += ' wineCode';
      var text = link.innerText;
      var code = text.substr(0,text.indexOf(','));
      var elId = 'viini_' + code;
      var el = document.getElementById(elId);
      if (!el) {
        el = document.createElement('a');
        el.className = 'wineStatus';
        el.id = 'viini_' + code;
        el.style.lineHeight = '200%';
        link.parentElement.insertBefore(el, link);
      }
    el.innerText = 'Saatavuutta haetaan';
    fetchAvailability(code);
  };

  function findStoreData(data) {
   for (var i=0; i<data.length; i++) {
    if (data[i].StoreName == storeName) { return data[i]; }
   }
  }

  function fetchAvailability(code) {
    var xmlHttp = new XMLHttpRequest();
    var url = 'http://www.alko.fi/api/product/Availability?productId=' + code + '&cityId=' + cityId + '&language=fi';
    xmlHttp.onload = function() {
      var link = document.getElementById('viini_' + code);
      var storeData = findStoreData(JSON.parse(this.responseText));
      var bottleCount = 0;
      if (storeData && storeData.StoreName == storeName) {
        bottleCount = storeData.Amount;
        link.innerText = storeName + ': ' + bottleCount + ' kpl.';
      }
      else {
        link.innerText = 'Jokin män pielee.';
      }
    };
    xmlHttp.open('GET', url);
    xmlHttp.send(null);
  }
}


