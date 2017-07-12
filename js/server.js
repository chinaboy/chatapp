const express = require('express')
const app = express()
var socketio = require('socket.io')


app.use(express.static('public'))

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.get('/chatroom', function (req, res) {
  // send back json object

})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})