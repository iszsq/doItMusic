<template>
	<!-- 视频滚动 -->
	<view class="page-wrapper">
		<NvRoll @change="onchange" :num="list.length" :style="{'height': windowHeight + 'px'}">
			<cell  v-for="(item, index) in list" 
				:key="index" 
				:data-index="index" 
				:recycle="false"
				class="list-item"
				:style="{'height': windowHeight + 'px'}"
			>
				<!-- 背景图片 -->
				<image class="bg-image" :lazy-load="true" :fade-show="false"   :src="item.cover+'?param=270y480'" mode="cover"
				 :style="{height: windowHeight+ 'px'}"></image>
				<!-- 视频组件 -->
				<view class="video-box" >
					<video  ref="mVideo" class="mVideo" id="mVideo"
						v-if="current === index"
						:src="currentUrl.url"
						:controls="true" 
						loop 
						:autoplay="actived"
						@play="onplay"
					>
					</video>
				</view>
				
				<!-- 视频信息 -->
				<view class="video-info-box">
					<text class="video-info-title">{{item.name}}</text>
					<text class="video-info-artist">{{item.artistName}}</text>
				</view>
				
			</cell>
		</NvRoll>
		
		
	</view>
</template>

<script>
	import NvRoll from './nv-vertical-roll.vue';
	import YunApi from '../../service/yunApi.js';
	
	export default {
		components: {
			NvRoll,
		},
		props: {
			windowHeight: {
				default: 0
			},
			playStatus: {
				default: false
			},
			actived: {
				default: false
			}
		},
		watch:{
			actived(val){
				if(val){
					this.play();
				}else{
					this.pause()
				}
			},
		},
		data() {
			return {
				playerCur: 0,
				list: [],
				current: 0,
				currentDetail: {}, //当前视频详情
				currentUrl: {}, //当前视频播放地址
			}
		},
		created() {
			this.getList();
		},
		methods: {
			/**
			 * 获取mv列表
			 */
			async getList(){
				let params = {
					limit: 30,
				};
				let res = await YunApi.topmv(params);
				this.list = res.data.data;
				this.playCurrent();
			},
			/**
			 * 加载完成时，播放就绪
			 * @param {Object} time
			 */
			onplay: function(time) {
				console.debug("onplay");
				console.debug("onplay-actived", this.actived);
				if(!this.actived){
					this.pause();
				}
			},
			onchange: function(index) {
				console.log("nv-video-roll===onchange", index);
				this.current= index;
				this.playCurrent();
			},
			/**
			 * 播放当前
			 */
			async playCurrent(){
				let {current, currentDetail, currentUrl} = this;
				let item = this.list[current];
				this.currentDetail = {};
				this.currentUrl = {};
				
				//歌曲详情,获取分辨率列表
				let res = await YunApi.mvDetail(item.id);
				this.currentDetail = res.data.data;
				
				//获取播放地址
				let resUrl = await YunApi.mvUrl(item.id, this.currentDetail.brs[0].br);
				this.currentUrl = resUrl.data.data;
			},
			/**
			 * 暂停播放
			 */
			pause(){
				let videoContext = uni.createVideoContext('mVideo');
				console.debug(videoContext, '--videoContext');
				videoContext.pause();
			},
			/**
			 * 开始播放
			 */
			play(){
				let videoContext = uni.createVideoContext('mVideo');
				videoContext.play();
			},
		}
	}
</script>

<style scoped>
	.page-wrapper{
		
	}
	.bg-image{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.3);
	}
	
	.list-item{
		
	}
	
	.mVideo{
		width: 750rpx;
	}
	
	.video-box{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.video-info-box{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 24rpx;
	}
	.video-info-title{
		font-size: 38rpx;
		font-weight: 600;
		color: #ffffff;
		margin-bottom: 20rpx;
	}
	.video-info-artist{
		font-size: 32rpx;
		color: #ffffff;
	}
</style>
