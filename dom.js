/**
 * window.frames[0]
 * window.frames["topframe"]
 * top.frames[0];
 * top.frames["topframe"]
 * frames[0]
 * frames["topframe"]
 *
 * document.compathMode == 'CSS1Compat'
 * window.open(href, "frame/_self/_parent/_top/_blank")
 *
 * window.location, window.status, window.scrollbars, window.resizable, window.toobar, ...
 * window.resizeTo(w, h)
 * window.moveTo(x, y)
 * setInterval, setTimeout 返回一个数值ID，表示超时调用
 * clearInterval, clearTimeout
 * 
 * window.alert(), window.confirm(), window.prompt()
 *
 * window.print(), window.find()
 *
 * location.hash/hostname/href/pathname/port/protocol/search
 * location.replace/reload/reload(true)
 *
 * navigator:
 * appCodeName, appName, appVersion, platform, userAgent, userLanguage, vendor, vendorSub 等等
 
 */
 
 
 // 查询字符串参数
 
 function getQueryStringArgs() {
	// search 查询字符串，是 ？号开头的字符串,  如: ?q=java&num=1
	var qs = (location.search.length > 0) ? location.search.substring(1) : "";
	var args = {};
	var items = qs.split("&");
	var item = null,
		name = null,
		value = null;
	for (var i=0, len=items.length; i<len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		args[name] = value;
	}
	return args;
 }
 
 
 
 /**
  * Dom
  *
  * someNode.nodeName, someNode.nodeValue, someNode.nodeType
  * childNodes, nextSibling, previousSibling, parentNode, firstChild, lastChild
  * appendChild, insertBefore, replaceChild, removeChild, cloneNode
  * 
  * 
  */
  
  // 节点转换成数组
  
 function convertToArray(nodes) {
	var _arr = null;
	try {
        /**
         * 把nodes这个伪数组转换为真正的数组,Array.prototype.slice.call(arguments,0)就类似于arguments.slice(0)，
         * 但因为arguments不是真正的Array，所以它没有slice这个方法.能用slice方法的，只要有length属性就行。
         * 虽然arguments有length属性，但是没有slice方法，所以呢，Array.prototype.slice（）执行的时候，
         * Array.prototype已经被call改成arguments了，因为满足slice执行的条件(有length属性)，所以没有报错。
         */
		_arr = Array.prototype.slice.call(nodes, 0)
	} catch(ex) {
		_arr = new Array();
		for (var i=0, len=nodes.length; i<len; i++) {
			_arr.push(nodes[i]);
		}
	}
	return _arr;
 }
 
 /**
  *  document.body, document.documentElement
  * document.doctype, document.URL, document.domain, document.referrer, document.title, 
  * document.getElementById, getElementsByTagName, getElementsByClassName
  * document.images, document.forms, document.forms[0].elements, document.links, document.anchors
  * document.implementation.hasFeature("XML", "1.0")
  * document.write(), document.writeln(), document.open(), document.close()
  * element.nodeName, element.tagName, element.id, element.className, element.title, 
  * setAttribute(), getAttribute, removeAttribute(), attributes
  * 
  */
  
  // 打印节点的所有属性
  
  function putsAttributes(element) {
	var pairs = new Array();
	for (var i=0, len=element.attributes.length; i<len; i++) {
		var attrName = element.attributes[i].nodeName;
		var attrValue = element.attributes[i].nodeValue;
		if (element.attributes[i].specified) {
			pairs.push(attrName + "=\"" + attrValue + "\"");
		}
	}
	return pairs.join(" ");
  }
  
  
  /**
   * document.createElement, document.createTextNode, document.createComment, document.createDocumentFragement()
   *
   * 操作节点中的文本
   * appendDate(), deleteData(), insertData(), replaceData(), splitText(), substringData()
   * 
   * setAttributeNode(), getAttributeNode(), document.createAttribute
   *
   * innerHTML, innerText, textContent,
   */
   
   
   function getInnerText(element) {
		return (typeof element.textContent == "string") ? element.textContent : element.innerText;
   }
   
   function setInnerText(element, text) {
		if (typeof element.textContent == "string") {
			element.textContent = text;
		} else {
			element.innerText = text;
		}
   }
   
   
   
   /**
	* 动态加载脚本，动态加载样式
    */
	
	
	function loadScript(url) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);
	}
	
	function loadScriptString(code) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		try {
			script.appendChild(document.createTextNode(code));
		} catch(ex) {
			script.text = code;
		}
	}
	

	function loadStyle(url) {
		var link  = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	}
	
	
	function loadStyleString(code) {
		var style = document.createElement("style");
		style.type = "text/css";
		try {
			style.appendChild(document.createTextNode(code));
		} catch(ex) {
			style.styleSheet.cssText = code;
		}
		
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(style);
	}
	
	
	
	
	
/** 
 * 表格操作
 * <table>:
 * caption, tBodies, tFoot, tHead, rows, createTHead, createTFoot, createCaption, deleteTHead, deleteTFoot,
 * deleteCaption, deleteRow(pos), insertRow(pos),
 * <tbody>:
 * rows, deleteRow, insertRow, 
 * <tr>:
 * cells, deleteCell, insertCell 
 */
 
 
 
 /**
  * styleFloat, cssFloat,
  * element.style.backgroundColor, ...
  * element.style.cssText = "width:25,; height: 100px"
  * document.defaultView.getComputedStyle(element, null)
  * element.currentStyle
  * document.styleSheets
  */
  
  
  function getStyleSheet(element) {
	return element.sheet || element.styleSheet;
  }
  
  var link = document.getElementsByTagName("link")[0];
  var sheet = getStyleSheet(link);
  
  
  // 创建样式规则
  function insertRule(sheet, selectorText, cssText, position) {
	if (sheet.insertRule) {
		sheet.insertRule(selectorText + "{" + cssText + "}", position);
	} else if (sheet.addRule) {
		sheet.addRule(selectorText, cssText, position);
	}
  }
  
  function deleteRule(sheet, index) {
	if (sheet.deleteRule) {
		sheet.deleteRule(index);
	} else if (sheet.removeRule) {
		sheet.removeRule(index);
	}
  }
  
  
  /**
   * offsetHeight, offsetWidth, offsetLeft, offsetTop
   */
   
   
  //  获取元素左偏移量
   function getElementLeft(element) {
		var _left = element.offsetLeft;
		var _current = element.offsetParent;
		while (_current !== null) {
			_left += _current.offsetLeft;
			_current = _current.offsetParent;
		}
		return _left;
   } 

   function getElementTop(element) {
		var _top = element.offsetTop;
		var _current = element.offsetParent;
		while (_current !== null) {
			_top += _current.offsetTop;
			_current = _current.offsetParent;
		}
		return _top;
   }
   
   
   
   
   function getViewport() {
		if (document.compatMode == "BackCompat") {
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		} else {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
   }
   
   
   
   
   // 获取元素大小
   
   
   function getBoundingClientRect(element) {
		var scrillTop = document.documentElement.scrollTop;
		var scrillLeft = document.documentElement.scrollLeft;
		
		if (element.getBoundingClientRect) {
				if (typeof arguments.callee.offset != "number") {
					var temp = document.createElement("div");
					temp.style.cssText = "position: absolute; left:0; right: 0";
					document.body.appendChild(temp);
					arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
					document.body.removeChild(temp);
					temp = null;
				}
				
				var rect = element.getBoundingClientRect();
				var offset = arguments.callee.offset;
				return {
					left: rect.left + offset,
					right: rect.right + offset,
					top: rect.top + offset,
					bottom: rect.bottom + offset
				}
		} else {
			var _left = getElementLeft(element);
			var _top = getElementTop(element);
			
			return {
				left: _left - scrollLeft,
				right: _left + element.offsetWidth - scrollLeft,
				top: _top - scrollTop,
				bottom: _top + element.offsetHeight - scrollTop
			}
		}
   }
   
   
   // Event 事件
   
   
   var EventUtil = {};
   
   EventUtil.addHandler = function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
   }
   
   EventUtil.getEvent = function(event) {
		return event ? event : window.event;
   }
   
   EventUtil.getTarget = function(event) {
		return event.target || event.srcElement;
   }
   
   EventUtil.getRelatedTarget = function(event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement
		} else {
			return null;
		}
   }
   
   EventUtil.preventDefault = function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
   }
   
   EventUtil.stopPropagation = function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
   }
   
   EventUtil.removeHandler = function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on"+type, handler);
		} else {
			element["on" + type] = null;
		}
   }
   
   EventUtil.getButton = function(event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
   }
   
   EventUtil.getCharCode = function(event) {
		if (typeof event.charCode == 'number') {
			return event.charCode;
		} else {
			return event.keyCode;
		}
   }
   
   // 滚轮事件
   EventUtil.getWhellDelta = function(event) {
		if (event.wheelDelta) {
			reaturn Math.abs(event.wheelDelta);
		} else {
			return event.detail;
		}
   }
   
   // 剪切板操作
   
   EventUtil.getClipboardText: function(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
   }
   
   EventUtil.setClipboardText = function(event, value) {
		if (event.clipboardData) {
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData("text", value);
		}
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
// ==============================================================================================================   
   
   
   
   
   
   
   
   
   /**
    * 加载事件, load ， 当页面完全加载后（包括所有图像，js文件，css文件等外部资源）， 就会出发window上的load事件
	* 中键滚轮事件 mousewheel, DOMMouseScroll
	* DOMContentLoaded, readstatechange, contextmenu, beforeunload, pageshow, pagehide, orientationchange,
	* touchstart, touchmove, touchend, touchcancel
    */
	
	
EventUtil.addHandler(window, 'load', function() {
	var script = document.createElement("script");
	EventUtil.addHandler(script, 'load', function(event) {
		console.log("script loaded ...");
	});
	script.src= "example.js";
	document.body.appendChild()script;
});

EventUtil.addHandler(window, 'load', function() {
	var img = new Image();
	EventUtil.addHandler(img, 'load', function(event) {
		console.log("image loaded ...");
	});
	img.src= "image.gif";
});

EventUtil.addHandler(window, 'load', function() {
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	EventUtil.addHandler(link, 'load', function(event) {
		console.log("link loaded ...");
	});
	link.href = "style.css";
	document.getElementsByTagName("head")[0].appendChild(link);
});


EventUtil.addHandler(window, "scroll", function(event) {
	if (document.compatMode == "CSS1Compat") {
		console.log(document.documentElement.scrollTop);
	} else {
		console.log(document.body.scrollTop);
	}
});


// 事件委托

var list = document.getElementById("list");
EventUtil.addHandler(list, "click", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.id) {
		 case "list1":
			console.log("list-1");
			break;
		case "list2":
			console.log("list-2");
			break;
	}
});


/**
 * 共有表单字段属性
 * disabled, form, name, readOnly, tabIndex, type, value
 */
 
 /** 
  * 文本框
  */
 // 取得选择的文本
 var textbox = document.forms[0].elements["textbox1"];
 function getSelectedText(textbox) {
	if (document.selection) {
		return document.selection.createRange().text;
	} else {
		return textbox.value.substring(textbox.selectionStart, textbox,selectionEnd);
	}
 }
 
 // 选择文件
 
 function selectText(textbox, startIndex, stopIndex) {
	if (textbox.seSelectionRange) {
		textbox.setSelectionRange(startIndex, stopIndex);
	} else if (textbox.createTextRange) {
		var range = text.createTextRange();
		range.collapse(true);
		range.moveStart("character", startIndex);
		range.moveStart("character", stopIndex - startIndex);
		range.select();
	}
	textbox.focus();
 }
 

 // 富文本， 就是在页面中嵌入一个包含空白HTML页面的iframe， 通过设置designMode属性，这个空白的页面就可以被编辑
EventUtil.addHandler(window, "load", function() {
	frames["richedit"].document.designMode = "on";
}); 


// 惰性载入方式

function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		createXHR = function() {
			return new XMLHttpRequest();
		}
	} else if (typeof arguments.callee.activeXString != "undefined") {
		createXHR = function() {
			if (typeof arguments.callee.activeXString != "string") {
				var versions = [
					"MSXML2.XMLHttp.6.0",
					"MSXML2.XMLHttp.3.0",
					"MSXML2.XMLHttp"
				];
				for (var i=0, len=versions.length; i<len; i++) {
					try {
						var xhr = new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						return xhr;
					} catch(ex) {
						// skip
					}
				}
			}
		}
	} else {
		createXHR = function() {
			throw new Error("No XHR object available.");
		}
	}
	
	return createXHR();

}




function bind(fn, context) {
	return function() {
		return fn.appply(context, arguments);
	}
}




function curry(fn) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(null, finalArgs);
	}
}

/**
 * 自定义事件
 */
 
 
function EventTaget() {
	this.handlers = {};
}

EventTaget.prototype = {
	constructor: EventTaget,
	
	addHandler: function(type, handler) {
		if (typeof this.handlers[type] == "undefined") {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	
	fire: function(event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.handlers[event.type] instanceof Array) {
			var _handlers = this.handlers[event.type];
			for (var i=0, len=_handlers.length; i<len; i++) {
				_handlers[i](event);
			}
		}
	},
	
	removeHandler: function(type, handler) {
		if (this.handlers[type] instanceof Array) {
			var _handlers = this.handlers[event.type];
			for (var i=0, len=_handlers.length; i<len; i++) {
				if (_handlers[i] === handler) {
					break
				}
			}
			_handlers.splice(i, 1);
		}
		
	}

}


// 拖放

var DragDrop = (function() {
	var dragdrop = new EventTaget();
	var dragging = null;
	var diffX = 0;
	var diffY = 0;
	function handleEvent(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		switch(event.type) {
			case "mousedown":
				if (target.className.indexOf("draggable") > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					dragdrop.fire({
						type: "dragstart", 
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;
			case "mousemove":
				if (dragging != null) {
					event = EventUtil.getEvent(event);
					dragging.style.left = (event.clientX - diffX) + "px";
					dragging.style.top = (event.clientY - diffY) + "px";
					dragdrop.fire({
						type: "drag", 
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;
			case "mouseup":
				dragdrop.fire({
						type: "dragend", 
						target: dragging,
						x: event.clientX,
						y: event.clientY
				});
				dragging = null;
				break;
		}
		
		
	}
	
	
		dragdrop.enable = function() {
			EventUtil.addHandler(document, "mousedown", handleEvent);
			EventUtil.addHandler(document, "mousemove", handleEvent);
			EventUtil.addHandler(document, "mousedup", handleEvent);
		};
		
		dragdrop.disable = function() {
			EventUtil.removeHandler(document, "mousedown", handleEvent);
			EventUtil.removeHandler(document, "mousemove", handleEvent);
			EventUtil.removeHandler(document, "mousedup", handleEvent);
		};
		
		
		
		return dragdrop;
	


})();

DragDrop.addHandler("dragstart", function(event) { 
	// code
});
DragDrop.addHandler("drag", function(event) { 
	// code
});
DragDrop.addHandler("dragend", function(event) { 
	// code
});




/**
 * querySelector, querySelectorAll, getElementsByClassName, element.classList,
 * const 常量定义
 * __defineGetter, __defineSetter,
 * indexOf, lastIndexOf, every, filter, forEach, map, some
 * Object.getPrototypeOf(), Object.defineProperty,  Object.defineProperties(), Object.getOwnPropertyDescriptor(), Object.create, Object.clone(), 
 * Object.getOwnPropertyNames(), Object.keys()
 * Object.preventExtensions(), Object.isExtensible(), Object.seal(), Object.freeze(), Object.isFrozen(), Object.isSeal()
 * trim(), Array.isArray(), 
 * JSON.stringify(), JSON.parse(),
 *
 */
 
 
 var person = {
	_name: null,
	get name() {
		return this._name;
	},
	set name(value) {
		if (typeof value == "string") {
			this._name = value;
		}
	}
 }
 
 person.name = "ly"
 
 
 
 /**
  * cookie 操作
  */
  
  var CookieUtil = {
	
		get: function(name) {
			var cookieName = encodeURIComponent(name) + "=";
			var cookieStart = document.cookie.indexOf(cookieName);
			var cookievalue = null;
			if (cookieStart > -1) {
				var cookieEnd = document.cookie.indexOf(";", cookieStart);
				if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length, cookieEnd));
			}
			return cookieValue;
		},
		set: function(name, value, expires, path, domain, secure) {
			var cookieText = encodeURLComponent(name) + "=" + encodeURIComponent(value);
			if (expires instanceof Date) {
				cookieText += "; expires=" +expires.toGMTString();
			}
			if (path) {
				cookieText += "; path" + path;
			}
			if (domain) {
				cookieText += "; domain" + domain;
			}
			if (secure) {
				cookieText += "; secure";
			}
			document.cookie = cookieText;
		},
		unset: function(name, path, domain, secure) {
			this.set(name, "", new Date(0), path, domain, secure);
		}
  
  
  }
  
  
  /**
   * Storage 类， clear(), getItem(name), key(index), removeItem(name), setItem(name, value)
   * globalStorage, sessionStorage, localStorage
   */ 
  
  

