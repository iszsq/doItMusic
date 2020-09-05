<template>
	<!-- 我的 -->
	<view>
		<view class="top-wrapper">
			<u-navbar :is-back="false"
				title-color="#ffffff"
				:background="{backgroundColor: navBgColor}" 
				:border-bottom="false"  
				title="我的">
				<view slot="right" style="margin-right: 24rpx;" @click="onClickMenu">
					<u-badge :absolute="true" :offset="[10, 10]" class="icon-index" size="mini" type="error" :count="99"></u-badge>
					<u-icon size="50" color="#ffffff"  name="list"></u-icon>
				</view>
			</u-navbar>
			
			<!-- 用户头像名字 -->
			<view class="avatar-box flex-layout flex-center">
				<u-avatar :src="src" mode="square" size="90" ></u-avatar>
				<view class="user-name-box">
					<view class="user-name">世染尘光</view>
					<u-tag text="Lv.8" size="mini" bg-color="#a9aba6" color="#fff" border-color="transparent" shape="circle"/>
				</view>
				<view style="color: #ddd;">开通黑胶VIP ></view>
			</view>
			
			<!-- 本地音乐等 -->
			<view class="top-grid">
				<u-grid :col="4" :border="false">
					<u-grid-item :key="index"  v-for="(item,index) in topGridData" bg-color="transparent">
						<view class="m-icon">
							<u-icon size="55" color="#ffffff"  :name="item.icon"></u-icon>
						</view>
						<view class="m-text">{{item.text}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		
		<!-- 底部白色部分内容 -->
		<view class="bottom-wrapper">
			<!-- 我喜欢的音乐 -->
			<u-card class="custom-card" :border="false" >
				<view slot="head" class="flex-layout">
					<view class="h-title">我的音乐</view>
					<view class="right-icon">></view>
				</view>
				<view class="music-row" slot="body">
					<u-row gutter="16">
						<u-col span="4">
							<view class="row-item ">
								<u-image border-radius="15" width="100%" height="300rpx" src="/static/image/vertical_bg2.jpeg"></u-image>
								<view class="center-text flex-column flex-center">
									<u-icon size="50rpx" color="#ff6340" name="heart-fill"></u-icon>
									<view class="text">我喜欢的音乐</view>
								</view>
							</view>
						</u-col>
						
						<u-col span="4">
							<view class="row-item ">
								<u-image border-radius="15" width="100%" height="300rpx" src="/static/image/vertical_bg.jpeg"></u-image>
								<view class="center-text flex-column flex-center">
									<u-icon size="50rpx" color="#fff" name="play-circle"></u-icon>
									<view class="text">私人FM</view>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</u-card>
			
			<!-- 最近播放 -->
			<u-card class="custom-card" :border="false" >
				<view slot="head" class="flex-layout">
					<view class="h-title">最近播放</view>
					<!-- <view class="right-icon">></view> -->
				</view>
				<view class="music-row" slot="body">
					<u-row gutter="16">
						<u-col span="6">
							<view class="row-item-square flex-layout">
								<view class="left">
									<u-image border-radius="15" width="120rpx" height="120rpx" src="/static/image/vertical_bg.jpeg"></u-image>
									<view class="center-text flex-column flex-center">
										<u-icon size="55rpx" color="#ff6340" name="play-circle-fill"></u-icon>
									</view>
								</view>
								<view class="right flex-column">
									<view>全部已播歌曲</view>
									<view class="bottom">300首</view>
								</view>
							</view>
						</u-col>
						
						<u-col span="6">
							<view class="row-item-square flex-layout">
								<view class="left">
									<u-image border-radius="15" width="120rpx" height="120rpx" src="/static/image/vertical_bg.jpeg"></u-image>
									<view class="center-text flex-column flex-center">
										<u-icon size="55rpx" color="#ff6340" name="play-circle-fill"></u-icon>
									</view>
								</view>
								<view class="right flex-column">
									<view>歌单：令人上瘾的电音</view>
									<view class="bottom">继续播放</view>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</u-card>
			
			<!-- 歌单模块 -->
			<u-card class="custom-card" :border="false" >
				<view slot="head" class="flex-layout">
					<view class="h-title">创建歌单</view>
					<view class="right-icon">
						
						<u-icon name="more-dot-fill" @click="onShowCreate= true"></u-icon>
					</view>
				</view>
				<view class="music-row" slot="body">
					<u-row gutter="16">
						<u-col span="6">
							<view class="row-item-square flex-layout">
								<view class="left">
									<u-image border-radius="15" width="120rpx" height="120rpx" src="/static/image/vertical_bg.jpeg"></u-image>
									<view class="center-text flex-column flex-center">
										<u-icon size="55rpx" color="#ff6340" name="play-circle-fill"></u-icon>
									</view>
								</view>
								<view class="right flex-column">
									<view>2019年度歌单</view>
									<view class="bottom">10首</view>
								</view>
							</view>
						</u-col>
						
						<u-col span="6">
							<view class="row-item-square flex-layout">
								<view class="left">
									<u-image border-radius="15" width="120rpx" height="120rpx" src="/static/image/vertical_bg.jpeg"></u-image>
									<view class="center-text flex-column flex-center">
										<u-icon size="55rpx" color="#ff6340" name="play-circle-fill"></u-icon>
									</view>
								</view>
								<view class="right flex-column">
									<view>全部已播歌曲</view>
									<view class="bottom">300首</view>
								</view>
							</view>
						</u-col>
						
					</u-row>
				</view>
			</u-card>
		</view>
		
		
		<!-- 创建歌单、歌单管理等弹出选项 -->
		<u-action-sheet :list="geDanFunctions" :safe-area-inset-bottom="true" v-model="onShowCreate"></u-action-sheet>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBgColor: 'rgba(150,150,140, 10)',
				topGridData: [
					{text: '本地音乐', icon:'play-circle',},
					{text: '下载管理', icon:'download',},
					{text: '我的电台', icon:'kefu-ermai',},
					{text: '我的收藏', icon:'star',},
				],
				//显示创建歌单等选项
				onShowCreate: false,
				geDanFunctions: [
					{text: '创建新歌单', },
					{text: '歌单管理', },
					{text: '截图导入歌单', },
					{text: '恢复歌单', },
					{text: '切换至单列模式', },
				],
			
			}
		},
		methods: {
			onClickMenu(){
				console.log('aa');
				uni.navigateTo({
					url: '/pages/more/index'
				})
			},
		},
	}
</script>

<style scoped>
	/* page{
		background-color: #f7f7f7;
	} */
	.top-wrapper{
		background-image: linear-gradient(to top, #8a8c87, #9a988c);  
	}
	
	/**
	 * 头像
	 */
	.avatar-box{
		padding: 20px;
		color: #ffffff;
	}
	.avatar-box .user-name-box{
		flex: 1;
		padding: 0 20px;
	}
	.avatar-box .user-name{
		font-size: 35rpx;
		font-weight: bolder;
		margin-bottom: 8rpx;
	}
	
	/**
	 * 用户头像下的功能
	 */
	.top-grid{
		padding-bottom: 40rpx;
	}
	.top-grid .m-text{
		font-size: 22rpx;
		margin-top: 8rpx;
		color: #ffffff;
	}
	.top-grid .m-icon{
		color: #ffffff;
	}
	
	/**
	 * 底部白色内容
	 */
	.bottom-wrapper{
		min-height: 1200rpx;
		background-color: #ffffff;
		position: relative;
		top: -65rpx;
		border-radius: 40rpx 40rpx 0 0;
	}
	
	.custom-card{
		
	}
	.custom-card .h-title{
		flex: 1;
		font-size: 30rpx;
		font-weight: bolder;
	}
	.custom-card .right-icon{
		color: #808080;
		font-weight: bolder;
	}
	
	/**
	 * 我喜欢的音乐
	 */
	.music-row{
		
	}
	.music-row {
		
	}
	.music-row  .row-item{
		border-radius: 20rpx;
		position: relative;
	}
	.music-row  .row-item:active::before{
		background-color: rgba(0,0,0,.4);
	}
	.music-row  .row-item::before{
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.2);
		z-index: 99;
		border-radius: 20rpx;
	}
	.music-row .row-item .center-text{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		font-size: 20rpx;
		color: #fff;
	}
	.music-row .row-item .center-text .text{
		margin-top: 10rpx;
		letter-spacing: 2rpx;
	}
	
	/* 正方形 */
	.music-row .row-item-square{
		position: relative;
	}
	.music-row  .row-item-square:active::before{
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.2);
		z-index: 99;
	}
	.music-row .row-item-square .left{
		position: relative;
	}
	.music-row .row-item-square .left .center-text{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		font-size: 22rpx;
		color: #000;
	}
	.music-row .row-item-square .right{
		padding-left: 16rpx;
		font-size: 22rpx;
		justify-content: center;
		align-items: flex-start;
		font-weight: bolder;
		color: #333;
	}
	.music-row .row-item-square .right .bottom{
		margin-top: 10rpx;
		color: #808080;
		font-size: 20rpx;
	}
	
		
</style>
