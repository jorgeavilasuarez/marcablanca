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

function CargarCalendarioHotel(elements, FechaMinima, FechaMaxima, namefunction, inicializar) {
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

function cambioFechaSalidaHotel() {
    //debugger;
    var now = $('#txtSalidaHotel').datepicker('getDate');
    var date = now.getDate() + 1
    var new55 = new Date(now.setDate(date));
    /*$("#txtLlegadaHotel").setDate(15);*/
    $("#txtLlegadaHotel").datepicker("change", { minDate: now });
}
function __highlight(s, t) {
    var matcher = new RegExp("(" + $.ui.autocomplete.escapeRegex(t) + ")", "ig");
    return s.replace(matcher, "<strong>$1</strong>");
}

function LlenaredadesNiniosHotel() {

    for (var i = 0; i < 18; i++) {

        $(".edadesNinosHotel").append("<option value='0" + i + "'>" + i + " </option>");
    }
}
function LlenarCantAdtHotel() {
    //debugger;
    for (var i = 1; i < 5; i++) {

        $(".AdtGenSel").append("<option value='0" + i + "'>" + i + " </option>");
    }

    /// <summary>
    ///  Validaciones del buscador segun cantidad de pasajeros
    /// </summary>
    ///<remarks>
    /// Autor:          Jeisson Stiven Bernal
    /// Company:        Ssoft Colombia
    /// Fecha:          2015-10-17 
    /// </remarks>

    $("#selectAdt0").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdHotel(val);
    });

    $("#selectAdt1").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdHotel1(val);
    });

    $("#selectAdt2").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdHotel2(val);
    });

    $("#selectAdt3").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        LlenarCantChdHotel3(val);
    });
}

/// <summary>
///  Funciones del buscador segun cantidad de pasajeros
/// </summary>
///<remarks>
/// Autor:          Omar Moreno @krackmoreno
/// Company:        Ssoft Colombia
/// Fecha:          2015-11-15  
/// </remarks>

function LlenarCantChdHotelGeneral() {
    $("select[name=chdHot]").removeAttr("disabled")
    $("select[name=chdHot]").empty();
    for (var i = 0; i < 3; i++) {

        $("select[name=chdHot]").append("<option value='0" + i + "'>" + i + " </option>");
    }
}

function LlenarCantChdHotel(val) {
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

function LlenarCantChdHotel1(val) {
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

function LlenarCantChdHotel2(val) {
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

function LlenarCantChdHotel3(val) {
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

function FillAdtChd(habs, arrUrl) {
    //debugger;
    for (var i = 0; i < habs; i++) {
        var adtSlt = parseInt(location.search.split('Adul' + (i + 1) + '=')[1]);
        //adtSlt = chdF.slice(0, chdF.indexOf("&"));
        $('#selectAdt' + i + '>option[value="0' + adtSlt + '"]').prop('selected', true);
        //$('#selectAdt' + i).val(adtSlt).change();
        var chdq = 0;
        for (var j = 1; j <= 2; j++) {
            var chdF = location.search.split('Age' + (i + 1) + "" + j + '=')[1];
            chdF = chdF.slice(0, chdF.indexOf("&"));
            if (chdF != "-1") {
                chdq++;
            }
        }
        $('#NinosHotel' + i + '>option[value="0' + chdq + '"]').prop('selected', true);
        //$('#NinosHotel' + i).val(chdq);
        CambioNroNinosHotel(chdq, 'NinosHotel' + i);
        if (chdq > 0) {
            for (var j = 1; j <= 2; j++) {
                var chdSlt = parseInt(location.search.split('Age' + (i + 1) + "" + j + '=')[1]);
                if (chdSlt != "-1") {
                    $('#EdadNinos' + (i + 1) + "" + (j - 1) + '>option[value="0' + chdSlt + '"]').prop('selected', true);
                }
            }
        }
    }
}

function CambioNroPassengers(nro) {
    //debugger;
    $(".PasajerosHotelTitular").empty();
    for (var i = 0; i < nro; i++) {
        $(".PasajerosHotelTitular").append("<div id='div" + i + "'><select id='selectAdt" + i + "' name='AdtHot' class='GeneralHotels form-control input-smallv AdtGenSel'></select>" + "<select id='NinosHotel" + i + "' name='chdHot' class='GeneralHotels form-control input-smallv chdGenSel'></select><div id='ContenedorNinosEdades" + i + "' class='ContenedorNinosEdades'></div></div>");
    }
    LlenarCantAdtHotel();
    LlenarCantChdHotelGeneral();
    var verify = "";
    try {
        verify = window.location.search.substring(1).split("&");
        if (verify != "") {
            var habs = $('#Selecthotel').val();
            FillAdtChd(habs, verify);
        }

    } catch (e) {
    }
    $("select[name=AdtHot]").on("change", function () {
        //debugger;
        var sel = $(this).parent().attr('id');
        //var val = $("#" + sel + " option:selected").val();
        EraseNinos(sel);
        //        alert(val);
    });

    $("select[name=chdHot]").on("change", function () {
        //debugger;
        var sel = $(this).attr('id');
        var val = $("#" + sel + " option:selected").val();
        CambioNroNinosHotel(val, sel);
        //        alert(val);
    });
}

function CambioNroNinosHotel(nro, sel) {
    //debugger;
    if (sel == "NinosHotel0") {
        $("#ContenedorNinosEdades0").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdades0").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinos1" + i + "' class='edadesNinosHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosHotel1") {
        $("#ContenedorNinosEdades1").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdades1").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinos2" + i + "' class='edadesNinosHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosHotel2") {
        $("#ContenedorNinosEdades2").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdades2").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinos3" + i + "' class='edadesNinosHotel form-control input-smallv'></select>");
        }
    } else if (sel == "NinosHotel3") {
        $("#ContenedorNinosEdades3").empty();

        for (var i = 0; i < nro; i++) {
            $("#ContenedorNinosEdades3").append("<label class='TituloBuscadorhotel contenidoBuscador labelforninosbusc'>A&ntildeos</label><select id='EdadNinos4" + i + "' class='edadesNinosHotel form-control input-smallv'></select>");
        }
    }


    LlenaredadesNiniosHotel();
}

function EraseNinos(sel) {

    var idnino = $('#' + sel + ' select:nth-child(2)').attr("id");
    //$('#' + idnino).val('0').change();
    $('#' + idnino).val('00'); //.change();
    CambioNroNinosHotel(0, idnino);
    //debugger;
}

function DiasHoteles(f1, f2) {
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha1 - fFecha2;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

function ArmarUrlHoteles() {
    //debugger;
    var TripInfo = [];
    var PassengersInfo = [];
    var msgError = "";
    var url = "NewHotels?";
    var params;
    var edadesNinios = "";
    //var origen = $("#txtDestinoHotel").val();
    var destino = $("#txtDestinoHotel").val();
    var fechaSalida = $("#txtSalidaHotel").val();
    var fechaLLegada = $("#txtLlegadaHotel").val();
    var nroHabitaciones = parseInt($("#Selecthotel option:selected").val());
    var nroAdultos1 = $("#selectAdt0 option:selected").val();
    var nroAdultos2 = $("#selectAdt1 option:selected").val();
    var nroAdultos3 = $("#selectAdt2 option:selected").val();
    var nroAdultos4 = $("#selectAdt3 option:selected").val();
    var ageNino11 = $("#EdadNinos10 option:selected").val();
    var ageNino12 = $("#EdadNinos11 option:selected").val();
    var ageNino21 = $("#EdadNinos20 option:selected").val();
    var ageNino22 = $("#EdadNinos21 option:selected").val();
    var ageNino31 = $("#EdadNinos30 option:selected").val();
    var ageNino32 = $("#EdadNinos31 option:selected").val();
    var ageNino41 = $("#EdadNinos40 option:selected").val();
    var ageNino42 = $("#EdadNinos41 option:selected").val();
    //var nroNinios = $("#NinosHotel option:selected").val();
    var CodCity = destino.substr(destino.indexOf(".") + 1);
    var Habitaciones = $("#Selecthotel option:selected").val();
    var language = "ES";
    var Nationality = "CO";
    var arregloEdadesNinos = new Array();
    //debugger;

    $.each($(".edadesNinos"), function (i, val) {
        var edad = $(val).val();
        arregloEdadesNinos.push(edad);
    });

    if ((new Date(fechaSalida).getTime() > new Date(fechaLLegada).getTime())) {
        msgError = "La fecha de salida no puede ser inferior a la de regreso. \n";
    }

    if (destino === "" || destino === null) {
        msgError = msgError + "El destino debe ser escogido. \n";
    }
    if (fechaLLegada === "" || fechaLLegada === null || fechaSalida === "" || fechaSalida === null) {
        msgError = msgError + "Fechas invalidas, por favor ingrese una fecha para valida para su viaje. \n";
    }

    if (nroAdultos2 === null || nroAdultos2 === undefined) {
        nroAdultos2 = "0";
    }
    if (nroAdultos3 === null || nroAdultos3 === undefined) {
        nroAdultos3 = "0";
    }
    if (nroAdultos4 === null || nroAdultos4 === undefined) {
        nroAdultos4 = "0";
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
    if (ageNino31 === null || ageNino31 === undefined) {
        ageNino31 = "-1";
    }
    if (ageNino32 === null || ageNino32 === undefined) {
        ageNino32 = "-1";
    }
    if (ageNino41 === null || ageNino41 === undefined) {
        ageNino41 = "-1";
    }
    if (ageNino42 === null || ageNino42 === undefined) {
        ageNino42 = "-1";
    }

    var lol = parseInt(parseInt(ageNino12) + parseInt(1));

    var nroPasajeros = parseInt(nroAdultos1) + parseInt(nroAdultos2) + parseInt(nroAdultos3) + parseInt(nroAdultos4) + parseInt(parseInt(ageNino11) + parseInt(1)) + parseInt(parseInt(ageNino12) + parseInt(1)) + parseInt(parseInt(ageNino21) + parseInt(1)) + parseInt(parseInt(ageNino22) + parseInt(1)) + parseInt(parseInt(ageNino31) + parseInt(1)) + parseInt(parseInt(ageNino32) + parseInt(1)) + parseInt(parseInt(ageNino41) + parseInt(1)) + parseInt(parseInt(ageNino42) + parseInt(1));

    /*if (nroPasajeros > 8) {
        msgError = msgError + "El número de pasajeros no debe ser superior a 8. \n";
    }*/

    params = "&destino=" + destino + "&CodCity=" + CodCity + "&fechaSalida=" + fechaSalida + "&fechaLLegada=" + fechaLLegada + "&language=" + language + "&Nationality=" + Nationality + "&Rooms=" + Habitaciones + "&Adul1=" + nroAdultos1 + "&Age11=" + ageNino11 + "&Age12=" + ageNino12 + "&Adul2=" + nroAdultos2 + "&Age21=" + ageNino21 + "&Age22=" + ageNino22 + "&Adul3=" + nroAdultos3 + "&Age31=" + ageNino31 + "&Age32=" + ageNino32 + "&Adul4=" + nroAdultos4 + "&Age41=" + ageNino41 + "&Age42=" + ageNino41 + "&HabsNumber=" + nroHabitaciones + "&TipoPlan=HOT";

    if (msgError.length < 3) {
        var urlComplete = url + params + "#hoteles";
        alert('http://162.248.52.194/worldtours/pagina/'+urlComplete);
    } else {
        HideCortinilla();
        ModalMensaje(msgError);
    }
}

$("#btnBuscarHotel").on("click", function (e) {
    //$("#FormHoteles").validationEngine();
    //if ($('#FormHoteles').validationEngine('validate') == true) {
    e.preventDefault();
    ShowCortinilla();
    clearInterval(intervalo);
    ArmarUrlHoteles();
    //}

});

$(document).ready(function () {
    //CargarCalendarioHotel(null, null, null, null, null);
    //CargarCalendarioHotel(null, null, null, null, null);
    $("#aspnetForm input select").val("");
    $.datepicker.setDefaults($.datepicker.regional['es']);
    //ControlarTipoViaje();
    CargarCalendarioHotel("#txtLlegadaHotel", -1, '+12M', null, 1);
    CargarCalendarioHotel("#txtSalidaHotel", -0, '+12M', cambioFechaSalidaHotel, "0");

    function chargeiii() {
        //debugger;
        var val1 = $("#Selecthotel option:selected").val();
        CambioNroPassengers(val1);
    }

    window.onload = chargeiii;

    $("#Selecthotel").on("change", function () {
        //debugger;
        var val = $("#Selecthotel option:selected").val();
        CambioNroPassengers(val);
    })

    var CodCiudad = new Array();
    // Autocompletar
    $("#txtDestinoHotel").autocomplete({
        source: function (request, response) {
            var CiudadesHoteles = new Array();
            $.ajax({
                url: "http://162.248.52.194/worldtours/pagina/ajax.ashx",
                data: { MethodName: "GetDataHoteles", termHoteles: request.term, limitHoteles: 99 },
                async: false,
                type: "get",
                cache: false,
                success: function (data) {
                    //  console.log(data);
                    //debugger;
                    if (data.length === 0) {
                        CiudadesHoteles[0] = { label: "Sin Resultados", Id: 0 }
                        $(this).val("");
                    }
                    else {
                        CiudadesHoteles[0] = { label: data[0].Ciudad + " (" + data[0].Ciudad + ")" + "- " + data[0].country + "." + data[0].CodCiudad, icon: "ciud" }
                        for (var i = 0; i < data.length ; i++) {
                            CiudadesHoteles[i] = { label: data[i].Ciudad + "- " + data[i].country + "." + data[i].CodCiudad, icon: "ciu" };
                        }
                    }
                },

            });
            response(CiudadesHoteles);
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

    $("#txtDestinoHotel").autocomplete("instance")._renderItem = function (ul, item) {
        //debugger;
        if (item.icon == "ciu") {

            var s = item.label;
            s = s.substring(0, s.indexOf('.'));
            var b = item.label.split('.');
            return $("<li>")
            .append("<span class='ac_aer'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
            .appendTo(ul);
        }
        else {

            var s = item.label;
            s = s.substring(0, s.indexOf('.'));;
            var b = item.label.split('.');
            return $("<li>")
                .append("<span class='ac_ciudHots'> " + __highlight(s, this.term) + "</span><span class='numerillopesado'>." + b[1] + "</span></li>")
                .appendTo(ul);
        }

    };
})