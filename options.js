var stores;

function saveStore(el) {
  var store = stores[el.val()];
  localStorage['storeId'] = store.StoreId;
  localStorage['storeName'] = store.Name;
  localStorage['storeCity'] = store.City;
  var status = $('#status');
  status.html('Myymälä talletettu.');
  setTimeout(function() {
    status.html('');
  }, 1500);
}

function restoreStore() {
  var storeId = localStorage['storeId'];
  if (storeId) {
    $('#store').val(storeId);
  }
}

function initStores(el) {
  el.empty();
  stores = {};
  $.ajax({
    url: 'http://www.alko.fi/api/store/markers?language=fi',
    mimeType: 'application/json;charset=utf-8',
    success: function(data) {
      data.sort(SortByName);
      $.each(data, function(index, store) {
        el.append('<option value="' + store.StoreId + '">' + store.Name + '</option>');
        stores[store.StoreId] = store;
      });
      restoreStore();
      $('#save').click(function() {saveStore(el);});
    }
  });
}

function SortByName(a, b){
  var aName = a.Name.toLowerCase();
  var bName = b.Name.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

$(document).ready(function(){
  initStores($('#store'));
});
