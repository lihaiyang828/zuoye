var reg = /^1\d{10}$/;//手机号
var reg2 = /^(\d|-)\d|./;//有效数字
var reg3 = /^\d+\@qq\.com$/;//qq邮箱
var reg4 = /^\d{6}(19\d{2}|20([01]\d|20))(0(1[0-2]\d|3[01]|2([01]\d|2[0-8])|[3-9]([0-2]\d|3[01]))|1[0-2]([0-2]\d|3[01]))\d{3}(\d|X)$/;//身份证号码
var reg5 = /^((1[89]|[2-4]\d)|6[0-5])/;//18-65之间的整数
var reg6 = /[a-zA-Z0-9]{8,18}/;//8-18位 (大小写加数字)