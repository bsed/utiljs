var PubSub = {
    subscribe: function (ev, callback) {
        var calls = this._callbacks || (this._callbacks = {});
        (this._callbacks[ev] || this._callbacks[ev] == []).push(callback);
        return this;
    },

    publish: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        var ev = args.shift();
        var list, calls, i, l;
        calls = this._callbacks;
        list = this._callbacks[ev];

        if (!calls) { return this; }
        if (!list) { return this; }

        for (i = 0, len = list.length; i < l; i++) {
            list[i].apply(this, args);
        }
        return this;
    }
}


// example

PubSub.subscribe("wem", function () {
    console.log("hello world");
});

PubSub.publish("wem");



// jQuery版,  发布订阅模式

(function ($) {
    var o = $({});
    $.subscribe = function () {
        o.bind.apply(o, arguments);
    }

    $.unsubscribe = function () {
        o.unbind(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

})(jQuery);





// ===

if (typeof Object.create !== "function") {
    Object.create = function (o) {
        function F() { }
        F.prototype = o;
        return new F();
    }
}

Math.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    }).toUpperCase();
}
