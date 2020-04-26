Array.prototype.reduce = function (callback) {
    if (typeof this !== 'object') {
        throw new TypeError('必须是数组类型');
    }
    if (!(this instanceof Array)) {
        throw new TypeError('必须是数组类型');
    }
    let i = 1;
    res = this[0];
    let fn = () => {
        if (i === this.length) {
            return;
        }
        res = callback(res, this[i++]);
        fn();
    }
    fn()
    return res;
}