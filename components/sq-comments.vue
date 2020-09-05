<!-- 评论列表 -->
<template>
	<view>
		<view class="c-total">{{formatNumber(total)}}条评论</view>
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
			 */
			getList({id, type, limit}){
				this.$yunApi.commentHot({
					type: type,
					id: id,
					limit: limit||20,
				}).then(({data})=>{
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
