<template>
	<!-- 首页热门 -->
	<view class="hot-page-box">
		<u-navbar :is-back="false"
			:border-bottom="false"  
			title="热门MV">
		</u-navbar>
		
		<!-- mv列表 -->
		<view class="mv-list-box">
			<u-card 
				:border="false"
				@click="openPlayVideoPage(item.id, 1)"
				v-for="item in mvList"
				margin="0 0 20rpx 0"
				border-radius="0"
				:body-style="{'padding': 0}"
			>
				<!-- 歌手名 -->
				<view slot="head" style="font-weight: bolder;" @tap="openArtist(item.artistId)">
					<text style="color: var(--primary-color);">{{item.artistName}}</text>
					<text style="margin: 0 10rpx;"> - </text>
					<text style="">{{item.name}}</text>
				</view>
				
				<view slot="body" class="v-card-body">
					<u-image width="100%" height="340rpx" mode="widthFix" :src="item.cover"></u-image>
					
					<view class="play-bt"><u-icon name="play-right-fill" size="80rpx" class="icon"/></view>
				</view>
			</u-card>
		</view>
		
		
		
		<u-divider>到底啦</u-divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//mv列表
				mvList: [],
				limit : 30,
			};
		},
		created(){
			this.getMvList();
		},
		methods:{
			/**
			 * 获取mv列表
			 */
			getMvList(){
				this.$api.mvFirst({data: {
					limit: this.limit,
				}}).then(data=>{
					this.mvList = data.data;
				});
			},
			
		},
	}
</script>

<style>
	
	.hot-page-box{
		padding-bottom: 50rpx;
	}
	
	.v-card-body{
		position: relative;
	}
	.v-card-body .play-bt{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0, .1);
	}
	.v-card-body .play-bt .icon{
		color: #ddd;
		opacity: .7;
	}
</style>
