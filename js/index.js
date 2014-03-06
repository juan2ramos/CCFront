/**
 * 
 * Define the url host where is located 
 * 
 */
var hostURLService = "http://apliko.co/apliko_ccback/apiservices/";



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
        'ciudad'    : {
            'name'          : 'Ciudad',
            'status'        : 0, 
            'nameDefualt'   : 'Ciudad'
        },
        'cc'        : {
            'name'          : 'Centro Comercial',
            'status'        : 0,
            'nameDefualt'   : 'Centro Comercial'
        },
        'categoria' : {
            'name'          : 'Categoria',          
            'status'        : 0, 
            'nameDefualt'   : 'Categoria'
        },
        'tienda'    : {
            'name'          : 'tienda',             
            'status'        : 0, 
            'nameDefualt'   : 'tienda'
        }
     };
var wrapper = document.getElementById("wrapper");
var app = {
    // Application Constructor
    
    initialize: function() {
        this.bindEvents();
        FastClick.attach(document.body);
         document.addEventListener("backbutton", onBackKeyDown, false);
        loadHome();
        checkConnection();
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
        
       app.receivedEvent('deviceready');
    },



    receivedEvent: function(id) {
          
    }
};
window.onpopstate = function(event) {
  

};
 function onBackKeyDown() {
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    for (var key in inicioConf) {  
        var label = inicioConf[key]['name'];
        if(label.indexOf("**") !== -1)
        {
            var elements = label.split('**');
            label = elements[1];
        }        
        if(key !== 'tienda')
        {
            document.getElementById(key).innerHTML = label;
        }
    }
    
    }
function loadHome(){
//    console.log('Received Event: ' + id); 
        xhReq.open("GET", "inicio.html", false);
        xhReq.send(null);
        document.getElementById("content-page").innerHTML = xhReq.responseText;
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//        
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');  
}
function select(dato, sitio){    
      xhReq.open("GET", "inicio.html", false);
      xhReq.send(null);
      document.getElementById("content-page").innerHTML=xhReq.responseText;
     
      inicioConf[sitio]['name']=dato;
      habilitarSubmit();
      agregarInicio();
}
function select_trasportType(tipoTransporte, IdCommercial){
    xhReq.open("GET", "cctrasnport_info.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
}
function menu(opcion){ 
    xhReq.open("GET", opcion+".html", false);
    xhReq.send(null);
    document.getElementById("titulo").innerHTML='<h2>'+opcion+'<h2>';
    document.getElementById("content-page").innerHTML=xhReq.responseText;    
    var myScroll;
    myScroll = new iScroll('wrapper', { hideScrollbar: true });
}
function OpenCityListView(){       
        var term = {methodname:"getcitylist"};  
         clean(0);
        $.ajax({
                url: hostURLService + "api_city.php",
                type:'POST', 
                data:term, 
                dataType:'jsonp',
                beforeSend: function () {                    
                    xhReq.open("GET", "ciudad.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Ciudad<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    console.log(data);
                    var oUL = document.getElementById('CityList');
                    for(var index in data){
                        var city = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", city.Id); 
                        oLI.setAttribute("onclick", "select('"+city.Id+"**"+city.Name+"', 'ciudad'); return false;"); 
                        oLI.appendChild(document.createTextNode(city.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
}

function OpenMallListView(){ 
    clean(1);          
    $.ajax({

                url: hostURLService + "api_mall.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getmalllistbycityid", cityid: inicioConf["ciudad"]['name'].split('**')[0] },
                beforeSend: function () {                    
                    xhReq.open("GET", "cc.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Centro Comercial<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    var oUL = document.getElementById('MallList');
                    for(var index in data){
                        var mall = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", mall.Id); 
                        oLI.setAttribute("onclick", "select('"+mall.Id+"**"+mall.Name+"', 'cc'); return false;"); 
                        oLI.appendChild(document.createTextNode(mall.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
}

function OpenMallCateogryListView(){           
    $.ajax({
                url: hostURLService + "api_mall_category.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getcategorylistbymallid", mallid: inicioConf["cc"]['name'].split('**')[0] },
                beforeSend: function () {                    
                    xhReq.open("GET", "categoria.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Categoria<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    var oUL = document.getElementById('MallCategoryList');
                    for(var index in data){
                        var mall = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", mall.Id); 
                        oLI.setAttribute("onclick", "select('"+mall.Id+"**"+mall.Name+"', 'categoria'); return false;"); 
                        oLI.appendChild(document.createTextNode(mall.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error " + textStatus);
                    alert("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
}

function OpenShopResultView(){
    
    var _mallid = inicioConf["cc"]['name'].split('**')[0];
    var _mallcategoryid =inicioConf["categoria"]['name'].split('**')[0];
    $.ajax({
                url: hostURLService + "api_shop.php",
                type: "POST",
                dataType: "json",
                data: { methodname: "getshoplistbyparams"
                    , name: "" 
                    , mallid: _mallid
                    , mallcategoryid: _mallcategoryid
                },
                beforeSend: function () {                    
                    xhReq.open("GET", "tiendas.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Tiendas<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    var oUL = document.getElementById('ShopResultList');
                    for(var index in data){
                        var shop = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", shop.Id); 
                        oLI.setAttribute("onclick", "ShopInfo('"+shop.Id+"','"+mall.Name+"'); return false;"); 
                        oLI.appendChild(document.createTextNode(mall.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
}

function info(dato){
    xhReq.open("GET","infoTienda.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'];
    inicioConf['tienda']['name']=dato;
}
function publicidad(){
    xhReq.open("GET","publicidad.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
  
    var myScroll2;
    myScroll2 = new iScroll('wrapper', { hideScrollbar: true });
}
function agregarInicio(){
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    for (var key in inicioConf) {  
        var label = inicioConf[key]['name'];
        if(label.indexOf("**") !== -1)
        {
            var elements = label.split('**');
            label = elements[1];
        }        
        if(key !== 'tienda')
        {
            document.getElementById(key).innerHTML = label;
        }
    }    
} 
function submitSearch(thisButton){
    if(habilitarSubmit()){
        OpenShopResultView();
        document.getElementById('shop').value = 'Info ' + inicioConf['tienda']['name'].split("**")[1];                
    }else{
        removeClass('hidden',document.getElementById('popUpError'));
    }
}
function submitMapa(thisButton){

    xhReq.open("GET","infoCC.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'];
    document.getElementById('cc-nombre').innerHTML=inicioConf['cc']['name'];
    document.getElementById('tienda-nombre').innerHTML=inicioConf['tienda']['name'];
}
function habilitarSubmit(){
    if (inicioConf['ciudad']['name'] !== 'Ciudad' && inicioConf['cc']['name'] !== 'Centro Comercial' && inicioConf['categoria']['name'] !== 'Categoria' ){
       addClass('active' , document.getElementById('search'));
       removeClass('hidden',document.getElementById('contend-search'));
       return true ;
    }
    return false;
}
function mapasSitio(){
    xhReq.open("GET","mapasCC.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'];
}
function comoLlegar(){
    menu('cctransport_list');
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'];
}
function infoCCButon(){
    menu('ccInfo');
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
}
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) !== -1 ) {
        return;
    }
    if( cn !== '' ) {
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
function closePopUp(){

  addClass('hidden',document.getElementById('popUpError'));
}

/*
Estados
*/  

function config(url){
    xhReq.open("GET", url+".html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("content-page").innerHTML=xhReq.responseText;

    var myScroll3;
    myScroll3 = new iScroll('wrapper', { hideScrollbar: true });
}
function okError(){
    addClass('hidden',document.getElementById('popUpError'));
}
function mapaZoom(){
    
    removeClass('hidden',document.getElementById('popUpError'));
    var myScroll1 = new iScroll('wrappers', { zoom:true });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
     document.addEventListener('DOMContentLoaded', loaded, false);
}

function checkConnection() {
            var networkState = navigator.network.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            if(networkState == Connection.NONE){
                alert("No posee Conexión a internet");
                return false;
            }
            return true;

        }

function clean (index){
    var i = 0;
    for(var key in inicioConf){ 
            if (i > index) {
                inicioConf[key]['name'] = inicioConf[key]['nameDefualt'];
                inicioConf[key]['status'] = 0;
                console.log(key);
                if(key !== 'tienda'){
                    document.getElementById(key).innerHTML = inicioConf[key]['name'];
                }
            }    
          i++;      
    }

}
function checkBack(index){
    var i = 0;
    for(var key in inicioConf){ 
            if (i == index) break;
            if (inicioConf[key]['status'] == 0)
                return false;
                
    }
    return true;
}
function mail(){
    var term= {button:"cars"}; 
    $.ajax({ 
        url:'http://apliko.co/reply.php', 
        type:'POST', 
        data:term, 
        dataType:'jsonp', 
        error:function(jqXHR,text_status,strError){ 
            alert("jajaj")
            console.log(jqXHR);
        }, 
        timeout:60000, 
        success:function(data){ 
            $("#result").html(""); 
                for(var i in data){ 
                    $("#result").append("<li>"+data[i]+"</li>"); 
                } 
            } 
        });
    }
