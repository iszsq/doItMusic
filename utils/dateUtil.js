/**
 * 日期原型添加format方法，格式化日期
 * @param format yyyy-MM-dd HH:mm:ss
 * @returns {*}
 */

const dateFormat = function (format, m_date) {
    if(!format){
        format= 'yyyy-MM-dd';
    }
	
    let date = {
        "M+": m_date.getMonth() + 1,
        "d+": m_date.getDate(),
        "h+": m_date.getHours(),
        "H+": m_date.getHours(),
        "m+": m_date.getMinutes(),
        "s+": m_date.getSeconds(),
        "q+": Math.floor((m_date.getMonth() + 3) / 3),
        "S+": m_date.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (m_date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

export default {
	dateFormat
}