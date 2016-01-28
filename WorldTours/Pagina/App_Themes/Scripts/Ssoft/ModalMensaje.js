function ModalMensaje(html) {
 $('#modalMensaje').dialog({
  modal: true,
  width: 300})
 $('.ui-widget-overlay').css('position', 'fixed')
 $('.modalMensajeContent').empty()
 $('.modalMensajeContent').append(html)}
$(document).ready(function () {
 $('input[readonly]').css('cursor', 'pointer')
 $('#btnAceptarModal').bind('click', function () {
  $('#modalMensaje').dialog('close')})})