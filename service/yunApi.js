import config from '../conf/index.js';

/**
 * 网易云音乐接口
 **/
const baseUrl = config.yunApiBaseUrl;
const api = {};

/**
 * banner广告列表
 * type :
 *  0: pc
	1: android
	2: iphone
	3: ipad
 */
api.banners = function(type=2){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/banner',
			data: {type},
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 获取歌单详情
 * （排行榜也是歌单的一种）
 */
api.playlist = function(id){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/playlist/detail',
			data: {id},
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * mv排行
 * 说明 : 调用此接口 , 可获取 mv 排行
可选参数 : limit: 取出数量 , 默认为 30
area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
api.topmv = function(data){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/top/mv',
			data: data,
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 获取 mv 数据
 **/
api.mvDetail = function(mvid){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/mv/detail',
			data: {mvid},
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 获取 mv 点赞转发评论数数据
 **/
api.mvDetailInfo = function(mvid){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/mv/detail/info',
			data: {mvid},
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 获取 mv 播放地址
 * r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
 **/
api.mvUrl = function(id,r){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/mv/url',
			data: {id, r},
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 获取 mv 评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
必选参数 : id: mv id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 **/
api.commentMv = function(data){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/comment/mv',
			data: data,
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}


/**
 * 云村热评
 **/
api.commentHotwall = function(data){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/comment/hotwall/list',
			data: data,
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}

/**
 * 热门评论
 * id : 资源 id
tpye: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
0: 歌曲
1: mv
2: 歌单
3: 专辑
4: 电台
5: 视频
 **/
api.commentHot = function(data){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: baseUrl+'/comment/hot',
			data: data,
			method: 'GET',
			success: (res)=> {
				 resolve(res);
			}
		});
	});
}


export default api;
