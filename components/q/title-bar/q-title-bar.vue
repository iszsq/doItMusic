<template>
<!-- 首页顶部标题栏 -->
	
	<view class="title-bar-warppper">
		<!-- 左侧菜单按钮 -->
		<view class="menu-button-box"> 
			<u-icon name="list" color="#333" size="50"></u-icon>
			<u-badge type="error" count="7" is-dot :offset="[0,0]">
			</u-badge>
			
		</view>
		
		<!-- 标题栏内容 -->
		<view class="content-box"> 
			<slot />
		</view>
	</view>
</template>

<script>
	
</script>

<style>
	.title-bar-warppper {
		background-color: #fff;
		height: 120rpx;
		padding: 0 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
	
	.menu-button-box {
		width: 50rpx;
		margin-right: 15rpx;
		position: relative;
	}
	
	.content-box{
		width: 0rpx;
		flex: 1;
	}
</style>
