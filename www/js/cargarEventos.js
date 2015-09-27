	
	var globalData;
	
	$( document ).ready(function() {
		var UrlMyJson= 'http://www.uanl.mx/utilerias/json/eventos.php';
		//var UrlMyJson= 'http://provisionalobjetos.uanl.mx/pruebaphp.php';
		var datosJson;
		
		$.ajax({
		    url: UrlMyJson,
		    type: 'GET',
		    dataType: 'json',
		    beforeSend: function( xhr ){
		    	$(".ui-loader-default").hide();
		    	$("#contenedorEventos").empty();
		    	$('#contenedorEventos').append("<div class='advert_msg'> <img src='img/loading_spinner.gif'></img> </br> </br>Estamos trayendo los eventos más recientes, por favor espere.</div>");
		    },
		    success: function(data) { 

		    	$("#contenedorEventos").empty();

		    	globalData = data;
		    	//data = JSON.parse(data);
		    	/*
		    	------------------Formato en que se imprimen las noticias individualmente------------------
				<a href="nota_completa.html">
	                <div class="noticiaIndividual" id="43081" categoria="Académico" fecha="1436481720">
	                    <div class="contenedorMiniaturaNoticia">
	                        <div class="miniaturaNoticia"><img src="http://www.uanl.mx/sites/default/files/media/noticias/reducciones/43081-090715.jpg"></div>
	                        <div class="tituloNoticia">Continuarán formación de técnico superior en Francia</div>
	                    </div> <div class="clear"></div>
	                    <div class="resumenNoticia">Diez estudiantes de la Escuela Industrial y Preparatoria Técnica Álvaro Obregón, realizarán estancias académicas en Francia, como parte del programa de Movilidad Internacional de la UANL.</div>
	                </div>
                </a>
		    	*/

		    	//Fecha que da el dispositivo
		    	var fechaHoy = timeConverter(getUnixTime());
		    	//Fecha en la que siguen estando las noticias
		    	var fechaHastaAhora = fechaHoy;
		    	
		    	$(".contenedorFecha:last").append("");

		    	globalData[0].listaEventos.forEach(function(entry){

		    		//------------------------------ Separación por fechas------------------------------
		    // 		var fechaEnJson = timeConverter(entry.fecha);
		    // 		if(fechaHastaAhora != fechaEnJson){
		    // 			fechaHastaAhora = fechaEnJson;		    		
		    			
						// encabezadoFecha = '<div class="contenedorFecha">' +
			   //  								'<div class="fechaLista">' +
	     //                						'<img src="img/CALENDARIO.png">' +
	     //                						'<span id="fechaListaSpan">' +
						// 		                        fechaHastaAhora +
						// 		                    '</span>' +
						// 		                '</div>'+
						// 	                '</div>';

      //           		$("#contenedorEventos").append(encabezadoFecha);
	     //            }else if(fechaEnJson == fechaHoy){
	    	// 			fechaHastaAhora = "Hoy"
	    	// 			encabezadoFecha = '<div class="contenedorFecha">' +
			   //  								'<div class="fechaLista">' +
	     //                						'<img src="img/CALENDARIO.png">' +
	     //                						'<span id="fechaListaSpan">' +
						// 		                        fechaHastaAhora +
						// 		                    '</span>' +
						// 		                '</div>'+
						// 	                '</div>';

      //           		$("#contenedorEventos").append(encabezadoFecha);
	    	// 		}




		    		var eventoIndividual = "\n";
		    		eventoIndividual +='<div class="eventoIndividual eventoMiniatura" id="'+ entry.id + '" categoria="'+ entry.categoria +'" fecha="'+ entry.fecha + '" shareFB="' + entry.url +'">';
		    		eventoIndividual +='<div class="contenedorMiniaturaEvento">';
		    		eventoIndividual +='<div class="contenedorFechaEvento">';
		    		eventoIndividual +='<div class="fechaEventoCalendario"></div>';
		    		eventoIndividual +='<div class="fechaEventoCalendarioWhite"></div>';
		    		eventoIndividual +='<div class="fechaEventoCalendario"></div>';
		    		eventoIndividual +='<div class="diaEvento">'+ getDay(entry.fecha) +'</div>';
		    		eventoIndividual +='<div class="mesEvento">'+ getMonth(entry.fecha) +'</div>';
		    		eventoIndividual +='</div>';
		    		eventoIndividual +='<div class="tituloEvento">'+ entry.titulo +'</div>';
		    		eventoIndividual +='</div> <div class="clear"></div>';

		    		switch(entry.categoria){
		    			case "Académico":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/actualidad_oportunidad.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Asamblea":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/ciencia_y_tecno.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Campaña":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/responsabilidad_social.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Certamen":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/sustentabilidad.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Certificación ":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/vinculacion.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Coloquio":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/salud.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Concurso":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/estudiantil.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Conferencia":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/deporte.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Congreso":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/arte_y_cultura.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Convocatoria":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/investigacion.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Cultural":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/internacional.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Cursos":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/institucional.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Deportes":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Diplomado":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Educación":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Encuentro":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Exposición":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Jornada":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Seminario":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Simposio":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    			case "Taller":
		    				eventoIndividual += '<div class="categoriaEventos"><img src="img/GRAY/academico.png">    Categoría: ' + entry.categoria + '</div>';
		    			break;
		    		}

		    		eventoIndividual +='</div></br>';

		    		
		    		$(".contenedorEventos:last").append(eventoIndividual);
		    		var vinculo = "evento_completo.html?idEvento=" + entry.id +"&shareFB="+ entry.url + " ";
		    		$(".eventoIndividual:last").click(function(){
				      window.location.href = vinculo;
				    });

		    	});

		    	$(".ui-loader-default").hide();
		    	cargarPreferencias();
		    	
		    },
		 	error:  function(jqXHR, textStatus, errorThrown)
		 	{
		 		$("#contenedorEventos").empty();
		 		$('#contenedorEventos').append("<div class='advert_msg'><img src='img/sad_face.png'</img> </br> Lo sentimos se ha producido un error al cargar los eventos. Revise su conexion a intenet y vuelva a intentar.</div>");
		 		$('.iconMenu').css("pointer-events", "none");
			}
		});

	});


	function detectaError(jqXHR, textStatus, errorThrown)
	{
		 //document.getElementById("error").innerHTML = textStatus + " " + errorThrown;
	}

	function getUnixTime(){
		var ts = Math.round((new Date()).getTime() / 1000);
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

	function getMonth(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	  var month = months[a.getMonth()];
	  return month;
	}

	function getDay(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Enero','Febro','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' de ' + month + ' del ' + year;
	  return date;
	}