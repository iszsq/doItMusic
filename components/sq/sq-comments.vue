<!-- 评论列表 -->
<template>
	<view>
		<view class="c-total">热门评论({{formatNumber(total)}})</view>
		<sq-comment-item 
			v-for="(item,index) in hotComments" :key="index"
			:item="item"
		>
		</sq-comment-item>
	</view>
	
</template>

<script>
	export default {
		props:{
			//评论类型，mv、视频等
			type: String
		},
		data() {
			return {
				//热门评论
				hotComments: [], 
				total: 0,
			}
		},
		computed: {
			
		},
		created() {
			
		},
		methods: {
			/**
			 * 获取评论数据
			 * @param type
			 * 0: 歌曲
				1: mv
				2: 歌单
				3: 专辑
				4: 电台
				5: 视频
			 */
			getList({id, type, limit}){
				this.$api.commentHot({data:{
					type: type,
					id: id,
					limit: limit||30,
				}}).then(data=>{
					this.hotComments= data.hotComments;
					this.total= data.total;
				});
			},
		},
	}
</script>

<style scoped>
	.c-total{
		padding: 30rpx 24rpx;
		text-align: center;
		font-weight: bolder;
	}
</style>
