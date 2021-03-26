<template>
	<!-- 搜索页面 -->
	<view>
		<u-navbar :height="55">
			<view style="width: 100%;padding: 20rpx; position: relative;">
				<q-search-bar 
					@change="onSearchChange"
					@focus="onFocus"
					@blur="onBlur"
					@search="onSearch"
				/>
				
				<!-- 搜索建议 -->
				<view class="search-suggest-box" v-show="showSuggest && searchWord">
					<view @tap.stop="onClickSearch(searchWord)" style="color: #007AFF;" v-if="searchWord"> 搜索“{{searchWord}}" </view>
					
					<u-cell-item 
						v-for="item in suggestList"
						icon="search" :arrow="false" 
						@click="onClickSearch(item.keyword)"
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
					<!-- <u-button :plain="true" shape="circle" size="mini">
						<u-icon name="play-circle-fill"></u-icon>播放
					</u-button> -->
				</view>
			</u-cell-item>
			
			<u-divider></u-divider>
				
			<view class="hot-item-box">
				<u-row gutter="16" justify="bewteen" style="width: 100%;overflow: hidden;">
					<u-col 
						:span="6" 
						v-for="(item,index) in hotList" 
						@click="onClickSearch(item.searchWord)"
					>
						<view class="hot-item" >
							<view class="number" :class="{'red-text': index<3}"> {{index+1}}</view>
							<view class="word line-1" :class="{'text-bolder': index<3}"> {{item.searchWord}}</view>
							<image v-show="item.iconUrl" 
								style="margin-left: 15rpx;width: 30rpx;max-height: 40rpx;" mode="widthFix":src="item.iconUrl">
							</image>
						</view>
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
			/**
			 * 点击回车确认搜索
			 */
			onSearch(value){
				this.onClickSearch(value);
			},
			onFocus(value){
				this.showSuggest = true;

			},
			onBlur(value){
				setTimeout(()=>{
					this.showSuggest = false;
				}, 100);
			},
			/**
			 * 点击搜索结果
			 */
			onClickSearch(word){
				console.log(word);
				if (!word) {
					return;
				}
				uni.navigateTo({
					url: '/pages/searchPage/searchResult?word=' + encodeURIComponent(word)
				});
			}
		},
	}
</script>

<style scoped>
		
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
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
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
