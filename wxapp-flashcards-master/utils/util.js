function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}



/**
 * 请求网络
 */
function request(url, type, data, header, success) {

  var app = getApp()
  wx.request( {
    url: url,
    data: data,
    method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header, // 设置请求的 header
    success: function( res ) {
      if( res.statusCode == 200 ) {
        success( res.data )
      } else {
        
      }
    },
    fail: function() {
      
    }

  })
}

const today = () =>{
  let year,month,day;
  let date = new Date();
  year = date.getFullYear();
  month = formatNumber(date.getMonth() + 1);
  day = formatNumber(date.getDate());
  return `${year}年${month}月${day}日`;
}


module.exports = {
  request,
  today
}
