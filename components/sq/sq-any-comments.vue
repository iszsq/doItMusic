<template>
	<!-- 评论列表窗口 -->
	<u-popup 
		v-model="show" 
		safe-area-inset-bottom 
		closeable 
		mode="bottom"
		border-radius="10"
		height="600rpx"
	>
		<sq-comments ref="mvComments"/>
	</u-popup>
</template>

<script>
	export default{
		props: {
		},
		data(){
			return {
				show: false,
			};
		},
		methods: {
			setShow(s=true){
				this.show = s;
			},
		},
	}
</script>

<style>
</style>
