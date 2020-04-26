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
(function () {
    class Banner {
        constructor(container, options) {
            this.container = container;
            _each(options, (item, key) => {
                this[key] = item;
            });
            this.activeIndex = this.initialSlide;
            this.init();
        }

        init() {
            this.computed()
            //点击切换
            _each(this.slides, (item, index) => {
                item.onclick = () => {
                    this.activeIndex = index;
                    this.change();
                }
            });
            //左右切换
            if (this.arrowPrev) {
                this.arrowPrev.onclick = () => {
                    if (this.activeIndex == 0) {
                        this.activeIndex = this.slides.length - 1;
                    } else {
                        this.activeIndex--;
                    }
                    this.change();
                };
            }
            if (this.arrowPrev) {
                this.arrowNext.onclick = () => {
                    if (this.activeIndex == this.slides.length - 1) {
                        this.activeIndex = 0;
                    } else {
                        this.activeIndex++;
                    }
                    this.change();
                };
            }
            //初始化完成,触发init回调函数
            if (toType(this.on) === 'object' && isFunction(this.on.init)) {
                //吧回调函数执行,让方法中的this是实例,并且传递的第一个参数也是实例
                this.on.init.call(this, this);

            }
        }
        computed() {
            //获取元素
            let container = this.container;
            this.nav = container.querySelector('.zhufeng-nav');
            this.contentBox = container.querySelector('.zhufeng-contentBox');
            this.contentList = container.querySelectorAll('.zhufeng-content');
            //控制元素样式

            let isEmpty = this.empty.call(this);
            let arr = [];
            if (!isEmpty) {
                _each(this.title, (item, key) => {
                    arr.push(this.title[key]);
                });
            }
            let str = ``;
            if (arr.length < this.contentList.length) {
                let len = this.contentList.length - arr.length;
                for (let i = 0; i < len; i++) {
                    arr.push('未定义');
                }
            };
            _each(this.contentList, (item, index) => {
                str += `<div class='zhufeng-slide'>${arr[index]}</div>`;
            });
            this.nav.innerHTML = str;

            this.slides = container.querySelectorAll('.zhufeng-slide');
            this.activeIndex = this.activeIndex < 0 ? 0 : (this.activeIndex > this.slides.length - 1 ? this.slides.length - 1 : this.activeIndex);
            this.contentBox.style.height = `${container.offsetHeight-this.nav.offsetHeight}px`;
            _each(this.contentList, item => {
                item.style.height = `${container.offsetHeight-this.nav.offsetHeight}px`;
            });
            _each(this.slides, item => {
                item.style.width = `${(this.nav.offsetWidth/this.slides.length)-item.clientLeft}px`;
            })

            //左右切换
            this.arrowPrev = null;
            this.arrowNext = null;
            if (toType(this.navigation) === 'object') {
                this.navigation.prevEl ? this.arrowPrev = container.querySelector(this.navigation.prevEl) : null;
                this.navigation.nextEl ? this.arrowNext = container.querySelector(this.navigation.nextEl) : null;
            }
            this.change();
        }

        empty() {
            for (var key in this.title) {
                return false;
            }
            return true;
        };
        change() {
            let isO = toType(this.on) === 'object' ? true : false,
                transitionStart = isO ? this.on.transitionStart : null,
                transitionEnd = isO ? this.on.transitionEnd : null;
            //切换之前触发的钩子函数
            transitionStart ? transitionStart.call(this, this) : null;
            _each(this.slides, (item, index) => {
                if (index === this.activeIndex) {
                    item.classList.add("active");
                    this.contentList[index].classList.add("active");
                } else {
                    item.classList.remove('active');
                    this.contentList[index].classList.remove('active');
                }
            });
            //切换之后触发的钩子函数
            transitionEnd ? transitionEnd.call(this, this) : null;

        }
    }

    function tabs(container, options = {}) {
        let defaultParams = {
            initialSlide: 0,
            title: {},
            navigation: {
                nextEl: '.zhufeng-arrow-next',
                prevEl: '.zhufeng-arrow-prev'
            },
            on: {
                init() {},
                transitionStart() {},
                transitionEnd() {}
            }
        };
        options = _assignDeep(defaultParams, options);
        typeof container === "string" ? container = document.querySelector(container) : null;
        if (!container || container.nodeType !== 1) {
            throw new TypeError('container must be an element!');
        }

        return new Banner(container, options);
    }
    window.tabs = tabs;
})();