import config from '../conf/index.js';

//超时时间
const timeout = 10 * 1000;

/**网易云音乐接口基础服务地址**/
const baseUrl = config.yunApiBaseUrl;

//接口对象
const api = {};

/**
 * 接口方法定义
 * name: 方法名，$api.方法名 进行接口请求
 * desc：接口解释
 * url：接口路径
 * usedLoading：是否使用loading加载提示框，默认true
 * 网易云 api 文档地址：https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85
 */
const apiList = [
	{
		desc: '获取话题详情' ,
		name: 'getTopicDetail' ,
		url: '/topic/detail', 
	},
	{
		desc: '首页广告轮播图' ,
		name: 'banners' ,
		url: '/banner', 
	},
	{
		desc: '网友精选碟歌单' ,
		name: 'topPlaylist' ,
		url: '/top/playlist', 
		usedLoading: false
	},
	{
		desc: '获取歌单详情' ,
		name: 'playlistDetail' ,
		url: '/playlist/detail', 
		usedLoading: false
	},
	{
		desc: '获取专辑详情' ,
		name: 'album' ,
		url: '/album', 
		usedLoading: true
	},
	{
		desc: '默认搜索关键词' ,
		name: 'searchDefault' ,
		url: '/search/default', 
	},
	{
		desc: '热搜列表(详细)' ,
		name: 'searchHotDetail' ,
		url: '/search/hot/detail', 
		usedLoading: false
	},
	{
		desc: '搜索建议' ,
		name: 'searchSuggest' ,
		url: '/search/suggest', 
		usedLoading: false
	},
	{
		desc: '搜索多重匹配' ,
		name: 'searchMultimatch' ,
		url: '/search/multimatch', 
		usedLoading: true
	},
	{
		desc: '搜索' ,
		name: 'search' ,
		url: '/search', 
		usedLoading: true
	},
	{
		desc: '获取音乐 url' ,
		name: 'songUrl' ,
		url: '/song/url', 
		usedLoading: true
	},
	{
		desc: '获取音乐 歌词' ,
		name: 'lyric' ,
		url: '/lyric', 
		usedLoading: true
	},
	{
		desc: '最新mv' ,
		name: 'mvFirst' ,
		url: '/mv/first', 
		usedLoading: true
	},
	{
		desc: '歌手详情' ,
		name: 'artistDetail' ,
		url: '/artist/detail', 
	},
	{
		desc: '歌手描述，更全的数据' ,
		name: 'artistDesc' ,
		url: '/artist/desc', 
	},
	{
		desc: '相关视频' ,
		name: 'relatedAllvideo' ,
		url: '/related/allvideo', 
		usedLoading: false
	},
	{
		desc: '获取视频播放地址' ,
		name: 'videoUrl' ,
		url: '/video/url', 
		usedLoading: true
	},
	{
		desc: '获取mv播放地址' ,
		name: 'mvUrl' ,
		url: '/mv/url', 
		usedLoading: true
	},
	{
		desc: '获取 mv 数据' ,
		name: 'mvDetail' ,
		url: '/mv/detail', 
		usedLoading: false
	},
	{
		desc: '视频详情' ,
		name: 'videoDetail' ,
		url: '/video/detail', 
		usedLoading: false
	},
	{
		desc: '热门评论' ,
		name: 'commentHot' ,
		url: '/comment/hot', 
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
