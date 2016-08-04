var Class = function (parent) {
  var klass = function () {
    this.init.apply(this, arguments)
  }

  // 继承
  if (parent) {
    var subclass = function () {}
    subclass.prototype = parent.prototype
    klass.prototype = new subclass()
  }
  // klass.prototype.init = function() {}

  klass.fn = klass.prototype
  klass.fn.parent = klass

  // 上下文代理
  klass.proxy = function (callback) {
    var self = this
    return (function () {
      return callback.apply(self, arguments)
    })
  }
  klass.fn.proxy = klass.proxy

  // 类扩展
  klass.extend = function (obj) {
    var extended = obj.extended
    for (var i in obj) {
      klass[i] = obj[i]
    }
    if (extended) {
      extended(klass)
    }
  }

  // 实例扩展
  klass.include = function (obj) {
    var included = obj.included
    for (var i in obj) {
      klass.fn[i] = obj[i]
    }
    if (included) {
      included(klass)
    }
  }

  return klass
}

// example
var Person = new Class()
Person.prototype.init = function () {
  // code here
}
Person.extend({
  find: function () {},
  exists: function () {}
})

Person.include({
  save: function () {},
  destroy: function () {}
})

Person.find()
var p1 = new Person()
p1.save()
