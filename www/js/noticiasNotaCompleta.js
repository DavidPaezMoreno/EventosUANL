$(document).ready(function() {

        //------------------------------Regresar al index-----------------------------------------------
        $("#iconBackToIndex").click(function(){
            window.location.href = "index.html";
        });


        //------------Leer parametros de la URL-----------------

        var getUrlParameter = function getUrlParameter(sParam) {
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
        };

        var idNota = getUrlParameter('idNota');
        var linkNoticia = getUrlParameter('shareFB');



        //Prueba de idNota
        //idNota = 43373;

        var UrlMyJson= 'http://www.uanl.mx/utilerias/json/inoticias.php?id='+idNota;
        var datosJson;
        $.ajax({
            url: UrlMyJson,
            type: 'GET',
            dataType: 'json',
            success: function(data) { 

                $("#tituloNotaCompleta").append(data[0].notaCompleta.titulo);


                var cuerpoNotaTexto = data[0].notaCompleta.cuerpo;
                data[0].notaCompleta.cuerpo.replace('\n','<br/>');               
                $("#cuerpoNotaCompleta").append(data[0].notaCompleta.cuerpo + "</br>");


                function timeConverter(UNIX_timestamp){
                    var a = new Date(UNIX_timestamp * 1000);
                    var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                    var year = a.getFullYear();
                    var month = months[a.getMonth()];
                    var date = a.getDate();
                    var hour = a.getHours();
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    var time = date + ' ' + month + ' ' + year /*+ ' ' + hour + ':' + min + ':' + sec */;
                    return time;
                }

                
                $("#fechaNota").append(timeConverter(data[0].notaCompleta.fecha));

                $("#categoriaNota").append(data[0].notaCompleta.categoria);

                
                //-------------------------Agregar fotos del JSON-------------------------
                
                data[0].notaCompleta.fotosCarrusel.forEach(function(entry){
                    
                    /*var carruselFotos;

                    carruselFotos = '<a href= "http://www.uanl.mx/'+ entry.foto +'">  <div class="item"> <img src="http://www.uanl.mx/'+ entry.foto +'" align="center"/> </div> </a>';

                    $("#owl-demo").append(carruselFotos);*/

                    ///////--------------------Carrusel improvisado---------------------//////////
                    var improvisado;
                    improvisado = '<a href= "http://www.uanl.mx/'+ entry.foto +'">  <div class="carrusel_item"> <img src="http://www.uanl.mx/'+ entry.foto +'" align="center"/></div> </a>';
                    
                    $(".carrusel_improvisado").append(improvisado);
                });


                //-------------------------Agregar media del JSON-------------------------

                if(data[0].notaCompleta.mediaLinks[0].link != "")
                {
                    $("#mediaNotaCompleta").append("<div class = 'tituloLinksRelacionados'>Ligas relacionadas</div>");


                    data[0].notaCompleta.mediaLinks.forEach(function(entry){
                        var mediaNotaJSON;

                        mediaNotaJSON = '<a href= "'+ entry.link +'" class = "enlaceRelacionado">'+ entry.link +'</a> <br>';


                        $("#mediaNotaCompleta").append(mediaNotaJSON);
                    });

                    //$("#mediaNotaCompleta").append("<br><br>");
                }


                //----------------------Compartir en facebook------------------------------

                var codigoCompartiFacebook = '<a href="https://www.facebook.com/sharer/sharer.php?u='+ linkNoticia +'">';
                codigoCompartiFacebook += '<img class ="facbookShareButtton" border="0" src="img/iconos/Facebook_Share.png" alt="">';
                codigoCompartiFacebook += '</a>';
                $(".compartirFacebook").append(codigoCompartiFacebook);

                //Activar carusel

                $("#owl-demo").owlCarousel({
 
                  slideSpeed : 300,
                  paginationSpeed : 400,
                  singleItem:true,
                  autoHeight: false
         
                });

                $(".ui-loader-default").hide();
                $(".owl-controls").hide();
                $(".owl-pagination").hide();
                
            },
            error:  function(jqXHR, textStatus, errorThrown)
            {
                $(".contenedor_nota").empty();
                $('.contenedor_nota').append("<div class='contenedorNoticias' id='contenedorNoticias'><div class='advert_msg'><img src='img/sad_face.png'</img></br> Lo sentimos se ha producido un error al cargar la nota deseada. Revise su conexion a intenet y vuelva a intentar.</div></div>");
                detectaError(jqXHR, textStatus, errorThrown);
            }
        });

        

         
        });