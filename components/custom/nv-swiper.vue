<template>
	<view>
		<swiper  :style="{height: height + 'px'}"  :current="current" @change="change">
			<swiper-item>
				<slot name="left"></slot>
			</swiper-item>
			<swiper-item>
				<slot name="center"></slot>
			</swiper-item>
			<swiper-item>
				<slot name="right"></slot>
			</swiper-item>
		</swiper>
	</view>
	
</template>

<script>
	export default{
		props: {
			//组件高度
			height: {
				default: 0
			},
			//当前显示
			current: {
				default: 0
			}
		},
		data() {
			return {
			}
		},
		methods: {
			change: function(e) {
				this.$emit("change", e.detail.current)
			}
		}
	}
</script>

<style scoped>
</style>
