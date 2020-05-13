exports.formatDateTime = (value, format) => {
  if(!value) return;
  let date  = new Date(value);
  let o = {
    "M+": date.getMonth() + 1, //month	
	"d+": date.getDate(), //day
	"h+": date.getHours(), //hour	
	"m+": date.getMinutes(), //minute	
	"s+": date.getSeconds(), //second	
	"q+": Math.floor((date.getMonth() + 3) / 3), //quarter	
	"S": date.getMilliseconds() //millisecond
  }
  	//格式化年匹配y的时表示有年
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o) if (new RegExp("(" + k + ")").test(format))
		format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

//其中password为秘钥，value为要加密的文本
exports.encyptPwd = encyptPwd = (password,value) => {
    const Jasypt = require('jasypt');//引入bcryptjs
    const jasypt = new Jasypt();
    jasypt.setPassword(password);
    console.log(jasypt.encrypt(value));
    return jasypt.encrypt(value);
}

encyptPwd('aegis', '123456');
//其中password为秘钥，message为要解密的密文的文本
exports.decyptPwd = decyptPwd = (password, message) => {
    const Jasypt = require('jasypt');//引入bcryptjs
    const jasypt = new Jasypt();
    jasypt.setPassword(password);
    console.log(jasypt.decrypt(message));
    return jasypt.decrypt(message);
}