$(document).ready(function () {
 var now = new Date();
 var month = (now.getMonth() + 1);
 var day = now.getDate();
 if (month < 10)
  month = '0' + month;
 if (day < 10)
  day = '0' + day;
 var today = now.getFullYear() + '-' + month + '-' + day;
 /*$('#txtSalidaHotel').val(today)*/})

function ShowCortinilla() {
 $('.fondillocortinilla').show()
 $('.CTNImg').show()}