//基于单例模式实现业务板块开发
let shopModule = (function () {
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardList = null,
        arr = null,
        data = null;
    //querData : 从服务器获取数据
    let querData = function querData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                ary = data;
                bindHtml(data);
            }
        };
        xhr.send(null);
    };
    //bindHtml:完成数据绑定
    let bindHtml = function bindHtml() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<div class="card">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price.toFixed(2)}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time}</p>
            </div>
        </div>`;
        });
        productBox.innerHTML = str;
        cardList = productBox.querySelectorAll('.card');
    };
    //clear:控制解除当前点击LI以外的,升降标识都回归-1
    let clear = function clear() {
        [].forEach.call(navList, item => {
            //this:当前点击的li
            if (item !== this) {
                item.flag = -1;
            }
        });
    };
    //sortCard:排序
    let sortCard = function sortCard(i) {
        let temp = ary.sort((a, b) => {
            if(i==0){
                a=a.price;
                b=b.price;
            } else if(i==1) {
                a = a.time.replace(/-/g, '');
				b = b.time.replace(/-/g, '');
            } else if(i==2){
                a=a.hot;
                b=b.hot;
            }
            return (a - b) * this.flag;
        });
        bindHtml(temp);
    };
    //handleNav:按钮的循环事件绑定
    let handleNav = function handleNav() {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                //this:当前点击的这个li
                clear.call(this);
                this.flag *= -1;
                sortCard.call(this, index);
            };
        });
    };
    return {
        init() {
            querData();
            handleNav();
        }
    }
})();
shopModule.init();