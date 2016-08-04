// 实现购物车

var basketModule = (function() {
	var basket = [];
	function doSomethingPrivate() {}
	
	function doSomethingElsePrivate() {}
	
	return {
		addItem: function(values) {
			basket.push(values);
		},
		
		getItemCount: function() {
			return basket.length;
		},
		
		doSomething: doSomethingPrivate,
		
		getTotal: function() {
			var itemCount = this.getItemCount(),
				total = 0;
			while (itemCount--) {
				total += basket[itemCount].price;
			}
			return total;
		}
	}

})();


basketModule.addItem({item: "bread", price: 0.5});


// =====================================================
// 揭示模式
var myRevealingMoudle = function() {
	var privateVar = "lily",
		publicVar = "john";
	function privateFunction() {}
	function publicSetName() {}
	function publicGetName() {}
	
	return {
		setName: publicSetName,
		greeting: publicVar,
		getName: publicGetName
	};
	
	
}();


// 单例模式 

var mySingleton = (function() {
	var instance;
	function init() {
		function privateMethod() {
			console.log("I am private");
		}
		var privateVariable = "I'm also private";
		var privateRandomNumber = Math.random();
		
		return {
			publicMethod: function() {
				console.log("hello");
			},
			publicProperty: "hello world",
			getRandomNumber: function() {
				return privateVariable;
			}
		}
	}
	
	return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	};
})();


var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();


// ============================================

var SingletonTester = (function() {
	function Singleton(option) {
		option = option || {};
		this.name = "SingeltonTester";
		this.pointX = option.pointX || 6;
		this.pointY = option.pointY || 10;
	}
	
	var instance;
	var _static = {
		name: "SingletonTester",
		getInstance: function(option) {
			if (instance === undefined) {
				instance = new SingeltonTester(option);
			}
			return instance;
		}
	}
	
	return _static;


})();

var SingleA = SingletonTester.getInstance({
	pointX: 5
})
var SingleB = SingletonTester.getInstance({
	pointX: 99
});
	
	
// ====================================================
function extend(ns, ns_string) {
	var parts = ns_string.split(".");
	var parent = ns;
	var pl;
	pl = parts.length;
	for (var i=0; i<pl; i++) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}

var myApp = myApp || {}
mod = extend(myApp, "module.module2");

// myApp.module.module2


// ================================================

function isNumber(value) {
	return typeof value === "number" && isFinite(value);
}


function _typeof(o) {
	var _toString = Object.prototype.toString;
	var _type = {
		"undefined": "undefined",
		"number": "number",
		"boolean": "boolean",
		"string": "string",
		"[object Function]": "function",
		"[object RegExp]": "regexp",
		"[object Array]": "array",
		"[object Date]": "date",
		"[object Error]": "error"
	};
	return _type[typeof o] || _type[_toString.call(0)] || (o ? "object" : "null");
}

// 假值
0, NaN, '', false, null, undefined



function memfac(n) {
	if (!memfac.cache) {
		memfac.cache = {
			"0": 1,
			"1": 1
		}
	}
	if (!memfac.cache.hasOwnProperty(n)) {
		memfac.cache[n] = n * memfac(n-1);
	}
	return memfac.cache[n];
}



// ==================================

String.prototype.lengthB = function() {
		var b=0, l=this.length;
		if (l) {
			for (var i=0; i<l; i++) {
				if (this.charCode(i) > 255) {
					b += 2;
				} else {
					b++;
				}
			}
			return b;
		} else {
			return 0;
		}
}


if (!String.prototype.trim) {
	 String.prototype.trim = function() {
		return this.replace(/^\s+/, "").replace(/\s+$/, "");
	 }
}



// ==============================

Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}
}


var memoizer = function(memo, formula) {
	var recur = function(n) {
		var result = memo[n];
		if (typeof result !== "number") {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
}

var fib = memoizer([0, 1], function(recur, n) {
	return recur(n-1) + recur(n-2);
})


///

Function.prototype.method = function(name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}
}

Function.method("curry", function() {
	var slice = Array.prototype.slice;
	var args = slice.apply(arguments), that = this;
	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	}
});




// 惰性实例化 

var myNamespace = (function() {
	var init = function() {
		var privateName = 123;
		var privateReturnName = function() {
			return privateName;
		}
		var privateSetName = function(name) {
			privateName = name;
		}
		
		return {
			setName: function(name) {
				privateSetName(name);
			},
			getName: function() {
				return privateReturnName();
			}
		}
	}
	
	var instance;
	return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}
})();



//

function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		createXHR = function() {
			return new XMLHttpRequest();
		};
	} else if (typeof ActiveXObject != "undefined") {
		createXHR = function() {
			if (typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.6.0"];
				for (var i=0,len=versions.length; i<len; i++) {
					try {
						var xhr = new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						return xhr;
					} catch(e) {}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString)
		}
	} else {
		createXHR = function() {
			throw new Error("No XHR object .");
		}
	}
}


// bind

function bind(fn, context) {
	return function() {
		return fn.apply(context, arguments);
	}
}

function map(array, func) {
	var res = [];
	for (var i=0,len=array.length; i<len; i++) {
		res.push(func(array[i]));
	}
	return res;
}


function curry(fn) {
	var args = [].slice.call(arguments, 1);
	return function() {
		return fn.apply(null, args.concat([].slice.call(arguments, 0)));
	}
}

// =========================================

function EventTarget() {
	this.handlers = {};
}

EventTarget.prototype = {
	constructor: EventTarget,
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
		var hanndlers = this.handlers[event.type];
		for (var i=0,len=handlers.length; i<len; i++) {
			handlers[i](event);
		}
	},
	
	removeHandler: function(type, handler) {
		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i=0, len=handlers.length; i<len; i++){
				if (handlers[type][i] === handler) {
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}
}




function getStyle(e, n) {
	if (e.style[n]) {
		return e.style[n];
	} 
	else if(e.currentStyle) {
		return e.currentStyle[n];
	} 
	else if (document.defaultView && document.defaultView.getComputedStyle) {
		n = n.replace(/[(A-Z)]/g, "-$1");
		n = n.toLowerCase();
		var s =  document.defaultView.getComputedStyle(e, null);
		if (s) {
			return s.gerPropertyValue(n)
		}
	} 
	else {
		return null;
	}
}


function getW(e) {
	var x = y = 0;
	while (e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
		e = e.offsetParent;
	}
	return {
		x: x,
		y: y
	}
}

//
function Cookie(name, value, options) {
	// 存在，设置值
	if (typeof value != "undefined") {
		options = options || {};
		if (value === null) {
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == "number") {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} 
			else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		
		var path = options.path ? "; path="+options.path : "";
		var domain = options.domain ? "; domain="+options.domain : "";
		var secure = options.secure ? "; secure" : "";
		document.Cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join("");
	}
	// 不存在，则读取
	else {	
		var CookieValue = null;
		if (document.Cookie && document.Cookie != "") {
			var Cookies = document.Cookie.split(";");
			for (var i=0; i<Cookies.length; i++) {
				var _Cookie = (Cookies[i] || "").replace(/^\s+|\s+$/, "");
				if (_Cookie.substring(0, name.length+1) == (name +"=")) {
					CookieValue = decodeURIComponent(_Cookie.substring(name.length+1));
					break;
				}
			}
		}
		return CookieValue;
	}
}
