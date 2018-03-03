

$(document).ready(function(){
	$("#contentContainer a").mouseenter(function(){
		$(this).animate({"font-size": "+=2"}, 100);
	});
	$("#contentContainer a").mouseleave(function(){
		$(this).animate({"font-size": "-=2"}, 100);
	});
	


});


