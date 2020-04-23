var express = require('express')
var app = express()
var indexRouter = require('./routes/index/index')
var getRouter = require('./routes/getData/getData')
var conf = require('./config/config.json')
var init = require('./lib/init')

app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/getData', getRouter)

init.data().then(function(data) {
  app.set('data', data)
}).then(function() {
  app.set('data', init.rebuild(app.get('data')))
  if(app.get('data')) console.log('done..!')
  else console.log('failure data setting')
}).catch(function(err) {
  console.log(err)
})

app.listen(conf.env.port, conf.env.hostname, function() {
  console.log(`Server running at http://${conf.env.hostname}:${conf.env.port}/`)
})
