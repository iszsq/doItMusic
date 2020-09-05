<template>
	<view class="yuncun-page" >
		<text @click="onClick">云村</text>
		<video  ref="myVideo" class="myVideo" id="myVideo"
			v-if="current === index"
			src="http://vodkgeyttp8.vod.126.net/cloudmusic/d864/core/8438/38ccd0b0621d186192ba03d30453bb08.mp4?wsSecret=8a6ca67104b66e3a800ff9ca1b557ff4&wsTime=1599060421"
			:controls="true" loop :autoplay="false"
			 style="width: 750rpx;" 
			@play="onplay"
		>
		</video>
		<list  :pagingEnabled="true" style="height: 400rpx;" :show-scrollbar="true" @scrollend="scroll" :scrollable="true">
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
			<cell><text>hahahah</text></cell>
		</list>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			onClick(e){
				console.log('yuncun-page-onClick', e);
			},
			scroll: function(e) {
				console.log('scroll--', e);
			}
		}
	}
</script>

<style scoped>
	.yuncun-page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #333333;
	}
</style>
