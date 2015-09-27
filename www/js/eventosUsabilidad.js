$( document ).ready(function() {

  $(".seleccionadorCategorias").hide();

	var mostrarMenu = false;
    $( "#menuLateral_icon" ).click(function() {
    	
    	if(!mostrarMenu)
    	{
    		if(mostrarCategorias)
    		{
	  			$(".seleccionadorCategorias").animate({
	  				left: "+=100%"
	  			}, 300);
          $(".seleccionadorCategorias").hide();
	  			mostrarCategorias=false;
    		}

  			$(".menuLateral").animate({
  				left: "+=90%"
  			}, 300);

  			mostrarMenu=true;
		}else{
			
  			$(".menuLateral").animate({
  				left: "-=90%"
  			}, 300);

  			mostrarMenu=false;
  		}

   	});

    var mostrarCategorias = false;
    $( "#seleccionadorCategorias_icon" ).click(function() {
    	
    	if(!mostrarCategorias)
    	{
    		if(mostrarMenu)
    		{
    			$(".menuLateral").animate({
  				left: "-=90%"
	  			}, 300);
	  			mostrarMenu=false;
    		}

        $(".seleccionadorCategorias").show();
  			$(".seleccionadorCategorias").animate({
  				left: "-=100%"
  			}, 300);
  			mostrarCategorias=true;

		}else{
  			$(".seleccionadorCategorias").animate({
  				left: "+=100%"
  			}, 300);
        $(".seleccionadorCategorias").hide();
  			mostrarCategorias=false;
  		}

   	});

    $(".seleccionadorCategorias > .opcion").click(function(){

      var seleccion = ".eventoIndividual[categoria='"+ $(this).attr("categoria") +"']";
      if($(this).children('img').attr('src') == "img/iconos/unchecked.png")
      {
        $(this).children('img').attr('src', "img/iconos/checked.png");
        $(seleccion).show();
        checkForChildren();
        actualizarPreferencias($(this).attr("categoria"), "true");

      }else{
        $(this).children('img').attr('src', "img/iconos/unchecked.png");
        $(seleccion).hide();
        checkForChildren();
        actualizarPreferencias($(this).attr("categoria"), "false");
      }
    });


    $(".menuLateral > .opcion").click(function(){

      var categoria = $(this).attr("categoria");
      $("#contenedorEventos").empty();
      var encabezado ='<div class="contenedorFecha">' +
                          '<div class="fechaLista">' +
                                        categoria +
                                    '</span>' +
                                '</div>'+
                              '</div>'; 
      $("#contenedorEventos").append(encabezado);
      mostrarCategoria(categoria);
      $("#menuLateral_icon").trigger( "click" );

    });


    $("#title_index").click(function(){
      window.location.href = "index.html";
    });

    $("#Calendario").click(function(){
      window.location.href = "busqueda_nota.html";
    });

    

});


///Trae todas las noticias de una categoría con un formato en específico
function mostrarCategoria(categoria){
  
  var tempCategoria;
  tempCategoria = categoria;

  globalData[0].listaEventos.forEach(function(entry){

    if(tempCategoria == "Todo")
    {
      window.location.href = "index.html";
    }

    if(entry.categoria == categoria)
    {
      /*La de arriba es la validación de la categoria, lo de abajo es lo mismo pero sin los encabezados de fecha y con fechas en miniatura*/
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
      eventoIndividual +='</div> <div class="clear"></div></div>';

      $(".contenedorEventos:last").append(eventoIndividual);
      var vinculo = "evento_completo.html?idEvento=" + entry.id +"&shareFB="+ entry.url + " ";
            $(".eventoIndividual:last").click(function(){
              window.location.href = vinculo;
      });
    }
  });
  
  if($(".eventoIndividual").length < 1){
    var errorMsg = "<div class='advert_msg'>No existen eventos futuros de esta categoría.</div>";
    $("#contenedorEventos").append(errorMsg);
  }
  
  
}

function cargarPreferencias(){
  var storage = window.localStorage;
  $(".seleccionadorCategorias > .opcion").each(function(){
    var seleccion = ".noticiaIndividual[categoria='"+ $(this).attr("categoria") +"']";
     var seccion = $(this).attr("categoria");
      if(window.localStorage.getItem(seccion) == "false")
      {
        $(this).children('img').attr('src', "img/iconos/unchecked.png");
        $(seleccion).hide();
        checkForChildren();

      }else if(window.localStorage.getItem(seccion) == "true"){
        $(this).children('img').attr('src', "img/iconos/checked.png");
        $(seleccion).show();
        checkForChildren();
      }else{
        $(this).children('img').attr('src', "img/iconos/checked.png");
        $(seleccion).show();
        checkForChildren();
      }
  });
}

function actualizarPreferencias(categoria, valor){
  //".seleccionadorCategorias > .opcion"
  var storage = window.localStorage;
  window.localStorage.setItem(categoria, valor);
  
}


function checkForChildren(){
  

  var contador = 0;
  $(".contenedorFecha").each(function(){
    $(this).children(".noticiaIndividual").each(function(){
    if(!$(this).is(":hidden") || $(this).css("display") != 'none')
    {
      contador++;
    }
    });  

    if(contador<1){
      $(this).hide();
    }else{
      $(this).show();
    }
    contador=0;
  });

  
/*
  $(".contenedorFecha").each(function(index, value){
    var contador = 0;

    if((this + " > *").length < 1)
    {
      this.parent().hide();
    }
    $(this).children().each(function(index, value){
      if((($(this).children(":first").css('display') != 'none') || !$(this).is(":hidden")) && ($(this).hasClass("noticiaMiniatura")))
      {
        contador++;
      }
    })

    if(contador>=1)
    {
      $(this).show();
    }else
    {
      $(this).hide();
    }
  });*/

}