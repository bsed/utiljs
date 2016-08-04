/**

 * typeof 操作符，可能返回值： undefined, boolean, string, number, object, function	

 * instanceof, variable instanceof constructor

 * 函数内部，有两个特殊对象：arguments, this, arguments.callee, 方法： apply(o, [arg1, arg2, arg3]), call(o, arg1, arg2, arg3)

 * var o = new Object()

 * Object实例属性和方法： constructor, hasOwnProperty, isPrototypeOf, propertyIsEnumberable, toString, valueOf

 * 数值类型转换: number(), parseInt(), parseFloat(),

 * encodeURI(), encodeURIComponent(), decodeURI(), decodeURIComponent(), eval(), Math对象

 * Math.ceil(), Math.floor(), Math.round(), Math.random()

 */

/**

 * @ 常用代码

 */

/** 

 * 创建对象

 */

// 1. 最简单的方式

var person = { }
person.name = 'd0f'
person.age = 29
person.job = 'teacher'
person.sayHello = function () {
  console.log('Name: ' + this.name)
}

// 2. 工厂模式 

function createPerson (name, age, job) {
  var person = { }
  person.name = name
  person.age = age
  person.job = job
  person.sayHello = function () {
    console.log('Name: ' + this.name)
  }
  return person
}

var p1 = createPerson('d0f', 18, 'teacher')
var p2 = createPerson('jack', 13, 'student')

// 3.构造函数模式

function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayHello = sayHello
  this.sayHi = function () {
    console.log('hello World')
  }
  // return this

}
function sayHello () {
  console.log('Name: ' + this.name)
}

var p1 = new Person('d0f', 21, 'worker')
var p2 = new Person('jack', 12, 'Doctor')

// 4.原型模式

function Person () {
  // return this

}
Person.prototype.name = 'd0f'
Person.prototype.age = 18
Person.prototype.job = 'Doctor'
Person.prototype.sayHello = function () {
  console.log('Name: ' + this.name)
}

var p1 = new Person()
var p2 = new Person()

// 5.组合使用构造函数模式和原型模式

function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  // return this

}
Person.prototype = {
  constructor: Person,
  sayHello: function () {
    console.log('Name: ' + this.name)
  }
}
var p1 = new Person('d0f', 18, 'Doctor')
var p2 = new Person('jack', 23, 'Worker')

// 6.动态原型模式

function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  if (typeof this.sayHello !== 'function') {
    Person.prototype.sayHello = function () {
      console.log('Name: ' + this.name)
    }
  }
  // return this

}

var p1 = new Person('d0f', 18, 'Doctor')
var p2 = new Person('jack', 18, 'Worker')

// 7.寄生构造函数模式

function Person (name, age, job) {
  var o = { }
  o.name = name
  o.age = age
  o.job = job
  o.sayHello = function () {
    console.log('Name: ' + this.name)
  }
  return o
}
var p1 = new Person('d0f', 18, 'teacher')

// 寄生模式简单应用

function SpecialArray () {
  var _arr = []
  _arr.push.apply(_arr, arguments)
  _arr.toPipedString = function () {
    return this.join('-')
  }
  return _arr
}

var colors = new SpecialArray('red', 'blue', 'green')
console.log(colors.toPipedString())

// 8.稳妥构造函数模式

function Person (name, age, job) {
  var o = { }

  // 可以在这里添加私有变量和私有函数

  o.sayHello = function () {
    // name 局部变量

    console.log('Name: ' + name)
  }
  return o
}

var p1 = new Person('d0f', 14, 'student')
p1.sayHello()

/**

 * javascript 实现继承的方式

 */

// 1.原型链方式

// 父类

function SuperType () {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}

// 子类

function SubType () {
  this.subproperty = false
}

// 原型继承

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
  return this.subproperty
}

var s1 = new SubType()

// 2. 借用构造函数 实现继承的方式

function SuperType () {
  this.colors = ['red', 'blue', 'green']
}

// 子类

function SubType () {
  // 继承父类

  SuperType.call(this)
}

var s = new SubType()

// 3.组合继承

function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.sayAge = function () {
  console.log(this.age)
}

var s = new SubType('d0f', 18)

// 4.原型继承模式

function object (o) {
  function F () {}
  F.prototype = o
  return new F()
}
var person = {
  name: 'd0f',
  colors: ['red', 'green', 'blue']
}

var p2 = object(person)

// 5. 寄生式继承

function object (o) {
  function F () {}
  F.prototype = o
  return new F()
}
function createObj (origin) {
  var clone = object(origin)
  clone.sayHi = function () {
    console.log('Hello World ...')
  }
  return clone
}
var person = {
  name: 'd0f',
  colors: ['red', 'green', 'blue']
}

var p2 = createObj(person)

// 6. 寄生组合式继承

function object (o) {
  function F () {}
  F.prototype = o
  return new F()
}

function inheritPrototype (subType, superType) {
  var prototype = object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name)
  this.age = age
}
inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function () {
  console.log(this.age)
}
