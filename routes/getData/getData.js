var express = require('express')
var router = express.Router()

router.get('/RegionMnyFacltStusList', function(req, res) {
  var data = req.app.get('data')
  // res.json(data)
  res.render('components/index/DataListRender', {
    head: data.RegionMnyFacltStus[0].head,
    data: data.RegionMnyFacltStus[1].row
  })
})

module.exports = router
