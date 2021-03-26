<template>
	<!-- 视频 搜索结果 -->
	<view class="search-result-box">
		<!-- 视频 -->
		
		<view
			v-for="(item, index) in result.videos" 
			class="video-item-box"
			@click="openPlayVideoPage(item.vid, item.type+1)"
			:key="index"
		>
			<u-image class="v-image" width="100%" mode="widthFix" border-radius="15rpx 15rpx 0 0"
					:src="item.coverUrl">
			</u-image>
			<!-- 信息 -->
			<view style="background-color: #fff; border-radius: 0 0 15rpx 15rpx; padding: 15rpx;">
				<view style="margin-bottom: 12rpx; font-size: 32rpx;font-weight: bold;">
					{{item.creator ? item.creator[0].userName : ''}} - {{item.title}}
				</view>
				<view style="font-size: 22rpx;">
					<u-icon name="play-right"/>{{formatNumber(item.playTime)}}
				</view>
			</view>
		</view>
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
				//搜索结果（视频）
				result: {
					videoCount: 0,
					hasMore: false,
					videos: []
				},
				//搜索类型,默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 
				//1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
				searchType: 1014,
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
	.cell-group-box {
		width: auto;
		box-sizing: border-box;
		background-color: #fff;
	}
	
	.video-item-box{
		width: auto;
		height: auto;
		margin: 20rpx;
		box-sizing: border-box;
		border-radius: 15rpx 15rpx 0 0;
		position: relative;
	}
	
	.video-item-box .v-image{
		width: 100%;
		display: block;
	}
</style>
