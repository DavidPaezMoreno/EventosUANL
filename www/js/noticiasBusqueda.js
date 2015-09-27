var datosJson;
var falloConexion = false; //Para fallo de conexion

$( document ).ready(function() {
	var UrlMyJson= 'http://www.uanl.mx/utilerias/json/noticias.php';

	//------------------------------Regresar al index-----------------------------------------------
	$("#iconBackToIndex").click(function(){
        window.location.href = "index.html";
    });

	$.ajax({
	    url: UrlMyJson,
	    type: 'GET',
	    dataType: 'json',
	    success: function(data) { 

	    	datosJson = data;
	    	

	    	//Fecha que da el dispositivo
	    	var fechaHoy = timeConverter(getUnixTime());

	    	//Fecha en la que siguen estando las noticias
	    	var fechaHastaAhora = fechaHoy;

	    	var indice=0;

	    	data[0].listaNoticias.forEach(function(entryJson){

	    		datosJson[0].listaNoticias[indice].fecha = timeConverter(entryJson.fecha);

	    		indice++;

	    		
	    	}); //-----------------------End of forEach----------------------------------------------


	    	$(".ui-loader-default").hide();
	    	
	    }, //----------------------------End of Success ---------------------------------------------



	 	error:  function(jqXHR, textStatus, errorThrown)
	 	{
	 		falloConexion = true;
	 		$(".contenedorNoticias").empty();
	 		$(".contenedorNoticias").append("<div class='advert_msg'><img src='img/sad_face.png'</img> </br> Lo sentimos se ha producido un error al cargar las noticias. Revise su conexion a intenet y vuelva a intentar.</div>");
		}
	}); //-------------------------------End of AJAX-------------------------------------------------

	$("#iconCalendar").click(function(){
	    //$(".contenedor_por_fecha").show();

	    if(falloConexion == false)
	    {

		    $("#fechaListaSpan").empty();
		    $("#fechaListaSpan").append("Selecciona un fecha");

		    $(".resultadoBusqueda").show();
		    $(".contenedorCalendario").show();
		    $(".noticiasResultado").empty();
		    $(".resultadoBusqueda").empty();
		}
		else 
		{
			var vinculo = "busqueda_nota.html"; //En caso de fallo de conexion vuelve a cargar la página
		    window.location.href = vinculo;		    
		}

	});//--------------------------------End of show/Hide calendar button----------------------------


	$("#datePicker").datepicker({
		maxDate: '+0d',
		minDate: '-1m',
    	altFormat: '@',
    	dateFormat: '@',
    	onSelect: function(date)
    	{
    		var fechaElegida = timeConverter(getUnixTime(date));
            var encontroNoticia = false;
            
            var indiceId = 0;
            datosJson[0].listaNoticias.forEach(function(entry){
	             //Aqui va a ir un if que se vuelva true en caso de encontrar una nota en esa fecha
	    		if(fechaElegida == entry.fecha)
	    		{
	    			$(".contenedorCalendario").hide();
	    			$(".resultadoBusqueda").hide();

	    			$("#fechaListaSpan").empty();
	    			$("#fechaListaSpan").append(entry.fecha);

	    			//$(".contenedor_por_fecha").hide();

	    			var noticiaIndividual;

		    		noticiaIndividual ='<div class="noticiaIndividual" id="'+ datosJson[0].listaNoticias[indiceId].id + '" categoria="'+ entry.categoria +'" fecha="'+ entry.fecha +'">';
		    		noticiaIndividual +='<div class="contenedorMiniaturaNoticia">';
		    		noticiaIndividual +='<div class="miniaturaNoticia"><img src="http://www.uanl.mx/'+ entry.foto +'"></div>';
		    		noticiaIndividual +='<div class="tituloNoticia">'+ entry.titulo +'</div>';
		    		noticiaIndividual +='</div> <div class="clear"></div>';
		    		noticiaIndividual +=' <div class="resumenNoticia">'+ entry.resumen +'</div>';

		    		switch(entry.categoria){
		    			case "Actualidad / Realidad / Oportunidad":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/actualidad_oportunidad.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Ciencia y tecnología":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/ciencia_y_tecno.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Responsabilidad social":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/responsabilidad_social.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Sustentabilidad":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/sustentabilidad.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Vinculación ":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/vinculacion.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Salud":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/salud.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Estudiantiles":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/estudiantil.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Deportes":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/deporte.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Arte y cultura":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/arte_y_cultura.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Investigación":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/investigacion.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Internacional":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/internacional.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Institucional":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/institucional.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Académico":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/academico.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;


		    		}

		    		noticiaIndividual +='</div>';
		    		



		    		 
	    			$(".noticiasResultado").append(noticiaIndividual);
				    var vinculo = "nota_completa.html?idNota=" + datosJson[0].listaNoticias[indiceId].id +"&shareFB="+ entry.url + " ";
				    $(".noticiaIndividual:last").click(function(){
				        window.location.href = vinculo;
				    });
	    		}
	    		else
	    		{
	    			$(".resultadoBusqueda").empty();
	    			$(".resultadoBusqueda").append("<br><br><br>No hay noticias en esta fecha: " + fechaElegida);
	    		}

	    		indiceId++;
    		});
        }
    }); //-------------------------------End of date picker.onSelect---------------------------------


});//------------------------------------End of document.ready()-------------------------------------

	


	function detectaError(jqXHR, textStatus, errorThrown)
	{
		 //document.getElementById("error").innerHTML = textStatus + " " + errorThrown;
	}

	function getUnixTime(date){
		var ts = Math.round(date / 1000);
		return ts;
	}

	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Enero','Febro','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' de ' + month + ' del ' + year;
	  return time;
	}