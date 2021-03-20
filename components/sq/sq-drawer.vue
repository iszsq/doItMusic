<template>
	<u-popup
		v-model="show"
		:safe-area-inset-bottom="true"
		width ="100%"
	>
		<view class="status_bar"></view>
		<!-- 用户头像 -->
		<view class="avatar-box flex-layout flex-center">
			<u-avatar :src="src" mode="square" size="50" ></u-avatar>
			<div class="user-name">zsq</div>
			<u-button size="mini" shape="circle">签到 ></u-button>
		</view>
		
		<!-- 我的消息、宫格 -->
		<view class="user-grid" >
			<u-grid :col="4" :border="false">
				<u-grid-item :key="index"  v-for="(item,index) in userGridData">
					<view class="m-icon">
						<u-badge v-if="item.useBadge" class="icon-index" size="mini" type="error" :count="item.count"></u-badge>
						<u-icon size="48" color="#e51419"  :name="item.icon"></u-icon>
					</view>
					<view class="m-text">{{item.text}}</view>
				</u-grid-item>
			</u-grid>
		</view>
		
		
		<!-- 功能列表 -->
		<view style="margin-bottom: 100rpx;">
			<u-cell-group>
				<u-cell-item icon="edit-pen" title="创作者中心" :arrow="false"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group :border="false">
				<u-cell-item :border-bottom="false" icon="play-circle" title="听歌识曲" :arrow="false" value="可识别其他app歌曲"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="rmb-circle" title="演出" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="shopping-cart" title="商城" :arrow="false" value="iphone11pro max免费拿"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="google-circle-fill" title="游戏推荐" :arrow="false" value="王者荣耀上号"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="map" title="附近的人" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="bell" title="口袋彩铃" :arrow="false" value="开学季必备铃声"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group :border="true">
				<u-cell-item :border-bottom="false" icon="order" title="我的订单" :arrow="false"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="clock" title="定时停止播放" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="scan" title="扫一扫" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="clock" title="音乐闹钟" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="baidu" title="音乐云盘" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="more-circle" title="在线听歌免流量" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="coupon" title="优惠券" :arrow="false" ></u-cell-item>
				<u-cell-item :border-bottom="false" icon="heart" title="青少年模式" :arrow="false" ></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="bottom-box">
			<u-grid :col="3" >
				<u-grid-item >
					<view class="flex-layout flex-center">
						<u-icon name="hourglass"  size="28"></u-icon>
						夜间模式
					</view>
				</u-grid-item>
				<u-grid-item >
					<view><u-icon name="setting"  size="28"></u-icon>设置</view>
				</u-grid-item>
				<u-grid-item >
					<view><u-icon name="close-circle"  size="28"></u-icon>退出</view>
				</u-grid-item>
			</u-grid>
		</view>
	</u-popup>
</template>

<script>
	export default{
		data() {
			return {
				show: false,
				src: '',
				userGridData: [
					{ text:'我的消息',icon: 'email', useBadge: true, count: 99 },
					{ text:'我的好友',icon: 'account',   },
					{ text:'个人主页',icon: 'home',   },
					{ text:'个性装扮',icon: 'shopping-cart', },
				],
			}
		},
		computed:{
			
		},
		created(){
			
		},
		methods: {
			open(){
				this.show = true;
			},
		},
	}
</script>

<style scoped>
	.avatar-box{
		padding: 20px;
	}
	.avatar-box .user-name{
		flex: 1;
		padding: 0 20px;
	}
	
	.user-grid{
		
	}
	.user-grid .m-text{
		font-size: 16rpx;
		margin-top: 8rpx;
	}
	
	.bottom-box{
		width: 550rpx;
		height: 100rpx;
		position: fixed;
		bottom: -3px;
		left: 0;
	}
</style>
