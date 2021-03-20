<template>
	<!-- 首页视频 -->
	<view class="video-box">
		<swiper class="swiper" 
			:vertical="true" 
			:autoplay="false" 
			:current="current" 
			:duration="200"
			@change="onChange"
		>
			<swiper-item 
				:key="index"
				v-for="(item,index) in list"
			>
				<view class="swiper-item">
					<!-- 模糊的视频背景 -->
					<view class="video-bg">
						<image class="bg-image" mode="top" :src="(current===index ? item.cover : current+1===index ? item.cover : current-1===index?item.cover :'')"></image>
					</view>
					<video
						id="mVideo" 
						v-if="current===index && currentVideoUrl.url"
						loop
						autoplay
						class="m-video"
						:src="currentVideoUrl.url"             
						:enable-progress-gesture="false"
						:show-fullscreen-btn="true"
						:danmu-btn="false"
						:enable-danmu="false"
						@error="videoErrorCallback" 
						@play="onPlay"
						@controlstoggle="controlstoggle"
						t7-video-player-type="inline"
						webkit-playsinline="true"  
						playsinline="true"  
						x-webkit-airplay="true"
						x5-playsinline="showLine"
						controls>
					</video>
					
					<!-- 内容区 -->
					<view class="controls-box" >
						<view class="detail-box">
							<view class="name">{{item.name}}</view>
							<view class="artist-name">{{item.artistName}}</view>
						</view>
						
						<!-- 点赞区 -->
						<view class="operation-box flex-column" v-show="!controlsShow">
							<u-icon :size="80" class="o-icon" label-color="#ffffff" :label="currentVideoInfo.likedCount" name="thumb-up-fill" label-pos="bottom"/>
							<u-icon :size="80" class="o-icon" label-color="#ffffff" :label="currentVideoInfo.commentCount" 
								name="chat-fill" label-pos="bottom"
								@click="openComment"
							/>
							<!-- <u-icon :size="80" class="o-icon" label-color="#ffffff" :label="currentVideoInfo.shareCount" name="share-fill"  label-pos="bottom" /> -->
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		
		<!-- 评论 -->
		<u-popup  v-model="showComment" safe-area-inset-bottom closeable mode="bottom"
			border-radius="10"
			height="800rpx"
		>
			<sq-comments ref="mvComments"/>
		</u-popup>
	</view>
	
</template>

<script>
	export default {
		props:{
			//是否激活
			actived: Boolean
		},
		data() {
			return {
				initYet: false,
				//mv列表
				list: [],
				current : 0,
				//当前播放的视频数据
				currentVideo: {},
				//当前播放的点赞转发评论数数据
				currentVideoInfo: {},
				//当前播放的视频地址
				currentVideoUrl: {},
				showComment: false,
				//控制条显示和隐藏变化
				controlsShow: false,
			}
		},
		computed: {
			
		},
		watch:{
			actived(val){
				if(val){
					this.init();
					this.onActive();
				}else{
					this.onHidden();
				}
			},
		},
		created() {
			this.init();
		},
		methods: {
			init(){
				if(!this.initYet && this.actived){
					this.getList();
					this.initYet= true;
				}
			},
			videoErrorCallback(e) {
				console.error('videoErrorCallback', e);
			},
			/**
			 * 当开始/继续播放时触发play事件	
			 */
			onPlay(ev){
				console.log(ev, 'onPlay');
			},
			/**
			 * 获取mv列表
			 */
			async getList(){
				let params = {
					limit: 30,
				};
				let res = await this.$yunApi.topmv(params);
				this.list = res.data.data;
				this.playMvDetail(0);
			},
			/**
			 * 切换监听
			 */
			onChange(e){
				console.log('onChange', e);
				let {current, source} = e.detail;
				this.playMvDetail(current).then(()=>{
					this.current= current;
				});
				console.log('current', current);
				console.log('source', source);
			},
			/**
			 * 播放mv
			 * @param index 下标
			 */
			async playMvDetail(index){
				let item = this.list[index];
				this.currentVideoInfo = {};
				this.currentVideoUrl = {};
				
				//歌曲详情,获取分辨率列表
				let res = await this.$yunApi.mvDetail(item.id);
				this.currentVideo = res.data.data;
				
				//获取播放地址
				let resUrl = await this.$yunApi.mvUrl(item.id, this.currentVideo.brs[0].br);
				this.currentVideoUrl = resUrl.data.data;
				
				//歌曲点赞和评论数量
				let resInfo = await this.$yunApi.mvDetailInfo(item.id);
				this.currentVideoInfo = resInfo.data;
			},
			/**
			 * 打开评论
			 */
			openComment(){
				this.showComment= true;
				this.$nextTick(()=>{
					this.$refs.mvComments.getList({type:1, id: this.currentVideo.id});
				});
			},
			/**
			 * 播放控制条显示时
			 */
			controlstoggle(e){
				console.debug(e, 'controlstoggle');
				this.controlsShow= e.detail.show;
			},
			/**
			 * 当显示时
			 */
			onActive(){
				console.debug("onActive--mv--tab")
				this.play();
			},
			/**
			 * 隐藏时
			 */
			onHidden(){
				console.debug("onHidden--mv--tab")
				this.pause();
			},
			/**
			 * 暂停播放
			 */
			pause(){
				console.debug(videoContext, '--pause video');
				let videoContext = uni.createVideoContext('mVideo');
				videoContext.pause();
			},
			/**
			 * 开始播放
			 */
			play(){
				console.debug(videoContext, '--play video');
				if(!this.actived){
					return;
				}
				let videoContext = uni.createVideoContext('mVideo');
				videoContext.play();
			},
		},
	}
</script>

<style scoped>
	.video-box{
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.swiper{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.swiper-item .video-bg{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	.swiper-item .video-bg .bg-image{
		width: 100%;
		height: 100%;
		filter: blur(5px);
	}
	.uni-bg-red{
		background-color: #FF201F;
	}
	.uni-bg-green{
		background-color: #00B26A;
	}
	.uni-bg-blue{
		background-color: #007AFF;
	}
	
	.m-video{
		width: 750rpx;
		height: 422rpx;
	}
	
	/**
	 * 视频上层的信息
	 */
	.controls-box{
		width: 100%;
		height: auto;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: flex-end;
		padding: 30rpx;
	}
	/**
	 * 视频信息
	 */
	.controls-box .detail-box{
		box-sizing: border-box;
		padding: 24rpx;
		flex: 1;
	}
	.controls-box .detail-box .name{
		font-size: 32rpx;
		font-weight: bolder;
		margin-bottom: 15rpx;
	}
	.controls-box .operation-box{
		width: 100rpx;
		font-size: 30rpx;
		text-align: right;
		padding: 0 24rpx;
		box-sizing: border-box;
	}
	.controls-box .operation-box .o-icon{
		margin-bottom: 30rpx;
		transition: all .2s ease;
	}
	.controls-box .operation-box .o-icon:active{
		transform: scale(.8);
	}
</style>
