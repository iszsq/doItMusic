<template>
	<view class="comment-box">
		<!-- 头像 -->
		<view class="avatar-box">
			<image class="avatar" :src="item.user.avatarUrl"></image>
		</view>
		<!-- 右边信息 -->
		<view class="info-box">
			<view class="user-name-box flex">
				<view>
					<view class="user-name">{{item.user.nickname}}</view>
					<view class="date">{{formatTime(item.time)}}</view>
				</view>
				<view class="like-bt">
					{{item.likedCount}}<u-icon name="thumb-up"/>
				</view>
			</view>
			<view class="content">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object
		},
		data() {
			return {
			}
		},
		computed: {
			
		},
		created() {
		},
		methods: {
		},
	}
</script>

<style scoped>
	.comment-box{
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		padding: 24rpx 24rpx;
		border-bottom-color: #f0f0f0;
		border-bottom-style: solid;
		border-bottom-width:  1rpx;
		color: #333;
	}
	.comment-box .avatar-box{
		
	}
	
	.comment-box .avatar-box .avatar{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 24rpx;
	}
	
	.comment-box .info-box{
		width: 0;
		flex: 1;
	}
	
	.comment-box .user-name-box{
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.comment-box .user-name-box .like-bt{
		font-size: 26rpx;
	}
	.comment-box .user-name-box .user-name{
		font-size: 28rpx;
	}
	.comment-box .user-name-box .date{
		font-size: 24rpx;
		color: #999;
	}
</style>
