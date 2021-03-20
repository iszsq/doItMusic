import config from '../conf/index.js';

//超时时间
const timeout = 10 * 1000;

/**网易云音乐接口基础服务地址**/
const baseUrl = config.yunApiBaseUrl;

//接口对象
const api = {};

/**
 * 接口方法定义
 * api文档地址：https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85
 */
const apiList = [
	{
		name: 'getTopicDetail' ,
		desc: '获取话题详情' ,
		url: '/topic/detail', 
	},
	{
		name: 'banners' ,
		desc: '首页广告轮播图' ,
		url: '/banner', 
	},
	{
		name: 'playlistDetail' ,
		desc: '获取歌单详情' ,
		url: '/playlist/detail', 
	},
	{
		name: 'searchDefault' ,
		desc: '默认搜索关键词' ,
		url: '/search/default', 
	},
	{
		name: 'searchHotDetail' ,
		desc: '热搜列表(详细)' ,
		url: '/search/hot/detail', 
		usedLoading: false
	},
	{
		name: 'searchSuggest' ,
		desc: '搜索建议' ,
		url: '/search/suggest', 
		usedLoading: false
	},
];



/**
 * 接口遍历
 */
apiList.forEach(item=>{
	api[item.name] = function(params){
		
		let {data, header, dataType} = params || {};
		
		return new Promise((resolve, reject)=>{
			try {
				if(false !== item.usedLoading){
					uni.showLoading({
					    title: 'loading...'
					});
				}
				
				uni.request({
				    url: baseUrl + item.url, 
					method: item.method || "GET",
				    data: data,
				    header: header,
					dataType: dataType || "json",
					timeout: timeout,
				    success: (res) => {
						console.info(item.url, res);
						if (res.data != null && res.data.hasOwnProperty('code') && res.data.code === 200) {
							resolve(parseSuccessResponseData(res));
						} else {
							reject(parseFailResponseData(res));
						}
				    },
					fail: (e) => {
						console.error("接口请求错误：" + item.url, e);
						reject(parseFailResponseData(e));
					},
					complete: () => {
						console.log("complete---");
						if(false !== item.usedLoading){
							uni.hideLoading();
						}
					}
				});
			} catch (e) {
				console.error("方法异常：", e);
				reject({
					message: "请求错误",
				});
				showToast("请求错误");
			}
		});
	}
});

/**
 * 转换返回的结果，网易云的接口格式不一定都一致
 * @param {Object} res
 */
function parseSuccessResponseData(res){
	return res.data || res.result;
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
