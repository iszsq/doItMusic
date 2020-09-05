<template>
	<view class="index-wrapper">
		<view>
			<view class="status_bar"></view>
			<!-- tabbar对应页面 -->
			<Home v-show="current===1"/>
			<sq-my v-show="current===2" ></sq-my>
		</view>
		
		<!-- <sq-tabbar @change="onTabbarChange"></sq-tabbar> -->
	</view>
</template>

<script>
	import Home from '../home/index';
	
	export default {
		components: {
			Home
		},
		data() {
			return {
				title: 'Hello no',
				current: 1,
			}
		},
		onLoad() {
			console.log("hello");
			// uni.request({
			// 	url:'http://musicapi.leanapp.cn/search/hot',
			// 	method:'GET',
			// 	success(res) {
			// 		console.debug(res);
			// 	}
			// })
		},
		methods: {
			/**
			 * 底部tab切换
			 */
			onTabbarChange(index){
				this.current = index;
			},
		}
	}
</script>

<style scoped>
	.index-wrapper{
		position: relative;
	}
</style>
