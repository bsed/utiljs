function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
          'MSXML2.XMLHttp'],
        i, len

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

var xhr = createXHR()
xhr.onreadystatechange = function (event) {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.getAllResponseHeaders())
    } else {
      alert('Request was unsuccessful: ' + xhr.status)
    }
  }
}
xhr.open('get', 'example.php', true)
xhr.setRequestHeader('MyHeader', 'MyValue')
xhr.send(null)

// =========================================================================

function createStreamingClient (url, progress, finished) {
  var xhr = new XMLHttpRequest(),
    received = 0

  xhr.open('get', url, true)
  xhr.onreadystatechange = function () {
    var result

    if (xhr.readyState == 3) {

      // get only the new data and adjust counter
      result = xhr.responseText.substring(received)
      received += result.length

      // call the progress callback
      progress(result)
    } else if (xhr.readyState == 4) {
      finished(xhr.responseText)
    }
  }
  xhr.send(null)
  return xhr
}

var client = createStreamingClient('streaming.php', function (data) {
  alert('Received: ' + data)
}, function (data) {
  alert('Done!')
})

// ============================================================================

var img = new Image()
img.onload = img.onerror = function () {
  alert('Done!')
}
img.src = 'http://www.example.com/test?name=Nicholas'

// ==============================================================================

function handleResponse (response) {
  alert("You're at IP address " + response.ip + ', which is in ' + response.city + ', ' + response.region_name)
}

var script = document.createElement('script')
script.src = 'http://freegeoip.net/json/?callback=handleResponse'
document.body.insertBefore(script, document.body.firstChild)

// ============================================================================		

function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
        'MSXML2.XMLHttp']

      for (var i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

var xhr = createXHR()
xhr.onload = function (event) {
  if ((xhr.status >= 200 && xhr.status < 300) ||
    xhr.status == 304) {
    alert(xhr.responseText)
  } else {
    alert('Request was unsuccessful: ' + xhr.status)
  }
}
xhr.onerror = function (event) {
  alert('Error!')
}

xhr.open('get', 'altevents.php', true)

xhr.send(null)

// ======================================================================================

function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
          'MSXML2.XMLHttp'],
        i, len

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

function submitData () {
  var xhr = createXHR()
  xhr.onreadystatechange = function (event) {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText)
      } else {
        alert('Request was unsuccessful: ' + xhr.status)
      }
    }
  }

  xhr.open('post', 'postexample.php', true)
  var form = document.getElementById('user-info')
  xhr.send(new FormData(form))
}

// =====================================================================================

function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
        'MSXML2.XMLHttp']

      for (var i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

var xhr = createXHR()
xhr.onload = function (event) {
  if ((xhr.status >= 200 && xhr.status < 300) ||
    xhr.status == 304) {
    alert(xhr.responseText)
  } else {
    alert('Request was unsuccessful: ' + xhr.status)
  }
}

xhr.open('get', 'altevents.php', true)

xhr.send(null)

// ===================================================================================

function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
          'MSXML2.XMLHttp'],
        i, len

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

window.onload = function () {
  var xhr = createXHR()
  xhr.onload = function (event) {
    if ((xhr.status >= 200 && xhr.status < 300) ||
      xhr.status == 304) {
      alert(xhr.responseText)
    } else {
      alert('Request was unsuccessful: ' + xhr.status)
    }
  }
  xhr.onprogress = function (event) {
    var divStatus = document.getElementById('status')
    if (event.lengthComputable) {
      divStatus.innerHTML = 'Received ' + event.position + ' of ' + event.totalSize + ' bytes'
    }
  }
  xhr.open('get', 'altevents.php', true)

  xhr.send(null)
}

// ======================================================================

function createXHR () {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
          'MSXML2.XMLHttp'],
        i, len

      for (i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          return xhr
        } catch (ex) {
          // skip
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}

var xhr = createXHR()
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText)
    } else {
      alert('Request was unsuccessful: ' + xhr.status)
    }
  }
}
xhr.open('get', 'example.php', true)
xhr.setRequestHeader('MyHeader', 'MyValue')
xhr.send(null)
