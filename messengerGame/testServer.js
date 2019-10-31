var express = require('express');
var app = express();
var fs = require('fs');

var key = fs.readFileSync('host.key');
var cert = fs.readFileSync( 'host.cert' );
var ca = fs.readFileSync( 'host.cert' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};


var https = require('https');
https.createServer(options, app).listen(443);

app.get('/',function(req, res){//get,put,post,delete   
	res.sendFile(__dirname + '/index.html');
});