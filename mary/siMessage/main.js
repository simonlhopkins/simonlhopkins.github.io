
//make connection
var socket = io.connect("http://192.168.0.199:4000");

$(document).ready(function(){

	$("#testClick").click(function(){
		console.log("click");
		socket.emit("sendGif", {
			sentGif: "",
			user: ""
		});
	});

	$("#emojiOption").children('img').click(function(){
		var image = this;
		console.log($(this).attr("src"));
		socket.emit("sendGif", {
			gif: $(this).attr("src"),
			user: socket.id
		});

		var img = $("#chatBody").find("img").append("<img class = 'messageGif' src = '"+ $(this).attr("src") +"'></img>");
	});


});




socket.on("sendGif",function(data){
	console.log("revieced");
	$("body").append(data.message);
});