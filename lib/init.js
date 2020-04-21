var conf = require('../config/config.json')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var init = {
  data: function() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', `${conf.api.url}?key=${conf.api.key}&type=json&SIGUN_CD=41310&pIndex=1&pSize=10`)
      // xhr.open('GET', `${api.url}?key=${api.key}&type=json&SIGUN_CD=41310&pIndex=1&pSize=1000`)
      // xhr.open('GET', `${api.url}?type=json&SIGUN_CD=41310`)
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            resolve(data)
          }
          else {
            reject(new Error('[Error] Check external api call.'))
          }
        }
      }
      xhr.send()
    })
  }
}

module.exports = init
