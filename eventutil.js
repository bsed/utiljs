/**
 * event tool utils
 */
var EventUtil = {

  /**addEventListener 添加事件处理 参数：元素对象 事件类型 处理函数 */
  addHandler: function (element, type, handler) {
    // dom2级的事件添加
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) { // IE 的事件添加
      element.attachEvent('on' + type, handler)
    } else { // 给元素特性赋值
      element['on' + type] = handler
    }
  },
  /** 
   * 获得鼠标按键 0表示左键 1表示中间轮 2表示右键
   */
  getButton: function (event) {
    // 是否支持Dom鼠标事件
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
      return event.button
    } else {
      switch (event.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0
        case 2:
        case 6:
          return 2
        case 4:
          return 1
      }
    }
  },
  /**
   * 获得字符编码
   */
  getCharCode: function (event) {
    if (typeof event.charCode == 'number') {
      return event.charCode
    } else {
      return event.keyCode
    }
  },

  getClipboardText: function (event) {
    var clipboardData = (event.clipboardData || window.clipboardData)
    return clipboardData.getData('text')
  },
  /** 
   * 获得event对象 IE中以参数event对象传入 Dom中通过window.event来访问
   */
  getEvent: function (event) {
    return event ? event : window.event
  },

  /**
   * 获得相关目标对象
   */
  getRelatedTarget: function (event) {
    // Dom 方法 relatedTarget只对mouseover和mouseout事件才包含值 否则 这个值为null
    if (event.relatedTarget) {
      return event.relatedTarget
    } else if (event.toElement) {
      return event.toElement
    } else if (event.fromElement) {
      return event.fromElement
    } else {
      return null
    }
  },
  /** 
   * 获得事件的目标 dom中通过event.target获得 IE中通过event.srcElement
   */
  getTarget: function (event) {
    return event.target || event.srcElement
  },
  /**
   * 获取鼠标滚轮滚动
   */
  getWheelDelta: function (event) {
    if (event.wheelDelta) {
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
    } else {
      return -event.detail * 40
    }
  },

  /**
   * 取消事件的默认行为
   */
  preventDefault: function (event) {
    if (event.preventDefault) {
      // Dom 方法
      event.preventDefault()
    } else {
      // IE 
      event.returnValue = false
    }
  },
  /**
   * removeHandle 移除事件处理 参数：元素对象 事件类型 处理函数
   */
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) { // dom2级的事件移除
      element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) { // IE的事件移除
      element.detachEvent('on' + type, handler)
    } else { // 给元素特性赋值为空对象以移除事件
      element['on' + type] = null
    }
  },

  setClipboardText: function (event, value) {
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', value)
    } else if (window.clipboardData) {
      window.clipboardData.setData('text', value)
    }
  },
  /**
   * 停止事件冒泡
   */
  stopPropagation: function (event) {
    if (event.stopPropagation) { // Dom方法
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}
