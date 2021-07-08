<template>
	<view class="content">
		<view style="width: 750rpx;height: 100%;display: flex;justify-content: center;">
			<view class="video" @click="selectVideo" v-if="!tempVideo">
				<view class="add" >
					＋
				</view>
				<view>
					点击添加视频
				</view>
			</view>
			<view class="video close-btn" v-else>
				<u-icon name="close" class="close" @click="toggle(0)"></u-icon>
				<view >
					<video style="height: 700rpx;width: 600rpx;" :src="tempVideo" autoplay></video>
				</view>
			</view>
		</view>
		<u-line :hair-line="false"></u-line>
		<view class="detail">
			<view class="poster" @click="addPoster" v-if="!tempImage">
				<view class="add">
					＋
				</view>
				<view>
					点击添加封面图
				</view>
			</view>
			<view class="close-btn" v-else>
				<u-icon name="close" class="close" @click="toggle(1)"></u-icon>
				<view class="poster">
					<image style="width:300rpx;height: 300rpx;" :src="tempImage"></image>
				</view>
			</view>
			<u-form :model="detailForm" ref="detailForm">
				<u-form-item label="标题">
					<u-input v-model="detailForm.title" placeholder="请填写视频标题" />
				</u-form-item>
				<u-form-item label="描述">
					<u-input v-model="detailForm.desc" type="textarea" placeholder="请填写视频描述......" />
				</u-form-item>
			</u-form>
		</view>
		<view style="display: flex;justify-content: center;">
			<view class="release" @click='upload'>
				发布
			</view>
		</view>
		<!-- <button type="default" @click="selectVideo">选择视频</button> -->
		<!-- <u-button shape="circle" type="primary" style="margin-top: 20rpx;" @click='upload'>上传</u-button> -->
	</view>
</template>

<script>
	import uniPopupMessage from "../../components/uni-popup/uni-popup-message";
	// const VodUploader = require('vod-wx-sdk-v2')
	import VodUploader from '@/utils/vod-wx-sdk-v2'
	export default {
		components:{
			uniPopupMessage
		},
		data() {
			return {
				videoFile: '', //视频文件
				signature: '',
				pictureFile: '',
				detailForm: {
					title: '',
					classify: '',
					desc: '',
				},
				tempImage: '',
				tempVideo: '',
			}
		},
		onLoad() {
			// this.getAutograph()
			/* this.getSignature(); */
		},
		methods: {
			open(){
				this.$refs.popup.open()
			},
			toggle(index){
				if(index===0){
					this.videoFile='';
					this.tempVideo='';
				}else if(index===1){
					this.tempImage='';
				}
			},
			addPoster() {
				let _self = this;
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: function(result) {
						console.log(result)
						_self.pictureFile = result;
						_self.tempImage = result.tempFilePaths[0]
					}
				});
			},
			upload() {
				let that = this;
				let videoUrl='';
				let imgUrl='';
				if (this.videoFile === '') {
					return uni.showToast({
						title: '请选择视频',
						icon: 'none'
					})
				} else if (this.pictureFile === '') {
					return uni.showToast({
						title: '请选择封面',
						icon: 'none'
					})
				}
				uni.showLoading({
					title:'上传中'
				})
				const uploader = VodUploader.start({
					// 必填，把 wx.chooseVideo 回调的参数(file)传进来
					mediaFile: that.videoFile,
					// 必填，获取签名的函数
					getSignature: that.getSignature,
					coverFile: that.pictureFile,
					mediaName: that.detailForm.title,
					// 上传中回调，获取上传进度等信息
					progress: function(result) {
						console.log('progress');
						console.log(result);
					},
					// 上传完成回调，获取上传后的视频 URL 等信息
					finish: function(result) {
						console.log('finish');
						console.log(result);
						videoUrl=result.videoUrl;
						imgUrl=result.coverUrl;
						uni.hideLoading();
						that.save(videoUrl,imgUrl);
					},
					// 上传错误回调，处理异常
					error: function(result) {
						console.log('error');
						console.log(result);
						wx.showModal({
							title: '上传失败',
							content: JSON.stringify(result),
							showCancel: false
						});
					},
					success: (result) => {
						console.log('success');
						console.log(result);
					},
				})
				
				
			},
			save(videoUrl,imgUrl){
				let _self=this;
				let data={
					title:this.detailForm.title,
					desc:this.detailForm.desc,
					videoUrl:videoUrl,
					imgUrl:imgUrl,
				};
				console.log(data);
				let token=uni.getStorageSync('videoStorage');
				this.$request('/video/save',data,"POST",{token}).then(result=>{
					if(result.statusCode===0){
						uni.showToast({
							title:result.data,
							icon:'none',
						})
						_self.detailForm.title='';
						_self.detailForm.desc='';
						_self.tempImage='';
						_self.tempVideo='';
					}
				})
			},
			selectVideo() {
				let that = this;
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					compressed: false,
					success(res) {
						console.log(res);
						that.videoFile = res
						that.tempVideo = res.tempFilePath
					}
				})
			},
			getSignature(callback) {
				let that = this;
				uni.request({
					url: 'http://121.4.255.166:7001/vod/sign',
					method: 'GET',
					success(res) {
						console.log(res);
						callback(res.data.data);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		margin-top: 100rpx;
	}
	.close-btn{
		position: relative;
		.close{
			position: absolute;
			right: 0;
			top: 0;
			z-index: 1;
		}
	}
	.poster {
		width: 300rpx;
		height: 300rpx;
		color: #6a737b;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f9fa;
		margin: 0 auto;

		.add {
			font-size: 60rpx;
		}
	}

	.video {
		height: 700rpx;
		width: 100%;
		color: #6a737b;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f9fa;
		margin: 40rpx;

		.add {
			font-size: 60rpx;
		}
	}

	.detail {
		padding: 40rpx;
	}

	.release {
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
		background-color: #0a7bc5;
		margin-top: 20rpx;
		width: 680rpx;
		height: 75rpx;
	}
</style>
