ssoft_white_label.innerHTML="<div id=modalMensaje title=Mensaje><div class=modalMensajeContent></div><div class=modalMensajeFooter><button id=btnAceptarModal class=btnSiguienteVuelosTarjeta>Aceptar</button></div></div><form name=formID method=post id=formID><div class='container textLeft' id=wrap><div id=main><div id=content style=float:left><div class=ContentSuperior><div class='buscadorHome unCu'><div><div id=tabs class=ui-tabs><ul class='ui-tabs-nav pro-bar'><li class=pestanaVuelos><a href=#vuelos class><img src=WorldTours/Pagina/App_Themes/Imagenes/icovuelos.png><span id=ucBuscador_lblTVuelos></span></a><div id=vuelos class='bcolor1 ui-tabs-panel'><div id=formID method=post class=contenidoBuscador><div class=radioButtonList><span><input type=radio checked=checked value=0 name=modal_vuelos id=modal_vuelos_0><label class=contenidoBuscador>Ida Y Vuelta</label></span><span><input type=radio value=1 name=modal_vuelos id=modal_vuelos_1><label class=contenidoBuscador>Solo Ida</label></span><span><input type=radio value=1 name=modal_vuelos id=modal_vuelos_2><label class=contenidoBuscador>Multiples Destinos</label></span></div><div class=row><label class=contenidoBuscador>Origen</label></div><div class=row><input type=text id=origen class='validate[required] form-control input-large aeropuertos formaBuscar' placeholder='Ciudad de Origen'></div><div class=row><label class=contenidoBuscador>Destino</label></div><div class=row><input type=text class='validate[required]  form-control input-large aeropuertos formaBuscar' id=destino placeholder='Ciudad de Destino'></div><div class=row><label class='contenidoBuscador span'>Fecha de salida</label><label class=spanSpace>&nbsp;</label><input type=text id=FechaSalida class='validate[required]  form-control input-medium span input-calendar' placeholder='Seleccione Fecha' readonly></div><br><div class=row><label class='contenidoBuscador span' id=lblRegresoVuelos>Fecha de Regreso</label><label class=spanSpace>&nbsp;</label><input type=text id=FechaLlegada class='validate[required]  form-control input-medium span input-calendar' placeholder='Selecciona Fecha' readonly></div><div class=row><label class='contenidoBuscador right14'>Adultos(+12)</label><label class='contenidoBuscador right14'>Niños(-11)</label><label class='contenidoBuscador right14'>Infantes(-23 m)</label></div><div class='row SelecPasajeros'><select id=adults class='form-control input-small'><option value=1 selected=selected>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select><select id=childs class='form-control input-small'><option value=0>0</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select><label class=spanSpace>&nbsp;</label><select id=infants class='form-control input-small'><option value=0>0</option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select><label class=spanSpace>&nbsp;</label></div><div class=row><div style=width:33%;float:left>&nbsp;</div><div id=edadNinos style=float:left;width:33%>&nbsp;</div><div id=edadInf style=float:left;width:33%>&nbsp;</div></div><div class=row><button id=btnBuscarVuelo class=BotonBuscadorGeneral>Buscar</button></div></div></div></li><li class=pestanaHoteles style=opacity:1><a href=#hoteles class style=cursor:pointer><img src=WorldTours/Pagina/App_Themes/Imagenes/icohoteles.png><span id=ucBuscador_lblTHoteles></span></a><div id=hoteles class='bcolor2 ui-tabs-panel'><div id=FormHoteles class=BuscadorHotel method=post><div class=IngresoDestinoHotel><label id=lbl1 class='TituloBuscadorhotel contenidoBuscador'>Destino: </label><input id=txtDestinoHotel class='validate[required] form-control input-large CiudadesHoteles formaBuscar ui-autocomplete-input' type=text placeholder='Ingrese su destino'></div><div class=IngresoFechasHotel><label id=lbl2 class='TituloBuscadorhotel contenidoBuscador span'>Fecha Ingreso: </label><input type=text id=txtSalidaHotel class='input-medium span' readonly></div><div class=IngresoFechasHotel><label id=lbl4 class='TituloBuscadorhotel contenidoBuscador span'>Fecha Salida: </label><input type=text id=txtLlegadaHotel class='input-medium span' readonly></div><div class=PasajerosHotel><label id=lbl5 class='TituloBuscadorhotel contenidoBuscador'>Habitación: </label><label id=lbl6 class='TituloBuscadorhotel contenidoBuscador'>Adultos: </label><label id=lbl7 class='TituloBuscadorhotel contenidoBuscador'>Niños: </label readonly></div><div class=HotelSelecion><select id=Selecthotel class='form-control input-small'><option value=1 selected=selected>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option></select></div><div class=PasajerosHotelTitular></div><div class=PasajerosHotel><div id=CantAdultos>&nbsp;</div><div id=edadNinosHoteles style=float:left;width:33%>&nbsp;</div></div><div class=BottomBusadorhoteles><label class=AdventenciaHoteles>(*) Los bebés (0-2 años sin cumplir) deben indicarse como niños</label><button id=btnBuscarHotel class=BotonBuscadorGeneral>Buscar</button></div></div></div></li><li class=pestanaAutos><a href=#autos class><img src=WorldTours/Pagina/App_Themes/Imagenes/icoautos.png alt style=margin-top:-5px><span id=ucBuscador_lblTAutos></span></a><div id=autos class='bcolor5 ui-tabs-panel'><div id=formID class=BuscadorHotel method=post><div class=IngresoDestinoHotel><label id=lbl1 class=TituloBuscadorhotel contenidoBuscador>Destino: </label><input id=destinoVueloHotel class='validate[required] form-control input-large CiudadesHoteles formaBuscar ui-autocomplete-input' type=text placeholder='Ingrese su destino'></div><div class=IngresoFechasHotel><label id=lbl2 class='TituloBuscadorhotel contenidoBuscador span'>Fecha Salida: </label><input type=text id=FechaSalidaVueloHotel class='input-medium span' readonly></div><div class=IngresoFechasHotel><label id=lbl4 class='TituloBuscadorhotel contenidoBuscador span'>Fecha Regreso: </label><input type=text id=FechaLlegadaVueloHotel class='input-medium span' readonly></div><div class=PasajerosHotel><label id=lbl5 class='TituloBuscadorhotel contenidoBuscador'>Habitación: </label><label id=lbl6 class='TituloBuscadorhotel contenidoBuscador'>Adultos: </label><label id=lbl7 class='TituloBuscadorhotel contenidoBuscador'>Niños: </label></div><div class=HotelSelecion><select id=SelectVuelohotel class='form-control input-small'><option value=1 selected=selected>1</option><option value=2>2</option></select></div><div class=PasajerosVueloHotelTitular></div><div class=PasajerosHotel><div id=CantAdultos>&nbsp;</div><div id=edadNinosHoteles style=float: left; width: 33%>&nbsp;</div></div><div class=BottomBusadorVueloshoteles><label class=AdventenciaHoteles style=display:none>(*) Los bebés (0-2 años sin cumplir) deben indicarse como niños</label><button id=btnBuscarVueloHotel class='BotonBuscadorGeneral'>Buscar</div></div></div></li><li class=pestanaPaquetes role=tab tabindex=0 aria-controls=vuelos aria-labelledby=ui-id-1 aria-selected=true aria-expanded=true><a href=#paquetes class=ui-tabs-anchor role=presentation tabindex=-1 id=ui-id-4><img src=WorldTours/Pagina/App_Themes/Imagenes/icoVuelos.png><span id=ucBuscador_lblTPaquetes></span></a></li></ul>"