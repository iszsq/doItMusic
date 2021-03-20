<template>
	<!-- 搜索页面 -->
	<view>
		<u-navbar :height="55">
			<view style="width: 100%;padding: 20rpx; position: relative;">
				<q-search-bar 
					@change="onSearchChange"
					@focus="onFocus"
					@blur="onBlur"
				/>
				
				<view class="search-suggest-box" v-show="showSuggest && searchWord">
					<view style="color: #007AFF;" v-if="searchWord"> 搜索“{{searchWord}}" </view>
					
					<u-cell-item 
						v-for="item in suggestList"
						icon="search" :arrow="false" 
						:title="item.keyword"
					></u-cell-item>
				</view>
			</view>
		</u-navbar>
		
		<view class="content">
			
			<!-- 热搜榜 -->
			<u-cell-item :arrow="false">
				<view slot="title" style="font-weight: bolder;font-size: 30rpx;">
					热搜榜
				</view>
				<view slot="right-icon">
					<u-button :plain="true" shape="circle" size="mini">
						<u-icon name="play-circle-fill"></u-icon>播放
					</u-button>
				</view>
			</u-cell-item>
			<u-divider></u-divider>
			
			<view class="hot-item-box">
				<u-row gutter="16" justify="bewteen">
					<u-col span="6" class="hot-item" v-for="(item,index) in hotList">
						<view class="number" :class="{'red-text': index<3}"> {{index+1}}</view>
						<view class="word" :class="{'text-bolder': index<3}"> {{item.searchWord}}</view>
						<image v-if="item.iconUrl" style="margin-left: 15rpx;width: 30rpx;" mode="widthFix" :src="item.iconUrl"></image>
					</u-col>
				</u-row>
			</view>
			
		</view>
	</view>
	
	
</template>


<script>
	export default{
		data() {
			return {
				//搜索榜单
				hotList: [],
				//搜索建议
				suggestList: [],
				//显示搜索建议
				showSuggest: false,
				//搜索值
				searchWord: '',
			}
		},
		computed:{
			
		},
		created(){
			//获取默认搜索关键词
			this.$api.searchDefault().then(data=>{
				this.defaultSearchWord = data.data.showKeyword;
			});
			
			//热搜列表
			this.$api.searchHotDetail().then(data=>{
				this.hotList = data.data;
			});
		},
		methods: {
			/**
			 * 输入框内容发生变化时触发，已经做了防抖
			 */
			onSearchChange(value){
				this.searchWord = value;
				if(!value){
					return;
				}
				this.$api.searchSuggest({data: {
					keywords: value,
					type: 'mobile'
				}}).then(data => {
					this.suggestList = data.result.allMatch;
				});
			},
			onFocus(value){
				this.showSuggest = true;

			},
			onBlur(value){
				this.showSuggest = false;
			},
		},
	}
</script>

<style>
	.content{
		background-color: #fff;
	}
	
	/* 搜索建议 */
	.search-suggest-box{
		width: 100%;
		padding: 20rpx;
		position: absolute;
		top: 100rpx;
		left: 0;
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 10rpx;
	}
	
	/* 热搜 */
	.hot-item-box {
		padding: 20rpx;
	}
	
	.hot-item-box .hot-item {
		margin-bottom: 30rpx;
		display: flex;
		flex-wrap: nowrap;
	}
	
	.hot-item-box .hot-item .number{
		width: 50rpx;
	}
	
	.hot-item-box .hot-item .red-text{
		color: red;
		font-weight: bolder;
	}
	
	.hot-item-box .hot-item .text-bolder{
		font-weight: bolder;
	}
	
	.hot-item-box .hot-item .word{
		
	}
	
	
</style>
