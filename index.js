var express = require('express')
var app = express()
var hostname = 'localhost'
var port = 3000

app.get('/', function(req, res) {
  res.send('Hello, World!')
})

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`)
})