/**
 * 
 * Define the url host where is located 
 * 
 */
var hostURLService = "http://apliko.co/apliko_ccback/apiservices/";
var hostURLBack = "http://apliko.co/apliko_ccback/";




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
 cityDefault = "default",
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
        loadHome();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
       app.receivedEvent('deviceready');
       checkConnection();
       if(window.localStorage.getItem("cityDefault") != null){
            cityDefault = window.localStorage.getItem("cityDefault");
            inicioConf['ciudad']['name']=cityDefault;
            inicioConf['ciudad']['status']=1;
            agregarInicio();
       }
       navigator.screenOrientation.set('portrait');
  


    },



    receivedEvent: function(id) {
          FastClick.attach(document.body);
         document.addEventListener("backbutton", onBackKeyDown, false);

        
    }
};
window.onpopstate = function(event) {
  

};
 
 function onBackKeyDown() {
    xhReq.open("GET", "inicio.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML = xhReq.responseText;
    ShopSearchByName = "";
    SetPromoImage("general",null);
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    agregarInicio();
    
    }
function loadHome(){
        xhReq.open("GET", "inicio.html", false);
        xhReq.send(null);
        document.getElementById("content-page").innerHTML = xhReq.responseText
        SetPromoImage("general",null);  
}
function select(dato, sitio){    
      xhReq.open("GET", "inicio.html", false);
      xhReq.send(null);
      document.getElementById("content-page").innerHTML=xhReq.responseText;     
      inicioConf[sitio]['name']=dato;
      inicioConf[sitio]['status']=1;
            SetPromoImage("general",null);
      habilitarSubmit();
      agregarInicio();
}
function select_trasportType(tipoTransporte, IdCommercial){
     $.ajax({
                url: hostURLService + "api_mall_transport.php",
                type:'POST', 
                data: { methodname: "getmalltransportbytype"
                    , mallid: IdCommercial
                    , type: tipoTransporte
                }, 
                dataType:'jsonp',
                beforeSend: function () {  
                    removeClass('hidden',document.getElementById('load-element'));                   
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                    xhReq.open("GET", "cctrasnport_info.html", false);
                    xhReq.send(null);
                    document.getElementById("content-page").innerHTML = xhReq.responseText;
                    document.getElementById("contend-transport").innerHTML = data[0].Description;
                    document.getElementById("header-transport").innerHTML = "<h3>" + tipoTransporte.toUpperCase() + "</h3>";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });    
            SetPromoImage("mall",IdCommercial);  
}
function menu(opcion){ 
    xhReq.open("GET", opcion+".html", false);
    xhReq.send(null);
    document.getElementById("titulo").innerHTML='<h2>'+opcion+'<h2>';
    document.getElementById("content-page").innerHTML=xhReq.responseText;    
    var myScroll;
    myScroll = new iScroll('wrapper', { hideScrollbar: true });
    SetPromoImage("general",null);  
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
                removeClass('hidden',document.getElementById('load-element'));  
                                  
                    xhReq.open("GET", "ciudad.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Ciudad<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element'));
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
            SetPromoImage("general",null);  
}

function OpenMallListView(){ 
    clean(1);       
    if(checkBack(1)){  
    $.ajax({

                url: hostURLService + "api_mall.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getmalllistbycityid", cityid: inicioConf["ciudad"]['name'].split('**')[0] },
                beforeSend: function () {                    
                     removeClass('hidden',document.getElementById('load-element')); 
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                    xhReq.open("GET", "cc.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Centro Comercial<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                   
                    var oUL = document.getElementById('MallList');
                    for(var index in data){
                        var mall = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", mall.Id); 
                        oLI.setAttribute("onclick", "select('"+mall.Id+"**"+mall.Name+"', 'cc'); return false;"); 
                        oLI.appendChild(document.createTextNode(mall.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
    }else{
        removeClass('hidden',document.getElementById('popUpError'));
        document.getElementById('error-message').innerHTML = "Debes seleccionar la ciudad";
    
    }
    SetPromoImage("general",null);  
}

function OpenMallCateogryListView(){
    if(checkBack(2)){            
    $.ajax({
                url: hostURLService + "api_mall_category.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getcategorylistbymallid", mallid: inicioConf["cc"]['name'].split('**')[0] },
                beforeSend: function () {                    
                    removeClass('hidden',document.getElementById('load-element')); 
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                    if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay categorías";
                    }else{
                        xhReq.open("GET", "categoria.html", false);
                        xhReq.send(null);
                        document.getElementById("titulo").innerHTML='<h2>Categoria<h2>';
                        document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    
                        var oUL = document.getElementById('MallCategoryList');
                        for(var index in data){
                            var mall = data[index];
                            var oLI = document.createElement('li');
                            oLI.setAttribute("id", mall.Id); 
                            oLI.setAttribute("onclick", "select('"+mall.Id+"**"+mall.Name+"', 'categoria'); return false;"); 
                            oLI.appendChild(document.createTextNode(mall.Name));
                            oUL.insertBefore(oLI, oUL.childNodes[0]);
                        }
                        SetPromoImage("mall",inicioConf["cc"]['name'].split('**')[0]);  
                        var myScroll;
                      myScroll = new iScroll('wrapper', { hideScrollbar: true });
                    }
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error " + textStatus);
                    alert("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
    }else{
        removeClass('hidden',document.getElementById('popUpError'));
        document.getElementById('error-message').innerHTML = "Debes seleccionar todas las opciones";        
    }
}

var ShopSearchByName = "";
function OpenShopResultView(){
    var _mallid = inicioConf["cc"]['name'].split('**')[0];
    var _mallcategoryid =inicioConf["categoria"]['name'].split('**')[0];
    $.ajax({
                url: hostURLService + "api_shop.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getshoplistbyparams"
                    , name: "" 
                    , mallid: _mallid
                    , mallcategoryid: _mallcategoryid
                },
                beforeSend: function () { 
                    removeClass('hidden',document.getElementById('load-element'));                    
                     },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                     if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay tiendas.";
                    }else{
                        xhReq.open("GET", "tiendas.html", false);
                        xhReq.send(null);
                        document.getElementById("titulo").innerHTML='<h2>Tiendas<h2>';
                        document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    
                        var oUL = document.getElementById('ShopResultList');
                        for(var index in data){
                            var shop = data[index];
                            var oLI = document.createElement('li');
                            oLI.setAttribute("id", shop.Id); 
                            oLI.setAttribute("onclick", "OpenShopInfoView('"+shop.Id+"','"+shop.Name+"'); return false;"); 
                            oLI.appendChild(document.createTextNode(shop.Name));
                            oUL.insertBefore(oLI, oUL.childNodes[0]);
                        }
                        document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'].split("**")[1];
                        document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");
                        SetPromoImage("mall",inicioConf["cc"]['name'].split('**')[0]);  
                        var myScroll;
                        myScroll = new iScroll('wrapper', { hideScrollbar: true });
                        document.getElementById('back').setAttribute("onclick", "onBackKeyDown(); return false;");    
               
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

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function OpenShopInfoView(_ShopId, _ShopName){    
    var MallId;
    var MallName;
    $.ajax({
                url: hostURLService + "api_shop.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getshopinfo"
                    , shopid: _ShopId
                },
                beforeSend: function () {                                        
                    removeClass('hidden',document.getElementById('load-element')); 
                },
                success: function (data) {    
                    addClass('hidden',document.getElementById('load-element'));                 
                    xhReq.open("GET", "InfoTienda.html", false);
                    xhReq.send(null);    
                    document.getElementById("titulo").innerHTML='<h2>'+_ShopName+'<h2>';  
                    var template = xhReq.responseText;
                    
                     if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay información.";
                    }else{                  
                        var oUL = "<ul id='ShopDetails'>";
                        for(var index in data){
                            var detail = data[index];
                            switch (detail.Name){
                                case "logo":                                    
                                    template = replaceAll("%logofilename%",detail.Contend, template);
                                    break;
                                case "map":
                                    template = replaceAll("%mapfilename%",detail.Contend,template);
                                    break;
                                case "BasicInfo":
                                    var basicinfo = detail.Contend.split("**");  
                                    inicioConf['tienda']['name']=detail.ShopId + "**" + basicinfo[0];
                                    inicioConf['tienda']['status']=1;
                                    template = replaceAll("%name%",basicinfo[0],template);
                                    template = replaceAll("%local%",basicinfo[1],template);
                                    MallId = basicinfo[2];
                                    MallName = basicinfo[3];
                                    template = replaceAll("%mallid%",MallId,template);
                                    template = replaceAll("%mallname%",MallName,template);
                                    break;
                                default:
                                    oUL += "<li>" + detail.Name + ": " + detail.Contend +"</li>";
                                    break;
                            }  
                        }                        
                        oUL += "</ul>";
                        template = replaceAll("%shopdetails%",oUL,template);
                    }
                    
                    if(ShopSearchByName === "")
                    {                    
                        document.getElementById('back').setAttribute("onclick", "OpenShopResultView(); return false;");
                    }
                    else
                    {
                        document.getElementById('back').setAttribute("onclick", "onBackKeyDown(); return false;");                              
                    }
                    document.getElementById("content-page").innerHTML = template; 
                    document.getElementById('shop').value = 'Info ' + MallName;
                    document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+MallId+"'); return false;");
                    SetPromoImage("shop",_ShopId);  
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
}

function SearchShopByName(){
    
    var shopName = document.getElementById('ShopName').value;
    ShopSearchByName = shopName;
    if(typeof shopName !== 'Undefinded' && shopName !== ""){
     $.ajax({
                url: hostURLService + "api_shop.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getshoplistbyparams"
                    , name: shopName 
                    , mallid: ""
                    , mallcategoryid: ""
                },
                beforeSend: function () { 
                    removeClass('hidden',document.getElementById('load-element'));                    
                     },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                     if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay tiendas.";
                    }else{
                        xhReq.open("GET", "tiendas.html", false);
                        xhReq.send(null);
                        document.getElementById("titulo").innerHTML='<h2>Tiendas<h2>';
                        document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    
                        var oUL = document.getElementById('ShopResultList');
                        for(var index in data){
                            var shop = data[index];
                            var oLI = document.createElement('li');
                            oLI.setAttribute("id", shop.Id); 
                            oLI.setAttribute("onclick", "OpenShopInfoView('"+shop.Id+"','"+shop.Name+"'); return false;"); 
                            oLI.appendChild(document.createTextNode(shop.Name + " - " + shop.MallName));
                            oUL.insertBefore(oLI, oUL.childNodes[0]);
                        }
                        document.getElementById('shop').style.display="none";                       
                        var myScroll;
                        myScroll = new iScroll('wrapper', { hideScrollbar: true });
                        CheckShopSearchByName = true;
               
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });   
            SetPromoImage("general",null);  
    }
    
}

function OpenCCInfoView(_MallId){    
    $.ajax({
                url: hostURLService + "api_mall.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getmallbyid"
                    , mallid: _MallId
                },
                beforeSend: function () {                                        
                    removeClass('hidden',document.getElementById('load-element'));
                },
                success: function (data) {  
                    addClass('hidden',document.getElementById('load-element'));                  
                    xhReq.open("GET", "ccInfo.html", false);
                    xhReq.send(null);                        
                    var template = xhReq.responseText;
                    
                     if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay información.";
                    }else{      
                        var mall = data[0];
                        document.getElementById("titulo").innerHTML='<h2>'+mall.Name+'<h2>';  
                        template = replaceAll("%logofilename%",mall.LogoFileName, template);
                        template = replaceAll("%name%",mall.Name, template);
                        template = replaceAll("%address%",mall.Address, template);
                        template = replaceAll("%phonenumbers%",mall.PhoneNumbers, template);
                        template = replaceAll("%horary%",mall.Horary, template);
                        template = replaceAll("%description%",mall.Description, template);                        
                        template = replaceAll("%mallid%",mall.Id, template);
                    }
                    
                    document.getElementById("content-page").innerHTML = template; 
                    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'].split("**")[1];
                    document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");                                        
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
            SetPromoImage("mall",_MallId);  
}

function GetShopMapView(_logofilename,_mapfilename,_MallId,_MallName){
    xhReq.open("GET","mapatienda.html", false);
    xhReq.send(null);
    var template = xhReq.responseText;
    template = replaceAll("%logofilename%",_logofilename,template);
    template = replaceAll("%mapfilename%",_mapfilename,template);
    document.getElementById("content-page").innerHTML=template;
    //document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    if(_MallId === null){
       _MallId = inicioConf['cc']['name'].split("**")[0];
       _MallName = inicioConf['cc']['name'].split("**")[1];
    }
    document.getElementById('shop').value = 'Info ' + _MallName;
    document.getElementById('back').setAttribute("onclick", "OpenShopInfoView('"+inicioConf['tienda']['name'].split("**")[0]+"', '"+inicioConf['tienda']['name'].split("**")[1]+"'); return false;");
    document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+_MallId+"'); return false;");
    document.getElementById('tienda-nombre').innerHTML=inicioConf['tienda']['name'].split("**")[1];
    document.getElementById('tienda-nombre').innerHTML=inicioConf['tienda']['name'].split("**")[1];
    SetPromoImage("mall",_MallId);  
}

function info(dato){
    xhReq.open("GET","infoTienda.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'];
    document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");
    inicioConf['tienda']['name']=dato;
    SetPromoImage("general",null);  
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
        document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'].split("**")[1];                
        document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");
    }else{
        removeClass('hidden',document.getElementById('popUpError'));
    }
}
function submitMapa(thisButton){

    xhReq.open("GET","infoCC.html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
    document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'].split("**")[1];
    document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");
    document.getElementById('cc-nombre').innerHTML=inicioConf['cc']['name'].split("**")[1];
    document.getElementById('tienda-nombre').innerHTML=inicioConf['tienda']['name'].split("**")[1];
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
    var _mallid = inicioConf["cc"]['name'].split('**')[0];
    var _mallcategoryid =inicioConf["categoria"]['name'].split('**')[0];
    $.ajax({
                url: hostURLService + "api_mall.php",
                type: "POST",
                dataType: "jsonp",
                data: { methodname: "getmalluisbyid"
                    , mallid: _mallid
                },
                beforeSend: function () {  
                removeClass('hidden',document.getElementById('load-element'));                                      
                },
                success: function (data) {
                     addClass('hidden',document.getElementById('load-element'));
                     if ($.isEmptyObject(data)) {
                        onBackKeyDown();
                        removeClass('hidden',document.getElementById('popUpError'));
                        document.getElementById('error-message').innerHTML = "No hay tiendas.";
                    }else{
                        xhReq.open("GET","mapasCC.html", false);
                        xhReq.send(null);
                        var template = xhReq.responseText;                        
                        var imagesdiv = "";
                        var popupdiv = "";
                        var i = 0;

                        for(var floor in data){
                            imagesdiv += "<figure class=\"logo-cc\" onclick=\"mallfloorZoom('"+data[floor].SourceName+"'); return false;\">";
                            imagesdiv += "<img src=\""+hostURLBack+"img/upload_images/levels_map_mall/"+data[floor].ImageFileName+"\" alt=\"\"></figure>";                                        		                 	
                            popupdiv += "<div id=\""+data[floor].SourceName+"\" class=\"popUp-image hidden\" ><div id=\"close\" onclick=\"dymClosePopUp('"+data[floor].SourceName+"'); return false;\">X</div>";
                            popupdiv +="<figure id='image-zoom'><div id='wrappere'><div id='scroller'><img src=\""+hostURLBack+"img/upload_images/levels_map_mall/"+data[floor].ImageFileName+"\" alt=\"\"></div></div></figure></div>"
                            i++;
                        }
                    
            

                        template = replaceAll("%imagesdiv%",imagesdiv,template);
                        template = replaceAll("%popupdiv%",popupdiv,template);
                        document.getElementById("content-page").innerHTML=template;
                        document.getElementById("titulo").innerHTML='<figure id="logo"><img  src="img/imagotipo.png"></figure>';
                        document.getElementById('shop').value = 'Info ' + inicioConf['cc']['name'].split("**")[1];
                        document.getElementById('shop').setAttribute("onclick", "OpenCCInfoView('"+inicioConf['cc']['name'].split("**")[0]+"'); return false;");
                        SetPromoImage("mall",_mallid);  
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
function comoLlegar(){
    xhReq.open("GET", "cctransport_list.html", false);
    xhReq.send(null);
    document.getElementById("titulo").innerHTML='<h2>Transporte<h2>';
    var template = xhReq.responseText;
    template = replaceAll("%mallid%",inicioConf['cc']['name'].split("**")[0],template);
    document.getElementById("content-page").innerHTML=template;    
    SetPromoImage("mall",inicioConf['cc']['name'].split("**")[0]);  
    var myScroll;
    myScroll = new iScroll('wrapper', { hideScrollbar: true });    
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

function dymClosePopUp(poUpName){
 addClass('hidden',document.getElementById(poUpName));
}

/*
Estados
*/  

function config(url){
    if(url != 'config-apliko'){
        document.getElementById('back').setAttribute("onclick", "config('config-apliko'); return false;");
    }else{
      document.getElementById('back').setAttribute("onclick", "onBackKeyDown(); return false;");  
    }
    
    xhReq.open("GET", url+".html", false);
    xhReq.send(null);
    document.getElementById("content-page").innerHTML=xhReq.responseText;
    if(url=='configuracion'){

        document.getElementById("cityDefault").innerHTML=cityDefault;
    }

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

function mallfloorZoom(popAppName){    
    removeClass('hidden',document.getElementById(popAppName));
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
            console.log(i + " -- " + index);
            if (inicioConf[key]['status'] == 0){
                return false;
            }
             i++;   
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
function loading(){
    var template = "";
    
}    

function OpenCityConfigurationView(){                  
        $.ajax({
                url: hostURLService + "api_city.php",
                type:'POST', 
                data:{methodname:"getcitylist"}, 
                dataType:'jsonp',
                beforeSend: function () {
                    removeClass('hidden',document.getElementById('load-element'));                                    
                    xhReq.open("GET", "ciudad.html", false);
                    xhReq.send(null);
                    document.getElementById("titulo").innerHTML='<h2>Ciudad<h2>';
                    document.getElementById("content-page").innerHTML=xhReq.responseText;    
                    var myScroll;
                    myScroll = new iScroll('wrapper', { hideScrollbar: true });
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element'));
                    var oUL = document.getElementById('CityList');
                    for(var index in data){
                        var city = data[index];
                        var oLI = document.createElement('li');
                        oLI.setAttribute("id", city.Id); 
                        oLI.setAttribute("onclick", "selectcitydefault('"+city.Id+"**"+city.Name+"', 'ciudad'); return false;"); 
                        oLI.appendChild(document.createTextNode(city.Name));
                        oUL.insertBefore(oLI, oUL.childNodes[0]);
                    }
                    document.getElementById('back').setAttribute("onclick", "config('config-apliko'); return false;"); 
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error " + textStatus);
                    console.log("Error" + errorThrown);
                },
                complete: function () {
                    
                }
            });
            SetPromoImage("general",null);  
}
function selectcitydefault(cityDefault){
    cityDefault = window.localStorage.setItem("cityDefault", cityDefault);
    document.getElementById("cityDefault").innerHTML= cityDefault.split('**')[0];
    config('configuracion');
}
function SetPromoImage(_type,_targetid){
    $.ajax({
                url: hostURLService + "api_promo.php",
                type:'POST', 
                data:{methodname:"getpromobytypeandtargetid",type:_type,targetid:_targetid}, 
                dataType:'jsonp',
                beforeSend: function () {
                     removeClass('hidden',document.getElementById('load-element')); 
                },
                success: function (data) {
                    addClass('hidden',document.getElementById('load-element')); 
                    var promo = document.getElementById('promo_image');
                    if(promo !== null && !$.isEmptyObject(data)){
                        var image = data[0];
                         document.getElementById('promo_image').setAttribute("src", hostURLBack+"img/upload_promo/"+_type+"/"+image.ImageFileName.toLowerCase());
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