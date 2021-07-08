<template>
	<view class="videoList">
		<view class="swiper-box" >
			<swiper class="swiper" style="height: 100%;width: 100%;" :vertical="true">
				
				<swiper-item >
					<view class="swiper-item" style="color: #000000;">
					<video-play></video-play>
					</view>
				</swiper-item>	
				<swiper-item>
					<view class="swiper-item">
						<video-play></video-play>
					</view>
				</swiper-item>	
				<swiper-item>
					<view class="swiper-item">
						<video-play></video-play>
					</view>
				</swiper-item>
				
				
			</swiper>
			
		</view>
	</view>
</template>

<script>
	import videoPlay from './videoPlay.vue'
	export default{
		components:{
			videoPlay
		},
		data(){
			return{
				
			};
		}
	}
</script>
	
<style>
.videoList{
		height: 100%;
		width: 100%;
		 
	}
	.swiper-box{
		height: 100%;
		width: 100%;
	}
	.swiper{
		height: 100%;
		width: 100%;
	}
	.swiper-item{
		height: 100%;
		width: 100%;
	}
</style>
