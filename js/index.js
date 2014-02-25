/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var xhReq = new XMLHttpRequest(),
     inicioConf = {
        'ciudad'      : 'Ciudad',
        'cc'          : 'Centro Comercial',
        'categoria'   : 'Categoria',
        'tienda'      : 'tienda'
     };
var wrapper = document.getElementById("wrapper");
var app = {
    // Application Constructor
    
    initialize: function() {
        this.bindEvents();

        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        FastClick.attach(document.body);
        


    
       app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id)
        xhReq.open("GET", "inicio.html", false);
        xhReq.send(null);
        document.getElementById("content-page").innerHTML=xhReq.responseText;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


    }  


};
function select(dato, sitio){

    xhReq.open("GET", "inicio.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    inicioConf[sitio]=dato;
    habilitarSubmit();
    agregarInicio();
}
function menu(opcion){ 

    xhReq.open("GET", opcion+".html", false);
    xhReq.send(null);
    
    document.getElementById("titulo").innerHTML='<h2>'+opcion+'<h2';
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    var myScroll;
    myScroll = new iScroll('wrapper', { hideScrollbar: true });
}
function info(dato){
    menu('infoTienda');
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>'
    document.getElementById('shop').value = 'Info ' + inicioConf['cc'];
    inicioConf['tienda']=dato;
}
function agregarInicio(){
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>'
    for (var key in inicioConf) {
        document.getElementById(key).innerHTML=inicioConf[key];
    }
} 
function submitSearch(thisButton){
    if(habilitarSubmit()){
        menu('tiendas');
        document.getElementById('shop').value = 'Info ' + inicioConf['cc'];
    }
}
function submitMapa(thisButton){

    menu('infoCC');
    document.getElementById('shop').value = 'Info ' + inicioConf['cc'];
    document.getElementById('cc-nombre').innerHTML=inicioConf['cc'];
    document.getElementById('tienda-nombre').innerHTML=inicioConf['tienda'];

   
}
function habilitarSubmit(){
    if (inicioConf['ciudad'] != 'Ciudad' && inicioConf['cc'] != 'Centro Comercial' && inicioConf['categoria'] != 'Categoria' ){
       addClass('active' , document.getElementById('search'));
       removeClass('hidden',document.getElementById('contend-search'));
       return true ;
    }
    return false;
}
function mapasSitio(){
    menu('mapasCC');
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>'
    document.getElementById('shop').value = 'Info ' + inicioConf['cc'];
}
function infoCCButon(){
    menu('ccInfo');
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>'
    
}

function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
        return;
    }
    if( cn != '' ) {
        classname = ' '+classname;
    }
    element.className = cn+classname;
}
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}