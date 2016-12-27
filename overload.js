var Overload = {
    map: function(arr, callback, pThis) {
        var len = arr.length;
        var rlt = new Array(len);
        for (var i = 0; i < len; i++) {
            if (i in arr) rlt[i] = callback.call(pThis, arr[i], i, arr);
        }
        return rlt;
    },
    getObjectClassName: function(obj) {
        if (obj && obj.constructor && obj.constructor.toString()) {
            var arr = obj.constructor.toString().match(/function\s*(\w+)/);
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
 
        return undefined;
    },
    overload: function(dispatcher, func_maps) {
        if (!(dispatcher instanceof Function)) {
            func_maps = dispatcher;
            dispatcher = function(args) {
                var ret = [];
                return Overload.map(args, function(o) {
                    return Overload.getObjectClassName(o)
                }).join();
            }
        }
 
        return function() {
            var key = dispatcher([].slice.apply(arguments));
            for (var i in func_maps) {
                var pattern = new RegExp("^" + i.replace("*", "[^,]*").replace("...", ".*") + "$");
                if (pattern.test(key)) {
                    return func_maps[i].apply(this, arguments);
                }
            }
        }
    }
};

exports.overload = Overload.overload