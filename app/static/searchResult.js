function getQueryVariable(nameparemater) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === nameparemater) {
            return pair[1];
        }
    }
    return "";
};

var _nroninios = 0;
var monthNames = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
var urlBaseImagenes = "http://www.ssoftcolombia.com/App_Themes/Imagenes/Airline/";
var parametrosBusqueda;
var DatosSegmentos;
//Parametros de busqueda
if (_edades.length > 0) {
    _nroninios = _edades.split('-').length;
}
var _origen = _origenname.substring(0, 3);
var _destino = _destinoname.substring(0, 3);

function formatCurrency(n, currency) {
    return currency + " " + n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c;
    });
}

function ObtFecha(fecha) {
    var mes = monthNames[fecha.getMonth() + 1];
    var dia = fecha.getDate();
    var year = fecha.getUTCFullYear();
    fecha = mes + "-" + dia + "-" + year;
    return fecha;
}

function ObtTime(fecha) {
    var hora = fecha.getHours();
    var minu = fecha.getMinutes();
   
    if (minu < 10)
       minu = "0" + minu;

    fecha = hora + ":" + minu ;
    return fecha;
}

function ObtTimeDiferencia(fecha) {
    var hora = fecha.getHours();
    var minu = fecha.getMinutes();

    if (minu < 10)
        minu = "0" + minu;

    fecha = hora + ":" + minu;
    return fecha;
}

function ObtTiempoVuelo(tiempo) {
    var horas = Math.floor(parseInt(tiempo) / 60);
    var minu = parseInt(tiempo) % 60;
    tiempo = horas + "H-" + minu + "M";
    return tiempo;
}
function obtParada(paradas) {
    if (paradas == "0")
        paradas = "Directo"
    else
        paradas = paradas + "paradas"
    return paradas;
}
function GraficarFiltroAerolineas(aerolineas) {
    $("#tblFiltroAerolineas").empty();
    var html = "<tr><td><input type=\"checkbox\" name=\"filtroAero\" value=\"todas\"></td><td>Todas</td></tr>";
    for (var i = 0; i < aerolineas.length; i++) {
        html = html + "<tr><td><input type=\"checkbox\" name=\"filtroAero\" value=\"" + aerolineas[i] + "\"></td>" +
            "<td><img src='" + urlBaseImagenes + aerolineas[i] + ".gif'/></td></tr>";
    }

    $("#tblFiltroAerolineas").append(html);
    $("#tblFiltroAerolineas :checkbox").on("change", function (e) {
        var aerolinea = "";
        if ($(this).is(":checked")) {
            aerolinea = $(this).val();
        }
        else {
            aerolinea = "";
        }
        if (aerolinea.length >= 2) {
            _aerolinea = aerolinea;
            if (aerolinea == "todas")
                _aerolinea = "";
            $("#filtros").hide();
            $("#ResumenVuelos").hide();
            SearchData();
        }
    });
}
function ArmarTooltip(detalles) {
    var html = "<table width=100% class=\"tblTooltip\">";
    for (var i = 0; i < detalles.length; i++) {
        var valor = formatCurrency(detalles[i].valor, "$");
        html = html + "<tr><td>" + detalles[i].nombre + "</td><td>" + detalles[i].moneda + "</td><td class=\"valor\"> " + valor + "</td></tr>";
    }
    html = html + "</table>";
    return html;
}

function GraficarPrecios(PrecioTotal, PreciosPasajero,sillas) {
    var precioNino = 0;
    var precioInfante = 0;
    var toolAdultos = ArmarTooltip(PreciosPasajero[0].detalles);
    var toolNinios;
    var toolInf;

    PrecioTotal = formatCurrency(PrecioTotal, "$");
    if (typeof PreciosPasajero[1] !== "undefined") {
        precioNino = PreciosPasajero[1].valor;
        toolNinios = ArmarTooltip(PreciosPasajero[1].detalles);
    }
    if (typeof PreciosPasajero[2] !== "undefined") {
        precioInfante = PreciosPasajero[2].valor;
        toolInf = ArmarTooltip(PreciosPasajero[2].detalles);
    }
    if (sillas > 8)
        sillas = "";
        else
        sillas="Últimos "+sillas+" asientos";

    // ToolTips
    var contenedor = "<div class=\"tarifaVuelo\">" +
                        "<div class=\"vlrDetalle\">" +
                                    "<div class=\"detAdult\">" +
                                        "<span class=\"titulo\">Valor por Adulto</span>" + "</br>" +
                                        "<span class=\"tituloValor\"><a href='#' class='tooltip' title='<b>Detalle Tarifas Adulto</b><br>" + toolAdultos + "'>" + formatCurrency(PreciosPasajero[0].valor, "$") + "</a></span>" +
                                    "</div>" +
                        "</div>";
    if (precioNino > 0) {

        contenedor = contenedor + "<div class=\"vlrDetalle\">" +
                                  "<div class=\"detNino\">" +
                                        "<span class=\"titulo\">Valor por Niño</span>" + "</br>" +
                                        "<span class=\"tituloValor\"><a href='#' class='tooltip' title='<b>Detalle Tarifas Niños</b><br>" + toolNinios + "'>" + formatCurrency(precioNino, "$") + "</a></span>" +
                                  "</div>" +
                                    "</div>";
    }
    if (precioInfante > 0) {
        contenedor = contenedor + "<div class=\"vlrDetalle\">" +
                                        "<div class=\"detInf\">" +
                                            "<span class=\"titulo\">Valor por Infante</span>" + "</br>" +
                                            "<span class=\"tituloValor\"><a href='#' class='tooltip' title='<b>Detalle Tarifas Niños</b><br>" + toolInf + "'>" + formatCurrency(precioInfante, "$") + "</a></span>" +
                                        "</div>" +
                                  "</div>";
    }

    contenedor = contenedor + "<div class=\"vlrTotal\">" +
                            "<span class=\"tituloValor\">Valor total a pagar</span>" + "  " + "<span class=\"tituloValor\">" + PrecioTotal + "</span>" +
                            "<br />" +
                            "<span class=\"txtImpuesto\">Todos los Impuestos Incluidos</span>" +
                        "</div>" +
                        "<div class=\"ContentBoton\">" +
                                  "<div class=\"vlrTotal\">" +
                                        "<button class=\"botonBuscador\">Seleccionar</button>" +
                                  "</div>" +
                                  "<div class=\"sillas\">" + sillas + "</div>" +
                        "</div>" +
                    "</div>";
    return contenedor;
}
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours > 0) {
        return hours + " H :" + minutes + " M ";
    }
    else
        return minutes + " M";

}

function GraficarTrayectoVuelta(trayecto, nro, ciclo) {
    var TotalTrayectos = 0;
    var infoTrayecto = "";
    var nroSegm = trayecto[0].segmentos.length;
    var aeroSalida = trayecto[0].segmentos[0].aeropuertos[0].Codigo + "<span class=\"LabelCity\">" + trayecto[0].segmentos[0].aeropuertos[0].Nombre + "</span>";
    var aeroLlegada = trayecto[0].segmentos[nroSegm - 1].aeropuertos[1].Codigo + "<span class=\"LabelCity\">" + trayecto[0].segmentos[nroSegm - 1].aeropuertos[1].Nombre + "</span>";

    var fechaSalida = new Date(parseInt(trayecto[0].segmentos[0].FechaSalida.substr(6)));
    fechaSalida = ObtFecha(fechaSalida);
    var trayectopint = "<div class=\"detalleVuelta\">" +
                        "<div class=\"LineaSeparadora\"></div>" +
                        "<div class=\"encabezado\">" +
                            "<span class=\"vueltaIcon\"></span>" +
                                "<span class=\"spanMedium\">" + "<span class=\"EspacioTitu\">VUELTA </span>" + aeroSalida + "</span>" +
                                "<span class=\"spanMedium\">" + aeroLlegada + "</span>" +
                                "<span class=\"spanMedium2\ \oculto\">Duración</span>" +
                                "<span class=\"spanMedium2\ \oculto\">Paradas</span>" +
                                "<span class=\"spanMedium1\">" + fechaSalida + "</span>" +
                        "</div>";
    // Pintamos trayectos
    for (var tray = 0; tray < trayecto.length; tray++) {

        var horasalida = new Date(parseInt(trayecto[tray].Trayecto[0].segmentos[0].FechaSalida.substr(6)));
        var horallegada = new Date(parseInt(trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].FechaRegreso.substr(6)));
        var diff = Math.abs(horallegada - horasalida);
        diff = msToTime(diff);
        var tiempo = "0";
        var paradas = trayecto[tray].Trayecto[0].Paradas;
        var aerolinea = trayecto[tray].Trayecto[0].segmentos[0].aerlineamarkcodigo;
        var Nom_aero = trayecto[tray].Trayecto[0].segmentos[0].aerolineaOpera;
        var nrovuelo = trayecto[tray].Trayecto[0].segmentos[0].numeroVuelo
        horasalida = ObtTime(horasalida);
        horallegada = ObtTime(horallegada);
        tiempo = ObtTiempoVuelo(tiempo);
        paradas = obtParada(paradas);

        if (paradas == "Directo") {
            Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
            TotalTrayectos = TotalTrayectos + Tiempo1;
            diff = ObtTiempoVuelo(TotalTrayectos);
        }
        if (paradas != "Directo") {
            if (paradas == "1paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
            if (paradas == "2paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                Tiempo3 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 2].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2 + Tiempo3;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
            if (paradas == "3paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                Tiempo3 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 2].TiempoVuelo
                Tiempo4 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 3].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2 + Tiempo3 + Tiempo4;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
        }

        trayectopint = trayectopint + "<div class=\"item\" id='" + nro + "-" + trayecto[tray].secuencia + "-1-" + ciclo + "'>" +
                         "<input type=\"radio\" name='selVuelta' class='selVuelta' style=\"float: left; margin-right: 84px;margin-left: 8px;height: 13px;\" />" +
                         "<span>Salida " + horasalida + "<span class='LineaVer'>|</span>" + "</span>" +
                         "<span>Llegada: " + horallegada + "</span>" +
                         "<span>" + diff + "</span>" +
                         "<span><a href='#' class='popSegmentos'>" + paradas + "</a></span><span><img src=\"" + urlBaseImagenes + aerolinea + ".gif\" title=\"" + Nom_aero + "\" style=\"border: 0\"></span></div>";
        ciclo = ciclo + 1;
        TotalTrayectos = 0;
    }
    trayectopint = trayectopint + "</div>";

    return trayectopint;
}

function GraficarTrayectoIda(trayecto, nro, ciclo) {
    var TotalTrayectos = 0;
    var infoTrayecto = "";
    var nroSegm = trayecto[0].segmentos.length;
    var aeroSalida = trayecto[0].segmentos[0].aeropuertos[0].Codigo + "<span class=\"LabelCity\">" + trayecto[0].segmentos[0].aeropuertos[0].Nombre + "</span>";
    var aeroLlegada = trayecto[0].segmentos[nroSegm - 1].aeropuertos[1].Codigo + "<span class=\"LabelCity\">" + trayecto[0].segmentos[nroSegm - 1].aeropuertos[1].Nombre + "</span>";

    var fechaSalida = new Date(parseInt(trayecto[0].segmentos[0].FechaSalida.substr(6)));
    fechaSalida = ObtFecha(fechaSalida);
    var trayectopint = "<div class=\"detalleVuelta\">" +
                        "<div class=\"encabezado\">" +
                            "<span class=\"idaIcon\"></span>" +
                            "<span class=\"spanMedium\">" + "<span class=\"EspacioTitu\">IDA </span>" + aeroSalida + "</span>" +
                            "<span class=\"spanMedium\">" + aeroLlegada + "</span>" +
                            "<span class=\"spanMedium2\ \oculto\">Duración</span>" +
                            "<span class=\"spanMedium2\ \oculto\">Paradas</span>" +
                            "<span class=\"spanMedium1\">" + fechaSalida + "</span>" +
                        "</div>";
                            
                       
    // Pintamos trayectos
    for (var tray = 0; tray < trayecto.length; tray++) {
        var horasalida = new Date(parseInt(trayecto[tray].Trayecto[0].segmentos[0].FechaSalida.substr(6)));
        var horallegada = new Date(parseInt(trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].FechaRegreso.substr(6)));
        var diff = Math.abs(horallegada - horasalida);
        diff = msToTime(diff);
        var tiempo = "0";
        var paradas = trayecto[tray].Trayecto[0].Paradas;
        var aerolinea = trayecto[tray].Trayecto[0].segmentos[0].aerlineamarkcodigo;
        var Nom_aero = trayecto[tray].Trayecto[0].segmentos[0].aerolineaOpera;
        var nrovuelo = trayecto[tray].Trayecto[0].segmentos[0].numeroVuelo
        horasalida = ObtTime(horasalida);
        horallegada = ObtTime(horallegada);
        tiempo = ObtTiempoVuelo(tiempo);
        paradas = obtParada(paradas);
        if (paradas == "Directo") {
            Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
            TotalTrayectos = TotalTrayectos + Tiempo1;
            diff = ObtTiempoVuelo(TotalTrayectos);
        }
        if (paradas != "Directo") {
            if (paradas == "1paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
            if (paradas == "2paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                Tiempo3 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 2].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2 + Tiempo3;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
            if (paradas == "3paradas") {
                Tiempo1 = trayecto[tray].Trayecto[0].segmentos[0].TiempoVuelo
                Tiempo2 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 1].TiempoVuelo
                Tiempo3 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 2].TiempoVuelo
                Tiempo4 = trayecto[tray].Trayecto[0].segmentos[trayecto[tray].Trayecto[0].segmentos.length - 3].TiempoVuelo
                TotalTrayectos = TotalTrayectos + Tiempo1 + Tiempo2 + Tiempo3 + Tiempo4;
                diff = ObtTiempoVuelo(TotalTrayectos);
            }
        }
        //trayectopint=trayectopint+"<label>Por ahora estan bien</label>"
        trayectopint = trayectopint + "<div class=\"item\" id='" + nro + "-" + trayecto[tray].secuencia + "-0-" + ciclo + "'>" +
                         "<input type=\"radio\" name='selIda' style=\"float: left; margin-right: 84px;margin-left: 8px;height: 13px;\"  class='selIda'/>" +
                         "<span>Salida " + horasalida + "<span class='LineaVer'>|</span>" + "</span>" +
                         "<span>Llegada: " + horallegada + "</span>" +
                         "<span>" + diff + "</span>" +
                         "<span><a href='#' class='popSegmentos'>" + paradas + "</a></span><span><img src=\"" + urlBaseImagenes + aerolinea + ".gif\" title=\"" + Nom_aero + "\" style=\"border: 0\"></span></div>";
        ciclo = ciclo + 1;
        TotalTrayectos = 0;
    }
    trayectopint = trayectopint + "</div>";

    return trayectopint;
}
function GraficarSegmento(origenDestino, nro, precioTotal, preciosDetalle,sillas) {
    var itemIda = "";
    var itemVuelta = "";
    var arregloIda = new Array();
    var arregloVuelta = new Array();
    for (var origen = 0; origen < origenDestino.length; origen++) {
        if (origenDestino[origen].tipo == "0") {
            arregloIda.push(origenDestino[origen]);
        }
        else {
            arregloVuelta.push(origenDestino[origen]);
        }
    }
    if (arregloIda.length > 0) {
        var ciclo = 0;
        itemIda = GraficarTrayectoIda(arregloIda, nro, ciclo);
    }
    if (arregloVuelta.length > 0) {
        var ciclo = arregloIda.length;
        itemVuelta = GraficarTrayectoVuelta(arregloVuelta, nro, ciclo);
    }
    var contenedor = "<div class=\"contenedorVuelos\">" +
                        "<div class=\"vuelo\">" +
                        "<div class=\"iconOferta\"><img src=\"App_themes/Imagenes/iconOferta.png\"></div>"
    if (itemIda.length > 1) {
        contenedor = contenedor + itemIda;
    }
    if (itemVuelta.length > 1) {
        contenedor = contenedor + itemVuelta;
    }
    contenedor = contenedor + "</div>";
    contenedor = contenedor + GraficarPrecios(precioTotal, preciosDetalle,sillas);
    //contenedor = contenedor + "</div></div><div class='divisorBuscador'>&nbsp;</div>";
    return contenedor;
}
function GraficarVuelos(data) {
    $("#ResultadosVuelos").empty();

    for (var iti = 0; iti < data.length; iti++) {
        var segmento = GraficarSegmento(data[iti].origenDestino, iti, data[iti].PrecioTotal, data[iti].PreciosPorPasajero,data[iti].Sillas);
        $("#ResultadosVuelos").append(segmento);
    }
    $(".tooltip").tooltip({
        content: function () {
            return $(this).prop('title');
        }
    });

}
function GraficarResumenAerolineas(aerolineas, datos) {
    var html = "<tr><th>Aerolinea</th>";
    $("#tablaConsol").empty();
    for (var i = 0; i < aerolineas.length; i++) {
        html = html += "<td><img src='" + urlBaseImagenes + aerolineas[i] + ".gif'/></td>";
    }
    html = html + "</tr><tr><th>Mejor Precio</th>";
    for (var i = 0; i < aerolineas.length; i++) {
        var valor = formatCurrency(datos[i].valor, "$");
        html = html + "<td>" + valor + "</td>";
    }
    html = html + "</tr>";
    $("#tablaConsol").append(html);
}
function SearchData() {
    showloader();
    $.ajax({
        url: "http://162.248.52.194/WorldTours/Pagina/ajax.ashx",
        data: { MethodName: "SearchFlight2", aerolinea: _aerolinea, origen: _origen, destino: _destino, fechaSalida: _fechaSalida, fechaRegreso: _fechaRegreso, nroAdultos: _nroAdultos, nroNinios: _nroninios, nroInfantes: _nroInfantes, edades: _edades },
        async: true,
        cache: false,
        type: "GET",
        success: function (data) {
			debugger;			
            if (data == "0") {
                $("#loader").hide();
                $("#loader").dialog("close");
                $("#noVuelos").show();

            }
            else if (data == "Error") {
                $("#loader").hide();
                $("#loader").dialog("close");
                $("#noVuelos").show();

            }
            else {
                DatosSegmentos = data;
                parametrosBusqueda = data.busqueda;
                GraficarResumenAerolineas(data.aerolineas, data.resumenaerolineas);
                GraficarVuelos(data.itinerarios, data.Nom_Aerolineas);
                GraficarFiltroAerolineas(data.aerolineas);
                $("#filtros").show();
                //$("#rightColumn").show();
                $("#ResumenVuelos").show();
                $("#loader").hide();
                $("#loader").dialog("close");

            }

        },
        error: function () {
            //$("#rightColumn").show();
            $("#noVuelos").show();
            $("#loader").hide();
            $("#loader").dialog("close");
        }

    });
}

function ModalTrayectos(html) {
    $("#modalTrayectoContent").empty();
    $("#modalTrayectoContent").append(html);
    $("#modalTrayecto").dialog({
        modal: true,
        width: 500

    });
    $(".ui-widget-overlay").css("position", "fixed");

}
function GetNameAirport(aeropuerto) {
    $.ajax({
        url: "ajax.ashx",
        data: { MethodName: "GetAirport", Iata: aeropuerto },
        async: true,
        type: "get",
        cache: false,
        dataType: "text",
        success: function (data) {
            //alert(data);
            return data;
        },

    });
}
function SetBoxSearch() {
    $("#origen").val(_origenname);
    $("#destino").val(_destinoname);
    $("#adults").val(_nroAdultos);
    $("#infants").val(_nroInfantes);
    $("#FechaSalida").val(_fechaSalida);
    if (_edades.length > 0) {
        var edadesconsol = _edades.split('-');
        $("#childs").val(edadesconsol.length);
        for (var i = 0; i < edadesconsol.length; i++) {
            $("#edadNinos").append("<br>Años<select class='edadesNinos form-control input-smallv'></select>");
        }
        LlenaredadesNinios();

        $.each($(".edadesNinos"), function (i, val) {
            $(val).val(edadesconsol[i].substring(1));
        });

    }
    if (_fechaRegreso.length > 2) {
        $("#FechaLlegada").val(_fechaRegreso);
    }
    else {
        $("#FechaLlegada").hide();
        $("#modal_vuelos_1").attr("checked", "checked");

    }

}
$("#closeModal").on("click", function () {
    $("#modalTrayecto").dialog("close");
})

function validarSeleccion() {
    var radios = $('input:radio[name=selIda]');
    var formValid = false;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }
    if (!formValid) {
        ModalMensaje("Debes Seleccionar un trayecto de Ida!")
        return false;
    };

    if (_fechaRegreso.length > 2) {
        var radiosV = $('input:radio[name=selVuelta]');
        var formValidV = false;
        var i = 0;
        while (!formValidV && i < radiosV.length) {
            if (radiosV[i].checked) formValidV = true;
            i++;
        }
        if (!formValidV) {
            ModalMensaje("Debes Seleccionar un trayecto de Regreso!")
            return false;
        };
    }
    return true;
}

function SeleccionarTrayecto() {
    var validar = validarSeleccion();
    if (validar) {
        $("#loader").dialog({
            modal: true,
            width: 500
        });
        $(".ui-widget-overlay").css("position", "fixed");

        var ideIda = $('input:radio[name=selIda]:checked').closest('div').attr('id');
        var idIda = ideIda.split('-')[0];
        var secuenciaIda = ideIda.split('-')[3];
        var idVuelta = null;
        var secuenciaVuelta = null;

        if (_fechaRegreso.length > 2) {
            var ideVuelta = $('input:radio[name=selVuelta]:checked').closest('div').attr('id');
            idVuelta = ideVuelta.split('-')[0];
            secuenciaVuelta = ideVuelta.split('-')[3];
        }

        var origenes = new Array();

        var itinerario = DatosSegmentos.itinerarios[idIda];
        if (idVuelta != null && secuenciaVuelta != null) {
            origenes.push(itinerario.origenDestino[secuenciaVuelta]);
        }

        for (var i = 0; i < itinerario.origenDestino.length; i++) {
            console.log(itinerario.origenDestino[i].segmentos[seg]);

            for (var seg = 0; seg < itinerario.origenDestino[i].segmentos.length; seg++) {
                itinerario.origenDestino[i].segmentos[seg].FechaRegreso = new Date(parseInt(itinerario.origenDestino[i].segmentos[seg].FechaRegreso.substr(6)));
                itinerario.origenDestino[i].segmentos[seg].FechaSalida = new Date(parseInt(itinerario.origenDestino[i].segmentos[seg].FechaSalida.substr(6)));

            }
        }

        var data = JSON.stringify(itinerario).replace(/\/Date/g, "\\\/Date").replace(/\)\//g, "\)\\\/");
        var busqueda = JSON.stringify(parametrosBusqueda).replace(/\/Date/g, "\\\/Date").replace(/\)\//g, "\)\\\/");

        if (secuenciaVuelta === null) {
            secuenciaVuelta = 99;
        }
        $.ajax({
            url: "ReservarVuelos",
            data: "{ parametros: " + busqueda + ", itinerarios: " + data + ",secuenciaIda:" + secuenciaIda + ",secuenciaVuelta:" + secuenciaVuelta + "}",
            async: true,
            type: "POST",
            success: function (data) {
                var datos = data.split('\n')[0];
                datos = datos.replace(/\s/g, '');
                if (datos == "True") {
                    window.location = "Ingreso";
                }
                else {
                    $("#loader").hide();
                    $("#loader").dialog("close");
                    ModalMensaje("Los vuelos seleccionados no tienen disponibilidad en este momento intente con otra busqueda.");

                }

            },

        });


    }

}

function showloader() {
    var begin = new Date();
    $("#loader").dialog({
        modal: true,
        width: 500,
        draggable: false,
        resizable: false,
        open: function () {
            var end = new Date();
            return false;
        }
    });
    $(".ui-widget-overlay").css("position", "fixed");

}

$(document).on('click', '.botonBuscador', function (e) {
   // e.preventDefault();

    SeleccionarTrayecto();
    return false;
});

$(document).on('click', '.popSegmentos', function (e) {
    e.preventDefault();
    var TotalTiempo = 0;

    var ide = $(this).closest('div').attr('id');
    var id = ide.split('-')[0];
    var secuencia = ide.split('-')[2];
    var tipo = ide.split('-')[3];
    var html = "<div class='encabezadoModal'><h4><b>Detalles del vuelo</b></h4></div>";
    var trayecto = DatosSegmentos.itinerarios[id].origenDestino[tipo];
    for (var i = 0; i < trayecto.segmentos.length; i++) {

        var Tiempo = trayecto.segmentos[i].TiempoVuelo
        var TotalTiempo = TotalTiempo + Tiempo;
        Tiempo = ObtTiempoVuelo(Tiempo);

        var fechaSalida = ObtFecha(new Date(parseInt(trayecto.segmentos[i].FechaSalida.substr(6))));
        var HoraSalida = ObtTime(new Date(parseInt(trayecto.segmentos[i].FechaSalida.substr(6))));
        var fechaRegreso = ObtFecha(new Date(parseInt(trayecto.segmentos[i].FechaRegreso.substr(6))));
        var HoraRegreso = ObtTime(new Date(parseInt(trayecto.segmentos[i].FechaRegreso.substr(6))));

        html = html + "<div class='contenedorModal'><img src='" + urlBaseImagenes + trayecto.segmentos[i].aerlineamarkcodigo + ".gif'/>- Vuelo Nro:" + trayecto.segmentos[i].numeroVuelo + "<br>Tiempo de vuelo:<b>" + Tiempo + "</b><br><br><table width='90%'><tr>" +
            "<td>Sale de :<b>" + trayecto.segmentos[i].aeropuertos[0].Codigo + " " + trayecto.segmentos[i].aeropuertos[0].Nombre + "</b></td><td>" + fechaSalida + " | " + HoraSalida + "</td></tr><tr>" +
            "<td>Llega de :<b>" + trayecto.segmentos[i].aeropuertos[1].Codigo + " " + trayecto.segmentos[i].aeropuertos[1].Nombre + "</b></td><td>" + fechaRegreso + " | " + HoraRegreso + "</td</tr></table><br>" +
            "</div><br><div class='encabezadoModal'>Tiempo de espera </div>";

    }
    ModalTrayectos(html);
});

//$(document).ready(function () {
    //$("#noVuelos").hide();
    //$("#filtros").hide();
    //SetBoxSearch();
    //$(".tooltip").tooltip({
    //    content: function () {
    //        return $(this).prop('title');
    //    }
    //});
    //
    //$("#ResumenVuelos").hide();


//    SearchData();


    function ValidarSegmentos(parametros, itinerarios) {
        $.ajax({
            url: "ajax.ashx",
            data: { MethodName: "validarSegmentos", parametros: "" + parametros + "", itinerarios: "" + itinerarios + "" },
            async: false,
            type: "post",
            cache: false,
            success: function (data) {

            },

        });
    }
//})
