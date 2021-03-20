<template>
	<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
	<view>
		<u-tabbar v-model="current" height="100rpx" :list="list" :mid-button="false" active-color="#e51419"></u-tabbar>
	</view>
</template>

<script>
	export default{
	
		data() {
			return {
				list: [{
						iconPath: "chat",
						selectedIconPath: "chat-fill",
						text: '热评',
						count: 2,
						isDot: true,
						customIcon: false,
					},
					{
						iconPath: "/static/image/logo.png",
						selectedIconPath: "/static/image/logo.png",
						text: '首页',
						customIcon: false,
						count: 0,
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 99,
						isDot: false,
						customIcon: false,
					},
				],
				current: 1
			}
		},
		watch: {
			/**
			 * ta切换监听
			 * @param {Object} val
			 */
			current(val){
				console.log('catch ', val);
				this.$emit("change", val);
			},
		},
	}
</script>
	
<style>
</style>
