<template>
	<!-- 搜索控件 -->
	<view >
		<u-search 
			v-model="searchWord"
			:placeholder="defaultSearchWord"  
			:show-action="false"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@search="onSearch"
		>
		</u-search>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				//默认搜索关键词
				defaultSearchWord : '',
				searchWord: '',
			}
		},
		created(){
			//获取默认搜索关键词
			this.$api.searchDefault().then(data=>{
				this.defaultSearchWord = data.data.showKeyword;
			});
		},
		methods:{
			/**
			 * 输入框内容发生变化时触发
			 */
			onChange(value){
				//防抖处理
				this.$u.debounce(()=>{
					this.$emit('change', value);
				}, 500)
			},
			onFocus(value){
				this.$emit('focus', value);
			},
			onBlur(value){
				this.$emit('blur', value);
			},
			onSearch(value){
				this.$emit('search', value);
			},
			setWord(value){
				this.searchWord = value;
			}
		},
	}
</script>

<style>
</style>
