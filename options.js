function saveStore(cityId, storeName) {
  localStorage['cityId'] = cityId;
  localStorage['storeName'] = storeName;
  var status = $('#status');
  status.html('Myymälä talletettu.');
  setTimeout(function() {
    status.html('');
  }, 1500);
}

function loadStore() {
  $('#cityId').val(localStorage['cityId']);
  $('#storeName').val(localStorage['storeName']);
}

$(document).ready(function(){
  loadStore();
  $('#save').click(function() {
    saveStore($('#cityId').val(), $('#storeName').val());
  });
});
