var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.render('index/index', { title: '구리시 지역화폐 가맹점 현황' })
})

module.exports = router
