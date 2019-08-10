export function setCookie(cname, cvalue, exmins = 1440) {
  var d = new Date()
  d.setTime(d.getTime() + exmins * 60 * 1000)
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function getCookie(name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length == 2)
    return parts
      .pop()
      .split(';')
      .shift()
  return undefined
}

export function postJSON(url, data) {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('POST', url)
  xmlhttp.setRequestHeader('Content-Type', 'application/json')
  xmlhttp.send(JSON.stringify(data))
}

const dec2hex = []
for (var i = 0; i <= 15; i++) {
  dec2hex[i] = i.toString(16)
}

export function uuid() {
  var uuid = ''
  for (var i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += dec2hex[(Math.random() * 4) | (0 + 8)]
    } else {
      uuid += dec2hex[(Math.random() * 15) | 0]
    }
  }
  return uuid
}
export const eventify = function(arr, callback) {
  arr.push = function(e) {
    Array.prototype.push.call(arr, e)
    callback(arr)
  }
}
