<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
			this.$bus.$emit('onAppShow');
		},
		onHide() {
			console.log('App Hide');
			this.$bus.$emit('onAppHide');
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*
	 * uView--注意要写在第一行，同时给style标签加入lang="scss"属性 
	 */
	/* #ifndef APP-NVUE */
	@import "uview-ui/index.scss";
	@import '/static/css/styles.css';
	/* #endif */
	
	:root{
		--title-bar-height: 120rpx;
	}
	
	page {
		background-color: #f0f0f0;
	}
	
	/* #ifndef APP-NVUE */
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	  }
	/* #endif */
	
	
</style>
