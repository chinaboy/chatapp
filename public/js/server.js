const express = require('express')
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server)

app.use(express.static('public'))
app.use(express.static('bower_components'))

app.get('/chatroom', function (req, res) {
  // send back json object

})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('update', function (data) {
    console.log(data);
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})