Array.prototype._filter = function (callback, context = window) {
    if (typeof callback !== 'function' || typeof callback === 'function' && typeof callback.nodeType === 'number') {
        throw new Error('实参不是一个函数');
    }
    let aa = [];
    for (let i = 0; i < this.length; i++) {
        let res = callback.call(context, this[i], i, this);
        if (res == true) {
            aa.push(this[i]);
        }
    }
    return aa;
}
let ary = [1,2,3,4,5,6,7,8,9,10]
let cc = ary._filter((item)=>{
    return item >5
})
console.log(cc)