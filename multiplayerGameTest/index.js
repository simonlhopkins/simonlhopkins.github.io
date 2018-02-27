var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var testCounter=0;
app.get('/', function(req, res){
  res.sendfile('index.html');
});

//Whenever someone connects this gets executed

// step 1: send an event to io
// step 2: read event in io and inside of it send it back to io
// step 3: read event in socket and then do something with it!!!
var playerDict=new Object();

io.on('connection', function(socket){
	console.log('A user connected');
	playerDict[socket.id]=socket.id;
	socket.on("getUser", function(data){
		io.emit("getUser", playerDict);

	});
	io.on('disconnection', function(socket){
		delete playerDict[socket.id];
	})

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

