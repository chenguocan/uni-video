<script>
	export default {
		globalData:{
			api:'http://121.4.255.166:7001',
			token:'',
		},
		onLaunch: function() {
			this.globalData.token=uni.getStorageSync('videoStorage')
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import "./uview-ui/index.scss";
	html,body{
		width: 100%;
		height: 100%;
	}
	/* #endif */
</style>
