////Variables globales
var jsonGlobal;
var urlEvento;

$(document).ready(function($) {
	$(".ui-loader").empty();
	$(".title_index").click(function(event) {
		window.location.href = "index.html";
	});

	urlEvento = getUrlParameter("shareFB");
	LlamarEvento(getUrlParameter("idEvento"));

});//Documento ready


function LlamarEvento(eventoId){


	$.ajax({
		url: 'http://www.uanl.mx/utilerias/json/ieventos.php?id='+eventoId,
		type: 'GET',
		dataType: 'json',
		beforeSend: function( xhr ){
		    	$(".ui-loader-default").hide();
		    	$("#contenedorEventos").empty();
		    	$('#contenedorEventos').append("<div class='advert_msg'> <img src='img/loading_spinner.gif'></img> </br> Estamos trayendo los eventos próximos, por favor espere.</div>");
		},
		success: function(data){
			///Si logra traer el json lo guarda en la variable global y manda llamar la funcion para dar formato
			jsonGlobal = data;

			CrearEvento();

			console.log("success");
		},
		error: function(jqXHR, textStatus, errorThrown){
			$("#contenedorEventos").empty();
		 	$('#contenedorEventos').append("<div class='advert_msg'><img src='img/sad_face.png'</img> </br> Lo sentimos se ha producido un error al cargar las noticias. Revise su conexion a intenet y vuelva a intentar.</div>");
		}
	});
}//LlamarEvento

function CrearEvento(){
	var eventoHTML="";

	$('#contenedorEventos').empty();

	//////////////////--------------Formato del evento en html-----------------//////////////////////
	/*
	<div class="tituloEvento">Arca Mash Up de Periodismo "Los Cuadros Negros"</div>
    <div class="tituloEvento notFixed">Arca Mash Up de Periodismo "Los Cuadros Negros"</div>

    <div class="titulosEvento"><img src="img/iconos/location.png">  Lugar del Evento</div>
    <div class="lugarEvento">
        <div class="lugar">ARCA</div>
        <div id="map"></div>
        <div class="direccion">
            Avenida ChapultepecNo. 18, Col. Doctores, Del. Cuauhtémoc, C.P. 06720, México, D.F.
        </div>
    </div>
    <div class="titulosEvento"> <img src="img/iconos/calendar.png">  Fecha</div>
    <div class="rangoFechasEvento">
        <div class="rango fechaInicio">Sep 23</div>
        <div class="rango separadorFecha">-</div>
        <div class="rango fechaFin">Sep 25</div>
    </div>
    <div class="horaEvento titulosEvento">
        <img src="img/iconos/clockWhite.png">  Hora: 10:00hrs
    </div>

    <div class="titulosEvento">
        <img src="img/iconos/text.png">  Descripcion
    </div>

    <div class="descripcionEvento">
        Con el objetivo de impulsar a la comunidad universitaria de nuestras instituciones socias, es un gusto invitar a tu comunidad estudiantil a participar en el Arca Mash Up de Periodismo  \"Los Cuadros Negros\". El Arca Mash Up de Periodismo busca poner en contacto a jóvenes periodistas con maestros internacionales que trazaron nuevas y exitosas rutas en este oficio; y, también, a partir de una minuciosa selección de trabajos, poder dar retroalimentación a los participantes para que puedan desarrollar su proyecto más allá de las conferencias.  Dirigido a: Estudiantes, profesionistas y jóvenes con gusto por el periodismo, de 18 a 25 años.Fecha Límite: el día 18 de Septiembre a las 13:00 hrs tiempo de la Ciudad de México.  Se seleccionarán 10 jóvenes cronistas y 5 fotógrafos que tendrán la oportunidad de viajar a la Ciudad de México para escribir una crónica y fotografiar una historia, durante dos días (12 y 13 de octubre). La historia deberá ser sobre la Ciudad de México y, como punto de partida, el tema debe ser la oscuridad. El día 14 de octubre se celebrará el Arca MashUp de Periodismo, en el cual los maestros cronistas Artur Domoslawski (Polonia), Joshuah Bearman (Estados Unidos) y Günter Wallraff (Alemania), así como los fotógrafos Antonio Turok (México) e Yvonne Venegas (México) darán charlas y evaluarán directamente con los jóvenes seleccionados su material. Las crónicas y fotos se publicarán en una edición especial impresa de Máspormás en el Distrito Federal.Los universitarios deben enviar una crónica inédita firmada con su seudónimo o contar con por lo menos una publicación en algún medio digital o impreso y enviar sus documentos y fotos a: mashup@agenciabengala.com.Para conocer los detalles sobre esta convocatoria visita: https://mx.universianews.net/2015/08/31/participa-en-la-convocatoria-a-este-arca-mash-up-de-periodismo-los-cuadros-negros/.
    </div>
    <div class="titulosEvento"> <img src="img/iconos/link.png">  Ligas relacionadas</div>
    <div class="ligasRelacionadas">
        <div class="ligaRelacionada">http://www.arca-lab.com/arca-mashup-de-periodismo-2015/</div>
        <div class="ligaRelacionada">https://mx.universianews.net/2015/08/31/participa-en-la-convocatoria-a-este-arca-mash-up-de-periodismo-los-cuadros-negros/</div>
    </div>

    <a href="https://www.facebook.com/sharer/sharer.php?u='+ linkNoticia +'">
        <img class ="facbookShareButtton" src="img/iconos/Facebook_Share.png" alt="">
    </a>
    */
	eventoHTML+='<div class="tituloEventoCompleto">'+ jsonGlobal[0].evento.titulo +'</div>';
	eventoHTML+='<div class="tituloEventoCompleto notFixed">'+ jsonGlobal[0].evento.titulo +'</div>';
	eventoHTML+='<div class="titulosEvento"><img src="img/iconos/location.png">  Lugar del Evento</div>'
	eventoHTML+='<div class="lugarEvento"><div class="lugar">'+jsonGlobal[0].evento.lugar+'</div><div id="map"></div><div class="direccion">'+jsonGlobal[0].evento.direccion+'</div></div>'
	
	///Comprobamos si las dos fechas son iguales para que no sea un rango entre euna misma fecha
	if(timeConverter(jsonGlobal[0].evento.fechaInicio) == timeConverter(jsonGlobal[0].evento.fechaConclusion)){
		eventoHTML+='<div class="rangoFechasEvento">'+ timeConverter(jsonGlobal[0].evento.fechaInicio) +'</div>'
	}else{
		eventoHTML+='<div class="rangoFechasEvento"><div class="rango fechaInicio">'+timeConverter(jsonGlobal[0].evento.fechaInicio)+'</div>';
		eventoHTML+='<div class="rango separadorFecha">-</div><div class="rango fechaFin">'+timeConverter(jsonGlobal[0].evento.fechaConclusion)+'</div></div>';
	}

	eventoHTML+='<div class="horaEvento titulosEvento"><img src="img/iconos/clockWhite.png">  Hora: '+jsonGlobal[0].evento.hora+'hrs</div>';
	eventoHTML+='<div class="titulosEvento"><img src="img/iconos/text.png">  Descripcion</div>';
	eventoHTML+='<div class="descripcionEvento">'+ jsonGlobal[0].evento.descripcionEvento +'</div>';

	////Revisamos si hay ligas relacionadas y cargamos las mismas
	if (jsonGlobal[0].evento.ligasRelacionadas.length > 0){
		eventoHTML+='<div class="titulosEvento"> <img src="img/iconos/link.png">  Ligas relacionadas</div><div class="ligasRelacionadas">';
		jsonGlobal[0].evento.ligasRelacionadas.forEach(function(entry){
			eventoHTML+='<div class="ligaRelacionada">'+entry.urlLiga+'</div>';
		});
		eventoHTML+='</div>'
	}

	eventoHTML+='<a href="https://www.facebook.com/sharer/sharer.php?u='+ urlEvento +'"><img class ="facbookShareButtton" src="img/iconos/Facebook_Share.png" alt=""></a>';

	/*eventoHTML+= '<a href="https://twitter.com/share" class="twitterShareButtton twitter-share-button" data-text="'+ jsonGlobal[0].evento.titulo +'" data-url="'+ urlEvento +'" data-align="right" data-count="none"><img class ="twitterShareButtton" src="img/iconos/Facebook_Share.png" alt=""></a>';
                !function(d,s,id){
                    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";
                    if(!d.getElementById(id)){
                        js=d.createElement(s);
                        js.id=id;
                        js.src=p+"://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js,fjs);
                    }
                }
                (document, "script", "twitter-wjs");*/

	eventoHTML+= '<a href="http://twitter.com/intent/tweet?status='+ jsonGlobal[0].evento.titulo +'+'+ urlEvento +'""> <img class ="twitterShareButtton" src="img/iconos/Twitter_Share.png" alt=""> </a>';

            
//<a href="https://twitter.com/share" class="twitter-share-button" data-text="Uanl" data-count="none" data-dnt="true">Tweet</a>
//<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

// <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.uanl.mx/eventos/cursos/taller-gestion-efectiva-en-tus-almacenes-de-inventarios.html" data-count="none">Tweet</a>
// <script>
// 	!function(d,s,id){
// 	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
// 		if(!d.getElementById(id)){
// 			js=d.createElement(s);
// 			js.id=id;
// 			js.src=p+'://platform.twitter.com/widgets.js';
// 			fjs.parentNode.insertBefore(js,fjs);
// 		}
// 	}
// 	(document, 'script', 'twitter-wjs');
// 		</script>

	$("#contenedorEventos").append(eventoHTML);



	TraerMapa(jsonGlobal[0].evento.direccion);


}////CrearEvento

function TraerMapa(lugar){
	var urlMapa = "http://maps.google.com/maps/api/geocode/json?address="+ lugar +"&sensor=false";
	$.ajax({
		url: urlMapa,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(data) {
		var jsonGeo = data;
		if(jsonGeo.status!='ZERO_RESULTS'){
			var mapCanvas = document.getElementById('map');
	        var mapOptions = {
	          center: new google.maps.LatLng(jsonGeo.results[0].geometry.location.lat, jsonGeo.results[0].geometry.location.lng),
	          zoom: 16,
	          mapTypeId: google.maps.MapTypeId.ROADMAP,
	        }
	        var map = new google.maps.Map(mapCanvas, mapOptions);
    	}else{
    		$('#map').attr('style', 'background-image: url("img/iconos/notlocation.png");background-repeat: no-repeat;background-position: center center;');
    	}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}///Traer Mapa


function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month;
	  return time;
	}


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
            }
}