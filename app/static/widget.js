var SSOFT_URL_BASE = "http://search-flights.appspot.com";
var ssof_Content_html =""
+" <form name=\"formID\" method=\"post\" action=\"./Inicio\" id=\"formID\">"
+""
+"<div id=\"vuelos\" class=\"bcolor1 ui-tabs-panel ui-widget-content ui-corner-bottom\">"
+"<div id=\"formID\" method=\"post\" class=\"contenidoBuscador\">"
+"    <div class=\"radioButtonList\">"
+"        <label class=\"contenidoBuscador\">Ida Y Vuelta</label>"
+"        <input type=\"radio\" checked=\"checked\" value=\"0\" name=\"modal_vuelos\" id=\"modal_vuelos_0\">"
+"        <label class=\"contenidoBuscador\">Solo Ida</label>"
+"        <input type=\"radio\" value=\"1\" name=\"modal_vuelos\" id=\"modal_vuelos_1\">"
+"        <br>"
+"        <label class=\"contenidoBuscador\">Multiples Destinos</label>"
+"        <input type=\"radio\" value=\"1\" name=\"modal_vuelos\" id=\"modal_vuelos_2\">"
+"    </div>"
+"    <div class=\"row\">"
+"        <label class=\"contenidoBuscador\">Origen</label>"
+"    </div>"
+"    <div class=\"row\">"
+"        <input type=\"text\" id=\"origen\" class=\"validate[required] form-control input-large aeropuertos formaBuscar ui-autocomplete-input\" placeholder=\"Ciudad de Origen\" autocomplete=\"off\">"
+"    </div>"
+"    <div class=\"row\">"
+"        <label class=\"contenidoBuscador\">Destino</label>"
+"    </div>"
+"    <div class=\"row\">"
+"        <input type=\"text\" class=\"validate[required]  form-control input-large aeropuertos formaBuscar ui-autocomplete-input\" id=\"destino\" placeholder=\"Ciudad de Destino\" autocomplete=\"off\">"
+"    </div>"
+"    <div class=\"row\">"
+"        <label class=\"contenidoBuscador span\">Fecha de salida</label>"
+"        <label class=\"spanSpace\">&nbsp;</label>"
+"         <input type=\"text\" id=\"FechaSalida\" class=\"validate[required]  form-control input-medium span input-calendar\" placeholder=\"Seleccione Fecha\" readonly=\"readonly\" style=\"background-image: url('http://search-flights.appspot.com/static/calendario.png'); background-repeat: no-repeat; background-position-x: 99px;\"/>"
+"        "
+"    </div>"
+"    <br>"
+"    <div class=\"row\">"
+"        <label class=\"contenidoBuscador span\" id=\"lblRegresoVuelos\">Fecha de Regreso</label>"
+"        <label class=\"spanSpace\">&nbsp;</label>"
+"        <input type=\"text\" id=\"FechaLlegada\" class=\"validate[required]  form-control input-medium span input-calendar\" placeholder=\"Selecciona Fecha\" readonly=\"readonly\" style=\"background-image: url('http://search-flights.appspot.com/static/calendario.png'); background-repeat: no-repeat; background-position-x: 99px;\"/>"
+"        "
+"    </div>"
+"    <div class=\"row\">"
+"        <label class=\"contenidoBuscador right14\">Adultos(+12)</label>"
+"        <label class=\"contenidoBuscador right14\">Niños(-11)</label>"
+"        <label class=\"contenidoBuscador right14\">Infantes(-23 m)</label>"
+"    </div>"
+"    <div class=\"row SelecPasajeros\">"
+"        <select id=\"adults\" class=\"form-control input-small\">"
+"            <option value=\"1\" selected=\"selected\">1</option>"
+"            <option value=\"2\">2</option>"
+"            <option value=\"3\">3</option>"
+"            <option value=\"4\">4</option>"
+"            <option value=\"5\">5</option>"
+"            <option value=\"6\">6</option>"
+"        </select>"
+"        "
+""
+"        <select id=\"childs\" class=\"form-control input-small\">"
+"            <option value=\"0\">0</option>"
+"            <option value=\"1\">1</option>"
+"            <option value=\"2\">2</option>"
+"            <option value=\"3\">3</option>"
+"            <option value=\"4\">4</option>"
+"            <option value=\"5\">5</option>"
+"            <option value=\"6\">6</option>"
+"        </select>"
+"        "
+"        <label class=\"spanSpace\">&nbsp;</label>"
+""
+"        <select id=\"infants\" class=\"form-control input-small\">"
+"            <option value=\"0\">0</option>"
+"            <option value=\"1\">1</option>"
+"            <option value=\"2\">2</option>"
+"            <option value=\"3\">3</option>"
+"            <option value=\"4\">4</option>"
+"            <option value=\"5\">5</option>"
+"            <option value=\"6\">6</option>"
+"        </select>"
+"        <label class=\"spanSpace\">&nbsp;</label>"
+""
+"    </div>"
+"    <div class=\"row\">"
+"        <div style=\"width: 33%; float: left\">&nbsp;</div>"
+"        <div id=\"edadNinos\" style=\"float: left; width: 33%\">"
+"            &nbsp;"
+"        </div>"
+"        <div id=\"edadInf\" style=\"float: left; width: 33%\">"
+"            &nbsp;"
+"        </div>"
+"    </div>"
+"    <div class=\"row\">"
+"        <button id=\"btnBuscarVuelo\" class=\"BotonBuscadorGeneral\">Buscar</button>"
+"    </div>"
+"</div>"
+"</div>"
+""
+"</form>";

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("defer","");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

var element = document.createElement("div");
element.innerHTML = ssof_Content_html;
widget = document.getElementById("ssoft_white_label");
widget.insertBefore(element,widget.firstChild);
 
loadjscssfile(SSOFT_URL_BASE + "/static/salida.css", "css");
loadjscssfile(SSOFT_URL_BASE + "/static/jquery.min.js", "js");

function jqueryCargado(){
    $.when(
        $.getScript( SSOFT_URL_BASE + "/static/jquery-ui.js" ),
        $.getScript( SSOFT_URL_BASE + "/static/jquery.validationEngine.js" ),
        $.getScript( SSOFT_URL_BASE + "/static/jquery.validationEngine-es.js" ),
        $.getScript( SSOFT_URL_BASE + "/static/jquery.autocomplete.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){
        $.getScript( SSOFT_URL_BASE + "/static/searchResult.js",function(){}); 
        $.getScript( SSOFT_URL_BASE + "/static/search.js",function(){
        
         });
        //place your code here, the scripts are all loaded

    });            
}

