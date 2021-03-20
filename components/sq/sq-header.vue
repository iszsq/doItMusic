<template>
	<view class="home-header flex-layout">
		<view class="left flex-layout flex-center">
			<!-- <u-badge style="z-index: 999;" type="error" size="mini" count="99"></u-badge>
			<u-icon name="list" color="#ffffff" size="45"></u-icon> -->
		</view>
		
		<u-tabs 
			class="m-tabs"
			:list="tabs" 
			:is-scroll="false" 
			:current="tabCurrent" 
			active-color="#e51419"
			inactive-color="#ffffff"
			@change="tabChange" 
			bg-color="transparent">
		</u-tabs>
		<view class="right flex-layout flex-center">
			<u-icon name="search" color="#ffffff" size="45"></u-icon>
		</view>
		
		<!-- 左边抽屉 -->
		<sq-drawer ref="drawer"></sq-drawer>
	</view>
	
</template>

<script>
	import CommonMixin from '../mixins/commonMixin.vue';
	
	
	export default{
		mixins:[CommonMixin],
		props: {
			current: Number,
		},
		data() {
			return {
				tabs: [{
							name: '关注'
						}, {
							name: '云村'
						}, {
							name: '视频'
						},],
				tabCurrent: 1,
			}
		},
		watch:{
			current(val){
				this.tabCurrent= val;
			},
		},
		computed:{
			
		},
		created(){
			this.tabCurrent= this.current;
		},
		methods: {
			tabChange(index) {
				this.tabCurrent = index;
				console.log('tabChange', index);
				this.$emit('change', index);
			},
			/**
			 * 点击左边菜单按钮
			 */
			onClickMenu(){
				this.$refs.drawer.open();
			},
		},
	}
</script>

<style scoped>
	.home-header{
		/* background-color: rgba(0,0,0,.1); */
		height: auto;
	}
	
	.home-header .left{
		width: 80px;
		position: relative;
	}
	.home-header .m-tabs{
		flex: 1;
	}
	.home-header .right{
		width: 80px;
	}
	
	
	
	
</style>
