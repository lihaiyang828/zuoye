let container = document.querySelector('.container'),
    wrapper = container.querySelector('.wrapper'),
    slideList = wrapper.querySelectorAll('.slide'),
    pagination = container.querySelector('.pagination'),
    paginationList = pagination.querySelectorAll('li'),
    changeLeft = container.querySelector('.changeLeft'),
    changeRight = container.querySelector('.changeRight');
let step = 0,
    prev = 0,
    autoTimer = null,
    interval = 1000,
    len = slideList.length;


//实现切换
function change() {
    slideList[step].style.zIndex = '1';
    slideList[step].style.opacity = '1';
    slideList[prev].style.zIndex = '0';
    slideList[prev].style.opacity = '0';
    paginationFocus();
};

//自动切换
function autoMove() {
    prev = step;
    step++;
    if (step >= len) {
        step = 0;
    }
    change();
};

//焦点对齐
function paginationFocus() {
    console.log(step);
    [].forEach.call(paginationList, (item, index) => {
        if (step == index) {
            item.className = 'active';
            return;
        }
        item.className = '';
    });
};

// 加载页面:开始自动轮播
autoTimer = setInterval(autoMove, interval);

//左右按钮点击切换
changeRight.onclick = autoMove;
changeLeft.onclick = function () {
    prev = step;
    step--;
    if (step < 0) {
        step = len - 1;
    }
    change();
};

//焦点点击切换
[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        if (step == index) return;
        prev = step;
        step = index;
        change();
    }
});

// 鼠标进入到CONTAINER停止自动轮播，离开后自动轮播可以继续
container.onmouseenter = function () {
    clearInterval(autoTimer);
};
container.onmouseleave = function () {
    autoTimer = setInterval(autoMove, interval);
};