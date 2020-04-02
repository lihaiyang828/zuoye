// 数组有一个slice方法  arr.slice(n,m)  可以从索引n开始，找到索引为m处（不包含m），找到的以新数组返回
// 特殊情况：
// 1. n/m只传递一个或者都不传递
// 2. n/m是负数
// 3. n/m是小数
// 4. n/m是非有效数字
// 5. n/m的大小超过最大长度
// 6. 如果m<=n咋办
// ....
Array.prototype.mySlice = function mySlice(n, m) {
    let myArr = [];
    if (!isNaN(n) && n >= 0) {
        n = Math.floor(n);
        if (n > this.length - 1) {
            console.log('输入的索引值超出范围');
        }
        if (typeof m === 'undefined') {
            m = this.length;
            for (let i = 0; i <= (m - n - 1); i++) {
                myArr[i] = this[n + i];
            }
            return myArr;
        }
        if (!isNaN(m) && m > n && m < this.length) {
            m = Math.ceil(m);
            for (let i = 0; i <= (m - n - 1); i++) {
                myArr[i] = this[n + i];
            }
            return myArr;
        } else if (m > this.length - 1) {
            console.log('输入的索引值超出范围');
        } else {
            console.log('请输入想要的正整数索引');
        }
    } else {
        console.log('请输入想要的正整数索引');
    }
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.mySlice());
console.log(arr.mySlice(5));
console.log(arr.mySlice(-5));
console.log(arr.mySlice(1.5,3.9));
console.log(arr.mySlice(2,'a'));
console.log(arr.mySlice(1,20));
console.log(arr.mySlice(3,3));
console.log(arr.mySlice(3,2));