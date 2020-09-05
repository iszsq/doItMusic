<template>
	<!-- 首页 -->
	<view class="dl-wrapper">
		<sq-header class="header-box" :current="current" @change="tabChange"></sq-header>
		
		<view class="swiper-content">
			<swiper 
				class="swiper" 
				:current="current" 
				:vertical="false" 
				:autoplay="false"  
				@change="onChange"
			>
				<swiper-item>
					<view class="swiper-item focus-box flex flex-center" @click="onClickFocusBg">
						<view style="font-size: 32rpx;">
							请先登录
							
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<sq-yunc-roll-box :actived="current === 1" ref="mSwiper1"/>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<sq-video-roll :actived="current === 2" ref="mSwiper2"/>
					</view>
				</swiper-item>
			</swiper>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
			}
		},
		methods:{
			/**
			 * swiper切换监听
			 */
			onChange(e){
				console.log('onChange', e);
				let {current, source} = e.detail;
				this.current= current;
				console.log('current', current);
				console.log('source', source);
			},
			/**
			 * tabs切换
			 */
			tabChange(index) {
				this.current= index;
			},
			onClickFocusBg(){
				uni.showToast({
					title: '开发中...',
					icon:'none'
				})
			},
		},
	}
</script>

<style >
	.header-box{
		width: 100%;
		padding: 10rpx 0;
		position: absolute;
		z-index: 999;
		left: 0;
		top: 0;
	}
	.dl-wrapper{
		width: 100%;
		position: fixed;
		left: 0;
		top: var(--status-bar-height);
		bottom: var(--window-bottom);;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	
	/* 占满剩下的 */
	.swiper-content{
		width: 100%;
		flex: 1;
	}
	
	.swiper{
		height: 100%;
	}
	.swiper-item{
		height: 100%;
	}
	.uni-bg-red{
		background-color: #FF201F;
	}
	.uni-bg-green{
		background-color: #00B26A;
	}
	.uni-bg-blue{
		background-color: #007AFF;
	}
	
	/* 关注swiper-box */
	.focus-box{
		color: #fff;
	}
</style>
