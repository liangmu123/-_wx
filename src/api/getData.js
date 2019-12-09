/**
 * 获取url参数
 * */
export const getQueryString = data =>  {
  var reg = new RegExp('(^|&)' + data + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    var url = unescape(r[2])
    var tok = url.indexOf('/')
    if(tok != -1){
      return url.substring(0,tok)
    }else {
      return url
    }
  }
  return null
}