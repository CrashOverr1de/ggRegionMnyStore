var express = require('express')
var app = express()
var indexRouter = require('./routes/index')

var hostname = 'localhost'
var port = 3000

app.set('view engine', 'ejs')
app.use('/', indexRouter)

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`)
})