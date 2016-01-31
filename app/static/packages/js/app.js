var SSOFT_URL_BASE = "";

//﻿var SSOFT_URL_BASE = "http://search-flights.appspot.com";

function loadjscssfile(filename, filetype) {
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
    if (typeof fileref !== "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile(SSOFT_URL_BASE + "/static/packages/css/styles.css", "css");
loadjscssfile("http://search-flights.appspot.com/static/jquery.min.js", "js");

function jqueryCargado() {
    
    var divPackages = $("<div class=\"ssoft\"></div>");
    divPackages.load(SSOFT_URL_BASE + "/static/packages/templates/packages.html");
    divPackages.insertBefore("#packages_widget");    

}

