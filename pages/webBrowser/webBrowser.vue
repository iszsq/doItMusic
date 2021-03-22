<template>
	<!-- web页面浏览 -->
	<view class="web-browser-wrapper">
		<u-navbar></u-navbar>
		
		<web-view :webview-styles="webviewStyles" :src="url">
		</web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			url: null,
			webviewStyles: {
				progress: {
					color: '#FF3333',
					marginTop: '50rpx',
				}
			}
		};
	},
	onLoad(option) {
		this.url = decodeURIComponent(option.url);
	},
	created(){
		
	},
};
</script>

<style scoped></style>
