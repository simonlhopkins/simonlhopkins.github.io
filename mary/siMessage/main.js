
//make connection
var socket = io.connect("http://192.168.0.199:4000");

$(document).ready(function(){

	$("#testClick").click(function(){
		console.log("click");
		socket.emit("chat", {
			message: "hello",
			user: "simon"
		});
	});


});




socket.on("chat",function(data){
	console.log("revieced");
	$("body").append(data.message);
});