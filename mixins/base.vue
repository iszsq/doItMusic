<!--
- 全局混入 
-->
<script>
	import dateUtil from 'utils/dateUtil.js';
	import audioUtils from '../utils/audioUtils.js';
	import {  
		mapState,  
		mapMutations  
	} from 'vuex';
	
	export default{
		data(){
			return {
				
			};
		} ,
		computed: {
			...mapState(['audioId', 'audioLrc', 'audioMeta']),
			/**
			 * 音频播放百分比
			 */
			audioPlayPerc(){
				let {currentTime=0, duration=0} = this.audioMeta;
				
				let i = ((currentTime/duration) * 100).toFixed(2);
				return i;
			},
			/**
			 * 音频缓存百分比
			 */
			audioBuffedPerc(){
				let {buffered=0, duration=0} = this.audioMeta;
				let i = ((buffered/duration) * 100).toFixed(2);
				return i;
			},
		},
		watch: {
			
		},
		created(){
			
		},
		/**
		 * 监听返回事件触发，不一定全平台有效，有兼容性问题
		 * @param {Object} e
		 * @return {bool} 返回true表示阻止事件，取消返回
		 */
		onBackPress(e) {
			console.log('onBackPress', e);
			if (this.showComment===true) {
				//关闭评论窗口，取消返回
				this.showComment = false;
				return true;
			}
		},
		methods: {
			...mapMutations({
				setAudioId : "setAudioId",
				setAudioTitle : "setAudioTitle",
				setPicUrl : "setPicUrl",
				setAudioLrc : "setAudioLrc",
				setAudioMeta : "setAudioMeta",
			}),
			/**
			 * 转换数字显示(单位：万)
			 * @param {val} 数值
			 * @param {fixedNum}  保留几位小数
			 * @param {ch} 是否中文      
			 */
			formatNumber(val, fixedNum=2, ch=true){
				if(!val){
					return '';
				}
				if(val >= 10000){
					return (val/10000).toFixed(fixedNum) + (ch ? '万': 'w');
				}
				return val;
			},
			/**
			 * 时间戳转日期格式
			 */
			formatTime(time, format='yyyy-MM-dd'){
				let date = new Date(time);
				return dateUtil.dateFormat(format, date);
			},
			toFixed(num, fNum=2){
				return num.toFixed(fNum);
			},
			/**
			 * 打开url链接
			 */
			openUrl(params = {}) {
				let {url} = params;
				let enUrl = encodeURIComponent(url);
				uni.navigateTo({
					url: '/pages/webBrowser/webBrowser?url=' + enUrl,
				});
			},
			/**
			 * 打开音乐播放页面
			 * id
			 * picUrl
			 * name
			 */
			openMp3(params={}){
				console.log('-----openMp3', params);
				let { id, picUrl, name } = params;
				let { audioId, audioMeta } = this;
				if( id != audioId || audioMeta.paused ){
					// this.setAudioId(id);
					this.setAudioTitle(name);
					this.setPicUrl(picUrl);
				}
				
				uni.navigateTo({
					url: '/pages/playMusicPage/playMusicPage?id=' + id,
				});
			},
			/**
			 * 根据id播放一首音乐
			 * @param {type} paramId 
			 */
			playMusicById(paramId){
				let { audioId, audioMeta } = this;
				if(paramId == audioId && audioMeta.paused === false){
					return;
				}
				this.setAudioId(paramId);
				
				//获取音乐url
				this.$api.songUrl({data: {
					id: paramId
				}}).then(data => {
					let songs = data.data || [];
					if (songs.length > 0 && songs[0].url ) {
						//播放音乐
						this.playMusicByUrl(songs[0].url);
					} else {
						uni.showModal({
						    title: '失败',
						    content: '无法获取该歌曲的播放地址，应该是没版权~',
						    
						});
					}
					
					//获取歌词
					return this.$api.lyric({data: {
						id: paramId
					}});
				}).then(data => {
					//创建歌词对象
					let audioLrc = audioUtils.createLrcObj(data.lrc.lyric);
					this.setAudioLrc(audioLrc);
				});
			},
			/**
			 * 播放一首歌曲根据Url
			 * @param {Object} url
			 */
			playMusicByUrl(url){
				console.log("playMusicByUrl", url);
				let audioCtx = getApp().globalData.audioCtx;
				audioCtx.src = url;
				audioCtx.play();
				
				return audioCtx;
			},
			setAudioMetaInner(audioCtx){
				let audM = {};
				audM.volume = audioCtx.volume;
				audM.buffered = audioCtx.buffered;
				audM.duration = audioCtx.duration;
				audM.currentTime = audioCtx.currentTime;
				audM.paused = audioCtx.paused;
				this.setAudioMeta(audM);
				// console.log('setAudioMeta', this.audioMeta);
			},
			/**
			 * 播放音乐
			 */
			doPlayAudio(){
				let audioCtx = getApp().globalData.audioCtx;
				console.log("doPlayAudio", audioCtx);

				if (audioCtx != null) {
					audioCtx.play();
				}
			},
			/**
			 * 暂停音乐
			 */
			doPauseAudio(){
				console.log("doPauseAudio", audioCtx);
				let audioCtx = getApp().globalData.audioCtx;
				if (audioCtx != null) {
					audioCtx.pause();
				}
			},
			/**
			 * 转成分钟
			 */
			parseMinute(num=0){
				num < 0 ? 0 : num;
				let i = parseInt(num/60);
				return i < 10 ? '0' + i : i; 
			},
			/**
			 * 转成秒
			 */
			parseSecond(num=0){
				let i = parseInt(num%60);
				return i < 10 ? '0' + i : i;
			},
			/**
			 * 打开歌手主页页面
			 */
			openArtist(id){
				if(!id){
					return;
				}
				uni.navigateTo({
					url: '/pages/artistPage/artistPage?id=' + id,
				});
			},
			/**
			 * 打开歌单页面
			 * type: 1-歌单
			 * 		 2-专辑（默认）
			 */
			openPlaylistPage(id, type=2){
				uni.navigateTo({
					url: `/pages/playlistPage/playlistPage?id=${id}&type=${type}`,
				});
			},
			/**
			 * 开发中小提示
			 */
			showDevToast(){
				uni.showToast({
					title: '还没有时间做~',
				});
			},
			/**
			 * 显示普通的toast提示
			 * @param {Object} msg 
			 */
			showNoneToast(msg){
				uni.showToast({
					title: msg,
					icon: 'none',
				})
			},
			/**
			 * 视频播放页面
			 * type: 1-mv
			 * 		 2-普通视频（默认）
			 */
			openPlayVideoPage(id, type=2){
				console.log('openPlayVideoPage', id,type);
				uni.navigateTo({
					url: `/pages/playVideoPage/playVideoPage?id=${id}&type=${type}`,
				});
			},
			
		},
	}
</script>
