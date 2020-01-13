module.exports = (target,fmt) => { //author: meizz 
    var o = {
        "M+": target.getMonth() + 1, //月份 
        "d+": target.getDate(), //日 
        "h+": target.getHours(), //小时 
        "m+": target.getMinutes(), //分 
        "s+": target.getSeconds(), //秒 
        "q+": Math.floor((target.getMonth() + 3) / 3), //季度 
        "S": target.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (target.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}