//工具包
(function () {
    let class2type = {};
    let toString = class2type.toString;
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(item => {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });

    function toType(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }

    function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    }

    function isWindow(obj) {
        return obj != null && obj === obj.window;
    }

    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    function _each(obj, callback, context = window) {
        if (/^(ARRAY|OBJECT)$/i.test(obj.constructor)) {
            obj = _cloneDeep(obj);
        }
        if (obj == null) {
            throw new TypeError('OBJ必须是一个对象/数组/类数组!');
        }
        if (typeof obj !== "object") {
            throw new TypeError('OBJ必须是一个对象/数组/类数组!');
        }
        if (typeof callback !== "function") {
            throw new TypeError('CALLBACK必须是一个函数!');
        }

        if (isArrayLike(obj)) {
            for (let i = 0; i < obj.length; i++) {
                let res = callback.call(context, obj[i], i);
                if (res === false) {
                    break;
                }
                if (res !== undefined) {
                    obj[i] = res;
                }
            }
        } else {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) break;
                let res = callback.call(context, obj[key], key);
                if (res === false) break;
                if (res !== undefined) obj[key] = res;
            }
        }
        return obj;
    }

    function _cloneDeep(obj) {
        if (obj === null) return null;
        if (typeof obj !== "object") return obj;
        if (obj instanceof RegExp) return new RegExp(obj);
        if (obj instanceof Date) return new Date(obj);
        let cloneObj = new obj.constructor;
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) break;
            cloneObj[key] = _cloneDeep(obj[key]);
        }
        return cloneObj;
    }

    function _assignDeep(obj1, obj2) {
        let obj = _cloneDeep(obj1);
        for (let key in obj2) {
            if (!obj2.hasOwnProperty(key)) break;
            let v2 = obj2[key],
                v1 = obj[key];
            if ((v1 !== null && typeof v1 === "object") && (v2 !== null && typeof v2 === "object")) {
                obj[key] = _assignDeep(v1, v2);
                continue;
            }
            obj[key] = v2;
        }
        return obj;
    }
    ['_each', '_cloneDeep', '_assignDeep', 'toType', 'isFunction', 'isWindow', 'isArrayLike'].forEach(item => {
        window[item] = eval(item);
    });
})();

String.prototype._replace = function _replace(func, _callback) {
    if (toType(this) !== 'string') {
        throw new TypeError('this._replace is not a function!');
    };
    if (!func) {
        return;
    }
    //如果传的不是正则
    if (toType(func) !== 'regexp') {
        func = func.toString();
        let reg = new RegExp(func);
        let index = reg.exec(func).index;
        let arr = [];
        for (let i = 0; i < this.length; i++) {
            arr.push(this[i]);
        }
        if (toType(_callback) === 'function') {
            let res = _callback();
            if (res) {
                arr[index] = `${res}`;
                let str = '';
                for (let i = 0; i < arr.length; i++) {
                    str += arr[i];
                }
                return str;
            }
            return this;
        } else {
            arr[index] = `${_callback}`;
            let str = '';
            for (let i = 0; i < arr.length; i++) {
                str += arr[i];
            }
            return str;
        }
    };

    //正则
    let reg = func;
    let ary = [];
    let index = reg.exec(this).index;
    ary.push(index);
    if (/.*g|g.*/.test(func)) {
        let k;
        while (k !== null) {
            k = reg.exec(this);
            if (k === null) {
                break;
            }
            ary.push(k.index);
        };
    }
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(this[i]);
    }
    if (toType(_callback) === 'function') {
        let res = _callback();
        if (res) {
            for (let i = 0; i < ary.length; i++) {
                arr[ary[i]] = `${res}`;
            }
            let str = '';
            for (let i = 0; i < arr.length; i++) {
                str += arr[i];
            }
            return str;
        }
        return this;
    } else {
        for (let i = 0; i < ary.length; i++) {
            arr[ary[i]] = `${_callback}`;
        }
        let str = '';
        for (let i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        return str;
    };
}
let str = 'qwer1234qwer';
console.log('原字符串:', str);
console.log('传正则,没有全局修饰符,没有回调函数:', str._replace(/q/, 't'));
console.log('传正则,有全局修饰符,有回调函数:', str._replace(/q/g, () => {
return 1 + 1;
}));
console.log('传正则,没有全局修饰符,有回调函数:', str._replace(/q/, () => {
    return 1 + 1;
}));
console.log('传正则,全局修饰符,有回调函数:', str._replace(/q/g, () => {
    return 1 + 1;
}));
console.log('传字符串,没有回调函数:', str._replace('w', '珠峰'));
console.log('传字符串,有回调函数:', str._replace('w', () => {
    return 1 + 1;
}));
console.log('传字符串,没有传修改值:', str._replace('q'));
console.log('传正则,没有传修改值:', str._replace(/q/));
console.log('没传修改值:', str._replace());