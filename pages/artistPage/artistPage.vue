<template>
	<!-- 歌手主页 -->
	<view class="artist-page">
		<u-navbar 
			:border-bottom="false"  
			:height="55"  :immersive="true"
			:background="{ background: `rgba(255,255,255,${bgOpacity})` }"
		>
		</u-navbar>
		
		<!-- 歌手图片 -->
		<view class="artist-pic-box">
			<u-image class="artist-pic" width="100%" mode="widthFix" :src="detail.artist.cover"/>
		</view>
		
		<!-- 姓名卡片 -->
		<view class="name-card-box">
			<view class="ar-name">{{detail.artist.name}}</view>
			<view style="text-align: center;padding-bottom: 20rpx;" v-if="detail.artist.rank">
				<u-count-to :start-val="10" :duration="4000" :end-val="detail.artist.rank.rank"></u-count-to>
				<view>
					<u-tag text="排名" type="error" />
				</view>
			</view>
		</view>
		
		<!-- intro 艺人介绍 -->
		<view class="intro-card-box">
			<view class="text-card-title">
				<u-divider fontSize="38" height="100" color="#000">艺人介绍</u-divider>
			</view>
			<view class="intro-card-content">
				<u-read-more show-height="350">
					<text>{{detail.artist.briefDesc}}</text>
				</u-read-more>
			</view>
		</view>
		
		
		<!-- introduction 更全的介绍 -->
		<view class="intro-card-box" v-for="item in desc.introduction">
			<view class="text-card-title">
				<u-divider fontSize="38" height="100" color="#000">{{item.ti}}</u-divider>
			</view>
			<view class="intro-card-content">
				<u-read-more show-height="400">
					<text  space="ensp">
						{{item.txt}}
					</text>
				</u-read-more>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				//歌手id
				id: null,
				//基本详情
				detail: {
					videoCount: 0,
					artist: {
						id: 0,
						cover: "",
						name: "",
						transNames: [ ],
						identities: [ ],
						identifyTag: null,
						briefDesc: "",
						rank: {
							rank: 2,
							type: 1
						},
						albumSize: 0,
						musicSize: 0,
						mvSize: 0
					},
					blacklist: true,
					showPriMsg: false
				},
				//更全的描述
				desc: {
					introduction: [],
					briefDesc: "",
					topicData: [],
				},
				//背景透明度
				bgOpacity: 0,
			};
		},
		onLoad(option) {
			this.id = option.id;
		},
		onReady() {
			this.getArtistDesc();
		},
		created() {
			
		},
		methods: {
			/**
			 * 获取歌手详情
			 */
			getArtistDesc(){
				let {id} = this;
				if (!id) { 
					return;
				}
				//歌手详情
				this.$api.artistDetail({data: {id}}).then(data => {
					this.detail = data.data;
					return this.$api.artistDesc({data: {id}});
				}).then(data=>{
					//desc 歌手描述
					this.desc = data;
				});
			},
		},
	}
</script>

<style scoped>
	.artist-page{
		padding-bottom: 50rpx;
	}
	
	.artist-pic-box{
		width: 100%;
		position: relative;
	}
	
	/* 头像 */
	.artist-pic-box .artist-pic{
		width: 100%;
		min-height: 200rpx;
	}
	
	/* 姓名卡片 */
	.name-card-box{
		background-color: #fff;
		margin: 0 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 3rpx 2rpx #f0f0f0;
		position: relative;
		top: -50rpx;
		background-color: rgba(255,255,255, .9);
	}
	.ar-name{
		font-size: 42rpx;
		text-align: center;
		font-weight: bolder;
		padding: 20rpx;
	}
	
	.intro-card-box{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.intro-card-box .intro-card-title{
		
	}
	.intro-card-box .intro-card-content{
		line-height: 45rpx;
	}
</style>
