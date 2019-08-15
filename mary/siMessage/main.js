
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


});




socket.on("sendGif",function(data){
	console.log("revieced");
	$("body").append(data.message);
});