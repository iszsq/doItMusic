// 媒体工具类

/**
 * 根据lrc歌词字符串解析成对象
 * @param {Object} lrc
 */
const createLrcObj = function (lrc) {
	let oLRC = {
	    ti: "", //歌曲名
	    ar: "", //演唱者
	    al: "", //专辑名
	    by: "", //歌词制作人
	    offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
	    ms: [] //歌词数组{t:时间,c:歌词}
	};
	
	if(lrc.length==0) return;
    let lrcs = lrc.split('\n');//用回车拆分成数组
    for(let i in lrcs) {//遍历歌词数组
    	lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
        let s = t.split(":");//分离:前后文字
        if(isNaN(parseInt(s[0]))) { //不是数值
            for (let i in oLRC) {
                if (i != "ms" && i == s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        }else { //是数值
            let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
            let start = 0;
            for(let k in arr){
                start += arr[k].length; //计算歌词位置
            }
            let content = lrcs[i].substring(start);//获取歌词内容
            for (let k in arr){
                let t = arr[k].substring(1, arr[k].length-1);//取[]间的内容
                let s = t.split(":");//分离:前后文字
                oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) {//按时间顺序排序
        return a.t-b.t;
    });
	
	return oLRC;
}

export default {
	createLrcObj
};