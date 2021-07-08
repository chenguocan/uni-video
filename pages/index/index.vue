<template>
	<view class="content">
		 <!-- <first-nav></first-nav>
		 <video-list></video-list> -->
		 <button @click="toMain">跳转</button>
	</view>
</template>

<script>
/* 	import firstNav from '@/componets/first-nav.vue'
	import videoList from '@/componets/videoList.vue' */
	export default {
		/* components:{
			firstNav,
			videoList
		}, */
		data() {
			return {
				 
			}
		},
		onLoad() {

		},
		methods: {
			toMain(){
				uni.navigateTo({
					url:'../main/main'
				})
			}
		}
	}
</script>

<style>
.content {	 
	height: 100%;
	width: 100%;	
	}

	
</style>
