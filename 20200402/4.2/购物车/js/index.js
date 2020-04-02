//获取每个.list下的li的集合
let liList = document.querySelectorAll('.list li');
//获取每个.list下的em集合
let emList = document.querySelectorAll('.list em');
//获取每个.list下的lost集合('－'按钮)
let loseList = document.querySelectorAll('.list li .lose');
//获取每个.list下的plus集合('+'按钮)
let plusList = document.querySelectorAll('.list li .plus');
//获取每个.info下的em集合
let totalList = document.querySelectorAll('.info em');
let letter = 0;
let price = 0;
let arr = [0,0,0,0,0];
let ary = [];
//给每个li加一个unit(单价),number(个数),total(小计)
for (let i = 0; i < liList.length; i++) {
    liList[i].unit = parseFloat(document.getElementsByTagName('strong')[(i * 2)].innerHTML);
    liList[i].number = 0;
    liList[i].total = 0;
}
for (let i = 0; i < loseList.length; i++) {
    loseList[i].onclick = function () {
        if (liList[i].number > 0) {
            liList[i].number--;
            //个数:
            emList[i].innerText = liList[i].number;
            //小计:
            liList[i].total = liList[i].number * liList[i].unit;
            document.getElementsByTagName('strong')[(i * 2) + 1].innerText = `${liList[i].total}元`;
            letter--;
            totalList[0].innerText = letter;
            //总价:
            for (let j = 0; j < liList.length; j++) {
                price += liList[j].total;
            }
            totalList[1].innerText = price;
            price=0;
            //最贵的:
            if(liList[i].number<1){
                arr[i]=0;
            }
            ary = [...arr];
            ary.sort((a,b)=>{
                return b-a;
            });
            totalList[2].innerText = ary[0];
        }
    }
}
for (let i = 0; i < plusList.length; i++) {
    plusList[i].onclick = function () {
        liList[i].number++;
        //个数:
        emList[i].innerText = liList[i].number;
        //小计:
        liList[i].total = liList[i].number * liList[i].unit;
            document.getElementsByTagName('strong')[(i * 2) + 1].innerText = `${liList[i].total}元`;
        letter++;
        totalList[0].innerText = letter;
        //总价:
        for (let j = 0; j < liList.length; j++) {
            price += liList[j].total;
        }
        totalList[1].innerText = price;
        price=0;
        //最贵的:
        if(liList[i].number>0){
            arr[i]=liList[i].unit;
        }
        ary = [...arr];
        ary.sort((a,b)=>{
            return b-a;
        });
        totalList[2].innerText = ary[0];
    }
}