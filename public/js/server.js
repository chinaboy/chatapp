const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var messageStorage = [];
// var mongodb = require('mongodb');
// var server = new mongodb.Server('', )

app.use(express.static('public'))
app.use(express.static('bower_components'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.get('/userMessages', function (req, res) {
    // send back json object
 	console.log(req.query.user, messageStorage);
    // query messages by user
 	let userName = req.query.user.trim();
 	messagesByUser = messageStorage.filter(function(msg){
 		return msg.user === userName;
 	}).map(function(msg){
 		return msg.text;
 	});
 	if(messagesByUser.length == 0){
 		res.json({user: userName, notext: true});
 		res.end();
 	}else{
 		res.json({user: userName, text: messagesByUser});
 		res.end(); 	
 	}
});

io.on('connection', function (socket) {	 
	socket.on('message', function(messageObj){
		if(messageStorage.length<30000)
			messageStorage.push(messageObj);
		console.log("server side receives message:  "+ messageObj.text);
		io.sockets.emit('message', messageObj);
	})
});

server.listen(80, function () {
    console.log('Chatapp listening on port 3000!')
})