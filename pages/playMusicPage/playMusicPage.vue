<template>
	<!-- 音乐播放页面 -->
	<view class="play-music-page">
		<u-navbar  
			:height="55" :title="audioTitle" :immersive="true" 
			:border-bottom="false"	
			:background="{ background: 'transparent' }"
			>
		</u-navbar>
		
		<!-- 背景图 -->
		<div class="bg-wrapper">
			<image
				v-if="true"
				class="image-bg" style="width: 100%;height: 100%;" 
				mode="aspectFill"
				:src="audioPageBg"> 
			</image>
		</div>
		
		<!-- 播放内容区域 -->
		<view class="music-content">
			<view class="center-box" @tap.stop="onClickCenterBox">
				
				<!-- 旋转图片 -->
				<view class="pic-box" v-show="!showLrc">
					<view class="pic-img-wrapper">
						<image
							:animation="animationData"
							class="pic-box-img"
							mode="aspectFill"
							:src="audioPageBg"> 
						</image>
						<view class="circle-ani"></view>
						<view class="circle-ani ani2"></view>
					</view>
				</view>
				
				<!-- 歌词 -->
				<view 
					style="width: 100%;height: 100%;"
					v-show="showLrc" 
					@tap.stop="onClickCenterBox">
					
					<scroll-view 
						ref="lrcView"
						class="lrc-scroll-view"
						style="width: 100%;height: 100%;" scroll-y="true" 
						:scroll-top="lrcScrollTop"
					>
						<!-- 歌词列表 -->
						<view class="lrc-wrapper" v-show="audioLrc.ms && audioLrc.ms.length>0">
							<view
								v-for="(item,index) in audioLrc.ms"
								:class="{'lrc-active' : index === showlrcIndex }"
								style="font-size: 32rpx;margin-bottom: 30rpx;text-align: center;font-weight: bold;"
							>
								{{item.c}}
							</view>
						</view>
						
						<view v-show="!audioLrc.ms || audioLrc.ms.length <= 0">
							暂无歌词
						</view>
					</scroll-view>
				</view>
				
			</view>
			
			<!-- 底部按钮区域 -->
			<view class="bot-buttons">
				<view class="top-bts">
					<view><u-icon name="heart" size="60"/></view>
					<view><u-icon name="download" size="60"/></view>
					<view @tap="openComment"><u-icon name="chat" size="60" /></view>
				</view>
				
				<!-- 进度条 -->
				<view class="process-bar-wrapper">
					<!-- 已播放 -->
					<view >{{parseMinute(audioMeta.currentTime)}}:{{parseSecond(audioMeta.currentTime)}}</view>
					
					<!-- 进度 -->
					<view  class="process-line-box">
						<!-- 总长度， -->
						<view class="pro-line dura-line" />
						<view class="pro-line dot" />
						
						<!-- 缓存进度 -->
						<view class="pro-line buffed-line" :style="{'width': audioBuffedPerc+'%' }"/>
						
						<!-- 已播放长度 -->
						<view class="pro-line play-line" :style="{'width': audioPlayPerc+'%' }"/>
					</view>
					
					<!-- 总长度 -->
					<view >{{parseMinute(audioMeta.duration)}}:{{parseSecond(audioMeta.duration)}}</view>
				</view>
				
				<!-- 控制按钮 -->
				<view class="control-bts">
					<view style="margin: 0 20rpx;"><u-icon name="rewind-left" size="100"/></view>
					<view @click="onClickPlayBt" style="margin: 0 20rpx;">
						<u-icon :name=" audioMeta.paused ? 'play-circle' : 'pause-circle'" size="100"/>
					</view>
					<view style="margin: 0 20rpx;"><u-icon name="rewind-right" size="100"/></view>
				</view>
			</view>
		</view>
		
		
		<!-- 评论区 -->
		<u-popup 
			v-model="showComment" 
			safe-area-inset-bottom 
			closeable 
			mode="bottom"
			border-radius="10"
			height="800rpx"
		>
			<sq-comments ref="comments"/>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex';
	
	export default {
		data() {
			return {
				option: {},
				//旋转动画
				animationData: {},
				animation: null,
				animationFnKey : null,
				//旋转圈数
				cycles: 0,
				//显示歌词控件
				showLrc: false,
				//歌词滚动控件
				lrcScrollTop: 0,
				//显示第几行歌词
				showlrcIndex: 0,
				//
				showComment: false,
			}
		},
		computed: {
			...mapState(['audioId', 'audioTitle', 'picUrl', 'audioMeta']),
			...mapGetters(['audioPageBg']),
			currentTime() {
				console.log('hello', this.audioMeta.currentTime);
				let audioMeta = this.audioMeta;
				this.$u.throttle(() => {
					console.log(index);
				}, 500);
				
				return audioMeta.currentTime;
			},
		},
		watch: {
			audioMeta(newVal){
				//节流
				if(!this.audioLrc.ms){
					return;
				}
				this.$u.throttle(() => {
					let ms = this.audioLrc.ms;
					let {currentTime} = newVal;
					
					let index = this.showlrcIndex;
					for (let i=0, len = ms.length; i < len; i++) { 
						let item = ms[i];
						if (item.t  >= currentTime) {
							index = i - 1;
							break;
						}
					}
					this.showlrcIndex = index;
					console.log("throttle showlrcIndex", index);
				}, 500);
			},
			
		},
		onLoad(option) {
			this.option = option;
		},
		onReady() {
			
			
		},
		beforeDestroy() {
			if (this.animationFnKey != null) {
				clearInterval(this.animationFnKey);
			}
		},
		mounted() {
			var animation = uni.createAnimation({
				duration: 20 * 1000,
				timingFunction:'linear',
				
			});
			this.animation = animation;
			
			this.animation.rotate(360).step();
			this.animationData = this.animation.export();
			
			this.animationFnKey = setInterval(()=>{
				this.cycles ++;
				this.animation.rotate(360 + (this.cycles*360)).step();
				this.animationData = this.animation.export();
			}, 20 * 1000);
			
			console.log("play music page mounted!");
			this.playMusicById(this.option.id);
		},
		created() {
			
		},
		methods: {
			/**
			 * 点击播放按钮
			 */
			onClickPlayBt(){
				if (this.audioMeta.paused) {
					console.log("doPlayAudio");
					this.doPlayAudio();
				} else {
					console.log("doPauseAudio");
					this.doPauseAudio();
				}
			},
			/**
			 * 点击中间区域，切换显示歌词
			 */
			onClickCenterBox(){
				console.log("click center box");
				this.showLrc = !this.showLrc;
			},
			/**
			 * 打开评论
			 */
			openComment(){
				this.showComment= true;
				this.$nextTick(()=>{
					this.$refs.comments.getList({type: 0, id: this.option.id});
				});
			},
		}
	}
</script>

<style scoped>
	.play-music-page{
		width: 100%;
		height: 100%;
		padding-top: 150rpx;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 100%;
	}
	
	.bg-wrapper {
		
	}
	
	.image-bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		filter: blur(70px);
		opacity: .7;
	}
	
	.music-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	
	.center-box{
		height: 0;
		flex: 1;
	}
	
	.pic-box{
		width: 100%;
		border-radius: 50%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.pic-img-wrapper{
		width: 450rpx;
		height: 450rpx;
		border-radius: 50%;
		display: block;
		position: relative;
	}
	.pic-box-img{
		width: 450rpx;
		height: 450rpx;
		border-radius: 50%;
		display: block;
		border: 10rpx solid rgba(83,77,93, .9);
	}
	.pic-box .circle-ani{
		border: 3rpx solid rgba(75,80,116, .6);
		box-sizing: border-box;
		transform: scale(1.1);
		position: absolute;
		top: 0;
		left: 0;
		width: 470rpx;
		height: 470rpx;
		border-radius: 50%;
	}
	.pic-box .circle-ani.ani2{
		border: 3rpx solid rgba(75,80,116, .3);
		transform: scale(1.3);
	}
	
	
	.top-bts{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 30rpx 80rpx;
	}
	
	.process-bar-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		padding: 10rpx 40rpx;
	}
	.process-bar-wrapper .process-line-box{
		width: 0;
		height: 12rpx;
		margin: 0 20rpx;
		flex: 1;
		border-radius: 10rpx;
		position: relative;
	}
	.process-bar-wrapper .process-line-box .pro-line{
		width: 0;
		height: 12rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
	/* 总长度 */
	.process-bar-wrapper .process-line-box .dura-line{
		width: 100%;
		height: 100%;
		background-color: #8d888b;
	}
	/* 缓存长度 */
	.process-bar-wrapper .process-line-box .buffed-line{
		background-color: #999;
	}
	/* 播放长度 */
	.process-bar-wrapper .process-line-box .play-line{
		background-color: #95a7dd;
	}
	/* 点 */
	.process-bar-wrapper .process-line-box .play-line::after{
		content: '';
		position: absolute;
		top: -4rpx;
		right: -4rpx;
		background-color: #fff;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}
	
	.control-bts{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 40rpx 20rpx;
	}
	
	/* 歌词激活样式 */
	.lrc-active{
		color: var(--primary-color);
	}
</style>
