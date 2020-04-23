var conf = require('../config/config.json')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var init = {
  apicall: function(pageNo, listCntPerPage) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      var uri = `${conf.api.url}?key=${conf.api.key}&type=${conf.api.type}&SIGUN_CD=${conf.api.sigun_cd}`
      xhr.open('GET', uri + `&pIndex=${pageNo}&pSize=${listCntPerPage}`)
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            // console.log(`pageNo => ${pageNo}`)
            // console.log(data.RegionMnyFacltStus[1].row[0].CMPNM_NM)
            // console.log(`[${data.RESULT.CODE}] ${data.RESULT.MESSAGE}`)
            if(data.RegionMnyFacltStus) {
              resolve(data)
            }
            else {
              xhr.abort()
              reject(`[${data.RESULT.CODE}] ${data.RESULT.MESSAGE}`)
            }
          }
          else {
            reject('[Error] Check external api call. -- init.apicall()')
          }
        }
      }
      xhr.send()
    })
  },
  data: function() {
    return new Promise(function(resolve, reject) {
      var totListCnt = 0
      var totPageCnt = 0
      var listCntPerPage = 1000
      var result = []
      init.apicall(1, 1).then(function(data) {
        console.log(`Get total count of list / compute total page count`)
        totListCnt = data.RegionMnyFacltStus[0].head[0].list_total_count
        totPageCnt = Math.ceil(totListCnt / listCntPerPage)
      }).then(function() {
        var funcs = []
        for(var i = 1; i <= totPageCnt; i++) {
          console.log(`Get data ... ${i} of ${totPageCnt}`)
          funcs.push(init.apicall(i, listCntPerPage))
          // console.log(funcs)
        }

        Promise.all(funcs).then(function(values) {
          resolve(values)
        }).catch(function(err) {
          reject(err)
        })
      }).catch(function(err) {
        reject(err)
      })
    })
  },
  rebuild: function(data) {
    var result = []
    result.push(data[0].RegionMnyFacltStus[0].head)
    for(var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[i].RegionMnyFacltStus[1].row.length; j++) {
        result.push(data[i].RegionMnyFacltStus[1].row[j]);
      }
    }
    return result
  }
}

module.exports = init
