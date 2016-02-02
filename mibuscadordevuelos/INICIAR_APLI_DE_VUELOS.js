i={//Ιοτα
 o:['../Estilos/Ssoft/UgaStyles.css'],
 d:document,
 //http://mibuscadordevuelos.appspot.com/
 hrf:'WorldTours/Pagina/App_Themes/Scripts/',
 dir:'jQuery ../Estilos/jQuery/jsTurinco Ssoft Hoteles Optimizacion Conbinaciones'.split(' '),
 js:(//async since pos3
  'jquery.min-1.11.1 sessvars easySlider1.5 jquery.fadetransition jquery.featureList-1.0.0 jquery.wslide jquery.skinned-select peloslideli.v1.0.1.min jquery.autocomplete jquery.cookies.2.1.0 swfobject jquery.dataTables jquery.jcarousel.min jquery-ui jquery.validationEngine jquery.validationEngine-es:'+
  'jquery.idletimeout jquery.idletimer:'+
  'ValidadorTarjeta Funciones Estilo ModalMensaje:'+
  'Hoteles:'+
  'search setDate:'+
  'VueloHotel/searchVueloHotel Paquetes/widget_package').split(':'),
 lay:function(x){
  (x=new XMLHttpRequest).send(x.open('GET',i.hrf+'Ssoft/layout.js'))
  x.onload=Function('ssoft_white_label.innerHTML=this.response,i.url()')},
 nw:function(t,e){//tag, new Element
  i.d.head.appendChild(e=i.d.createElement(t>0?'link':'script'))[t>0?(e.rel='stylesheet','href'):'src']=i.hrf+i.o.shift()
  i.o[0]&&(e.onload=i.nw)},
 url:function(o,d,j,p){//urlsObj, parentDirectory[d], file.js[j], position[p]
  i.nw(1)
  for(d in i.dir){
   o=i.js[d].split(' ')
   for(j in o)i.o.push(o[j]=i.dir[d]+'/'+o[j]+'.js')}
  i.nw()}}

i.d.readyState=='complete'?
 i.lay()
 :onload=i.lay