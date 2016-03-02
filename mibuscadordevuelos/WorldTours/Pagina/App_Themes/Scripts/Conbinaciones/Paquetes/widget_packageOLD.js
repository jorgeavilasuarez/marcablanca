/**
 * Inicialza el widget de paquetes.
 * @constructor 
 */
var widget_package = function () {
 this.URL_BASE = '//search-flights.appspot.com';
 this.URL_SEARCH = '//162.248.52.194/MBEmpaqueyvamonos/Pagina/Planes';
 this.loadjscssfile(this.URL_BASE + this.URL_JQUERY, "js");
};

/**
 * Contiene la url de la plantilla.
 * @const
 */
widget_package.prototype.URL_TEMPLATE = "/static/packages/production/templates/packages.html";

/**
 * Contiene la url de jQuery.
 * @const
 */
widget_package.prototype.URL_JQUERY = "/static/jquery.min.js";

/**
 * Metodo generico para descargar recursos dinamicamente
 * @param {string} filename
 * @param {string} filetype 
 */
widget_package.prototype.loadjscssfile = function (filename, filetype) {
    if (filetype === "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("defer", "");
        fileref.setAttribute("src", filename);
    }
    else if (filetype === "css") { //if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};

/**
 * Controla el change del select de zonas  
 * @param {Event} e 
 */
widget_package.prototype.onChange_ddlZonaGeo = function (e) {

    if (this.ddlZonaGeo.val() !== "0") {
        this.showProgressBar();
        jQuery.getJSON(this.URL_HANDLER + "?cz=" + this.ddlZonaGeo.val(), function (result) {
            this.ddlPais.empty();
            jQuery.each(result, function (index, obj) {
                if (index === 0) {
                    this.ddlPais.append(jQuery("<option selected=\"selected\">").val("0").text("Todos los Paises"));
                }
                this.ddlPais.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
            }.bind(this));
            this.ddlPais.change(this.onChange_ddlPais.bind(this));

            this.hideProgressBar();
        }.bind(this));
    }
};

/**
 * Controla el change del select de zonas 
 * @param {Event} e 
 */
widget_package.prototype.onChange_ddlPais = function (e) {

    if (this.ddlPais.val() !== "0") {
        this.showProgressBar();
        jQuery.getJSON(this.URL_HANDLER + "?cp=" + this.ddlPais.val(), function (result) {
            this.ddlCiudad.empty();

            jQuery.each(result, function (index, obj) {
                if (index === 0) {
                    this.ddlCiudad.append(jQuery("<option selected=\"selected\">").val("0").text("Todas las ciudades"));
                }
                this.ddlCiudad.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
            }.bind(this));
            this.hideProgressBar();
        }.bind(this));
    }
};

/**
 * Controla el click del boton buscar
 * @param {Element} e 
 */
widget_package.prototype.onClick_lbBuscar = function (e) {
    e.preventDefault()
    var url = this.URL_SEARCH + "?ORIGEN=BUSCADOR";

    //zona
    if (this.ddlZonaGeo.val() !== null &&
            this.ddlZonaGeo.val() !== "0") {
        url += "&ZonaGeo=" + this.ddlZonaGeo.val();
    }

    //pais
    if (this.ddlPais.val() !== null &&
            this.ddlPais.val() !== "0") {
        url += "&IdPais=" + this.ddlPais.val();
    }

    //pais
    if (this.ddlCiudad.val() !== null &&
            this.ddlCiudad.val() !== "0") {
        url += "&IdCiudad=" + this.ddlCiudad.val();
    }

    //tipologia
    if (this.ddlTipologia.val() !== null &&
            this.ddlTipologia.val() !== "0") {
        url += "&IdTipologia=" + this.ddlTipologia.val();
    }

    //filtro texto
    url += "&FiltroTexto=" + this.txtFiltroTexto.val();
    window.location.href = url;

};

/**
 * Muestra la barra de progreso 
 */
widget_package.prototype.showProgressBar = function () {
    this.progressBarBuscador.show();
};

/**
 * Esconde la barra de progreso 
 */
widget_package.prototype.hideProgressBar = function () {
    this.progressBarBuscador.hide();
};

/**
 * Ingresa al documento 
 */
widget_package.prototype.enterDocument = function () {
    this.URL_HANDLER=this.URL_SEARCH+'/../handlers/PlanesMarcablanca.ashx'
    jQuery.get(this.URL_BASE + this.URL_TEMPLATE, function (template) {
        this.widget_script_package = jQuery(this.widget_script_package);
        this.divPackages = jQuery("<div class=widget-app></div>");
        this.divPackages.html(template);
        this.divPackages.insertAfter('#autos');
        paquetes.style.display='none'
        this.ddlZonaGeo = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlZonaGeo");
        this.ddlTipologia = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlTipologia");
        this.ddlPais = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlPais");
        this.ddlCiudad = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlCiudad");
        this.progressBarBuscador = this.divPackages.find("#ucBuscador_UcBuscadorPlan_udpEsperar");
        this.txtFiltroTexto = this.divPackages.find("#ucBuscador_UcBuscadorPlan_txtFiltroTexto");
        (this.lbBuscar = this.divPackages.find("#ucBuscador_UcBuscadorPlan_lbBuscar")).addClass('BotonBuscadorGeneral');
        this.lbBuscar[0].parentElement.removeAttribute('style')
        this.lbBuscar.click(this.onClick_lbBuscar.bind(this));

        this.showProgressBar();

        jQuery.getJSON(this.URL_HANDLER + "?zgyt=0", this.loadTipologiasYZonasGeograficas.bind(this));

    }.bind(this));
};

/**
 * Carga tipologias y zonas geograficas
 * @param {TipologiasYZonasGeograficas} result 
 */
widget_package.prototype.loadTipologiasYZonasGeograficas = function (result) {

    jQuery.each(result.Tipologias, function (index, obj) {
        this.ddlTipologia.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
    }.bind(this));

    this.ddlZonaGeo.empty();

    this.ddlZonaGeo.change(this.onChange_ddlZonaGeo.bind(this));

    jQuery.each(result.ZonaGeograficas, function (index, obj) {
        if (index === 0) {
            this.ddlZonaGeo.append(jQuery("<option>").val("0").text("Todas las Zona Geogr\u00e1ficas"));
        }
        this.ddlZonaGeo.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
    }.bind(this));

    this.hideProgressBar();


};

/** 
 * Se ejecuta cuando jquery carga completamente y es llamada por el arhivo jQuery modificado. 
 */
window["jqueryCargado"] = function () {
    //evitamos colisiones de jquery
    jQuery.noConflict();
    __obj_widget_package.enterDocument();
}.bind(this);

//punto de entrada
var __obj_widget_package = new widget_package();