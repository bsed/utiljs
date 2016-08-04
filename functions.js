/**

 * @ 常用代码

 */

var Core = {}

// addClass
Core.addClass = function (target, className) {
  if (!Core.hasClass(target, className)) {
    var _className = target.className
    target.className = (_className == '') ? className : (_className + '' + className)
  }
}

// getElementsByClassName
Core.getElementsByClassName = function (className) {
  var elementArray = []
  if (typeof document.getElementsByClassName != 'undefined') {
    return document.getElementsByClassName(className)
  } else if (typeof document.all != 'undefined') {
    elementArray = document.all
  } else {
    elementArray = document.getElementsByTagName('*')
  }
  var matchedArray = []
  var pattern = new RegExp('(^| )' + className + ' |$')
  for (var i = 0,len = elementArray.length; i < len; i++) {
    if (pattern.test(elementArray[i].className)) {
      matchedArray[matchedArray.length] = elementArray[i]
    }
  }
  return matchedArray
}

// hasClass
Core.hasClass = function (target, className) {
  var pattern = new RegExp('(^| )' + className + ' |$')
  if (pattern.test(target.className)) {
    return true
  }
  return false
}

// removeClass
Core.removeClass = function (target, className) {
  var pattern = new RegExp('(^| )' + className + ' |$')
  target.className = target.className.replace(pattern, $1)
  target.className = target.className.replace(/ $/, '')
}

// getComputedStyle
Core.getComputedStyle = function (element, styleProperty) {
  var computedStyle = null
  if (typeof element.currentStyle != 'undefined') {
    computedStyle = element.currentStyle
  } else {
    computedStyle = document.defaultView.getComputedStyle(element, null)
  }
  return computedStyle[styleProperty]
}
