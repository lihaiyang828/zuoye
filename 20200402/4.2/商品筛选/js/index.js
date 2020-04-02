let type = document.getElementById('type');
let liList = type.querySelectorAll('li');
let choose = document.getElementById('choose');
console.log(liList);
let brand = liList[0].querySelectorAll('a');
let size = liList[1].querySelectorAll('a');
let system = liList[2].querySelectorAll('a');
let network = liList[3].querySelectorAll('a');
console.log(brand, size, system, network)
console.log(brand[1]);
let n = 0;
let m = 0;
let x = 0;
let y = 0;

function change(sort, index) {
    for (let i = 0; i < sort.length; i++) {
        sort[i].style.color = '#000'
    }
    sort[index].style.color = '#28a5c4';
}
for (let i = 0; i < brand.length; i++) {
    brand[i].onclick = function () {
        n++;
        change(brand, i);
        let link = document.createElement('mark');
        link.className='aaa';
        link.innerHTML = `<span>${brand[i].innerText}<a>×</a></span>`;
        choose.appendChild(link);
        
        let linkList = choose.querySelectorAll('.aaa');
        if (n > 1) {
            link.innerHTML = `<span>${brand[i].innerText}<a>×</a></span>`;
            choose.removeChild(linkList[0]);
        }
        let close = link.querySelector('a');
        close.onclick=function(){
            choose.removeChild(link);
            for (let i = 0; i < brand.length; i++) {
                brand[i].style.color = '#000'
            }
            n = 0;
        }
    }
}
for (let i = 0; i < size.length; i++) {
    size[i].onclick = function () {
        m++;
        change(size, i);
        let link = document.createElement('mark');
        link.className='bbb';
        link.innerHTML = `<span>${size[i].innerText}<a>×</a></span>`;
        choose.appendChild(link);
        
        let linkList = choose.querySelectorAll('.bbb');
        if (m > 1) {
            link.innerHTML = `<span>${size[i].innerText}<a>×</a></span>`;
            choose.removeChild(linkList[0]);
        }
        let close = link.querySelector('a');
        close.onclick=function(){
            choose.removeChild(link);
            for (let i = 0; i < size.length; i++) {
                size[i].style.color = '#000'
            }
            m = 0;
        }
    }
}
for (let i = 0; i < system.length; i++) {
    system[i].onclick = function () {
        x++;
        change(system, i);
        let link = document.createElement('mark');
        link.className='ccc';
        link.innerHTML = `<span>${system[i].innerText}<a>×</a></span>`;
        choose.appendChild(link);
        let linkList = choose.querySelectorAll('.ccc');
        if (x > 1) {
            link.innerHTML = `<span>${system[i].innerText}<a>×</a></span>`;
            choose.removeChild(linkList[0]);
        }
        let close = link.querySelector('a');
        close.onclick=function(){
            choose.removeChild(link);
            for (let i = 0; i < system.length; i++) {
                system[i].style.color = '#000'
            }
            x = 0;
        }
    }
}
for (let i = 0; i < network.length; i++) {
    network[i].onclick = function () {
        y++;
        change(network, i);
        let link = document.createElement('mark');
        link.className='ddd';
        link.innerHTML = `<span>${network[i].innerText}<a>×</a></span>`;
        choose.appendChild(link);
        let linkList = choose.querySelectorAll('.ddd');
        if (y > 1) {
            link.innerHTML = `<span>${network[i].innerText}<a>×</a></span>`;
            choose.removeChild(linkList[0]);
        }
        let close = link.querySelector('a');
        close.onclick=function(){
            choose.removeChild(link);
            for (let i = 0; i < network.length; i++) {
                network[i].style.color = '#000'
            }
            y = 0;
        }
    }
}