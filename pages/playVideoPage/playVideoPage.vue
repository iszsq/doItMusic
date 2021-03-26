<template>
	<!-- 视频播放页面 -->
	<view class="video-page">
		<u-navbar
			:border-bottom="false"  
			:height="55"  :immersive="true"
			:background="{ background: 'transparent' }"
		>
		</u-navbar>
		
		<!-- 内容区 -->
		<swiper class="swiper" 
				:vertical="true" 
				:autoplay="false" 
				:current="current" 
				:duration="200"
				@change="onChange"
			>
			<swiper-item 
				:key="index"
				v-for="(item, index) in list"
			>
			
				<view class="swiper-item" 
					:data-set="{index}"
					v-if="index==current || (index==current-1) || (index==current+1)">
					<!-- 模糊的视频背景 -->
					<!-- <view class="video-bg">
						<image class="bg-image" mode="aspectFit" 
							:src="item.coverUrl">
						</image>
					</view> -->
					
					<view class="play-bt" v-if="item.playing!==true"
						:data-set="{index}"
						@tap.stop="onClickVideo">
						<u-icon name="play-right" size="120" color="#ddd"/>
					</view>
					
					<!-- 视频控件 -->
					<video
						class="m-video"
						:id="'mVideo' + index" 
						:data-set="{index}"
						@tap.stop="onClickVideo"
						:ref="'mVideo' + index" 
						v-if="item.url"
						:src="item.url.url"
						:poste="item.coverUrl"
						loop
						:show-loading="false"
						:autoplay="false"
						objectFit="contain"
						:enable-progress-gesture="false"
						:show-fullscreen-btn="false"
						:danmu-btn="false"
						:enable-danmu="false"
						@loadedmetadata="onLoadedmetadata"
						@error="videoErrorCallback" 
						@play="onPlay"
						@timeupdate="onUpdateTime"
						@pause="onPause"
						@controlstoggle="controlstoggle"
						
						webkit-playsinline playsinline x5-playsinline x-webkit-airplay='allow' 
						x5-video-player-type='h5' x5-video-orientation='portraint' x5-video-player-fullscreen=''
						
						:controls="false">
					</video>
					
					<!-- 内容区 -->
					<view class="controls-box">
						<view class="top-info">
							<view class="detail-box">
								<!-- 作者 -->
								<view class="artist-name">
									@{{item.creator ? item.creator.map(item=>item.userName).join(',') : '未知'}}
								</view>
								<!-- 标题 -->
								<view class="name line-2">{{item.title}}</view>
							</view>
							
							<!-- 点赞评论按钮区 -->
							<view class="operation-box flex-column" >
								<u-icon :size="60" 
									@tap="showDevToast"
									class="o-icon" label-color="#ffffff" 
									:label="item.subCount||''" name="thumb-up-fill" label-pos="bottom"
								/>
								
								<u-icon :size="60" class="o-icon" label-color="#ffffff" 
									@tap="openComment"
									:label="item.commentCount||''" 
									name="chat-fill" label-pos="bottom"
								/>
								
								<!-- <u-icon :size="80" class="o-icon" label-color="#ffffff" 
									:label="item.shareCount" name="share-fill"  
									label-pos="bottom" 
								/> -->
							</view>
						</view>
						
						<u-line-progress 
							height="10" :show-percent="false" active-color="#e51419" 
							:percent="processPer">
						</u-line-progress>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 评论区 -->
		<u-popup 
			v-model="showComment" 
			safe-area-inset-bottom 
			closeable 
			mode="bottom"
			border-radius="10"
			height="800rpx"
			style="z-index: 999;"
		>
			<sq-comments ref="comments"/>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			//是否激活
			actived: Boolean
		},
		data() {
			return {
				//传递的视频id
				id: 1,
				//类型，1-mv，2-视频
				type: 1, 
				//视频列表
				list: [],
				//当前swiper-item下标
				current : 0,
				//视频是否播放中
				//playing: false,
				//进度信息
				processData: {
					currentTime: 0,
					duration: 0,
				},
				//是否显示评论层，对返回键统一监听，当为true时执行返回，则先关闭评论
				showComment: false,
			}
		},
		computed: {
			processPer(){
				let {currentTime, duration} = this.processData;
				return Math.ceil((currentTime/duration)*100);
			},
		},
		watch:{
			
		},
		onLoad(option) {
			this.id = option.id;
			this.type = option.type;
		},
		onReady() {
			this.getMediaData();
		},
		created() {
			
			// this.getRelatedAllvideo();
			
		},
		onBackPress() {
			this.pause();
		},
		methods: {
			/**
			 * 获取视频或mv数据
			 */
			getMediaData(){
				let {id, type} = this;
				//2--视频
				if (type == 2) {
					this.$api.videoDetail({data: {id: id}}).then(data => {
						let vdData = data.data;
						let videoData = {
							vid: vdData.vid,
							title: vdData.title,
							videoType: 2,
							coverUrl: vdData.coverUrl,
							shareCount: vdData.shareCount,
							commentCount: vdData.commentCount,
							subCount: vdData.subCount,
							creator: [{userName: vdData.creator.nickname}],
						};
						this.list.push(videoData);
						this.doPlay(this.current);
						
						//加载相关视频
						this.getRelatedAllvideo(id);
					}).catch(()=>{
						//加载相关视频
						this.getRelatedAllvideo(id);
					});
				} else {
					//1-mv
					this.$api.mvDetail({data: {mvid: id}}).then(data => {
						let mvData = data.data;
						let videoData = {
							vid: mvData.id,
							title: mvData.name,
							videoType: 1,
							coverUrl: mvData.cover,
							shareCount: mvData.shareCount,
							commentCount: mvData.commentCount,
							subCount: mvData.subCount,
							creator: [{userName: mvData.artistName}],
						};
						this.list.push(videoData);
						this.doPlay(this.current);
						
						//加载相关视频
						this.getRelatedAllvideo(id);
					}).catch(()=>{
						//加载相关视频
						// this.getRelatedAllvideo(id);
					});
				}
			},
			/**
			 * 上下切换监听
			 */
			onChange(e){
				console.log('onChange', e);
				let {current, source} = e.detail;
				//暂停上下两个的视频
				this.pause(current-1);
				this.pause(current+1);
				console.log('------onChange current', current);
				this.current = current;
				this.doPlay(current);
				
				let {list} = this;
				if (current == (list.length-1)) {
					this.getRelatedAllvideo(list[list.length-1].vid);
				}
			},
			/**
			 *  获取相关视频
			 * id: 视频id
			 */
			getRelatedAllvideo(id){
				this.$api.relatedAllvideo({data: {id: id}}).then(data=>{
					let videoList = data.data;
					videoList.map(item=>{
						//播放类型: 1-mv，2-视频
						item.videoType = 2;
					});
					
					this.list.push(...videoList);
					if (this.current == 0) {
						this.doPlay(0);
					}
				});
			},
			
			/**
			 * 执行视频播放，根据下标
			 * @param {Object} index
			 */
			doPlay(index){
				let item = this.list[index];
				
				if (item.url) {
					this.play(index);
					return;
				}
				//获取到播放地址，mv和视频的地址接口不同
				if (item.videoType === 2) {
					this.playVideo(index);
				} else {
					this.playMv(index);
				}
			},
			/**
			 * 播放视频
			 */
			playVideo(index){
				let {list} = this;
				let item = list[index];
				if (!item) {
					return;
				}
				console.log('playVideo', item);
				//需要从接口中取视频地址
				if (!item.url) {
					this.$api.videoUrl({data:{id: item.vid}}).then(data=>{
						let urls = data.urls;
						if (urls && urls.length > 0) {
							item.url = urls[0];
							item.urls = urls;
							//通知视图更新
							this.$set(this.list, index, item);
						} else {
							this.showNoneToast({
								title: '播放地址找不到'
							})
						}
					});
				}
			},
			
			/**
			 * 播放mv
			 */
			playMv(index){
				let {list} = this;
				let item = list[index];
				if (!item) {
					return;
				}
				if (!item.url) {
					this.$api.mvUrl({data:{id: item.vid}}).then(data=>{
						let urlData = data.data;
						if (urlData) {
							item.url = urlData;
							//通知视图更新
							this.$set(this.list, index, item);
						} else {
							this.showNoneToast({
								title: '播放地址找不到'
							});
						}
					});
				}
			},
			videoErrorCallback(e) {
				console.error('videoErrorCallback', e);
			},
			/**
			 * 视频元数据加载完成时触发
			 */
			onLoadedmetadata(ev){
				let {current} = this;
				this.doPlay(current);
			},
			/**
			 * 当开始/继续播放时触发play事件	
			 */
			onPlay(ev){
				console.log('onPlay', ev);
				let {detail, currentTarget}  = ev;
				
				this.processData = detail;
				this.doPauseAudio();
				
				let index = currentTarget.dataset.set.index;
				let item = this.list[index];
				item.playing = true;
				this.$set(this.list, index, item);
				
			},
			/**
			 * 进度更新
			 * @param {Object} ev
			 */
			onUpdateTime(ev){
				let {detail}  = ev;
				this.processData = detail;
			},
			/**
			 * 暂停时触发
			 */
			onPause(ev){
				console.log("onPause", ev);
				
				let {detail, currentTarget: {dataset: {set}}}  = ev;
				let index = set.index;
				let item = this.list[index];
				item.playing = false;
				this.$set(this.list, index, item);
			},
			
			/**
			 * 打开评论
			 */
			openComment(){
				this.showComment= true;
				this.$nextTick(()=>{
					let {current, list} = this;
					let item = list[current];
					let type = item.videoType === 2 ? 5:1;
					this.$refs.comments.getList({type:type, id: item.vid});
				});
			},
			/**
			 * 播放控制条显示时
			 */
			controlstoggle(e){
				console.debug(e, 'controlstoggle');
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
			pause(index){
				if (!index) {
					index = this.current;
				}
				console.debug(videoContext, '--pause video');
				let videoContext = uni.createVideoContext('mVideo' + index);
				if (videoContext) {
					videoContext.pause();
				} else {
					console.log("video 上下文不存在");
				}
			},
			/**
			 * 开始播放
			 */
			play(index){
				if (!index) {
					index = this.current;
				}
				let videoContext = uni.createVideoContext('mVideo' + index);
				if (videoContext) {
					videoContext.play();
				} else {
					console.log("video 上下文不存在");
				}
			},
			/**
			 * 点击当前视频控件
			 */
			onClickVideo(ev){
				console.log('onClickVideo', ev);
				let {detail, currentTarget: {dataset: {set}}}  = ev;
				let index = set.index;
				let item = this.list[index];
				let playing = item.playing;
				
				if (playing === true) {
					this.pause(index);
				} else {
					this.play(index);
				}
			},
		},
	}
</script>

<style scoped>
	.video-page{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #333333;
	}
	
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
		width: 100%;
		//#ifdef MP
		height: 100%;
		//#endif
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
		padding: 30rpx 20rpx;
		z-index: 9999;
	}
	
	.controls-box .top-info{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: flex-end;
		padding: 10rpx 10rpx;
	}
	
	/**
	 * 视频信息
	 */
	.controls-box .detail-box{
		width: 0;
		box-sizing: border-box;
		padding: 10rpx;
		flex: 1;
	}
	.controls-box .detail-box .name{
		font-size: 28rpx;
		font-weight: bolder;
		margin-bottom: 15rpx;
		margin-top: 15rpx;
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
	
	/* 播放按钮 */
	.play-bt{
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 99;
		align-items: center;
		justify-content: center;
	}
</style>
