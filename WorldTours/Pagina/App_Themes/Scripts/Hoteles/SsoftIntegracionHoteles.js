/// <reference path="FuncionesGenerales.js" />

var GlobalCounter = 0;
var RoomCode = "";
var intervalo;
var Latitude;
var Longitude;
var MinPrice = 120;
var MaxPrice = 1500;
var ParentSelected = "";
var selectedToggle = "";
var ToggleIdSelected = "";
var MinSortVar = 1;
var MaxSortVar = 30;
var checkHotelsSplit = "";
var IntervalSort = "";//setInterval('SortLowPrice()', 3000);
var CounterInterval = 0;
var sortpriceGlobalCheck = 0;
var sortStarsGlobalCheck = 0;
var sortHotelGlobalCheck = 0;
var MinStarsFilter = 1;
var MaxStarsFilter = 5;

var urlLocation = location.protocol + '//' + location.host + '/worldtours/pagina';
//var urlLocation = location.protocol + '//' + location.host + '/UgaTurismo';

$(document).ready(function () {
    $(".FieldSelectMenor").on("change", function () {
        // 
        var val = $(".FieldSelectMenor option:selected").val();
        var valid = $('.FormReserva').attr('id');
        if (val == 1) {
            AdjuntarMenorField(valid);
        }
    });
    //SearchHotelsBus();
});

function SearchHotelsBus() {
    // debugger
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/SearchHotelsBus",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        success: function (data) {
            //  
            if (data != "" && data != null) {
                intervalo = setInterval('traerOrdenes()', 5000);
            }
        },
        error: function (xhr, status) {
            procesaError(xhr, status);
        }
    });
}

function FillSearcher() {
    //debugger;
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var Destino = vars[1];
    Destino = Destino.substring(Destino.indexOf("=") + 1);
    Destino = Destino.replace(/%20/g, " ");
    var CheckIn = vars[3];
    CheckIn = CheckIn.substring(CheckIn.indexOf("=") + 1);
    var CheckOut = vars[4];
    CheckOut = CheckOut.substring(CheckOut.indexOf("=") + 1);
    $('#txtDestinoHotel').val(Destino);
    $('#txtSalidaHotel').val(CheckIn);
    $('#txtLlegadaHotel').val(CheckOut);
    //fill ocuppancy
    var habs = parseInt(location.search.split('HabsNumber=')[1]);
    $('#Selecthotel').val(habs);
    return CheckIn;
}

function PriceBar() {

    //$('#FilterBarContainer').append(barre);
}

$(function (e) {
    // Invocar al momento de Buscar Hoteles
    EraseandDelete();
    ShowCortinilla();

    intervalo = setInterval('traerOrdenes(' + e + ')', 3000);
    //Llenar según zonas, aplicable por el momento para hotelbeds
    // 
    var datasended = getQueryVariable("CodCity");

    RaiseHotelsZones(datasended);

    RaiseHotelsCadenas(datasended);

    //$('input[class=inputSelectHotelRes]').change(function () {

    $('#SltZonesFilter').on('change', function () {
        //alert(this.value); // or $(this).val()
        ShowCortinilla();

        ZonesHotelsFilter();
    });

    $('input[name=chkFeed]').change(function () {
        ShowCortinilla();
        var type = $('input[name=chkFeed]');
        var selected = $(this).val();
        debugger;
        switch (selected) {
            case "RO":
                FilterxFeedOnlyOneType(selected);
                break;
            case "BF":
                SetArrayFilterFeed(type);
                break;
            case "AI":
                FilterxFeedOnlyOneType(selected);
                break;
            case "HB":
                FilterxFeedOnlyOneType(selected);
                break;
            case "FB":
                FilterxFeedOnlyOneType(selected);
                break;
            case "BB":
                FilterxFeedOnlyOneType(selected);
                //$(this).attr('checked', false);
                break;
            case "CB":
                FilterxFeedOnlyOneType(selected);
                //$(this).attr('checked', false);
                break;
        }
    });
    /*$('#SltCadenaFilter').on('change', function () {
        //alert(this.value); // or $(this).val()
        ZonesHotelsCadena();
    });*/
    $('#btnResults').click(function () {
        traerOrdenes();
    });

    $('#SortPrice').click(function () {
        debugger;
        ShowCortinilla();
        $('.ArrowSort').css({ "color": '#aaaaaa', "font-size": "15px" });
        $('.sltSortSupHotels').css({ "border-top": '3px solid #fcd514' });
        var id = $(this)[0].id;
        //var parent = $(this)[0];
        $('#' + id + " .lblSortSupNew").css({ "color": '#3E3E3E' });
        $('#' + id).css({ "border-top": '3px solid #2E3192' });
        if (sortpriceGlobalCheck === 0) {
            $('#arrowUpPrice').css({ "color": "#FF0025", "font-size": "17px" });
            $('#arrowDownPrice').css({ "color": '#aaaaaa', "font-size": "15px" });
            sortSelect(1);
            sortpriceGlobalCheck = 1;
        } else {
            $('#arrowUpPrice').css({ "color": '#aaaaaa', "font-size": "15px" });
            $('#arrowDownPrice').css({ "color": "#FF0025", "font-size": "17px" });
            sortSelect(2);
            sortpriceGlobalCheck = 0;
        }
    });


    $('#SortStars').click(function () {
        debugger;
        ShowCortinilla();
        $('.ArrowSort').css({ "color": '#aaaaaa', "font-size": "15px" });
        $('.sltSortSupHotels').css({ "border-top": '3px solid #fcd514' });
        var id = $(this)[0].id;
        //var parent = $(this)[0];
        $('#' + id + " .lblSortSupNew").css({ "color": '#3E3E3E' });
        $('#' + id).css({ "border-top": '3px solid #2E3192' });
        if (sortStarsGlobalCheck === 0) {
            $('#arrowUpStar').css({ "color": "#FF0025", "font-size": "17px" });
            $('#arrowDownStar').css({ "color": '#aaaaaa', "font-size": "15px" });
            sortSelect(3);
            sortStarsGlobalCheck = 1;
        } else {
            $('#arrowUpStar').css({ "color": '#aaaaaa', "font-size": "15px" });
            $('#arrowDownStar').css({ "color": "#FF0025", "font-size": "17px" });
            sortSelect(4);
            sortStarsGlobalCheck = 0;
        }
    });

    $('#SortHotel').click(function () {
        debugger;
        ShowCortinilla();
        $('.ArrowSort').css({ "color": '#aaaaaa', "font-size": "15px" });
        $('.sltSortSupHotels').css({ "border-top": '3px solid #fcd514' });

        var id = $(this)[0].id;
        //var parent = $(this)[0];
        $('#' + id + " .lblSortSupNew").css({ "color": '#3E3E3E' });
        $('#' + id).css({ "border-top": '3px solid #2E3192' });
        if (sortHotelGlobalCheck === 0) {
            $('#arrowUpHotel').css({ "color": "#FF0025", "font-size": "17px" });
            $('#arrowDownHotel').css({ "color": '#aaaaaa', "font-size": "15px" });
            sortSelect(5);
            sortHotelGlobalCheck = 1;
        } else {
            $('#arrowUpHotel').css({ "color": '#aaaaaa', "font-size": "15px" });
            $('#arrowDownHotel').css({ "color": "#FF0025", "font-size": "17px" });
            sortSelect(6);
            sortHotelGlobalCheck = 0;
        }
    });
});

function chkGenGroupRBH(data) {
    debugger;
    var selected = data.name;
    if (checkHotelsSplit === "") {
        checkHotelsSplit = data.name;
    }
    else if (selected === checkHotelsSplit) {
        return false;
    } else {
        $('input[name=' + checkHotelsSplit + ' ]').prop('checked', false);
        checkHotelsSplit = selected;
    }
}

function SetArrayFilterFeed(type) {
    var arr = [];
    var counter = 0;
    var buscado = "";
    for (var i = 0; i < type.length; i++) {
        if (!type[i].checked) {
            arr[counter] = type[i].defaultValue;
            counter++;
        } else {

        }
    }
    FilterxFeed(arr);
}

function FilterxFeed(arr) {
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterFeedHotel",
        data: JSON.stringify({ arr: arr }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);

            } else {
                $('.fondillocortinilla').hide();
                $('.CTNImg').hide();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            $('.fondillocortinilla').hide();
            $('.CTNImg').hide();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function FilterxFeedOnlyOneType(buscado) {
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterFeedHotelBreakfast",
        data: JSON.stringify({ Valor: buscado }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);

            } else {
                $('.fondillocortinilla').hide();
                $('.CTNImg').hide();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            $('.fondillocortinilla').hide();
            $('.CTNImg').hide();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function RaiseHotelsZones(datasended) {
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/GetHotelZoneList",
        data: JSON.stringify({ SearchZone: datasended }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        success: function (data) {
            //alert("Funciona");
            //$('.fondillocortinilla').hide();
            procesaZonas(data);
        },
        error: function (xhr, status) {
            procesaError(xhr, status);
        }
    });
}

function RaiseHotelsCadenas(datasended) {
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/GetHotelCadenas",
        data: JSON.stringify({ SearchZone: datasended }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        success: function (data) {
            //alert("Funciona");
            //$('.fondillocortinilla').hide();
            procesaCadenas(data);
        },
        error: function (xhr, status) {
            procesaError(xhr, status);
        }
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    //alert('Query Variable ' + variable + ' not found');
}

function HideCortinilla() {
    $('.fondillocortinilla').hide();
    $('.CTNImg').hide();
}

function ShowCortinilla() {
    $('.fondillocortinilla').show();
    $('.CTNImg').show();
}

function traerOrdenes(ev) {
    //FillSearcher();
    if (ev === "FILTER") {
        $.ajax({
            type: "POST",
            url: "Presentacion/NewHotels.aspx/GetHotelList",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "json",
            async: true,
            success: function (data) {
                //alert("Funciona");
                // 
                if (data.d.length > 0 || data.length > 0) {
                    //procesaResultado(data, true);
                    //HideCortinilla()
                    //HideCortinilla();
                    try {
                        HabilitarHotelsTab();
                    } catch (e) {
                    }

                }
            },
            error: function (xhr, status) {
                procesaError(xhr, status);
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "Presentacion/NewHotels.aspx/GetHotelList",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "json",
            //async: true,
            success: function (data) {
                //alert("Funciona");
                // 
                if (data.d.length > 0 || data.length > 0) {
                    procesaResultado(data, true);
                    HideCortinilla();
                    //HideCortinilla();
                    try {
                        HabilitarHotelsTab();
                    } catch (e) {
                    }

                }
            },
            error: function (xhr, status) {
                procesaError(xhr, status);
            }
        });
    }
}

function FunctFilterName() {
    ShowCortinilla();
    clearInterval(intervalo);
    if ($('#Hoteles').length > 0) {
        if ($('#txtFilterHotelsid').val().length == 0 || $('#txtFilterHotelsid').val().length > 2) {
            ShowCortinilla();
            //EraseandDelete();
            NameHotelsFilter();
        }
    }
}

function FunctFilterHotelId() {
    ShowCortinilla();
    clearInterval(intervalo);
    if ($('#Hoteles').length > 0) {
        if ($('#txtidHotel').val().length == 0 || $('#txtidHotel').val().length > 2) {
            ShowCortinilla();

            //EraseandDelete();
            IdHotelsFilter();
        }
    }
}

function FunctFilterNameRoomId() {
    ShowCortinilla();
    clearInterval(intervalo);
    if ($('#Hoteles').length > 0) {
        if ($('#txtidRoom').val().length == 0 || $('#txtidRoom').val().length > 2) {
            ShowCortinilla();

            //EraseandDelete();
            IdRoomsFilter();
        }
    }
}

function FilterStarsFun(dataval) {
    // 
    ShowCortinilla();
    clearInterval(intervalo);
    EraseandDelete();
    var selectvalue = $('input[name="FilterStarsHotels"]:checked').val();
    //EraseandDelete();
    StarsTTFilter(selectvalue);
}

function validatenumbersFilter(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function NameHotelsFilter() {
    // 
    var searchdata = $('#txtFilterHotelsid').val();
    clearInterval(intervalo);
    $('#txtFilterHotelsid').val("");
    $('#txtFilterHotelsid').attr('value', '');
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterHotelList",
        data: JSON.stringify({ SearchString: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function IdHotelsFilter() {
    // 
    var searchdata = $('#txtidHotel').val();
    $('#txtidRoom').val("");
    $('#txtidRoom').attr('value', '');
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterHotelId",
        data: JSON.stringify({ id: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function IdRoomsFilter() {
    // 
    var searchdata = $('#txtidRoom').val();
    $('#txtidRoom').val("");
    $('#txtidRoom').attr('value', '');
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterRoomId",
        data: JSON.stringify({ id: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function ZonesHotelsFilter() {
    // 
    var searchdata = $('#SltZonesFilter').val();
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterHotelZone",
        data: JSON.stringify({ SearchString: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function ZonesHotelsCadena() {
    // 
    var searchdata = $('#SltCadenaFilter').val();
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterHotelChain",
        data: JSON.stringify({ SearchString: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function StarsTTFilter(starsN) {
    // 
    var searchdata = parseInt(starsN);
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/FilterStarsHotelList",
        data: JSON.stringify({ SearchString: searchdata }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            var resul = data.d;
            if (resul != null && resul.length > 0 && resul != "") {
                procesaResultadoFiltro(data);
                HideCortinilla();
            } else {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
            }
        },
        error: function (xhr, status) {
            HideCortinilla();
            var msgError = "No hay resultados para su búsqueda";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });
}

function FilterxPrice() {
    ShowCortinilla();
    clearInterval(intervalo);
    debugger;
    var minimo = $('#TxtMinPriceHotels').val();
    while (minimo.toString().charAt(0) === '0')
        minimo = minimo.substr(1);
    var maximo = $('#TxtMaxPriceHotels').val();
    while (maximo.toString().charAt(0) === '0')
        maximo = maximo.substr(1);

    if (minimo <= 0 || minimo === "" || minimo === null || maximo <= 0 || maximo === "" || maximo === null) {
        var msgError = "Ingrese un valor superior a 0";
        HideCortinilla();
        $('#TxtMinPriceHotels').val("");
        $('#TxtMaxPriceHotels').val("");
        ModalMensaje(msgError);
        return false;
    }

    if (maximo < minimo) {
        var msgError = "El valor minimo es mayor que el maximo";
        HideCortinilla();
        $('#TxtMinPriceHotels').val("");
        $('#TxtMaxPriceHotels').val("");
        ModalMensaje(msgError);
    }
    else {
        $.ajax({
            type: "POST",
            url: "Presentacion/NewHotels.aspx/FilterPriceHotelList",
            data: JSON.stringify({ minimo: minimo, maximo: maximo }),
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "json",
            async: true,
            success: function (data) {
                var resul = data.d;
                if (resul != null && resul.length > 0 && resul != "") {
                    procesaResultadoFiltro(data);
                    HideCortinilla();
                } else {
                    HideCortinilla();
                    var msgError = "No hay resultados para su búsqueda";
                    ModalMensaje(msgError);
                }
            },
            error: function (xhr, status) {
                HideCortinilla();
                var msgError = "No hay resultados para su búsqueda";
                ModalMensaje(msgError);
                procesaError(xhr, status);
            }
        });
    }
}

function procesaResultado(data, Status) {
    var result = "";
    if (Status) {
        result = data.d;
    } else {
        result = data;
    }
    var TotalHabs = parseInt(location.search.split('HabsNumber=')[1]);
    var div = '';
    //debugger;
    $.each(result, function (i, d) {
        //debugger;
        GlobalCounter++;
        var MinPrice = 0;
        var price = 0;
        var hotelExist = [];
        var BoolHotel = 0;
        var estrellasValor = parseInt(d.StarsNumber);
        if (estrellasValor > 5) {
            estrellasValor = String(estrellasValor).charAt(0);
            estrellasValor = parseInt(estrellasValor);
        }
        var estrellas = "";
        var urlEstrellas = urlLocation + "/App_Themes/Imagenes/starHotel.png";
        var intstars = 1;
        for (var j = 0; j < estrellasValor; j++) {
            estrellas = estrellas + "<img src=\"" + urlEstrellas + "\">" + " ";
            intstars++;
            if (intstars > 5) {
                break;
            }
        }
        var IdHotel = d.IdHotel;
        var ProviderHotel = d.ProviderCode;
        var providerCoder = "";
        if (d.ProviderCode == "1") {
            providerCoder = "1";
        }
        else if (d.ProviderCode == "2") {
            providerCoder = "2";
        }
        else if (d.ProviderCode == "5") {
            providerCoder = "5";
        }
        else if (d.ProviderCode == "4") {
            providerCoder = "4";
        }
        else {
            providerCoder = "Otro Proveedor";
        }

        var imgHotel = null;

        if (d.UrlImage != null && d.UrlImage != "" && providerCoder == "2") {
            imgHotel = d.UrlImage;
            imgHotel = imgHotel.replace('small/', '');

        }
        else if (d.UrlImage != null && d.UrlImage != "" && providerCoder == "4") {
            imgHotel = d.UrlImage;
            imgHotel = imgHotel.replace('/100x100/', '/200x200/');

        }
        else {
            imgHotel = urlLocation + "/app_themes/imagenes/BackPict.png";
        }
        var HabitacionesGen = " ";
        for (var l = 1; l <= TotalHabs; l++) {
            HabitacionesGen = HabitacionesGen + '<div class="GenHabsGens Habitacion' + l + '">'
                + "<div class='TituloHabs'><label>Habitacion " + l + "</label></div>"
                + "<div class=\"EncabezadoDatosResultados\">"
            + "<div class=\"Encabezado1DatRes\">" + "Tipo de habitación" + "</div>"
            + "<div class=\"Encabezado2DatRes\">" + "Moneda" + "</div>"
            + "<div class=\"Encabezado3DatRes\">" + "Tarifa total" + "</div>"
            + '</div>'
            + '</div>';
        }
        // 

        var lati = IsNullOrEmpty(d.Latitude) ? d.Latitude : "null";
        var longi = IsNullOrEmpty(d.Longitude) ? d.Longitude : "null";
        //debugger;
        var ZoneName = d.ZoneName;
        if (d.ZoneName != null && d.ZoneName != "") {
            ZoneName = d.ZoneName;
        } else {
            ZoneName = "";
        }

        if (d.ProviderCode != "5") {
            var DivGenRes = "<div id=\"DivGenRes" + GlobalCounter + "\" class=\"HotelesResultadosindividual\">"
                + "<div class=\"Imageshot\" style='cursor:pointer;'>" + "<img src=\"" + imgHotel + "\" onclick=\"SetDetalleHotel(" + IdHotel + ", " + ProviderHotel + ", " + lati + ", " + longi + ")\">" + "</div>"
                + "<div class=\"HotelsDescr\">"
                + "<div class=\"StarsHotel\">" + "<span>" + estrellas + "</span>" + "</div>"
                + "<div class=\"NameHotel\">" + "<span>" + d.HotelName + "</span>" + "</div>"
                + "<div class=\"PrecioMin\"></div>"
                + "<div class='ZoneName'>" + ZoneName + "</div>"
                + '<div class="Proveedor"><label>' + providerCoder + '</label></div>'
                + "<div class=\"VerMasTarifas\"><button id='btnVerMasTarifas" + GlobalCounter + "' class='btnmastarifas' onclick='ToggleTarifas(DivGenRes" + GlobalCounter + "); return false;' >" + "Seleccionar</button>" + "</div>"
                + "<div class=\"VerMasHots\"><input type=\"submit\" class=\"BotonVerMasHots\" id=\"BotHotDet" + GlobalCounter + "\" text=\"Ver más\" value=\"Ver más\"  onclick=\"SetDetalleHotel(" + IdHotel + ", " + ProviderHotel + ", " + lati + ", " + longi + ")\" >"
                + "</input></div>"
                + "</div>"
                + "<div class=\"DatosHabitacion\">"
                + HabitacionesGen
                + "</div>"
                + "</div>"
                + "</div>";
            $('#Hoteles').append(DivGenRes);
        } else {
            var DivGenRes = "<div id=\"DivGenRes" + GlobalCounter + "\" class=\"HotelesResultadosindividual\">"
                + "<div class=\"Imageshot\">" + "<img src=\"" + imgHotel + "\">" + "</div>"
                + "<div class=\"HotelsDescr\">"
                + "<div class=\"StarsHotel\">" + "<span>" + estrellas + "</span>" + "</div>"
                + "<div class=\"NameHotel\">" + "<span>" + d.HotelName + "</span>" + "</div>"
                + "<div class=\"PrecioMin\"></div>"
                + '<div class="Proveedor"><label>' + providerCoder + '</label></div>'
                //+ '<div class="RateName"><label>' + ratename + '</label></div>'
                //+ "<div class=\"VerMasHots\"><input type=\"submit\" class=\"BotonVerMasHots\" id=\"BotHotDet" + GlobalCounter + "\ text=\"VER DETALLES\" value=\"VER DETALLES\"  onclick=\"SetDetalleHotel(" + IdHotel + ", " + ProviderHotel + ", " + lati + ", " + longi + ")\" >"
                //+ "</input></div>"
                + "<div class=\"VerMasTarifas\"><button id='btnVerMasTarifas" + GlobalCounter + "' class='btnmastarifas' onclick='ToggleTarifas(DivGenRes" + GlobalCounter + "); return false;' >" + "Seleccionar</button>" + "</div>"
                + "</div>"
                + "<div class=\"DatosHabitacion\" id='DatosHab" + GlobalCounter + "'>"
                + HabitacionesGen
                + "</div>"
                + "</div>"
                + "</div>";
            $('#Hoteles').append(DivGenRes);
        }
        if (d.ProviderCode == 5 || d.ProviderCode == 4) {
            $('#BotHotDet' + GlobalCounter).css({
                'display': 'none !important'
            })
        }
        for (var k = 0; k < d.Rooms.length; k++) {
            //debugger;
            RoomCode = "";
            var RoomName = "";

            RoomName = IsNullOrEmpty(d.Rooms[k].Characteristicname) ? d.Rooms[k].Characteristicname : d.Rooms[k].Name;
            ///
            RoomCode = IsNullOrEmpty(d.ContractIncomingOffice) ? RoomCode + d.ContractIncomingOffice + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.ContractName) ? RoomCode + d.ContractName + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.CurrencyCode) ? RoomCode + d.CurrencyCode + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.DestinationCode) ? RoomCode + d.DestinationCode + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.DestinationType) ? RoomCode + d.DestinationType + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.IdHotel) ? RoomCode + d.IdHotel + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.HotelName) ? RoomCode + d.HotelName + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.ProviderCode) ? RoomCode + d.ProviderCode + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].AvailCount) ? RoomCode + d.Rooms[k].AvailCount + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Characteristic) ? RoomCode + d.Rooms[k].Characteristic + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Characteristicname) ? RoomCode + d.Rooms[k].Characteristicname + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Name) ? RoomCode + d.Rooms[k].Name + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].OnRequest) ? RoomCode + d.Rooms[k].OnRequest + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].RoomCode) ? RoomCode + d.Rooms[k].RoomCode + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].RoomMealPlanCode) ? RoomCode + d.Rooms[k].RoomMealPlanCode + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].RoomType) ? RoomCode + d.Rooms[k].RoomType + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].ShortName) ? RoomCode + d.Rooms[k].ShortName + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Shrui) ? RoomCode + d.Rooms[k].Shrui + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].RateType) ? RoomCode + d.Rooms[k].RateType + "#!%" : RoomCode + "NOR#!%";

            var breakfast = "";

            if (d.Rooms[k].ShortName != "RO") {

                if (d.Rooms[k].ShortName === "AI") {
                    breakfast = urlLocation + "/App_Themes/Imagenes/AI.png";
                } else {
                    breakfast = urlLocation + "/App_Themes/Imagenes/Feed.png";
                }

            } else {
                breakfast = urlLocation + "/App_Themes/Imagenes/FeedEmpty.png";
            }
            // 
            var PrecioConpuntillos = commaSeparateNumber(Math.round(d.Rooms[k].Value));

            RoomCode = RoomCode + PrecioConpuntillos + "#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Tariff) ? RoomCode + d.Rooms[k].Tariff + "#!%" : RoomCode + "null#!%";
            RoomCode = IsNullOrEmpty(d.Rooms[k].Bedding) ? RoomCode + d.Rooms[k].Bedding : RoomCode + "null";

            var NumberHabPerRoom = parseInt(d.Rooms[k].RoomsDetail.RoomNumber);

            var ratetypeImg = "";
            var ratetypeDes = "";
            if (d.Rooms[k].RateType != null && d.Rooms[k].RateType != "" && d.Rooms[k].RateType != "N/A") {
                if (d.Rooms[k].RateType != "NOR") {
                    if (d.Rooms[k].RateName === "Special Offer") {
                        ratetypeImg = urlLocation + "/app_themes/imagenes/SPE.png";
                        if (d.Rooms[k].RateName != "" && d.Rooms[k].RateName != null) {
                            ratetypeDes = LanguageParameters(d.Rooms[k].RateName, "Stay");
                        }

                    } else {
                        ratetypeImg = urlLocation + "/app_themes/imagenes/NRF.png";
                        if (d.Rooms[k].RateName != "" && d.Rooms[k].RateName != null) {
                            ratetypeDes = LanguageParameters(d.Rooms[k].RateName, "Stay");
                        }
                    }
                }
                else {
                    ratetypeImg = urlLocation + "/app_themes/imagenes/FeedEmpty.png";
                    if (d.Rooms[k].RateName != "" && d.Rooms[k].RateName != null) {
                        ratetypeDes = LanguageParameters(d.Rooms[k].RateName, "Stay");
                    }
                }
            } else {
                ratetypeImg = urlLocation + "/app_themes/imagenes/FeedEmpty.png";
                if (d.Rooms[k].RateName != "" && d.Rooms[k].RateName != null) {
                    ratetypeDes = LanguageParameters(d.Rooms[k].RateName, "Stay");
                }
            }

            //debugger;
            var typeBreakfast = LanguageParameters(d.Rooms[k].Name, "Feed");

            if (d.ProviderCode === 4) {
                if (d.Rooms[k].BoardBases != "" && d.Rooms[k].BoardBases != null && d.Rooms[k].BoardBases.length > 0) {
                    /*if (d.Rooms[k].ShortName == "RO") {
                        if (d.Rooms[k].BoardBases[0].BbPrice == "0") {
                            debugger;
                            typeBreakfast = d.Rooms[k].BoardBases[0].BbName;
                            breakfast = urlLocation + "/App_Themes/Imagenes/Feed.png";
                        }
                    }*/ if (d.Rooms[k].BoardBases[0].BbPrice != "0" && d.Rooms[k].BoardBases[0].BbPrice != "0.00") {
                        typeBreakfast = "Solo Habitación";
                        breakfast = urlLocation + "/App_Themes/Imagenes/FeedEmpty.png";
                    }
                }
            }

            var AdviceImg = urlLocation + "/app_themes/imagenes/FeedEmpty.png";
            var AdviceText = "";
            var auxCount = "";

            if (d.ProviderCode === 4) {
                AdviceImg = urlLocation + "/app_themes/imagenes/Advice.png";
                auxCount = d.Rooms[k].AvailCount.split(",");
                var AdviceText = "Pasajeros: " + auxCount[0] + " - Camas: " + auxCount[1];
            }

            else if (d.ProviderCode === 2) {
                AdviceImg = urlLocation + "/app_themes/imagenes/Advice.png";
                auxCount = d.Rooms[k].AvailCount;
                passCount = parseInt(d.Rooms[k].RoomsDetail.RoomOccupancy.AdultCount) + parseInt(d.Rooms[k].RoomsDetail.RoomOccupancy.ChildCount);
                if (auxCount > passCount) {
                    auxCount = passCount;
                }
                var AdviceText = "Pasajeros: " + passCount + " - Camas: " + auxCount;
            }

            var datosxHabitacion = "<div class=\"rowHotelsData\">"
                                + "<div class=\"rowHotelsNameHotel\">" + RoomName + "</div>"
                                + '<div class="containerGenBreak">'
                                + '<div class="BreakfastImg">' + '<img src="' + breakfast + '"/>' + '</div>'
                                + '<label class="toolTipBreakfastRoom">' + typeBreakfast + '</label>'
                                + '</div>'
                                //+ '<div class="RateTypeImg">' + ratetype + '</div>'
                                //+ '<div class="RatemealPlanCode">' + d.Rooms[k].RoomMealPlanCode + '</div>'
                                + '<div class="containerGenType">'
                                + '<div class="RateTypeImg">' + '<img src="' + ratetypeImg + '"/>' + '</div>'
                                + '<label class="toolTipRateRoom">' + ratetypeDes + '</label>'
                                + '</div>'
                                + "<div class=\"rowHotelsCurrencyHotel\">" + d.Rooms[k].Currency + "</div>"
                                + "<div class=\"rowHotelsPriceHotel\">" + PrecioConpuntillos + "</div>"
                                + '<div class="containerAdvice">'
                                + '<div class="AdviceImg">' + '<img src="' + AdviceImg + '"/>' + '</div>'
                                + '<label class="toolTipAdvice">' + AdviceText + '</label>'
                                + '</div>'
                                + "<input id=\"SelectInput" + GlobalCounter + i + "\" name='selectinput" + GlobalCounter + NumberHabPerRoom + "'  GroupName='Grprdbtn" + GlobalCounter + NumberHabPerRoom + "' class=\"inputSelectHotelRes\" type=\"Radio\" value=\"" + RoomCode + "\" AutoPostBack=\"true\" onclick='chkGenGroupRBH(this);' ></input>"
                                + "</div>";
            $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion .Habitacion' + NumberHabPerRoom).append(datosxHabitacion);

            var pricelabeltext = "";
            pricelabeltext = $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion .Habitacion' + NumberHabPerRoom + ' .containerGenType .toolTipRateRoom').text();

            if (pricelabeltext === "Online Price" || pricelabeltext === "Por Definir" || pricelabeltext === "" || pricelabeltext === null) {
                $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion .Habitacion' + NumberHabPerRoom + ' .containerGenType label').attr("style", "display: none !important");
            }
            var Feedlabeltext = "";
            Feedlabeltext = $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion .Habitacion' + NumberHabPerRoom + ' .toolTipBreakfastRoom').text();
            if (Feedlabeltext === "ROOM ONLY" || Feedlabeltext === "" || Feedlabeltext === null) {
                $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion .Habitacion' + NumberHabPerRoom + ' .toolTipBreakfastRoom, .toolTipRateRoom').attr("style", "display: none !important");
            }

            Price = Math.round(d.Rooms[k].Value);
            if (k == 0) {
                MinPrice = Math.round(d.Rooms[k].Value);
                MinPrice = commaSeparateNumber(MinPrice);
            }
            if (Math.round(d.Rooms[k].Value) <= MinPrice) {
                MinPrice = Math.round(d.Rooms[k].Value);
                MinPrice = commaSeparateNumber(MinPrice);
            }
        }

        var MinPriceDiv = "<div class=\"MinPriceNew\">" + "<span>  Tarifa por habitación más económica </span> <span class=\"precioMinimo\">" + commaSeparateNumber(d.PrecioMenor) + " " + d.CurrencyCode + "</span></div>";
        $('#DivGenRes' + GlobalCounter + " .HotelsDescr .PrecioMin").append(MinPriceDiv);

        //var ButRes = "<input id=\"BotRes" + GlobalCounter + "\" class=\"BotResHotelRes link-button white\" type=\"Submit\" text =\"Reservar\" value=\"Reservar\" onclick='SetReservaHotel(this)' </input>";
        //$('#DivGenRes' + GlobalCounter).append(ButRes);
        //debugger;
        var NombreButton = "";
        var diferVueloHotel = location.search.split('Diferencial')[1];
        if (diferVueloHotel === "=VueloHotel") {
            NombreButton = "Seleccionar";
            //var ButRes = "<input id='btnSubirInfoHotel' class=\"ChkinfoBotHots\" type='button' text =\"Seleccionar\" value=\"Seleccionar\"/>";
            var ButRes = "<input id=\"BotRes" + GlobalCounter + "\" class=\"BotResHotelRes link-button white\" type=\"Submit\" text =\"Seleccionar\" value=\"Seleccionar\" onclick='SetReservaHotel(DivGenRes" + GlobalCounter + "," + false + ")' </input>";
            $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion').append(ButRes);
        }
        else {
            NombreButton = "Reservar";
            var ButRes = "<input id=\"BotRes" + GlobalCounter + "\" class=\"BotResHotelRes link-button white\" type=\"Submit\" text =\"Reservar\" value=\"Reservar\" onclick='SetReservaHotel(DivGenRes" + GlobalCounter + "," + true + ")' </input>";
            $('#DivGenRes' + GlobalCounter + ' .DatosHabitacion').append(ButRes);
        }
        getCount();
        //HideCortinilla();
    });
    //debugger;
    //HideCortinilla();
}

function getCount() {
    // 
    try {
        var counterHotels = $('.HotelesResultadosindividual').length;
        $('#contrlblControl').empty();
        var stablishCounter = counterHotels;
        $('#contrlblControl').append(stablishCounter);
        $('#contrlblControl').slideDown("slow");
    } catch (e) {

    }
}

function LanguageParameters(param, type) {
    var lang = location.search.split('language=')[1];
    lang = lang.substring(0, lang.indexOf('&'));
    param = param.toUpperCase();
    if (lang === "ES") {
        //debugger;
        if (type === "Feed") {
            switch (param) {
                case "BED AND BREAKFAST":
                    return "Alojamiento y Desayuno";
                case "ROOM ONLY":
                    return "";
                case "HALF BOARD":
                    return "Media Pension";
                case "FULL BOARD":
                    return "Pension Completa";
                case "CONTINENTAL BREAKFAST":
                    return "Desayuno Continental";
                case "ALL INCLUSIVE":
                    return "Todo Incluido";
                case "BUFFET BREAKFAST":
                    return "Desayuno Buffet";
                default:
                    return param;
            }
        }
        else if (type === "Stay") {
            switch (param) {
                case "ONLINE PRICE":
                    return "";
                case "NON REFUNDABLE RATE":
                    return "No Reembolsable";
                case "SPECIAL OFFER":
                    return "Oferta Especial";
                default:
                    return param;
            }
        }
    }
    else {
        return param;
    }
}

function procesaResultadoFiltro(data) {
    // 
    $('#Hoteles').empty();
    procesaResultado(data, true);
    HideCortinilla();
}

function procesaResultadoFiltroOrdenamiento(data) {
    //debugger;
    //$('#Hoteles').empty();
    procesaResultado(data, true);
    HideCortinilla();
}

function CheckSortNewArr() {

}

function procesaResultadoDetalle(data) {
}

function procesaZonas(data) {
    var result = data.d;
    for (var i = 0; i < result.length; i++) {
        var options = '<option value = "' + result[i] + '" >' + result[i] + '</option>';
        $('#SltZonesFilter').append(options);
    }
}

function procesaCadenas(data) {
    var result = data.d;
    for (var i = 0; i < result.length; i++) {
        var options = '<option value = "' + result[i] + '" >' + result[i] + '</option>';
        $('#SltCadenaFilter').append(options);
    }
}

function llenarValuesRB(arr) {

}

function commaSeparateNumber(val) {
    // 
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
    }
    return val;
}

function procesaError(xhr, status) {
    //  
    //alert("Sorry, there was a problem!");
}

function SetDetalleHotel(idHotel, idProvider, lat, long) {
    event.preventDefault();
    var id = idHotel;
    var provider = parseInt(idProvider);
    // 
    Latitude = lat;
    Longitude = long;

    ShowCortinilla();

    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotelDetail.aspx/GetHotelDetails",
        data: JSON.stringify({ a: id, b: provider }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        sync: false,
        success: function (data) {
            //alert("Funciona");
            // 
            ShowCortinilla();
            if (data.d.HotelName != "" && data.d.HotelName != null) {
                dibujaDetalleHotel(data);
            } else {
                var msgError = "Detalle del Hotel no disponible";
                ModalMensaje(msgError);
            }
            //HideCortinilla();
        },
        error: function (xhr, status) {
            //  
            var msgError = "Detalle del Hotel no disponible";
            ModalMensaje(msgError);
            procesaError(xhr, status);
        }
    });

    //return false;
}

/* General Function */

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

/* Detalle Hotel */
function procesaDetalleHotel(data) {
    var result = data.d;

    var estrellasValor = parseInt(result.StartsNumber);
    var estrellas = "";
    var urlEstrellas = "http://162.248.52.194/Uga/Pagina/App_Themes/Imagenes/starHotel.png";
    for (var j = 0; j < estrellasValor; j++) {
        estrellas = estrellas + "<img src=\"" + urlEstrellas + "\">" + " ";
    }


    var DivGenDet = "<div class=\"SuperiorHotel\">"
    + "<div class=\"FotoHotel\"><img src=\"" + result.HotelImage.ImageUrl + "\">" + "</div>"
    + "<div class=\"NombreHotel\">" + result.HotelName + "</div>"
    + "<div class=\"EstrellasDetHotel\">" + estrellas + "</div>"
    + "<div class=\"DireccionHotel\">" + result.Adress + " - " + result.CityName + "</div>"
    + "<div class=\"DescrDetHotel\">" + result.Hoteldescription + "</div>"
    + "</div>";
    $('#DetalleHotel').append(DivGenDet);

    var discla = '<div id="HotelesDetail" class="HotelesDetaildiv"><label class="NombresTitlesWeards">Tarifas</label></div>';
    $('#DetalleHotel').append(discla);

    var DivGenGal = "<div class=\"GaleriaHotel\">"
    + "<label class=\"NombresTitlesWeards\">Galeria</label>"
    + "</div>"
    $('#DetalleHotel').append(DivGenGal);

    for (var i = 0; i < result.Images.length; i++) {
        var DivEspGal = "<div class=\"ImgGalHotel\">"
            + "<div class=\"FotoHotelInd\"><img src=\"" + result.Images[i].ImageUrl + "\">" + "</div>"
            + "<div class=\"DescriptionIndFoto\">" + result.Images[i].ImageDescription + "</div>"
        + "</div>";
        $('#DetalleHotel .GaleriaHotel').append(DivEspGal);
    }

    var DivGenAmn = "<ul class=\"AmenitiesHotel\">"
    + "<label class=\"NombresTitlesWeards\">Amenities</label>"
    + "</ul>"
    $('#DetalleHotel').append(DivGenAmn);

    for (var i = 0; i < result.Amenities.length; i++) {
        var DivEspAmn = "<li class=\"AmenitiesEspHotel\">" + result.Amenities[i] + "</li>"
        $('#DetalleHotel .AmenitiesHotel').append(DivEspAmn);
    }
}

function SetReservaHotel(Data, Status) {
    //GuardarDatos
    EraseandDelete();
    //debugger;
    ParentSelected = Data;
    var content = "";
    if (!Status) {
        content = ParentSelected.parentNode.id;

    } else {
        content = Data.id;
    }
    var arrdbuttons = $('#' + content + ' .DatosHabitacion input[name^="selectinput"]:checked');
    //var content = ParentSelected.parentNode.id;
    //var arrdbuttons = $('#' + content + ' .DatosHabitacion input[name^="selectinput"]:checked');

    var habsCounter = $('#Hoteles .HotelesResultadosindividual:nth-child(1) .DatosHabitacion .GenHabsGens').length;

    if (arrdbuttons.length == habsCounter) {
        ShowCortinilla();
        event.preventDefault();
        var paramsNew = [];
        for (var i = 0; i < arrdbuttons.length; i++) {
            var str = arrdbuttons[i].value;
            var str_array = str.split('#!%');

            var ContractIncomingOffice = str_array[0];
            var ContractName = str_array[1];
            var CurrencyCode = str_array[2];
            var DestinationCode = str_array[3];
            var DestinationType = str_array[4];
            var IdHotel = str_array[5];
            var HotelName = str_array[6];
            var ProvCode = str_array[7];
            var AvailCount = str_array[8];
            var Characteristic = str_array[9];
            var Characteristicname = str_array[10];
            var Name = str_array[11];
            var onRequest = str_array[12];
            var RoomCode = str_array[13];
            var RoomMealPlanCode = str_array[14];
            var RoomType = str_array[15];
            var ShortName = str_array[16];
            var Shrui = str_array[17];
            var RateCode = str_array[18];
            var PriceRoom = str_array[19];
            var Tariff = str_array[20];
            var Bedding = str_array[21];
            var Suplements = [];

            PriceRoom = PriceRoom.replace('.', '');
            // 
            if (ProvCode == 4) {
                $.ajax({
                    type: "POST",
                    url: "Presentacion/NewHotelBooking.aspx/suplementsforT",
                    data: JSON.stringify({ proveedor: ProvCode, idhotel: IdHotel, RoomCode: RoomCode, beeding: AvailCount }),
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        // 
                        for (var j = 0; j < data.d.length; j++) {
                            Suplements.push(data.d[j]);
                        }

                    },
                    error: function (xhr) {
                        PruebaErrores(xhr);
                    }
                });
            }
            paramsNew.push({ ContractIncomingOffice: ContractIncomingOffice, ContractName: ContractName, CurrencyCode: CurrencyCode, DestinationCode: DestinationCode, DestinationType: DestinationType, IdHotel: IdHotel, HotelName: HotelName, ProvCode: ProvCode, AvailCount: AvailCount, Characteristic: Characteristic, Characteristicname: Characteristicname, Name: Name, onRequest: onRequest, RoomCode: RoomCode, RoomMealPlanCode: RoomMealPlanCode, RoomType: RoomType, ShortName: ShortName, Shrui: Shrui, RateCode: RateCode, Price: PriceRoom, tariff: Tariff, Suplements: Suplements, Bedding: Bedding });
        }
        if (Status) {
            $.ajax({
                type: "POST",
                url: "Presentacion/NewHotelBooking.aspx/DataForHotelRooms",
                //data: JSON.stringify({hotelBooking: hotelBooking})
                data: JSON.stringify({ RoomsPerHotelInfo: paramsNew }),
                contentType: "application/json; charset=utf-8",
                cache: false,
                dataType: "json",
                async: false,
                success: function (data) {
                    ShowCortinilla();
                    var diferVueloHotel = location.search.split('Diferencial')[1];
                    if (diferVueloHotel === "=VueloHotel") {

                    }
                    else {
                        RedirectLogin(data);
                    }
                },
                error: function (xhr) {

                    PruebaErrores(xhr);
                    HideCortinilla();
                    var msgError = "La tarifa seleccionada no puede reservarse, por favor seleccione otra tarifa";
                    ModalMensaje(msgError);
                    location.reload();
                }
            });
        }
        else {
            debugger;
            var html = "";
            $("#OrigenDestinoHoteles").empty();

            if (CurrencyCode === "COP") {
                var precioPesos = PriceRoom;
                var contenedor = "Hotel:" + " " + "<span>" + HotelName + "</span>" + "</br>" +
                            "Habitacion:" + " " + "<span>" + Characteristicname + "</span>" + "</br>" +
                            "Precio:" + " " + "<span id='ValTotalHoteles'>" + precioPesos + "</span>" + "</br>";

                html = html + "" + contenedor;

            } else {
                var ValorDolar = "3318"
                var ConverPesos = PriceRoom * parseInt(ValorDolar);

                var contenedor = "Hotel:" + " " + "<span>" + HotelName + "</span>" + "</br>" +
                            "Habitacion:" + " " + "<span>" + Characteristicname + "</span>" + "</br>" +
                            "Precio COP:" + " " + "<span id='ValTotalHoteles'>" + formatCurrency(ConverPesos, "$") + "</span>" + "</br>" +
                            "Precio USD:" + " " + "<span id='ValTotalHoteles'>" + PriceRoom + "</span>" + " " + "<span id='MonedaHoteles'>" + CurrencyCode + "</span>" + "</br>"

                html = html + "" + contenedor;
            }



            $("#OrigenDestinoHoteles").append(html);

            HideCortinilla();
            $(".ui-widget-overlay").css("display", "none");

            if ($('#ValTotalVuelos').html() != "" || $('#ValTotalVuelos').html() != null || $('#ValTotalVuelos').html() != undefined) {
                ShowCortinilla();

                var html = "";
                $("#TotalVueloHotel").empty();
                var TotalVuelo = $('#ValTotalVuelosSinConver').html();
                var TotalVueloHotel = parseInt(TotalVuelo) + parseInt(PriceRoom);
                if (CurrencyCode === "COP") {
                    var precioPesos = PriceRoom;
                    var TotalVueloHotel = parseInt(TotalVuelo) + parseInt(precioPesos);
                    var contenedor = "Total Vuelo:" + " " + "<span>" + TotalVuelo + "</span>" +
                                "Total Hotel:" + " " + "<span>" + precioPesos + "</span>" + "</br>" +
                                "<div class='LineaTotal'></div>" +
                                "Total Reserva:" + " " + "<span>" + TotalVueloHotel + "</span>" + "</br>";


                    html = html + "" + contenedor;
                } else {
                    var TotalVueloHotel = parseInt(TotalVuelo) + parseInt(ConverPesos);
                    var contenedor = "Total Vuelo:" + " " + "<span>" + TotalVuelo + "</span>" +
                                "Total Hotel:" + " " + "<span>" + formatCurrency(ConverPesos, "$") + "</span>" + "</br>" +
                                "<div class='LineaTotal'></div>" +
                                "Total Reserva:" + " " + "<span>" + formatCurrency(TotalVueloHotel, "$") + "</span>" + "</br>";



                    html = html + "" + contenedor;
                }



                $("#TotalVueloHotel").append(html);

                HideCortinilla();
                $(".ui-widget-overlay").css("display", "none");
            }
            return false;
        }
    } else {
        var msgError = "Seleccione las tarifas correspondientes por habitacion";
        ModalMensaje(msgError);

    }
}

function AdjuntarMenorField(valid) {
    $("#" + valid + " .EdadMenorDiv").attr("style", "display: block !important");
}

function PruebaErrores(xhr) {
    //  
}

function RedirectLogin(data) {
    window.location = "IngresoHoteles";
}

function dibujaDetalleHotel(data) {
    ShowCortinilla();
    result = data.d;

    if (result != null && result != "" && result.ProviderCode != 0) {
        // 
        var estrellasValor = parseInt(result.StartsNumber);
        var estrellas = "";
        var urlEstrellas = urlLocation + "/App_Themes/Imagenes/starHotel.png";

        for (var j = 0; j < estrellasValor; j++) {
            estrellas = estrellas + "<img src=\"" + urlEstrellas + "\">" + " ";
        }

        var imgHotel = urlLocation + "/app_themes/imagenes/BackPict.png";
        var despict = "";
        if (result.HotelImage.ImageUrl != null && result.HotelImage.ImageUrl != "") {
            imgHotel = result.HotelImage.ImageUrl;
        }
        var DivGenDet = "<div class=\"SuperiorHotel\">"
            + "<div class=\"FotoHotel\"><img src=\"" + imgHotel + "\">" + "</div>"
            + "<div class=\"NombreHotel\">" + result.HotelName + "</div>"
            + "<div class=\"EstrellasDetHotel\">" + estrellas + "</div>"
            + "<div class=\"DireccionHotel\">" + result.Adress + " - " + result.CityName + "</div>"
            + "<div class=\"DescrDetHotel\">" + result.Hoteldescription + "</div>"
            + "</div>";
        $('#hotelsDetails').append(DivGenDet);

        var DivGenGal = "<div class=\"GaleriaHotel\">"
            + "<label class=\"NombresTitlesWeards\">Galeria</label>"
            + "</div>"
        $('#hotelsDetails').append(DivGenGal);

        for (var i = 0; i < result.Images.length; i++) {
            if (result.Images[i].ImageDescription != null) {
                despict = result.Images[i].ImageDescription;
            }
            if (result.Images[i].ImageUrl != null && result.Images[i].ImageUrl != "") {
                var DivEspGal = "<div class=\"ImgGalHotel\">"
                + "<div class=\"FotoHotelInd\"><img src=\"" + result.Images[i].ImageUrl + "\">" + "</div>"
                + "<div class=\"DescriptionIndFoto\">" + despict + "</div>"
                + "</div>";
                $('#hotelsDetails .GaleriaHotel').append(DivEspGal);
            }
        }
        var DivGenAmn = "<ul class=\"AmenitiesHotel\">"
            + "<label class=\"NombresTitlesWeards\">Amenities</label>"
            + "</ul>"
        $('#hotelsDetails').append(DivGenAmn);
        if (result.Amenities != null) {
            for (var i = 0; i < result.Amenities.length; i++) {
                var DivEspAmn = "<li class=\"AmenitiesEspHotel\">" + result.Amenities[i] + "</li>"
                $('#hotelsDetails .AmenitiesHotel').append(DivEspAmn);
            }
        }

        var DivGenMap = "<div id='mapHotel' class='mapHotel'>"
            + "<label class=\"NombresTitlesWeards\">Ubicación</label>"
            + "<div id='mapHotelDetail' class='mapHotel'></div>"
            + "</div>"
        $('#hotelsDetails').append(DivGenMap);

        CreateMap();
        var Latitude = "";
        var Longitude = "";
        HideCortinilla();
        $('.fondilloHotelsDetails').show();
        $('#hotelsDetails').show();
        $('#CloseHotelsDetails').show();
        $('html').css({
            'overflow': 'hidden',
            'height': '100%'
        });
    } else {
        var msgError = "";
        msgError = "Detalle del hotel no disponible";
        ModalMensaje(msgError);
        HideCortinilla();
    }

}

function cerrarHotelsDetails() {
    $('html').css({
        'overflow': 'auto',
        'height': 'auto'
    });
    $('#hotelsDetails').empty();
    $('.fondilloHotelsDetails').hide();
    $('#hotelsDetails').hide();
    $('#CloseHotelsDetails').hide();
}

function CreateMap() {
    // 
    var latitude = (Latitude == "null") ? bringLatitud() : Latitude;
    var longitude = (Longitude == "null") ? bringLongitude() : Longitude;
    try {
        $("#mapHotelDetail").googleMap();
        $("#mapHotelDetail").addMarker({
            coords: [latitude, longitude], // GPS coords
            //url: 'http://www.tiloweb.com', // Link to redirect onclick (optional)
            id: 'Hotel - ' + latitude + ' - ' + longitude // Unique ID for your marker
        });
    } catch (e) {

    }
}

function sortSelect(data) {
    debugger;
    EraseandDelete();
    clearInterval(intervalo);
    clearInterval(IntervalSort);
    CounterInterval = 0;
    //traerOrdenes("FILTER");
    //var val = parseInt(data.selectedIndex);
    var val = data;
    switch (val) {
        case 1:
            //debugger;
            ShowCortinilla();
            IntervalSort = setInterval('SortLowPrice()', 1000);
            ShowCortinilla();
            break;
        case 2:
            debugger;
            ShowCortinilla();
            IntervalSort = setInterval('SortHighPrice()', 1000);
            break;
        case 3:
            debugger;
            ShowCortinilla();
            IntervalSort = setInterval('SortLowStars()', 1000);
            break;
        case 4:
            debugger;
            ShowCortinilla();
            IntervalSort = setInterval('SortHighStars()', 1000);
            break;
        case 5:
            debugger;
            ShowCortinilla();
            IntervalSort = setInterval('HotelAlphabeticalLow()', 1000);
            break;
        case 6:
            debugger;
            ShowCortinilla();
            IntervalSort = setInterval('HotelAlphabeticalhigh()', 1000);
            break;
        default:
            return false;
    }
}

function SortLowPrice() {
    //debugger;
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/SortPriceLow",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}

function SortHighPrice() {
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/SortPriceHigh",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: true,
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}

function SortLowStars() {
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/StarsLow",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}

function SortHighStars() {
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/StarsHigh",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}

function HotelAlphabeticalLow() {
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/HotelAlphabeticalLow",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}

function HotelAlphabeticalhigh() {
    if (CounterInterval === 0) {
        ShowCortinilla();
    }
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/HotelAlphabeticalhigh",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
            }
        },
        error: function (xhr) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            PruebaErrores(xhr);
        }
    });
}


function bringLatitud() {
    //alert('a');
}

function bringLongitude() {
    //alert('b');
}

function EraseandDelete() {
    // 
    //intervalo = setInterval('traerOrdenes()', 5000);
    clearInterval(intervalo);
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/EraseTopics",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        dataType: "json",
        success: function (data) {
            // 
        },
        error: function (xhr) {
            PruebaErrores(xhr);
        }
    });
}

function FunctEraseFilters() {
    debugger;
    EraseandDelete();
    clearInterval(intervalo);
    clearInterval(IntervalSort);
    ShowCortinilla();
    IntervalSort = setInterval('SortAllHotels()', 1000);
    ShowCortinilla();
    CounterInterval = 0;
}

function SortAllHotels() {
    /*if (CounterInterval === 0) {
        ShowCortinilla();
    }*/
    clearInterval(intervalo);
    var From = MinSortVar;
    var To = MaxSortVar;
    $('input[name="FilterStarsHotels"]:checked').attr('checked', false);
    $('input[name=chkFeed]').attr('checked', false);
    $.ajax({
        type: "POST",
        url: "Presentacion/NewHotels.aspx/EraseFilters",
        data: JSON.stringify({ From: From, To: To }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        async: false,
        success: function (data) {
            debugger;
            if (data.d.length > 0 || data.length > 0) {
                if (CounterInterval === 0) {
                    ShowCortinilla();
                    $('#Hoteles').empty();
                    CounterInterval++;
                } else {
                    HideCortinilla();
                }
                procesaResultadoFiltroOrdenamiento(data);
                debugger;
                var Newmin = MaxSortVar - 1;
                for (var i = 0; i < data.d.length; i++) {
                    var result = data.d[i].Consecutive;
                    if (result >= MinSortVar) {
                        MinSortVar = result;
                    }
                }
                MinSortVar = MinSortVar + 1;
                MaxSortVar = MinSortVar + 30 - 1;
            } else {
                debugger;
                clearInterval(IntervalSort);
                MinSortVar = 1;
                MaxSortVar = 30;
                CounterInterval = 0;
                HideCortinilla();
            }
        },
        error: function (xhr, status) {
            clearInterval(IntervalSort);
            MinSortVar = 1;
            MaxSortVar = 30;
            CounterInterval = 0;
            HideCortinilla();
            PruebaErrores(xhr);
        }
    });
}

function ToggleTarifas(data) {
    var result = data.id;
    //debugger;
    var showTarf = "#" + result + " .DatosHabitacion";
    //$(showTarf).slideToggle("slow");
    //selectedToggle = showTarf;
    if (selectedToggle === "") {
        $(showTarf).slideToggle("slow");
        $('#' + result + ' .btnmastarifas').html('Ocultar');
        selectedToggle = showTarf;
        ToggleIdSelected = result;
    }
    else {
        if (result === ToggleIdSelected) {
            var info = $('#' + result + ' .btnmastarifas').text();
            if (info === "Seleccionar") {
                $('#' + result + ' .btnmastarifas').html('Ocultar');
                $(showTarf).slideToggle("slow");
                ToggleIdSelected = result;
                selectedToggle = showTarf;
            } else {
                $('#' + result + ' .btnmastarifas').html('Seleccionar');
                $(showTarf).slideToggle("slow");
                ToggleIdSelected = result;
                selectedToggle = showTarf;
            }
        } else {
            $('#' + result + ' .btnmastarifas').html('Ocultar');
            $(showTarf).slideToggle("slow");
            ToggleIdSelected = result;
            selectedToggle = showTarf;
        }
        //}
    }
    return false;
}

