<template>
	<!-- 综合搜索结果 -->
	<view class="search-result-box">
		
		<!-- 多重匹配 -->
		<u-cell-group title="你可能感兴趣" class="cell-group-box" :border="false">
			<!-- 歌手列表 -->
			<u-cell-item :border-bottom="false" :arrow="false" 
				@tap="openArtist(item.id)"
				v-for="item in artist">
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="120rpx" height="120rpx" mode="aspectFill" 
						shape="circle"
						:src="item.picUrl"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">歌手：{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">粉丝：{{formatNumber(item.fansSize)}}  歌曲：{{item.musicSize}}</view>
				</view>
			</u-cell-item>
			
			<!-- 专辑 -->
			<u-cell-item :border-bottom="false" :arrow="false" v-for="item in album" @tap="openPlaylistPage(item.id)">
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="120rpx" height="120rpx" mode="widthFix" 
						:src="item.blurPicUrl"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">专辑：{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">{{item.artist ? item.artist.name : '未知'}}</view>
				</view>
			</u-cell-item>
			
			<!-- mv -->
			<u-cell-item :border-bottom="false" :arrow="false" v-for="item in mv">
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="160rpx" height="100rpx" mode="aspectFill" 
						
						:src="item.cover"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">MV：{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">
						{{item.artistName}},{{item.duration/1000/60}},播放：{{formatNumber(item.playCount)}}
					</view>
				</view>
			</u-cell-item>
		</u-cell-group>
		
		<!-- 单曲 -->
		<u-cell-group 
			:border="false"
			class="cell-group-box"
			v-show="searchResultCom.song && searchResultCom.song.songs && searchResultCom.song.songs.length > 0"
		>
			<view 
				style="font-size: 38rpx;color: #000; font-weight: bolder;padding: 20rpx;"
			>
				单曲
			</view>
		
			<u-cell-item :arrow="false" 
				@click="onClickSong(item)"
				v-for="item in searchResultCom.song.songs"
			>
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">{{item.ar ? item.ar[0].name : '未知'}} - {{item.al.name}}</view>
				</view>
				
				<!-- 右侧图标 -->
				<view slot="right-icon">
					<u-icon name="more-dot-fill" style="transform: rotate(90deg);"></u-icon>
				</view>
			</u-cell-item>
			
			<u-cell-item :arrow="false" :border-bottom="false"  v-if="searchResultCom.song.moreText">
				<view style="text-align: center;">
					{{searchResultCom.song.moreText}} >
				</view>
			</u-cell-item>
		</u-cell-group>
		
		
		<!-- 歌单 -->
		<u-cell-group 
			:border="false"
			class="cell-group-box"
			v-if="searchResultCom.playList && searchResultCom.playList.playLists && searchResultCom.playList.playLists.length > 0"
		>
			<view 
				style="font-size: 38rpx;color: #000; font-weight: bolder;padding: 20rpx;"
			>
				歌单
			</view>
		
			<u-cell-item 
				@click="openPlaylistPage(item.id, 1)"
				:arrow="false" v-for="item in searchResultCom.playList.playLists">
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="120rpx" height="120rpx" border-radius="10rpx" mode="aspectFill" :src="item.coverImgUrl"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;" class="only-line-1">{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">
						{{item.trackCount}}首，by {{item.creator.nickname}}, 播放{{formatNumber(item.playCount)}}次
					</view>
				</view>
				
			</u-cell-item>
			
			<u-cell-item :arrow="false" :border-bottom="false" v-if="searchResultCom.playList.moreText">
				<view style="text-align: center;">
					{{searchResultCom.playList.moreText}} >
				</view>
			</u-cell-item>
		</u-cell-group>
		
		
		<!-- 视频 -->
		<u-cell-group 
			:border="false"
			class="cell-group-box"
			v-if="searchResultCom.video && searchResultCom.video.videos && searchResultCom.video.videos.length > 0"
		>
			<view 
				style="font-size: 38rpx;color: #000; font-weight: bolder;padding: 20rpx;"
			>
				视频
			</view>
		
			<u-cell-item 
				@click="openPlayVideoPage(item.vid, item.type+1)"
				:arrow="false" v-for="item in searchResultCom.video.videos">
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="180rpx" height="120rpx" border-radius="10rpx" mode="aspectFill" :src="item.coverUrl"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">{{item.title}}</view>
					<view style="font-size: 26rpx;color:#999;">
						{{toFixed(item.durationms/60/1000)}}，by {{item.creator ? item.creator[0].userName : '未知'}}, {{formatNumber(item.playTime)}}播放
					</view>
				</view>
			</u-cell-item>
			
			<u-cell-item :arrow="false" :border-bottom="false" v-if="searchResultCom.video.moreText">
				<view style="text-align: center;">
					{{searchResultCom.video.moreText}} >
				</view>
			</u-cell-item>
		</u-cell-group>
		
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data(){
			return {
				//
				requesting: false,
				//匹配歌手
				artist: [],
				//匹配专辑
				album: [],
				//匹配mv
				mv: [],
				
				//搜索类型,默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 
				//1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
				searchType: 1018,
				
				//搜索结果（综合）
				searchResultCom: {
					song: {
						songs: [],
						moreText: ''
					},
					playList: {
						playLists: [],
						moreText: ''
					},
					video: {
						videos: [],
						moreText: ''
					},
				},
			};
		},
		created() {
			
		},
		methods: {
			/**
			 * 搜索词变更后刷新属性
			 */
			refresh(){
				
			},
			/**
			 * 执行搜索
			 * @param {Object} word
			 */
			doSearch(word){
				if (this.requesting) {
					return;
				}
				this.requesting = true;
				
				//多重匹配，可能感兴趣
				//搜索多重匹配
				this.$api.searchMultimatch({data: {
					keywords: word,
				}}).then(data => {
					this.requesting = false;
					let {result} = data;
					this.artist = result.artist;
					this.album = result.album;
					this.mv = result.mv;
				}).catch(()=>{
					this.requesting = false;
				});
				
				//搜索接口
				this.$api.search({data: {
					keywords: word,
					type: this.searchType
				}}).then(data => {
					this.requesting = false;
					let {result} = data;
					this.searchResultCom = result;
				}).catch(()=>{
					this.requesting = false;
				});
			},
			/**
			 * 点击单曲
			 */
			onClickSong(item){
				let params = {
					id: item.id,
					name: item.name,
					picUrl: item.al ? item.al.picUrl : '',
				};
				this.openMp3(params);
			},
		},
	}
</script>

<style>
	.cell-group-box{
		margin: 0 20rpx;
		width: auto;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 10rpx;
		margin-top: 30rpx;
	}
</style>
