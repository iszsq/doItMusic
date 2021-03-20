import config from '../conf/index.js';

//超时时间
const timeout = 3000;

/**网易云音乐接口基础服务地址**/
const baseUrl = config.yunApiBaseUrl;

//接口对象
const api = {};

//接口方法定义
const apiList = [
	{
		name: 'getTopicDetail' ,
		desc: '获取话题详情' ,
		url: '/topic/detail', 
		method: 'GET',
	},
];

/**
 * 接口遍历
 */
apiList.forEach(item=>{
	api[item.name] = function(params){
		let {data, header, dataType} = params || {};
		return new Promise((resolve, reject)=>{
			uni.request({
			    url: baseUrl + item.url, 
				method: item.method || "GET",
			    data: data,
			    header: header,
				dataType: dataType || "json",
				timeout: timeout,
			    success: (res) => {
					console.error(item.url, res);
			        resolve(parseSuccessResponseData(res));
			    },
				fail: (e) => {
					console.error("接口请求错误：" + item.url, e);
					reject(parseFailResponseData(e));
				}
			});
		});
	}
});

/**
 * 转换返回的结果，网易云的接口格式不一定都一致
 * @param {Object} res
 */
function parseSuccessResponseData(res){
	return res;
}

/**
 * http状态错误时封装返回
 * @param {Object} res
 */
function parseFailResponseData(e){
	if (e.errMsg) {
		showToast(e.errMsg);
	}
	return e;
}

/**
 * 显示提示
 * @param {Object} message
 */
function showToast(message){
	uni.showToast({
	    title: message,
	    duration: 1500,
		icon: 'none',
	});
}



export default api;
