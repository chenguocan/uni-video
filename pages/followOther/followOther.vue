<template>
	<view class="page">
		<view style="margin:0 auto;font-weight: 700;font-size: 48rpx;"> 他的粉丝</view>
		<u-swipe-action :show="item.show" :btn-width="btnWidth" :index="index" v-for="(item, index) in list" :key="item.id" @click="click(item.id)"
			@open="open" :options="options">
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.avatar" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.name }}</text>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	const globalData = getApp().globalData;
	export default {
		data() {
			return {
				list: [
				],
				disabled: false,
				btnWidth: 250,
				show: false,
				options: [],
				id:0,
			};
		},
		onLoad(options) {
			this.id=options.id;
			this.getfens();
		},
		
		methods: {
			getfens() {
				let token = globalData.token;
				let _self=this;
				this.$request('/follow/fensById/'+_self.id, '', 'GET').then(result => {
					console.log(result);
					if(result.statusCode===0){
						_self.list=result.data;
					}
				})
			},
			click(id) {
				
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.page{
		margin: 100rpx 40rpx 0rpx 40rpx;
	}
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
