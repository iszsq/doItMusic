<script>
	export default {
		globalData: {  
			//全局音频上下文
			audioCtx: null,   
		},
		onLaunch: function() {
			console.log('App Launch');
			//初始化音频上下文
			let audioCtx = null;
			let globalData = this.$options.globalData;
			if (globalData.audioCtx == null) {
				audioCtx = uni.createInnerAudioContext();
				audioCtx.autoplay = true;
				
				audioCtx.onError((res) => {
					console.error("audio播放错误", res);
					uni.showToast({
						title: '音频播放错误',
						icon: 'none'
					});
				});
				
				audioCtx.onCanplay(()=>{
					console.info("onCanplay");
					this.setAudioMetaInner(audioCtx);
					console.log("：" , audioCtx.duration);
					console.log("buffered：" , audioCtx.buffered);
					console.log("volume：" , audioCtx.volume);
					console.log("currentTime：" , audioCtx.currentTime);
				});
				
				audioCtx.onPlay(()=>{
					this.setAudioMetaInner(audioCtx);
				});
				
				audioCtx.onPause(()=>{
					this.setAudioMetaInner(audioCtx);
				});
				
				audioCtx.onStop(()=>{
					this.setAudioMetaInner(audioCtx);
				});
				
				audioCtx.onEnded(()=>{
					this.setAudioMetaInner(audioCtx);
				});
				
				audioCtx.onWaiting(()=>{
					console.log("onWaiting");
					this.setAudioMetaInner(audioCtx);
				});	
				
				audioCtx.onTimeUpdate(()=>{
					this.setAudioMetaInner(audioCtx);
				});
				
				globalData.audioCtx = audioCtx;
				this.$options.globalData = globalData;
			} 
		},
		onShow: function() {
			console.log('App Show')
			this.$bus.$emit('onAppShow');
		},
		onHide() {
			console.log('App Hide');
			this.$bus.$emit('onAppHide');
		},
		mounted() {
			console.log("app vue mounted!");
		},
		methods: {
			/**
			 * 更新音频信息
			 * @param {Object} audioCtx
			 */
			setAudioMetaInner(audioCtx){
				this.$u.throttle(()=>{
					console.log("setAudioMetaInner")
					let audM = {};
					audM.volume = audioCtx.volume;
					audM.buffered = audioCtx.buffered;
					audM.duration = audioCtx.duration;
					audM.currentTime = audioCtx.currentTime;
					audM.paused = audioCtx.paused;
					this.$store.commit('setAudioMeta', audM);
				}, 800);
			},
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*
	 * uView--注意要写在第一行，同时给style标签加入lang="scss"属性 
	 */
	/* #ifndef APP-NVUE */
	@import "uview-ui/index.scss";
	@import '/static/css/styles.css';
	/* #endif */
	
	
	
	:root{
		--title-bar-height: 120rpx;
		--primary-color: #e51419;
	}
	
	page {
		background-color: #f5f5f5;
	}
	
	/* #ifndef APP-NVUE */
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
	/* #endif */
	
	/* #ifdef H5*/
		body{
		}
	/* #endif */
	
	
	
	/**div显示固定行数**/
	.only-line-2{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    line-clamp: 2;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
	.only-line-1{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    line-clamp: 1;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
	.only-line-3{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    line-clamp: 3;
	    -webkit-box-orient: vertical;
	    text-overflow: -o-ellipsis-lastline;
	}
	
	
</style>
