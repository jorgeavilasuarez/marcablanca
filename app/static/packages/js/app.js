/**
 * 
 * @returns {widget_package}
 */
var widget_package = function () {
    this.SSOFT_URL_BASE = "";
    this.SSOFT_URL_HANDLER = "http://localhost:54494/handlers/PlanesMarcablanca.ashx";
    this.SSOFT_URL_SEARCH = "http://www.turinco.co/pagina/Planes";
    //cargamos estilos y jquery
    this.loadjscssfile(this.SSOFT_URL_BASE + "/static/packages/css/styles.css", "css");
    this.loadjscssfile(this.SSOFT_URL_BASE + "/static/jquery.min.js", "js");
};

/**
 * Metodo generico para descargar recursos dinamicamente
 * @param {type} filename
 * @param {type} filetype 
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
 * @param {type} e
 * @returns {undefined}
 */
widget_package.prototype.onChange_ddlZonaGeo = function (e) {

    if (this.ddlZonaGeo.val() !== "0") {
        this.showProgressBar();
        jQuery.getJSON(this.SSOFT_URL_HANDLER + "?cz=" + this.ddlZonaGeo.val(), function (result) {
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

/*
 * Controla el change del select de zonas 
 * @param {type} e 
 */
widget_package.prototype.onChange_ddlPais = function (e) {

    if (this.ddlPais.val() !== "0") {
        this.showProgressBar();
        jQuery.getJSON(this.SSOFT_URL_HANDLER + "?cp=" + this.ddlPais.val(), function (result) {
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

/*
 * Controla el click del boton buscar
 * @param {type} e 
 */
widget_package.prototype.onClick_lbBuscar = function (e) {
    var url = this.SSOFT_URL_SEARCH + "?ORIGEN=BUSCADOR";

    //zona
    if (this.ddlZonaGeo.val() !== "0") {
        url += "&ZonaGeo=" + this.ddlZonaGeo.val();
    }

    //pais
    if (this.ddlPais.val() !== "0") {
        url += "&IdPais=" + this.ddlPais.val();
    }

    //pais
    if (this.ddlCiudad.val() !== "0") {
        url += "&IdCiudad=" + this.ddlCiudad.val();
    }

    //tipologia
    if (this.ddlTipologia.val() !== "0") {
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
    jQuery.get(this.SSOFT_URL_BASE + "/static/packages/templates/packages.html", function (template) {
        this.divPackages = jQuery("<div class=\"ssoft\"></div>");
        this.divPackages.html(template);
        this.divPackages.insertBefore("#widget_script_package");
        this.ddlZonaGeo = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlZonaGeo");
        this.ddlTipologia = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlTipologia");
        this.ddlPais = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlPais");
        this.ddlCiudad = this.divPackages.find("#ucBuscador_UcBuscadorPlan_ddlCiudad");
        this.progressBarBuscador = this.divPackages.find("#ucBuscador_UcBuscadorPlan_udpEsperar");
        this.txtFiltroTexto = this.divPackages.find("#ucBuscador_UcBuscadorPlan_txtFiltroTexto");
        this.lbBuscar = this.divPackages.find("#ucBuscador_UcBuscadorPlan_lbBuscar");
        this.lbBuscar.click(this.onClick_lbBuscar.bind(this));

        this.showProgressBar();

        jQuery.getJSON(this.SSOFT_URL_HANDLER + "?zgyt=0", function (result) {

            jQuery.each(result.Tipologias, function (index, obj) {
                this.ddlTipologia.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
            }.bind(this));

            this.ddlZonaGeo.empty();

            this.ddlZonaGeo.change(this.onChange_ddlZonaGeo.bind(this));

            jQuery.each(result.ZonaGeograficas, function (index, obj) {
                if (index === 0) {
                    this.ddlZonaGeo.append(jQuery("<option />").val("0").text("Todas las Zona Geogr\u00e1ficas"));
                }
                this.ddlZonaGeo.append(jQuery("<option />").val(obj.Codigo).text(obj.Descripcion));
            }.bind(this));

            this.hideProgressBar();

        }.bind(this));
    }.bind(this));

};

/**
 * se ejecuta cuando jquery carga completamente 
 * @returns {undefined}
 */
function jqueryCargado() {
    //evitamos colisiones de jquery
    jQuery.noConflict();
    obj_widget_package.enterDocument();
}
;

//punto de entrada
var obj_widget_package = new widget_package();