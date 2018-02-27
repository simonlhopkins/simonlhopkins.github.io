var GIPHY_KEY= "71bbc0c441f944d3aa56688b89136d3e";
//data["data"][0]["url"]
var gifTest;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

$(document).ready(function(){
	
	var headerQ = "video game";
	var bodyQ="background"
	
	$.get("http://api.giphy.com/v1/gifs/trending?api_key=71bbc0c441f944d3aa56688b89136d3e", function(data){
		console.log(data["data"][getRandomInt(0,24)]);
		var url=data["data"][getRandomInt(0,24)]["images"]["original"]["url"];
		console.log(url);
		$('.topBar').css("background-image", "url("+url+")");

	})
	$.get("http://api.giphy.com/v1/gifs/random?api_key=71bbc0c441f944d3aa56688b89136d3e&tag='+"+bodyQ, function(data){
		console.log(data);
		var url= data["data"]["image_url"];
		$('body').css("background-image", "url("+url+")");

	})
	$(".menuOption").mouseenter(function(){
		$(this).animate({backgroundColor: 'red'}, 200);

	});
	$(".menuOption").mouseleave(function(){
		$(this).animate({backgroundColor: 'white'}, 200);

	});

	$("#gameScreenShot").mouseenter(function(){
		$("h3").css("visibility: visible");
		$(this).fadeTo(500, 0.5);
	});


});

