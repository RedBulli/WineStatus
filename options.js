function saveStore(cityId, storeName) {
  chrome.storage.sync.set({
    cityId: cityId,
    storeName: storeName
  });
  var status = $('#status');
  status.html('Myymälä talletettu.');
  setTimeout(function() {
    status.html('');
  }, 1500);
}

function loadStore() {
  chrome.storage.sync.get(['cityId', 'storeName'], function(vals) {
    $('#cityId').val(vals['cityId']);
    $('#storeName').val(vals['storeName']);
  });
}

$(document).ready(function(){
  loadStore();
  $('#save').click(function() {
    saveStore($('#cityId').val(), $('#storeName').val());
  });
});
