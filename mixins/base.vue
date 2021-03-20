<!--
- 全局混入 
-->
<script>
	import dateUtil from 'utils/dateUtil.js';
	
	export default{
		data() {
			return {
				
			}
		},
		computed:{
			
		},
		created(){
			
		},
		methods: {
			//转换数字显示
			formatNumber(val, fixedNum=2){
				if(!val){
					return '';
				}
				if(val >= 10000){
					return (val/10000).toFixed(fixedNum)+'w';
				}
				return val;
			},
			/**
			 * 时间戳转日期格式
			 */
			formatTime(time, format='yyyy-MM-dd'){
				let date = new Date(time);
				return dateUtil.dateFormat(format, date);
			},
			/**
			 * 打开url链接
			 */
			openUrl(params = {}) {
				let {url} = params;
				let enUrl = encodeURIComponent(url);
				uni.navigateTo({
					url: '/pages/webBrowser/webBrowser?url=' + enUrl,
				});
			}
		},
	}
</script>
