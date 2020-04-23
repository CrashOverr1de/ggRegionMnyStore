var express = require('express')
var router = express.Router()

router.get('/RegionMnyFacltStusList', function(req, res) {
  var _data = req.app.get('data')

  var result = []
  result.push(_data[0])
  for(var i = 1; i < _data.length; i++) {
    if(_data[i].REFINE_LOTNO_ADDR !== null && _data[i].REFINE_LOTNO_ADDR.indexOf('갈매') > -1) {
      result.push(_data[i])
    }
  }
  
  // res.json(data)
  res.render('components/index/DataListRender', {
    head: result[0],
    data: result
  })
  /*
  res.render('components/index/DataListRender', {
    head: _data[0],
    data: _data
  })
  */
  /*
  res.render('components/index/DataListRender', {
    head: data.RegionMnyFacltStus[0].head,
    data: data.RegionMnyFacltStus[1].row
  })
  */
})

module.exports = router
