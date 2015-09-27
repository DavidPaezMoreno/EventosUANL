var gloabalData;
jQuery(document).ready(function($) {
	$.ajax({
	url: 'www.uanl.mx/utilerias/json/noticias.php',
	type: 'get',
	dataType: 'text',
	})
	.done(function(data) {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

});


function IsJsonValid(json){

}