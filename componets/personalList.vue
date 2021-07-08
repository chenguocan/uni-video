<template>
	<view class="">
		<view class="personalList">
			<view class="item">
				<image src="../static/icon/shouyeed.png" mode=""></image>
				
			</view>
			<view class="item">
				<image src="../static/icon/shouyeed.png" mode=""></image>
			</view>
			
			
			
			
			
		</view>
		<view class="more">
			没有更多了
		</view>
		<view class="ground">
			
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.ground{
		width: 100%;
		height: 50px;
		background: #000000;
	}
	.personalList{
		width: 100%;
		overflow: hidden;
		background: #000000;
		padding: 0 0.5%;
		
	}
	.item{
		width: 33%;
		height: 120px;
		float: left;
		position: relative;
	}
	image{
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.more{
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12x;
		color: #999999;
		background: #000000;
	}
</style>
