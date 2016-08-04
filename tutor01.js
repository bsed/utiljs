/**
 * 闭包范例代码
 */
 
 function createFunction() {
	var res = new Array();
	for (var i=0; i<10; i++) {
		res[i] = (function(num) {
			return function() {
				return num;
			}
		})(i);
	}
	return res;
 }
 
 /** 
  * 模块模式
  */
  
 (function() {
	// 块级作用域
	
 })();
 
 
 var singleton = (function() {
	var privateVar = 10;
	var privateFun = function() {
		return false;
	}
	return {
		publicProperty: true,
		publicMethod: function() {
			privateVar++;
			return privateFun();
		}
	}
	
 })();
 
 // 增强的模块模式
 
 function BaseComponent() {}
 
 var application = (function() {
	var components = new Array();
	components.push(new BaseComponent());
	var app = new BaseComponent();
	app.getComponent = function() {
		return components.length;
	};
	
	app.registerComponent = function(component) {
		if (typeof component == "object") {
			components.push(component);
		}
	};
	return app;
 })();
 
 
 
 // ==========================================
 // 命名空间
 var GLOBAL = {}
 GLOBAL.namespace = function(str) {
	var arr = str.split(".");
	var o = GLOBAL;
	var i;
	i = (arr[0] == "GLOBAL") ? 1 : 0;
	for (i; i<arr.length; i++) {
		o[arr[i]] = 0[arr[i]] || {};
		o = o[arr[i]];
	}
 }
 
 
 function setOpacity(node, value) {
	node = ((typeof node) == "string") ? document.getElementById(node) : node;
	if (document.all) {
		node.style.filter = "alpha(opacity=" + value + ")";
	} else {
		node.style.opacity = value/100;
	}
 }
 
 
 function getEventTarget(event) {
	event = window.event || event;
	return event.srcElement || event.target;
 }
 
 
 function stopPropagation(event) {
	event = window.event || event;
	if (document.all) {
		event.cancelBubble = true;
	} else {
		event.stopPropagation();
	}
}


function trim(str) {
	return str.replace(/^\s+|\s+$/, "");
}


function on(node, type, handler) {
	node = ((typeof node) == "string") ? document.getElementById(node) : node;
	if (document.all) {
		node.attachEvent("on" + type, handler);
	} else {
		node.addEventListener(type, handler, false);
	}
}


function addStyleNode(str) {
	var styleNode = document.createElement("style");
	styleNode.type = "text/css";
	if (styleNode.styleSheet) {
		styleNode.styleSheet.cssText = str;
	} else {
		styleNode.innerHTML = str;
	}
	document.getElementsByTagName("head")[0].appendChild(styleNode);
}



/**
 * 范例代码，简易框架代码，命名空间代码
 */
 
 
 
 
 var GLOBAL = {};
 GLOBAL.namespace = function(str) {
	var arr = str.split(".");
	var o = GLOBAL;
	var i, len;
	i = arr[0] == "GLOBAL" ? 1 : 0;
	len = arr.length;
	for (i; i<len; i++) {
		o[arr[i]] = o[arr[i]] || {};
		o = o[arr[i]];
	}
 }
 
 
 GLOBAL.namespace("Dom");
 GLOBAL.Dom.getNextNode = function(node) {
	node = typeof node == "string" ? document.getElementById(node) : node;
	var nextNode = node.nextSibling;
	if (! nextNode) { return null; }
	if (! document.all) {
		while(true) {
			if (nextNode.nodeType == 1) {
				break;
			} else {
				if (nextNode.nextSibling) {
					nextNode = nextNode.nextSibling;
				} else {
					break;
				}
			}
		}
	}
	
	return nextNode;
 }

 
 GLOBAL.Dom.setOpacity = function(node, value) {
	 node = typeof node == "string" ? document.getElementById(node) : node;
	 if (document.all) {
		node.style.filter = "alpha(opacity=" + value + ")";
	 } else {
		node.style.opacity = value/100;
	 }
 }
 
 GLOBAL.Dom.get = function(node) {
	 node = typeof node == "string" ? document.getElementById(node) : node;
	 return node;
 }
 
 GLOBAL.Dom.getElementsByClassName = function(str, root, tag) {
	if (root) {
		root = typeof root == "string" ? document.getElementById(root) : root;
	} else {
		root = document.body;
	}
	
	tag = tag || "*";
	var els = root.getElementsByTagName(tag),
		arr = [];
	for (var i=0,n=els.length; i<n; i++) {
		for (var j=0,k=els[i].class.split(" "), l=k.length; j++;) {
			if (k[j] == str) {
				arr.push(els[i]);
				break;
			}
		}
	}
	return arr;
 }
 
 GLOBAL.namespace("Event");
 GLOBAL.Event.getEventTarget = function(event) {
	event = window.event || event;
	return event.srcElement || event.target;
 }
 GLOBAL.Event.stopPropagation = function(event) {
	event = window.event || event;
	if (document.all) {
		event.cancelBubble = true;
	} else {
		event.stopPropagation();
	}
 }
 
 GLOBAL.Event.on = function(node, type, handler) {
	node = typeof node == "string" ? document.getElementById(node) : node;
	if (document.all) {
		node.attachEvent("on" + type, handler);
	} else {
		node.addEventListener(type, handler, false);
	}
 }
 
 GLOBAL.namespace("Lang");
 GLOBAL.Lang.trim = function(str) {
	return str.replace(/^\s+|\s+$/, "");
 }
 GLOBAL.Lang.isNumber = function(s) {
	return !isNan(s);
 }
 GLOBAL.Lang.extend = function(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.superclass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
 }
 
 GLOBAL.Dom.addClass = function(node, str) {
	if (new RegExp("^|\\s+"+str).test(node.className)) {
		node.className = node.className + "" + str;
	}
 }
 
 GLOBAL.Dom.removeClass = function(node, str) {
	node.className = node.className.replace(new RegExp("^|\\s+"+str), "");
 }

