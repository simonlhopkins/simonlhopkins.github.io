var socket = io("http://159.89.54.178:3000");



socket.on("message", function(data){
	console.log(data);
	
});