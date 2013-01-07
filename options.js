var stores;

function saveStore() {
  var select = $('#store');
  var store = stores[select.val()];
  var storeArea = $('#area').val();
  localStorage['storeId'] = store.id;
  localStorage['storeName'] = store.name;
  localStorage['storeArea'] = storeArea;
  var status = $('#status');
  status.html('Myymälä talletettu.');
  setTimeout(function() {
    status.html('');
  }, 1500);
}

function restoreStore() {
  var storeId = parseInt(localStorage['storeId']);
  var storeArea = localStorage['storeArea'];
  if (storeId) {
    $('#store').val(storeId);
  }
  if (storeArea) {
    $('#area').val(storeArea);
  }
  else {
    $('#area').val("KOKO");
  }
}

function initStores() {
  stores = {};
  $.ajax({
    url: 'http://www.alko.fi/myymala/liitetiedostot/myymalatfi/$File/myymos.txt',
    mimeType: 'text/plain;charset=iso-8859-1',
    success: function(data) {
      var storeTexts = data.split('\n');
      storeTexts.splice(0,3);
      storeTexts.pop();
      var el = $('#store');
      $.each(storeTexts, function(index, value) {
        var store = getStore(value);
        el.append('<option value="' + store.id + '">' + store.name + '</option>');
        stores[store.id] = store;
      });
      restoreStore();
      $('#save').click(function() {saveStore();});
    }
  });
}

function getStore(storeText) {
  var store = {};
  var textArray = storeText.split('\t');
  store.id = textArray[13];
  store.id = parseInt(store.id.trim());
  store.name = textArray[0];
  return store;
}

$(document).ready(function(){
  initStores();
});
