i={//Ιοτα
 o:['../Estilos/Ssoft/proBar.css'],
 d:document,
 //http://mibuscadordevuelos.appspot.com/
 hrf:'WorldTours/Pagina/',
 dir:'jQuery ../Estilos/jQuery/jsTurinco Ssoft Hoteles Optimizacion Conbinaciones'.split(' '),
 js:(//async since pos3
  'layout jquery.min-1.11.1 sessvars easySlider1.5 jquery.fadetransition jquery.featureList-1.0.0 jquery.wslide jquery.skinned-select peloslideli.v1.0.1.min jquery.autocomplete jquery.cookies.2.1.0 swfobject jquery.dataTables jquery.jcarousel.min jquery-ui jquery.validationEngine jquery.validationEngine-es:'+
  'jquery.idletimeout jquery.idletimer:'+
  'ValidadorTarjeta Funciones Estilo ModalMensaje:'+
  'Hoteles:'+
  'search setDate:'+
  'VueloHotel/searchVueloHotel Paquetes/widget_package').split(':'),
 nw:function(t,e){//tag, new Element
  i.d.head.appendChild(e=i.d.createElement(t>0?'link':'script'))[t>0?(e.rel='stylesheet','href'):'src']=i.hrf+'App_Themes/Scripts/'+i.o.shift()
  i.PB()//i.pb,i.o.shift()
  i.o[0]?
   e.onload=i.nw
   //i.nw()
   :(
    i.packScript=e,
    i.pb.classList.remove('pro-bar'))},
 PB:function(){//ProgressBar
  i.pb?
   i.pb.setAttribute('style','width:'+(270/30*(30-i.o.length))+'px!important')
   :i.pb=ssoft_white_label.getElementsByClassName('ui-tabs-nav')[0]},
 url:function(o,d,j,p){//urlsObj, parentDirectory[d], file.js[j], position[p]
  for(d in i.dir){
   o=i.js[d].split(' ')
   for(j in o)i.o.push(o[j]=i.dir[d]+'/'+o[j]+'.js')}
  i.nw(1)}}

i.d.readyState=='complete'?
 i.url()
 :onload=i.url