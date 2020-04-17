$(function () {
    // 获取想要操作的元素
    let $navList = $('.navbar-nav .nav-item'),
        $productBox = $('.productBox'),
        data = [];

    // 从服务器获取数据
    function queryData() {
        $.ajax({
            url: "json/product.json",
            method: 'get',
            dataType: 'json',
            async: false,
            success: result => {
                data = result;
            }
        });
    }
    queryData();

    //渲染数据
    function bindHTML() {
        let str = ``;
        $.each(data, (index, item) => {

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
					<p class="card-text">时间：${time.replace(/-/g,'/')}</p>
				</div>
			</div>`;

        });
        $productBox.html(str);
    }
    bindHTML();

    //事件绑定
    function handel() {
        $navList.each((index,item)=>{
            item.flag = -1;
        });
        $navList.on('click', function () {
            
            let $this = $(this);
            $this.siblings().attr('data-flag',-1);
            $this.flag = $this.attr('data-flag');
            $flag = $this.flag *= -1;
            let $pai = $this.attr('data-pai');
            $this.attr('data-flag',$flag);
            data.sort((a, b) => {
                // 只有字符串才有replace方法，我们把获取的结果都先变为字符串
                a = String(a[$pai]).replace(/-/g, '');
                b = String(b[$pai]).replace(/-/g, '');
                return (a - b) * $this.flag;
            });
            bindHTML();
        });
    }
    handel();
});