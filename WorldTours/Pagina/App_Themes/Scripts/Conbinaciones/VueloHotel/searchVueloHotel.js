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
function ControlarTipoViajeVuelosHotel() {
    $("#modal_vuelosHotel_1").on("change", function () {
        var checked = $("#modal_vuelosHotel_1").is(":checked");
        idayvuelta = true;
        ida = false;
        if (checked == true) {
            $("#FechaLlegadaVuelosHotel").hide();
            $("#lblRegresoVuelosHotel").hide();
            $(".ImgOcultar").hide();
        }
    });

    $("#modal_vuelosHotel_0").on("change", function () {

        var checked = $("#modal_vueloHotels_0").is(":checked");
        ida = true;
        idayvuelta = false;
        if (checked == true) {
            $("#FechaLlegadaVuelosHotel").show();
            $("#lblRegresoVuelosHotel").show();
            $(".ImgOcultar").show();
        }
    });



}
function cambioFechaSalida() {
    //$("#FechaLlegada").datepicker("change", { minDate: new Date($('#FechaSalida').val()) });
    //debugger;
    var now = $('#FechaSalidaVueloHotel').datepicker('getDate');
    var date = now.getDate() + 1
    var new55 = new Date(now.setDate(date));
    /*$("#txtLlegadaHotel").setDate(15);*/
    $("#FechaLlegadaVueloHotel").datepicker("change", { minDate: now });
}
function __highlight(s, t) {
    var matcher = new RegExp("(" + $.ui.autocomplete.escapeRegex(t) + ")", "ig");
    return s.replace(matcher, "<strong>$1</strong>");
}

function CambioNroPassengersVueloHotel(nro) {
    //debugger;
    $(".PasajerosVueloHotelTitular").empty();
    for (var i = 0; i < nro; i++) {
        $(".PasajerosVueloHotelTitular").append("<div id='divVueloHotel" + i + "'><select id='selectAdtVueloHotel" + i + "' name='AdtVueloHot' class='GeneralHotels form-control input-smallv AdtHotelGenSel'></select>" + "<select id='NinosVueloHotel" + i + "' name='chdVueloHot' class='GeneralHotels form-control input-smallv chdHotelGenSel'></select><div id='ContenedorNinosEdadesVueloHotel" + i + "' class='ContenedorNinosEdades'></div></div>");
    }
    LlenarCantAdtVueloHotel();
    LlenarCantChdVueloHotelGeneral();

    $("select[name=AdtHot]").on("change", function () {
        //debugger;
        var sel = $(this).parent().attr('id');
        //var val = $("#" + sel + " option:selected").val();
        EraseNinos(sel);
        //        alert(val);
    });

    $("select[name=chdVueloHot]").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        debugger;
        CambioNroNinosVueloHotel(val, sel);
        //        alert(val);
    });
}

function CambioNroNinosVueloHotel(nro, sel) {
    //debugger;
    if (sel == "NinosVueloHotel0") {
        $("#ContenedorNinosEdadesVueloHotel0").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdadesVueloHotel0").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinosVueloHotel1" + i + "' class='edadesNinosVueloHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosVueloHotel1") {
        $("#ContenedorNinosEdadesVueloHotel1").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdadesVueloHotel1").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinosVueloHotel2" + i + "' class='edadesNinosVueloHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosVueloHotel2") {
        $("#ContenedorNinosEdadesVueloHotel2").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdadesVueloHotel2").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinosVueloHotel3" + i + "' class='edadesNinosVueloHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosVueloHotel3") {
        $("#ContenedorNinosEdadesVueloHotel3").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdadesVueloHotel3").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinosVueloHotel4" + i + "' class='edadesNinosVueloHotel form-control input-smallv'></select>");
        }
    }


    LlenaredadesNiniosVueloHotel();
}

function LlenaredadesNiniosVueloHotel() {

    for (var i = 0; i < 18; i++) {

        $(".edadesNinosVueloHotel").append("<option value='0" + i + "'>" + i + " </option>");
    }
}

function LlenarCantAdtVueloHotel() {
    //debugger;
    for (var i = 1; i < 5; i++) {

        $(".AdtHotelGenSel").append("<option value='0" + i + "'>" + i + " </option>");
    }

    /// <summary>
    ///  Validaciones del buscador segun cantidad de pasajeros
    /// </summary>
    ///<remarks>
    /// Autor:          Jeisson Stiven Bernal
    /// Company:        Ssoft Colombia
    /// Fecha:          2015-10-17 
    /// </remarks>

    $("#selectVueloAdt0").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdVueloHotel(val);
    });

    $("#selectVueloAdt1").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdVueloHotel1(val);
    });

    $("#selectVueloAdt2").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdVueloHotel2(val);
    });

    $("#selectVueloAdt3").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdVueloHotel3(val);
    });

}


function LlenarCantChdVueloHotelGeneral() {
    $("select[name=chdVueloHot]").removeAttr("disabled")
    $("select[name=chdVueloHot]").empty();
    for (var i = 0; i < 3; i++) {

        $("select[name=chdVueloHot]").append("<option value='0" + i + "'>" + i + " </option>");
    }
}

function LlenarCantChdVueloHotel(val) {
    //debugger;
    if (val == "03") {
        $("#NinosHotel0").removeAttr("disabled")
        $("#NinosHotel0").empty();
        for (var i = 0; i < 2; i++) {

            $("#NinosHotel0").append("<option value='0" + i + "'>" + i + " </option>");
        }
    } else if (val == "04") {
        $("#NinosHotel0").prop('disabled', 'disabled');
    } else {
        $("#NinosHotel0").removeAttr("disabled")
        $("#NinosHotel0").empty();
        for (var i = 0; i < 3; i++) {

            $("#NinosHotel0").append("<option value='0" + i + "'>" + i + " </option>");
        }
    }
}

function LlenarCantChdVueloHotel1(val) {
    //debugger;
    if (val == "03") {
        $("#NinosHotel1").removeAttr("disabled")
        $("#NinosHotel1").empty();
        for (var i = 0; i < 2; i++) {

            $("#NinosHotel1").append("<option value='0" + i + "'>" + i + " </option>");
        }
    } else if (val == "04") {
        $("#NinosHotel1").prop('disabled', 'disabled');
    } else {
        $("#NinosHotel1").removeAttr("disabled")
        $("#NinosHotel1").empty();
        for (var i = 0; i < 3; i++) {

            $("#NinosHotel1").append("<option value='0" + i + "'>" + i + " </option>");
        }
    }
}

function LlenarCantChdVueloHotel2(val) {
    //debugger;
    if (val == "03") {
        $("#NinosHotel2").removeAttr("disabled")
        $("#NinosHotel2").empty();
        for (var i = 0; i < 2; i++) {

            $("#NinosHotel2").append("<option value='0" + i + "'>" + i + " </option>");
        }
    } else if (val == "04") {
        $("#NinosHotel2").prop('disabled', 'disabled');
    } else {
        $("#NinosHotel2").removeAttr("disabled")
        $("#NinosHotel2").empty();
        for (var i = 0; i < 3; i++) {

            $("#NinosHotel2").append("<option value='0" + i + "'>" + i + " </option>");
        }
    }
}

function LlenarCantChdVueloHotel3(val) {
    //debugger;
    if (val == "03") {
        $("#NinosHotel3").removeAttr("disabled")
        $("#NinosHotel3").empty();
        for (var i = 0; i < 2; i++) {

            $("#NinosHotel3").append("<option value='0" + i + "'>" + i + " </option>");
        }
    } else if (val == "04") {
        $("#NinosHotel3").prop('disabled', 'disabled');
    } else {
        $("#NinosHotel3").removeAttr("disabled")
        $("#NinosHotel3").empty();
        for (var i = 0; i < 3; i++) {

            $("#NinosHotel3").append("<option value='0" + i + "'>" + i + " </option>");
        }
    }
}


function LlenaredadesNiniosVuelosHotel() {

    for (var i = 2; i < 12; i++) {
        if (i < 10)
            $(".edadesNinos").append("<option value='0" + i + "'>" + i + " </option>");
        else
            $(".edadesNinos").append("<option value='" + i + "'>" + i + " </option>");
    }
}
function LlenaredadesInfantesVuelosHotel() {

    for (var i = 1; i < 24; i++) {
        $(".edadesInfantes").append("<option value='" + i + "'>" + i + " </option>");
    }
}
function CambioNroNinosVuelosHotel(nro) {
    $("#edadNinosVueloHotel").empty();
    for (var i = 0; i < nro; i++) {
        $("#edadNinosVueloHotel").append("Años<select class='edadesNinos form-control input-smallv'></select>");
    }
    LlenaredadesNiniosVuelosHotel();
}
function CambioInfantesVuelosHotel(nro) {
    $("#edadInfVueloHotel").empty();
    for (var i = 0; i < nro; i++) {
        $("#edadInfVueloHotel").append("Meses<select class='edadesInfantes form-control input-smallv'></select>");
    }
    LlenaredadesInfantesVuelosHotel();
}

function ArmarUrlVuelosHotel() {
    //debugger;
    var msgError = "";
    var url = "BusquedaVuelosHotel?";
    var params;
    var edadesNinios = "";
    var origen = $("#origenVueloHotel").val();
    var destino = $("#destinoVueloHotel").val();
    var fechaSalida = $("#FechaSalidaVueloHotel").val();
    var fechaLLegada = $("#FechaLlegadaVueloHotel").val();
    var nroHabitaciones = parseInt($("#SelectVuelohotel option:selected").val());
    var nroAdultos1 = $("#selectAdtVueloHotel0 option:selected").val();
    var nroAdultos2 = $("#selectAdtVueloHotel1 option:selected").val();
    if (nroAdultos2 == null || nroAdultos2 == undefined) {
        nroAdultos2 = "00";
    }
    var TotalnroAdultos = parseInt(nroAdultos1) + parseInt(nroAdultos2);
    var nroNinios = $("#NinosVueloHotel0 option:selected").val();
    var ageNino11 = $("#EdadNinosVueloHotel10 option:selected").val();
    var ageNino12 = $("#EdadNinosVueloHotel11 option:selected").val();
    var ageNino21 = $("#EdadNinosVueloHotel20 option:selected").val();
    var ageNino22 = $("#EdadNinosVueloHotel21 option:selected").val();
    var nroInfantes = $("#infantsVuelosHotel option:selected").val();
    var CodCity = destino.substr(destino.indexOf(".") + 1);
    var Habitaciones = $("#SelectVuelohotel option:selected").val();
    var language = "ES";
    var Nationality = "CO";
    var Diferencial = "VueloHotel"
    var arregloEdadesNinos = new Array();
    var arregloEdadesInf = new Array();
    var nroPasajeros = parseInt(nroInfantes) + parseInt(nroAdultos1) + parseInt(nroNinios);

    if (nroInfantes == undefined) {
        nroInfantes = "00";
    }

    if (ageNino11 === null || ageNino11 === undefined) {
        ageNino11 = "-1";
    }
    if (ageNino12 === null || ageNino12 === undefined) {
        ageNino12 = "-1";
    }
    if (ageNino21 === null || ageNino21 === undefined) {
        ageNino21 = "-1";
    }
    if (ageNino22 === null || ageNino22 === undefined) {
        ageNino22 = "-1";
    }

    $.each($(".edadesNinos"), function (i, val) {
        var edad = $(val).val();
        arregloEdadesNinos.push(edad);
    });
    var checked = $("#modal_vuelosHotel_0").is(":checked");
    // Validaciones Básicas
    if ((new Date(fechaSalida).getTime() > new Date(fechaLLegada).getTime()) && checked == true) {
        msgError = "La fecha de salida no puede ser inferior a la de regreso. \n";
    }
    if (origen == destino) {
        msgError = msgError + "Origen y Destino no pueden ser iguales. \n";
    }
    if (nroInfantes > TotalnroAdultos) {
        msgError = msgError + "El número de infantes es superior a número de adultos. \n";
    }

    if (nroPasajeros > 8) {
        msgError = msgError + "El número de pasajeros no debe ser superior a 8. \n";
    }

    if (checked == true) {
        params = "origen=" + origen + "&destino=" + destino + "&fechaSalida=" + fechaSalida + "&fechaLLegada=" + fechaLLegada + "&adul=" + TotalnroAdultos + "&inf=" + nroInfantes + "&CodCity=" + CodCity + "&language=" + language + "&Nationality=" + Nationality + "&Rooms=" + Habitaciones + "&Adul1=" + nroAdultos1 + "&Age11=" + ageNino11 + "&Age12=" + ageNino12 + "&Adul2=" + nroAdultos2 + "&Age21=" + ageNino21 + "&Age22=" + ageNino22 + "&HabsNumber=" + nroHabitaciones + "&TipoPlan=HOT" + "&Diferencial=" + Diferencial;
    }
    else {
        params = "origen=" + origen + "&destino=" + destino + "&fechaSalida=" + fechaSalida + "&adul=" + TotalnroAdultos + "&inf=" + nroInfantes + "&CodCity=" + CodCity + "&language=" + language + "&Nationality=" + Nationality + "&Rooms=" + Habitaciones + "&Adul1=" + nroAdultos1 + "&Age11=" + ageNino11 + "&Age12=" + ageNino12 + "&Adul2=" + nroAdultos2 + "&Age21=" + ageNino21 + "&Age22=" + ageNino22 + "&HabsNumber=" + nroHabitaciones + "&TipoPlan=HOT" + "&Diferencial=" + Diferencial;
    }

    if (arregloEdadesNinos.length > 0) {
        for (var en = 0; en < arregloEdadesNinos.length; en++) {
            edadesNinios = edadesNinios + "C" + arregloEdadesNinos[en] + "-";
        }
        params = params + "&ninios=" + edadesNinios.substring(0, edadesNinios.length - 1);
    }
    if (msgError.length < 3) {
        alert('http://162.248.52.194/worldtours/pagina/'+url+params+'#autos');
    }
    else
        ModalMensaje(msgError);
}

$("#btnBuscarVueloHotel").on("click", function (e) {
    $("#formID").validationEngine();
    if ($('#formID').validationEngine('validate') == true) {
        e.preventDefault();
        ShowCortinilla();
        clearInterval(intervalo);
        ArmarUrlVuelosHotel();
    }

});

$(document).ready(function () {

    $("#aspnetForm input select").val("");
    $.datepicker.setDefaults($.datepicker.regional['es']);
    ControlarTipoViajeVuelosHotel();
    CargarCalendario("#FechaLlegadaVueloHotel", -1, '+12M', null, 1);
    CargarCalendario("#FechaSalidaVueloHotel", -0, '+12M', cambioFechaSalida, "0");

    function chargeiVuelo() {
        //debugger;
        var val1 = $("#SelectVuelohotel option:selected").val();
        CambioNroPassengersVueloHotel(val1);
    }

    chargeiVuelo();

    //$("#childsVuelosHotel").on("change", function () {
    //    var val = $("#childsVuelosHotel option:selected").val();
    //    CambioNroNinosVuelosHotel(val);
    //})
    //$("#infantsVuelosHotel").on("change", function () {
    //    var val = $("#infantsVuelosHotel option:selected").val();
    //    CambioInfantesVuelosHotel(val);
    //})


    $("#SelectVuelohotel").on("change", function () {
        //debugger;
        var val = $("#SelectVuelohotel option:selected").val();
        CambioNroPassengersVueloHotel(val);
    })


    // Autocompletar
    $("#destinoVueloHotel,#origenVueloHotel").autocomplete({

        source: function (request, response) {
            var aeropuertos = new Array();
            $.ajax({
                url: "http://162.248.52.194/Worldtours/pagina/ajax.ashx",
                data: { MethodName: "GetDataVuelosHotels", term: request.term, limit: 99 },
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
                        aeropuertos[0] = { label: data[0].IATA + " (" + data[0].Ciudad + ")" + "." + data[0].CodCiudad, Id: data[0].country, icon: "ciu" }

                        for (var i = 1; i < data.length ; i++) {
                            aeropuertos[i] = { label: data[i - 1].IATA + " " + data[i - 1].Ciudad + " (" + data[i - 1].country + ")" + "." + data[i].CodCiudad, Id: data[i - 1].IATA, icon: "air" };
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

    $("#origenVueloHotel").autocomplete("instance")._renderItem = function (ul, item) {
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
    $("#destinoVueloHotel").autocomplete("instance")._renderItem = function (ul, item) {
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

    $("#origenVueloHotel").autocomplete("instance")._renderItem = function (ul, item) {
        //debugger;
        if (item.icon == "ciu") {
            /*var newhr = '<li>' + "<span class='ac_aer'> " + __highlight(item.label, this.term) + "</span></li>";
            debugger;
            return $(ul).append(newhr);*/
            //debugger;
            var s = item.label;
            s = s.substring(0, s.indexOf('.'));;
            var b = item.label.split('.');
            return $("<li>")
            .append("<span class='ac_aer'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
            .appendTo(ul);
        }
        else {
            /*var newhr = '<li>' + "<span class='ac_ciudHots'> " + __highlight(item.label, this.term) + "</span></li>";
            debugger;
            return $(ul).append(newhr);*/
            //debugger;
            var s = item.label;
            s = s.substring(0, s.indexOf('.'));;
            var b = item.label.split('.');
            return $("<li>")
                .append("<span class='ac_ciudHots'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
            //.append("<span class='ac_ciudHots'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }

    };

    $("#destinoVueloHotel").autocomplete("instance")._renderItem = function (ul, item) {
        //debugger;
        if (item.icon == "ciu") {
            /*var newhr = '<li>' + "<span class='ac_aer'> " + __highlight(item.label, this.term) + "</span></li>";
            debugger;
            return $(ul).append(newhr);*/
            //debugger;
            var s = item.label;
            s = s.substring(0, s.indexOf('.'));;
            var b = item.label.split('.');
            return $("<li>")
            .append("<span class='ac_aer'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
            .appendTo(ul);
        }
        else {
            /*var newhr = '<li>' + "<span class='ac_ciudHots'> " + __highlight(item.label, this.term) + "</span></li>";
            debugger;
            return $(ul).append(newhr);*/
            //debugger;
            var s = item.label;
            s = s.substring(0, s.indexOf('.'));;
            var b = item.label.split('.');
            return $("<li>")
                .append("<span class='ac_ciudHots'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
            //.append("<span class='ac_ciudHots'> " + __highlight(item.label, this.term) + "</span></li>")
            .appendTo(ul);
        }

    };

})
