$(function () {
    let $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $sliderList = $container.find('.slider'),
        $paginationList = $container.find('.pagination>li'),
        $changeLeft = $container.children('.changeLeft'),
        $changeRight = $container.children('.changeRight');
    let step = 0,
        interval = 3000,
        autoTimer = null,
        len = $sliderList.length;

    //自动切换
    function autoMove() {
        if (step === (len - 1)) {
            step = 0;
            $wrapper.css({
                transitionDuration: '0s',
                left: 0
            });
            $wrapper[0].offsetWidth;
        }
        step++;
        $wrapper.css({
            transitionDuration: '.3s',
            left: -step * 800 + 'px'
        });
        paginationFocus();
    }

    //焦点
    function paginationFocus() {
        $paginationList.each((index, item) => {
            let Step = step;
            Step === (len - 1) ? Step = 0 : null;
            if (index === Step) {
                $(item).addClass('active');
                return;
            }
            $(item).removeClass('active');
        });
    }

    // 加载页面开始自动切换
    autoTimer = setInterval(autoMove, interval);

    //点击切换
    $changeRight.on('click', autoMove);
    $changeLeft.on('click', () => {
        if (step === 0) {
            step = len - 1;
            $wrapper.css({
                transitionDuration: '0s',
                left: -step * 800 + 'px'
            });
            $wrapper[0].offsetWidth;
        }
        step--;
        $wrapper.css({
            transitionDuration: '.3s',
            left: -step * 800 + 'px'
        });
        paginationFocus();
    });

    // 鼠标进入和离开控制自动的关闭和开启
    $container.on('mouseenter', () => clearInterval(autoTimer));
    $container.on('mouseleave', () => autoTimer = setInterval(autoMove, interval));
})