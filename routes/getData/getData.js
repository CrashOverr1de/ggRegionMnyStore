var express = require('express')
var router = express.Router()

router.get('/RegionMnyFacltStusList', function(req, res) {
  var _data = req.app.get('data')
  // res.json(data)
  res.render('components/index/DataListRender', {
    head: _data[0],
    data: _data
  })
  /*
  res.render('components/index/DataListRender', {
    head: data.RegionMnyFacltStus[0].head,
    data: data.RegionMnyFacltStus[1].row
  })
  */
})

module.exports = router
