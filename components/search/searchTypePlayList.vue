<template>
	<!-- 歌单 搜索结果 -->
	<view class="search-result-box">
		<!-- 歌单 -->
		<u-cell-group
			:border="false"
			class="cell-group-box"
		>
		
			<u-cell-item 
				:arrow="false" 
				@click="openPlaylistPage(item.id, 1)"
				v-for="item in result.playlists"
			>
				<view slot="icon" style="margin-right: 20rpx;">
					<u-image width="120rpx" height="120rpx" border-radius="10rpx" mode="aspectFill" :src="item.coverImgUrl"></u-image>
				</view>
				
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;" class="only-line-1">{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">{{item.trackCount}}首，by {{item.creator.nickname}}, 播放{{formatNumber(item.playCount)}}次</view>
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
				//是否已经初始化过了
				alreadyInit: false,
				//requesting 请求中，防止重复请求
				requesting: false,
				//分页参数
				pageMeta: {
					limit: 50,
					offset: 0
				},
				//搜索结果（歌单）
				result: {
					playlists: [],
					hasMore: false,
					playlistCount: 0
				},
				//搜索类型,默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 
				//1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
				searchType: 1000,
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
				
				this.$api.search({data: {
					keywords: word,
					offset: this.pageMeta.offset,
					limit: this.pageMeta.limit,
					type: this.searchType
				}}).then(data=>{
					this.requesting = false;
					let {result} = data;
					this.result = result;
				}).catch(()=>{
					this.requesting = false;
				});
			}
		},
	}
</script>

<style>
	.cell-group-box{
		width: auto;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>
