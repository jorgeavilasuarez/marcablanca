var validoAuto = true;
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '<Ant',
    nextText: 'Sig>',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    // dateFormat: 'dd/mm/yy',
    //firstDay: 1,
    isRTL: false,
    //showMonthAfterYear: false,
    yearSuffix: ''
};

function CargarCalendario(elements, FechaMinima, FechaMaxima, namefunction, inicializar) {
    $(elements).datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: FechaMinima,
        maxDate: FechaMaxima,
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        onClose: function () {
            if (namefunction != null) {
                namefunction();
            }
        }
    }).datepicker("setDate", inicializar);
}
function ControlarTipoViaje() {
    $("#modal_vuelos_1").on("change", function () {
        var checked = $("#modal_vuelos_1").is(":checked");
        idayvuelta = true;
        ida = false;
        if (checked == true) {
            $("#FechaLlegada").hide();
            $("#lblRegresoVuelos").hide();
            $(".ImgOcultar").hide();
        }
    });

    $("#modal_vuelos_0").on("change", function () {

        var checked = $("#modal_vuelos_0").is(":checked");
        ida = true;
        idayvuelta = false;
        if (checked == true) {
            $("#FechaLlegada").show();
            $("#lblRegresoVuelos").show();
            $(".ImgOcultar").show();
        }
    });



}
function cambioFechaSalida() {
    $("#FechaLlegada").datepicker("change", { minDate: new Date($('#FechaSalida').val()) });
}
function __highlight(s, t) {
    var matcher = new RegExp("(" + $.ui.autocomplete.escapeRegex(t) + ")", "ig");
    return s.replace(matcher, "<strong>$1</strong>");
}
function LlenaredadesNinios() {

    for (var i = 2; i < 12; i++) {
        if (i < 10)
            $(".edadesNinos").append("<option value='0" + i + "'>" + i + " </option>");
        else
            $(".edadesNinos").append("<option value='" + i + "'>" + i + " </option>");
    }
}
function LlenaredadesInfantes() {

    for (var i = 1; i < 24; i++) {
        $(".edadesInfantes").append("<option value='" + i + "'>" + i + " </option>");
    }
}
function CambioNroNinos(nro) {
    $("#edadNinos").empty();
    for (var i = 0; i < nro; i++) {
        $("#edadNinos").append("Años<select class='edadesNinos form-control input-smallv'></select>");
    }
    LlenaredadesNinios();
}
function CambioInfantes(nro) {
    $("#edadInf").empty();
    for (var i = 0; i < nro; i++) {
        $("#edadInf").append("Meses<select class='edadesInfantes form-control input-smallv'></select>");
    }
    LlenaredadesInfantes();
}

function ArmarUrl() {
    var URL_SEARCH = $("#ssoft_white_label").attr("data-url-search");
    if(URL_SEARCH == null){
      alert("falta el atributo data-url-search");
    }
    var msgError = "";
    var url = URL_SEARCH + "?";
    var params;
    var edadesNinios = "";
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var fechaSalida = $("#FechaSalida").val();
    var fechaLLegada = $("#FechaLlegada").val();
    var nroAdultos = $("#adults option:selected").val();
    var nroNinios = $("#childs option:selected").val();
    var nroInfantes = $("#infants option:selected").val();
    var arregloEdadesNinos = new Array();
    var arregloEdadesInf = new Array();
    var nroPasajeros = parseInt(nroInfantes) + parseInt(nroAdultos) + parseInt(nroNinios);

    $.each($(".edadesNinos"), function (i, val) {
        var edad = $(val).val();
        arregloEdadesNinos.push(edad);
    });
    var checked = $("#modal_vuelos_0").is(":checked");
    // Validaciones Básicas
    if ((new Date(fechaSalida).getTime() > new Date(fechaLLegada).getTime()) && checked == true) {
        msgError = "La fecha de salida no puede ser inferior a la de regreso. \n";
    }
    if (origen == destino) {
        msgError = msgError + "Origen y Destino no pueden ser iguales. \n";
    }
    if (nroInfantes > nroAdultos) {
        msgError = msgError + "El número de infantes es superior a número de adultos. \n";
    }

    if (nroPasajeros > 8) {
        msgError = msgError + "El número de pasajeros no debe ser superior a 8. \n";
    }

    if (checked == true) {
        params = "origen=" + origen + "&destino=" + destino + "&fechaSalida=" + fechaSalida + "&fechaLLegada=" + fechaLLegada + "&adul=" + nroAdultos + "&inf=" + nroInfantes;
    }
    else {
        params = "origen=" + origen + "&destino=" + destino + "&fechaSalida=" + fechaSalida + "&adul=" + nroAdultos + "&inf=" + nroInfantes;
    }

    if (arregloEdadesNinos.length > 0) {
        for (var en = 0; en < arregloEdadesNinos.length; en++) {
            edadesNinios = edadesNinios + "C" + arregloEdadesNinos[en] + "-";
        }
        params = params + "&ninios=" + edadesNinios.substring(0, edadesNinios.length - 1);
    }
    if (msgError.length < 3) {
        window.location.href = url + params;
    }
    else
        ModalMensaje(msgError);
}

$("#btnBuscarVuelo").on("click", function (e) {
    $("#formID").validationEngine();
    if ($('#formID').validationEngine('validate') == true) {
        e.preventDefault();

        ArmarUrl();
    }

});

//$(document).ready(function () {

    $("#aspnetForm input select").val("");
    $.datepicker.setDefaults($.datepicker.regional['es']);
    ControlarTipoViaje();
    CargarCalendario("#FechaLlegada", -1, '+12M', null, 1);
    CargarCalendario("#FechaSalida", -0, '+12M', cambioFechaSalida, "0");

    $("#childs").on("change", function () {
        var val = $("#childs option:selected").val();
        CambioNroNinos(val);
    })
    $("#infants").on("change", function () {
        var val = $("#infants option:selected").val();
        CambioInfantes(val);
    })
    
    // Autocompletar
    $("#destino,#origen").autocomplete({
        
        source: function (request, response) {
            var aeropuertos = new Array();
            $.ajax({
                url: "http://162.248.52.194/WorldTours/Pagina/ajax.ashx",
                data: { MethodName: "GetData", term: request.term, limit: 99 },
                async: false,
                type: "get",
                cache: false,
                success: function (data) {
                    //  console.log(data);
                    if (data.length === 0) {
                        aeropuertos[0] = { label: "Sin Resultados", Id: 0 }
                        $(this).val("");
                        //$("#destino,#origen").val("");
                    }
                    else {
                        aeropuertos[0] = { label: data[0].IATA + " (" + data[0].Ciudad + ")", Id: data[0].IATA, icon: "ciu" }

                        for (var i = 1; i <= data.length ; i++) {
                            aeropuertos[i] = { label: data[i - 1].IATA + " " + data[i - 1].Ciudad + " (" + data[i - 1].NombreAeropuerto + ")", Id: data[i - 1].IATA, icon: "air" };
                        }
                    }
                },

            });
            response(aeropuertos);
        },
        minLength: 3,
        select: function (event, ui) {
            //console.log(ui.item.value);
            //console.log(ui.item.Id);
        },
        change: function (event, ui) {
            //console.log(ui.item.value);
            if (!ui.item) {
                $(this).val("");
            }
            else {
                if (ui.item.value == "Sin Resultados") {
                    $(this).val("");
                }
            }
        }
    });

    $("#origen").autocomplete("instance")._renderItem = function (ul, item) {
        if (item.icon == "ciu") {
            return $("<li>")
            .append("<span class='ac_ciud'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }
        else {
            return $("<li>")
            .append("<span class='ac_aer'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }
    };
    $("#destino").autocomplete("instance")._renderItem = function (ul, item) {
        if (item.icon == "ciu") {
            return $("<li>")
            .append("<span class='ac_ciud'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }
        else {
            return $("<li>")
            .append("<span class='ac_aer'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }
    };

//})
