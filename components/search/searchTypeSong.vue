<template>
	<!-- 单曲 搜索结果 -->
	<view class="search-result-box">
		<!-- 单曲 -->
		<u-cell-group 
			:border="false"
			class="cell-group-box"
			v-show="result && result.songs && result.songs.length > 0"
		>
		
			<u-cell-item 
				@tap="onClickItem(item)"
				:arrow="false" v-for="item in result.songs" 
			>
				<view slot="title">
					<view style="font-size: 32rpx;color: #000000;">{{item.name}}</view>
					<view style="font-size: 26rpx;color:#999;">{{item.artists ? item.artists[0].name : '未知'}} - {{item.album.name}}</view>
				</view>
				
				<!-- 右侧图标 -->
				<view slot="right-icon">
					<u-icon name="more-dot-fill" style="transform: rotate(90deg);"></u-icon>
				</view>
			</u-cell-item>
		
		
			<u-loadmore :status="result.hasMore ? 'loadmore' : 'nomore'"  
				:load-text="{loadmore: '就到这里了',loading: '努力加载中',nomore: '实在没有了'}" 
				style="padding: 20rpx 0;"
			/>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data(){
			return {
				//是否已经初始化过了，暂时不用
				alreadyInit: false,
				//requesting 请求中，防止重复请求
				requesting: false,
				//分页参数
				pageMeta: {
					limit: 30,
					offset: 0
				},
				//搜索结果（单曲）
				result: {
					queryCorrected: [],
					songs: [],
					hasMore: false,
					songCount: 0
				},
				//搜索类型,默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 
				//1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
				searchType: 1,
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
			},
			/**
			 * 点击单曲
			 */
			onClickItem(item){
				console.log(item, 'item');
				let params = {
					id: item.id,
					name: item.name,
					picUrl: item.artists && item.artists.length>0 ? item.artists[0].img1v1Url : '',
				};
				this.openMp3(params);
			},
			
		},
	}
</script>

<style scoped>
	.cell-group-box{
		width: auto;
		box-sizing: border-box;
		background-color: #fff;
	}
</style>
