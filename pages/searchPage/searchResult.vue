<template>
	<!-- 搜索结果 -->
	<view class="search-result-page">
		<u-navbar height="55">
			<view style="width: 100%;padding: 20rpx; position: relative;">
				<q-search-bar 
					ref="search"
					@change="onSearchChange"
					@focus="onFocus"
					@blur="onBlur"
					@search="onClickSearch"
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
		
		<!-- tabs切换选项卡 -->
		<view class="tabs-wrapper">
			<u-tabs-swiper ref="uTabs" :list="typeList" :current="currentTab" @change="tabsChange" :is-scroll="false"
				active-color="#e51419" swiperWidth="750">	
			 </u-tabs-swiper>
		</view>
		
		<swiper class="m-swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			
			<!-- 综合搜索结果 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<searchTypeCom
						ref="searchCom"
						style="margin-bottom: 100rpx;"
					/>
				</scroll-view>
			</swiper-item>
			
			<!-- 单曲 搜索结果 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<searchTypeSong
						ref="searchSong"
						style="margin-bottom: 100rpx;"
					/>
				</scroll-view>
			</swiper-item>
			
			<!-- 歌单 搜索结果 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<searchTypePlayList
						ref="searchPayList"
						style="margin-bottom: 100rpx;"
					/>
				</scroll-view>
			</swiper-item>
			
			<!-- 视频 搜索结果 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<searchTypeVedio
						ref="searchVideo"
						style="margin-bottom: 100rpx;"
					/>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
		
	
</template>

<script>
	import searchTypeCom from '@/components/search/searchTypeCom.vue';
	import searchTypeSong from '@/components/search/searchTypeSong.vue';
	import searchTypePlayList from '@/components/search/searchTypePlayList.vue';
	import searchTypeVedio from '@/components/search/searchTypeVedio.vue';
	
	export default{
		components: {
			searchTypeCom,
			searchTypeSong,
			searchTypePlayList,
			searchTypeVedio,
		},
		data() {
			return {
				typeList: [{
						type: 1018,
						name: '综合'
					}, {
						type: 1,
						name: '单曲'
					}, {
						type: 1002,
						name: '歌单'
					}, {
						type: 1014,
						name: '视频'
					},
				],
				
				currentTab: 0,
				swiperCurrent: 0,
				//搜索建议
				suggestList: [],
				//显示搜索建议
				showSuggest: false,
				//输入框搜索值
				searchWord: '',
				
				
			}
		},
		computed:{
			
		},
		onLoad(option) {
			console.log('refs', this.$refs);
			let word = decodeURIComponent(option.word);
			this.searchWord = word;
		},
		onReady() {
			this.toSearch(this.searchWord, this.swiperCurrent);
		},
		created(){
			//获取默认搜索关键词
			this.$api.searchDefault().then(data=>{
				this.defaultSearchWord = data.data.showKeyword;
			});
		},
		mounted(){
			this.$refs.search.setWord(this.searchWord);
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
				this.searchWord = word;
				this.$refs.search.setWord(word);
				
				this.toSearch(word, this.swiperCurrent);
			},
			/**
			 * 搜索
			 * 搜索类型,默认为 1 即单曲 , 取值意义 : 
			 * 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
			 *  1002: 用户, 1004: MV, 1006: 歌词,
			 *  1009: 电台, 1014: 视频, 1018:综合
			 */
			toSearch(word, idx){
				if (!word) {
					return;
				}
				let index = idx;
				//综合
				if (index === 0) {
					this.$refs.searchCom.doSearch(word);
				} else if (index == 1) {
					//单曲
					this.$refs.searchSong.doSearch(word);
				} else if (index == 2) {
					//歌单
					this.$refs.searchPayList.doSearch(word);
				} else if (index == 3) {
					//视频
					this.$refs.searchVideo.doSearch(word);
				}
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log(index);
				this.swiperCurrent = index;
				
				this.toSearch(this.searchWord, index);
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				console.log("----animationfinish");
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				if (this.currentTab !== current) {
					this.toSearch(this.searchWord, current);
				}
				this.currentTab = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log("active load more!");
			}
		},
	}
</script>

<style scoped>
	.search-result-page{
		height: 100%;
		width: 100%;
		top: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}
	
	.tabs-wrapper {
		width: 100%;
	}
	
	/* m-swiper 切换 */
	.m-swiper {
		height: 0;
		flex: 1;
	}
	
	.swiper-item{
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
	
	.cell-group-box{
		margin: 0 20rpx;
		width: auto;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 10rpx;
		margin-top: 30rpx;
	}
</style>
