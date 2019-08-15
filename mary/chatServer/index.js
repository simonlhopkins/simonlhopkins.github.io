var express = require('express');
var socket = require('socket.io');


//App Setup
var app = express();
var server = app.listen(4000, function(){
	console.log("express server set up");
});

app.use(express.static('public'));


var io = socket(server);

io.on("connection", function(socket){
	
	socket.on("chat", function(data){
		io.sockets.emit("chat", data);
	});
});