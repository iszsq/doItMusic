<template>
	<view class="hot-page-box">
		<u-navbar :is-back="false"
			:border-bottom="false"  
			title="热门">
		</u-navbar>
		
		<!-- 轮播图 -->
		<view class="banner-box">
			<u-swiper :list="banners" :border-radius="10" name="pic"></u-swiper>
		</view>
		
		<!-- <test -->
		<image src="../../static/image/hot-grid-pic.png" style="width: 100%;height: 85px;"></image>
		
		<!-- 飙升榜 -->
		<view class="common-card scroll-x-box">
			<view class="title-box">
				<view class="sub-title">飙升</view>
				<view class="title">云音乐飙升榜</view>
			</view>
			
			<view class="m-content">
				
				<scroll-view 
					:scroll-x="true"
					class="scroll-X" 
				>
					<view class="poster-list-item" v-for="(item,index) in riseSong" :key="item.id">
						<view class="image-box">
							<u-image width="200rpx" height="200rpx" border-radius="10" :src="item.al.picUrl+'?param=270y270'" />
							<view class="dt-count">
								{{formatNumber(item.dt)}}
							</view>
						</view>
						<view class="song-name u-line-1">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 一入电音深似海 -->
		<view class="common-card dy-song-box">
			<view class="title-box">
				<view class="sub-title">风格推荐</view>
				<view class="title">一入电音深似海</view>
			</view>
			
			<view class="m-content">
				<swiper class="swiper" style="height: 420rpx;" :indicator-dots="true" :autoplay="false" >
					<block 
						v-for="(num,column) in (parseInt(dyTopList.length/3))" 
						:key="column"
					>
						<swiper-item class="swiper-item">
							<view class="song-list">
								<view class="song-list-item" v-for="(item,index) in (dyTopList.slice(column*3, (column*3)+3) )" :key="item.id">
									<u-image width="100rpx" height="100rpx" border-radius="10" :src="item.al.picUrl+'?param=270y270'"></u-image>
									<view class="flex-row" style="width:0;flex: 1;align-items: center;margin: 0 24rpx;">
										<view class="song-name">{{item.name}}</view>
										<view style="margin: 0 10rpx;">-</view>
										<view class="artist">{{item.ar.map(v=>v.name).join('/')}}</view>
									</view>
									<view style="width: 40rpx;"><u-icon name="play-circle" size="48" color="#e51419"></u-icon></view>
								</view>
							</view>
						</swiper-item>
					</block>
					
				</swiper>
			</view>
		</view>
		
		<!-- 古典音乐 -->
		<view class="common-card scroll-x-box">
			<view class="title-box">
				<view class="sub-title">古典</view>
				<view class="title">云音乐古典音乐榜</view>
			</view>
			
			<view class="m-content">
				
				<scroll-view 
					:scroll-x="true"
					class="scroll-X" 
				>
					<view class="poster-list-item" v-for="(item,index) in gdTopList" :key="item.id">
						<view class="image-box">
							<u-image width="200rpx" height="300rpx" border-radius="10" :src="item.al.picUrl+'?param=270y480'" />
							<view class="dt-count">
								{{formatNumber(item.dt)}}
							</view>
						</view>
						<view class="song-name u-line-1" style="margin-top:0;padding: 15rpx 0;">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<!-- 热歌风向标 -->
		<view class="common-card hot-song-box">
			<view class="title-box">
				<view class="sub-title">排行榜</view>
				<view class="title">热歌风向标</view>
			</view>
			
			<view class="m-content">
				<swiper class="swiper" :indicator-dots="true" :autoplay="false" >
					<swiper-item>
						<view class="swiper-item">
							<view class="title">云音乐新歌榜</view>
							<view class="song-list">
								<view class="song-list-item" v-for="(item,index) in topList.newSong" :key="index">
									<u-image width="100rpx" height="100rpx" border-radius="10" :src="item.al.picUrl+'?param=270y270'"></u-image>
									<view class="index">{{index+1}}</view>
									<view class="song-name">{{item.name}}</view>
									<view style="margin: 0 10rpx;">-</view>
									<view class="artist">{{item.ar.map(v=>v.name).join('/')}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="title">云音乐热歌榜</view>
							<view class="song-list">
								<view class="song-list-item" v-for="(item,index) in topList.hotSong" :key="index">
									<u-image width="100rpx" height="100rpx" border-radius="10" :src="item.al.picUrl+'?param=270y270'"></u-image>
									<view class="index">{{index+1}}</view>
									<view class="song-name">{{item.name}}</view>
									<view style="margin: 0 10rpx;">-</view>
									<view class="artist">{{item.ar.map(v=>v.name).join('/')}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="title">云音乐说唱榜</view>
							<view class="song-list">
								<view class="song-list-item" v-for="(item,index) in topList.rapSong" :key="index">
									<u-image width="100rpx" height="100rpx" border-radius="10" :src="item.al.picUrl+'?param=270y270'"></u-image>
									<view class="index">{{index+1}}</view>
									<view class="song-name">{{item.name}}</view>
									<view style="margin: 0 10rpx;">-</view>
									<view class="artist">{{item.ar.map(v=>v.name).join('/')}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<u-divider>到底啦</u-divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// banners
				banners: [],
				//飙升榜
				riseSong: [],
				//电音榜
				dyTopList: [],
				//古典音乐榜
				gdTopList: [],
				// 热歌风向标
				topList: {
					//新歌榜
					newSong: [],
					//热歌榜
					hotSong: [],
					//说唱榜
					rapSong: [],
				},
			};
		},
		created(){
			this.getBannerList();
			this.getDyTopList();
			this.getGdTopList();
			this.initToplist();
		},
		methods:{
			
			
			/**
			 *  获取广告列表
			 */
			getBannerList(){
				console.log(this.$yunApi, '$yunApi');
				this.$yunApi.banners().then(res=>{
					this.banners = res.data.banners;
				});
			},
			/**
			 * 初始化 热歌风向榜等
			 */
			async initToplist(){
				let riseSongDetail = await this.$yunApi.playlist(19723756);
				this.riseSong= riseSongDetail.data.playlist.tracks.slice(0,6);
				
				let newSongDetail = await this.$yunApi.playlist(3779629);
				this.topList.newSong= newSongDetail.data.playlist.tracks.slice(0,3);
				
				let hotSongDetail = await this.$yunApi.playlist(3778678);
				this.topList.hotSong= hotSongDetail.data.playlist.tracks.slice(0,3);
				
				let rapSongDetail = await this.$yunApi.playlist(991319590);
				this.topList.rapSong= rapSongDetail.data.playlist.tracks.slice(0,3);
			},
			/**
			 * 获取电音榜单
			 */
			getDyTopList(){
				this.$yunApi.playlist(1978921795).then(res=>{
					this.dyTopList= res.data.playlist.tracks.slice(0,9);
				});
			},
			/**
			 * 获取古典榜单
			 */
			getGdTopList(){
				this.$yunApi.playlist(71384707).then(res=>{
					this.gdTopList= res.data.playlist.tracks.slice(0,9);
				});
			}
		},
	}
</script>

<style>
	.banner-box{
		padding: 24rpx;
		border-radius: 20rpx;
	}
	
	
	.hot-page-box{
		background-color: #fff;
		padding-bottom: 50rpx;
	}
	
	.common-card {
		background-color: #fff;
		padding: 20rpx;
		margin-top: 40rpx;
	}
	.common-card .title-box{
		margin-bottom: 24rpx;
	}
	.common-card .title-box .sub-title{
		font-size: 20rpx;
		color: #999999;
	}
	.common-card .title-box .title{
		font-size: 32rpx;
		font-weight: bolder;
		margin-top: 2rpx;
	}
	
	/* //内容 */
	.common-card .m-content{
	}
	.common-card .m-content .swiper{
		height: 520rpx;
	}
	.common-card .m-content .swiper .swiper-item{
		padding: 24rpx;
		background-color: #f8f8f8;
		border-radius: 24rpx;
		position: relative;
		box-sizing: border-box;
	}
	.common-card .m-content .swiper .swiper-item .title{
		font-size: 28rpx;
		font-weight: bolder;
		margin-bottom: 24rpx;
	}
	/* 歌曲列表 */
	.common-card .m-content .swiper .swiper-item .song-list{
		
	}
	.common-card .m-content .swiper .swiper-item .song-list .song-list-item{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.common-card .m-content .swiper .swiper-item .song-list .song-list-item .index{
		margin: 0 24rpx;
		font-size: 30rpx;
		font-weight: bolder;
	}
	.common-card .m-content .swiper .swiper-item .song-list .song-list-item .song-name{
		font-size: 30rpx;
	}
	.common-card .m-content .swiper .swiper-item .song-list .song-list-item .artist{
		color: #999999;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		font-size: 24rpx;
	}
	
	/* 横向滚动 */
	.scroll-x-box{
	}
	.scroll-x-box .scroll-X{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.scroll-x-box .scroll-X .poster-list-item{
		width: 200rpx;
		display: inline-block;
		margin-right: 30rpx;
	}
	.scroll-x-box .scroll-X .poster-list-item .image-box{
		width: 200rpx;
		position: relative;
	}
	.scroll-x-box .scroll-X .poster-list-item .image-box .dt-count{
		position: absolute;
		top: 0;
		right: 0;
		color: #FFFFFF;
		background-color: rgba(0,0,0,.1);
		border-radius: 10rpx;
		padding: 0 5rpx;
		font-size: 26rpx;
	}
	.scroll-x-box .scroll-X .poster-list-item .song-name{
		height: auto;
		color: #333;
		margin-top: 8rpx;
		font-size: 26rpx;
		word-wrap : break-word ;
		word-break: normal;
	}

</style>
