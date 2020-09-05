<template>
	<!-- 顶部选项卡 -->
	<view class="header" :style="{marginTop:statusBarHeight+'px'}">
		<view class="header-center">
			<view class="header-item" @click="onClickTab(0)">
				<text class="header-item-title" :class="{'activate-title': current === 0}">关注</text>
				<view class="header-item-line" :class="{'activate-line': current === 0}"></view>
			</view>
			<view class="header-item"  @click="onClickTab(1)">
				<text class="header-item-title" :class="{'activate-title': current === 1}">云村</text>
				<view class="header-item-line" :class="{'activate-line': current === 1}"></view>
			</view>
			<view class="header-item"  @click="onClickTab(2)">
				<text class="header-item-title" :class="{'activate-title': current === 2}">视频</text>
				<view class="header-item-line" :class="{'activate-line': current === 2}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			statusBarHeight: {
				default: 0
			},
			current: {
				default: 0
			}
		},
		data() {
			return {
	
			}
		},
		methods: {
			onClickTab(index){
				console.log('onClickTab--', index);
				this.$emit('onChange', index);
			},
		}
	}
</script>

<style scoped>
	.header {
		position: absolute;
		left: 0;
		right: 0;
		flex-direction: row;
		height: 100rpx;
		line-height: 100rpx;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
		z-index: 999;
	}

	.header-center {
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.header-left,
	.header-right {
		color: #999;
		height: 100rpx;
		line-height: 100rpx;
		align-items: flex-start;
		justify-content: flex-end;
		font-family: iconfont;
	}

	.header-item {
		align-items: center;
	}

	.header-item-title {
		width: 120rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: 600;
	}

	.header-item-line {
		height: 8rpx;
		line-height: 8rpx;
		width: 40rpx;
		border-radius: 10rpx;
	}
	
	.activate-line{
		background-color: rgb(229, 20, 25);
		width: 60rpx;
		height: 5rpx;
	}
	.activate-title{
		color: rgb(229, 20, 25);
	}
</style>
