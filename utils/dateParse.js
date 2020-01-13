module.exports = (target,fmt) => { //author: meizz 
    var o = {
        "M+": target.getMonth() + 1, // month
        "d+": target.getDate(), //day 
        "h+": target.getHours(), //hour 
        "m+": target.getMinutes(), // minute 
        "s+": target.getSeconds(), // second 
        "q+": Math.floor((target.getMonth() + 3) / 3), // season 
        "S": target.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (target.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}