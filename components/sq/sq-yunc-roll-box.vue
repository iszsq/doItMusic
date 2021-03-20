<!-- 云村列表组件 -->
<template>
	<view class="vertical-roll-box">
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
					<!-- 模糊的背景 -->
					<view class="item-full-bg">
						<image class="bg-image" mode="scaleToFill" 
							:src="(current===index ? item.simpleResourceInfo.songCoverUrl : current+1===index ? item.simpleResourceInfo.songCoverUrl : current-1===index?item.simpleResourceInfo.songCoverUrl :'')+'?param=270y480'"
						></image>
					</view>
					
					<view class="count">{{`${index+1}/${list.length}`}}</view>
					
					<view class="content-box">
						<view class="user-info flex">
							<image  class="avatar midle-size" :src="item.simpleUserInfo.avatar"></image>
							<view class="nick-name">{{item.simpleUserInfo.nickname}}</view>
						</view>
						<view class="symbol">“</view>
						<view class="content">{{item.content}}</view>
						<view class="song-info">
							<text style="margin: 0 10rpx;">{{item.simpleResourceInfo.song.name}}
								<text style="margin: 0 10rpx;">-</text>{{item.simpleResourceInfo.song.ar.map(item=>item.name).join(',')}}
							</text>
							<!-- <u-icon style="margin-left: 10rpx;" class="animation-round" name="play-circle-fill"/> -->
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 滚动的评论 -->
		<view class="roll-list" v-if="list.length>0" @click="openComment">
			<transition-group name="rollList">
				<view class="roll-list-item"
					v-for="(item,index) in rollComment.slice(showStart, showStart+showCount)"
					:key="item.commentId"
					:style="{'opacity': index===1?0.3:1}"
				>
					<image  class="avatar midle-size" :src="item.user.avatarUrl"></image>
					<view class="content-box" >
						<view class="content line-1">{{item.content}}</view>
					</view>
				</view>
			</transition-group>
		</view>
		
		
		<!-- 评论，没有对应的获取评论接口，模拟其他的 -->
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
				//当前的滚动页
				current: 0,
				list: [],
				//音频上下文实例
				audioCtx: null,
				showComment: false,
				rollComment: [],//滚动的评论
				showStart: 0, //开始显示
				showCount: 2, //显示数量
				timer: null, //定时滚动循环器
			}
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
			this.$bus.$on('onAppHide', this.pause);
			this.$bus.$on('onAppShow', this.play);
		},
		destroyed() {
			if(this.audioCtx){
				this.audioCtx.destroy();
				this.audioCtx= null;
			}
			this.$bus.$off('onAppHide', this.pause);
			this.$bus.$off('onAppShow', this.play);
			clearInterval(this.timer);
		},
		activated(){
			console.log('activated');
			this.play();
			
			this.$bus.$on('onAppHide', this.pause);
			this.$bus.$on('onAppShow', this.play);
		},
		deactivated(){
			console.log('deactivated');
			this.pause();
			
			this.$bus.$off('onAppHide', this.pause);
			this.$bus.$off('onAppShow', this.play);
		},
		methods:{
			init(){
				if(!this.initYet && this.actived){
					//todo
					this.getList();
					
					//音频
					if(!this.audioCtx){
						let audioCtx = uni.createInnerAudioContext();
						audioCtx.autoplay = true;
						audioCtx.loop = true;
						audioCtx.onError((res) => {
							uni.showToast({
								title: '歌曲播放失败啦！',
								icon: 'none'
							});
						});
						audioCtx.onCanplay((res) => {
							console.debug('--onCanplay');
						});
						this.audioCtx= audioCtx;
					}
					
					
					this.initYet= true;
				}
			},
			/**
			 * 获取云村热门列表
			 */
			async getList(){
				uni.showLoading();
				let res = await this.$yunApi.commentHotwall();
				uni.hideLoading();
				this.list = res.data.data;
				this.playSongById();
				this.initRollComments();
			},
			/**
			 * 打开评论
			 */
			openComment(){
				this.showComment= true;
				this.$nextTick(()=>{
					let curItem = this.list[this.current];
					this.$refs.mvComments.getList({type:0, id: curItem.simpleResourceInfo.songId, limit: 20});
				});
			},
			/**
			 * 切换监听
			 */
			onChange(e){
				console.log('onChange', e);
				let {current, source} = e.detail;
				this.current= current;
				this.playSongById(current);
				this.initRollComments(current);
			},
			/**
			 * 播放音乐根据id
			 */
			playSongById(current=0){
				this.audioCtx.stop();
				let item = this.list[current];
				let url = 'https://music.163.com/song/media/outer/url?id='+item.simpleResourceInfo.songId+'.mp3';
				console.log(url, '--播放歌曲地址');
				this.audioCtx.src = url;
			},
			/**
			 * 当显示时
			 */
			onActive(){
				this.play();
			},
			/**
			 * 隐藏时
			 */
			onHidden(){
				this.pause();
			},
			play(){
				if(!this.actived){
					return;
				}
				this.audioCtx && this.audioCtx.play();
			},
			pause(){
				this.audioCtx && this.audioCtx.pause();
			},
			/**
			 * 初始化滚动评论
			 */
			async initRollComments(i = 0){
				this.showStart= 0;
				this.rollComment= [];
				if(this.timer){
					clearInterval(this.timer);
				}
				
				//getting
				let curItem = this.list[i];
				let res = await this.$yunApi.commentHot({type:0, id: curItem.simpleResourceInfo.songId, limit: 20});
				this.rollComment = res.data.hotComments;
				
				//loop
				this.timer = setInterval(()=>{
					let { rollComment, showStart, showCount} = this;
					if( rollComment.length - showStart <= showCount){
						this.showStart= 0;
					}else{
						this.showStart= showStart+1;
					}
				}, 2.5 * 1000);
			},
		},
		onHide: function() {
		}
	}
</script>

<style scoped>
	.vertical-roll-box{
		color: #fff;
	}
	
	.vertical-roll-box .roll-list{
		width: 100%;
		color: #fff;
		position: absolute;
		bottom: 0rpx;
		left: 0;
		letter-spacing: 2rpx;
		z-index: 999;
		box-sizing: border-box;
		padding: 24rpx 48rpx;
	}
	.vertical-roll-box .roll-list .roll-list-item{
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 8rpx 16rpx 8rpx  8rpx;
		border-radius: 24rpx;
		background-color: rgba(0,0,0,.1);
		white-space: nowrap;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.vertical-roll-box .roll-list .roll-list-item .content-box{
		width: 0;
		flex: 1;
	}
	.vertical-roll-box .roll-list .roll-list-item .content{
		font-size: 26rpx;
		margin-left: 14rpx;
	}
	
	.vertical-roll-box .swiper-item .item-full-bg .bg-image{
		filter: blur(50px);
		opacity: .7;
	}
	
	.count{
		position: absolute;
		top: 110rpx;
		right: 48rpx;
		letter-spacing: 2rpx;
	}
	
	.vertical-roll-box .swiper-item .content-box{
		width: 100%;
		height: auto;
		position: absolute;
		top: 180rpx;
		left: 0;
		padding: 0 48rpx;
		box-sizing: border-box;
	}
	.vertical-roll-box .swiper-item .content-box .symbol{
		font: italic 90rpx Georgia, "Times New Roman", Times, serif;
	}
	.vertical-roll-box .swiper-item .content-box .content{
		letter-spacing: 4rpx;
		font-size: 32rpx;
		line-height: 55rpx;
		font-weight: 600;
		
	}
	.vertical-roll-box .swiper-item .content-box .user-info{
		align-items: center;
		margin-bottom: 48rpx;
	}
	.vertical-roll-box .swiper-item .content-box .user-info .nick-name{
		margin-left: 20rpx;
	}
	
	.vertical-roll-box .swiper-item .content-box .song-info{
		margin-top: 24rpx;
		font-size: 24rpx;
		color: #ddd;
	}
</style>
