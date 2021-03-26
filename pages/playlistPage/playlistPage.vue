<template>
	<!-- 歌单详情页面 -->
	<view class="playlist-page">
		<u-navbar
			:border-bottom="false"  
			:height="55"  :immersive="true"
			:background="{ background: 'transparent' }"
		>
		</u-navbar>
		
		<!-- 专辑背景 -->
		<view class="bg-pic-box">
			<image class="img-bg" width="100%" height="100%" mode="aspectFill" :src="detail.picUrl"/>
			<view class="pic-box-content">
				<view style="width:220rpx;height: 220rpx; z-index: 999;margin-right: 20rpx;">
					<u-image
						border-radius="20"
						class="img-pic" width="220rpx" height="220rpx"
						mode="widthFix" 
						:src="detail.picUrl"/>
				</view>
				
				
				<!-- 右边信息 -->
				<view class="pic-box-content-info">
					<!-- 专辑名 -->
					<view style="font-weight: bold; font-size: 32rpx;" @tap="openArtist(detail.artist.id)">
						{{detail.name}} 
						<text v-if="detail.alias && detail.alias.length > 0">
							-({{detail.alias.join(',')}})
						</text>
					</view>
					<view style="margin-top: 20rpx;" @tap="openArtist(detail.artist.id)">
						{{type==1?'作者':'歌手'}}：{{artist.name}}
					</view>
					
					
					<view style="margin-top: 50rpx;font-size: 24rpx; color: #ddd;" @tap="()=>{showDesc=!showDesc}">
						<view v-if="detail.publishTime">发行时间：{{formatTime(detail.publishTime, 'yyyy.MM.dd')}}</view>
						<view style="margin-top: 10rpx;" v-if="detail.description">{{detail.description.substr(0, 50)}}...   ></view>
					</view>
				</view>
			</view>
			
			<!-- 详细介绍弹出 -->
			<u-popup v-model="showDesc" 
				mode="bottom" border-radius="50" height="80%" 
				safe-area-inset-bottom closeable>
				<view style="position: relative;padding: 50rpx 40rpx;" >
					<view style="z-index: 120;font-size: 32rpx;line-height: 50rpx;">{{detail.description}}</view>
				</view>
			</u-popup>
		</view>
		
		<!-- 按钮卡片 -->
		<view class="name-card-box" @tap="showDevToast">
			<view>
				<u-row>
					<u-col :span="4" >
						<view class="name-card-item">
							<u-icon name="bag" size="40"/>
							<view style="margin-left: 10rpx;">{{detail.mark}}</view>
						</view>
					</u-col>
					
					<u-col :span="4"  >
						<view class="name-card-item" @tap="openComment">
							<u-icon name="chat" size="40"/>
							<view style="margin-left: 10rpx;">{{detail.info.commentCount}}</view>
						</view>
						
					</u-col>
					</u-col>
					
					<u-col :span="4" >
						<view class="name-card-item">
							<u-icon name="share" size="40"/>
							<view style="margin-left: 10rpx;">{{detail.info.shareCount}}</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		
		<!-- 歌曲列表 -->
		<view class="">
			<!-- 单曲 -->
			<u-cell-group 
				:border="false"
				class="cell-group-box"
			>
				<u-cell-item 
					title-width="600" 
					:arrow="false" v-for="item in songs" 
				>
					<view slot="title" @tap="onClickSongItem(item)" >
						<view style="font-size: 32rpx;color: #000000;">{{item.name}}</view>
						<view style="font-size: 26rpx;color:#999;">
							{{item.ar ? item.ar[0].name : '未知'}} 
						</view>
					</view>
					
					<!-- 右侧图标 -->
					<view slot="right-icon" style="display: flex;align-items: center;" >
						<!-- mv播放 -->
						<u-icon 
							v-show="item.mv"
							@click="openPlayVideoPage(item.mv, 1)"
							name="play-circle-fill" size="50" style="margin-right: 15rpx;"/>
						<u-icon name="more-dot-fill" style="transform: rotate(90deg);"></u-icon>
					</view>
				</u-cell-item>
			
			
				<u-loadmore status="loadmore"  
					:load-text="{loadmore: '就到这里了',loading: '努力加载中',nomore: '实在没有了'}" 
					style="padding: 20rpx 0;"
				/>
			</u-cell-group>
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
	export default {
		data () {
			return {
				id: null,
				//1 歌单，2专辑
				type: 1,
				//详情
				detail: {
					picUrl: '',
					publishTime: 0,
					alias: [],
					//介绍
					description: '',
					info: {},
				},
				//歌手、作者
				artist: {
					id: null,
					name: '',
				},
				showDesc: false,
				//歌曲列表
				songs: [],
				showComment: false,
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.type = option.type;
		},
		onReady() {
			this.getPlaylistDesc();
		},
		created() {
		},
		methods: {
			/**
			 * 获取歌单(专辑)详情
			 */
			getPlaylistDesc(){
				let {id, type} = this;
				if (!id) { 
					return;
				}
				if (type == 1) {
					//歌单
					this.$api.playlistDetail({data: {id}}).then(data => {
						let playlist = data.playlist;
						this.detail.picUrl = playlist.coverImgUrl;
						this.detail.publishTime = playlist.createTime;
						this.detail.name = playlist.name;
						this.detail.mark = playlist.subscribedCount;
						this.detail.info = {
							commentCount: playlist.commentCount,
							shareCount: playlist.shareCount
						};
						
						//歌手信息
						this.artist =  {
							name: playlist.creator.nickname,
						}
						
						this.songs = playlist.tracks;
						
					});
				} else {
					//专辑
					this.$api.album({data: {id}}).then(data => {
						let { album, songs } = data;
						//专辑信息
						this.detail = album;
						
						//歌手信息
						this.artist = album.artist;
						
						//songs
						this.songs = songs;
						
						
					});
				}
			},
			/**
			 * 点击歌曲
			 * @param {Object} item
			 */
			onClickSongItem(item){
				console.log(item, 'item');
				let params = {
					id: item.id,
					name: item.name,
					picUrl: item.al ? item.al.picUrl : '',
				};
				this.openMp3(params);
			},
			/**
			 * 打开评论
			 */
			openComment(){
				this.showComment= true;
				this.$nextTick(()=>{
					let type = this.type == 1 ? 2 : 3;
					this.$refs.comments.getList({type: type, id: this.id});
				});
			},
		},
	}
</script>

<style scoped>
	.bg-pic-box{
		
	}
	
	.bg-pic-box{
		position: relative;
		height: 500rpx;
		padding: 140rpx 40rpx 100rpx 40rpx;
	}
	.bg-pic-box .img-bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 88;
		filter: blur(30rpx);
	}
	
	.bg-pic-box .img-pic{
		width: 100%;
		min-height: 200rpx;
		border-radius: 50rpx;
		z-index: 100;
	}
	
	.pic-box-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		z-index: 120;
		align-items: center;
	}
	
	.pic-box-content-info{
		width: 0rpx;
		flex: 1;
		z-index: 120;
		color: #fff;
		/* margin-left: 40rpx; */
	}
	
	/* 卡片 */
	.name-card-box{
		background-color: #fff;
		margin: 0 100rpx;
		border-radius: 50rpx;
		box-shadow: 0 0 3rpx 2rpx #f0f0f0;
		position: relative;
		top: -20rpx;
		background-color: rgba(255,255,255, .9);
		z-index: 100;
		padding: 20rpx;
	}
	.name-card-item{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
