var express = require('express')
var app = express()
var indexRouter = require('./routes/index/index')
var getRouter = require('./routes/getData/getData')
var conf = require('./config/config.json')
var init = require('./lib/init')

app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/getData', getRouter)

// 어차피 데이터가 거의 정적이고 동네 것만 볼 것이기 때문에
// 메인 데이터는 WAS 시작할 때 한 번 가져와서 메모리에 넣어둔다.
init.data().then(function(data) {
  // 이렇게 넣어두고 분리된 라우터들에서 request 객체를 통해 언제든지 가져다 쓸 수 있다.
  // req.app.get('data') 이렇게~
  app.set('data', data)
}).catch(function(err) {
  console.log(err)
})

app.listen(conf.env.port, conf.env.hostname, function() {
  console.log(`Server running at http://${conf.env.hostname}:${conf.env.port}/`)
  /* ./config/config.json
  {
    "env": {
      "hostname": "localhost",
      "port": 3000
    },
    "api": {
      "url": "https://api.example.com/blahblah",
      "key": "Your API Key"
    }
  }
  */
})
