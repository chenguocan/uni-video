<template>
	<view>
		<view class="content">
			<view class="personalInfo">
				<view class="backgrount-img-box">
					<image class="backgrount-img" src="../../static/img/background.jpg" mode="" ></image>
				</view>
				<view class="top">
					<view class="personal-img-box" >
						<image class="personal-img" :src="userinfo.avatar" mode=""></image>
					</view>
					<view class="change" v-if="userinfo" @click="toInfo">
						编辑资料
					</view>
					<view class="change" v-else @click="toLogin">
						去登陆
					</view>
				</view>
				<view class="name-box" v-if="userinfo">
					<view class="name">
						{{userinfo.nickname}}
					</view>
					<view class="douyinId">
						抖音号:{{userinfo.id}}
					</view>
				</view>
				<view class="name-box" v-else>
					<view class="name">
						未登录
					</view>
					<view class="douyinId">

					</view>
				</view>
				<view class="text-box">
					<view class="introduce">
						{{userinfo.desc===''?'暂无个性签名':userinfo.desc}}
					</view>
					<view class="lable-box">
						<!-- <view class="label">
							清华大学
						</view>
						<view class="label">
							北京
						</view> -->
					</view>
					<view class="number-box">
						<view v-if='userinfo'>
							<!-- <view class="box">
								<text class="number">123</text>
								<text class="number-text">获赞</text>
							</view> -->
							<view class="box" @click="myFollow">
								<text class="number">{{user.followCount}}</text>
								<text class="number-text">关注</text>
							</view>
							<view class="box" @click="fens">
								<text class="number">{{user.fensCount}}</text>
								<text class="number-text">粉丝</text>
							</view>
						</view>
					</view>
				</view>
				<u-tabs bg-color=' #333333' active-color="#F0AD4E" inactive-color="#ffffff" name="cate_name" :list="list"
				 :is-scroll="false" :current="current" @change="change"></u-tabs>

				<!-- <view class="option-box">
					<view class="option" :style="style1" @click="click('作品')">
						作品
					</view>
					<view class="option" :style="style2" @click="click('动态')">
						动态
					</view>
					<view class="option" :style="style3" @click="click('喜欢')">
						喜欢
					</view>
				</view> -->
				<view>
					<view class="personalList">
						<view class="item" v-for="(item,index) in videoList" :key="item.id">
							<image :src="item.cover" mode="" @click="toVideo(item.id)" @longpress="toShowPop(item.id)"></image>
						</view>
					</view>
					<view class="more">
						没有更多了
					</view>
					<view class="ground">

					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const globalData = getApp().globalData;
	export default {
		data() {
			return {
				style1: 'border-bottom:3px solid #F0AD4E;',
				style2: '',
				style3: '',
				user: {},
				userinfo: '',
				list: [{
					cate_name: '作品'
				}, {
					cate_name: '喜欢'
				}],
				current: 0,
				videoList: [],
			}
		},
		onLoad() {
			/* this.getStatistics(); */
		},
		async onShow() {
			globalData.token = await uni.getStorageSync('videoStorage');
			this.getUser()
			if (this.current === 0) {
				this.videoList = []
				this.getuserVideo();
			} else if (this.current === 1) {
				this.videoList = []
				this.getuserlikeVideo()
			}
		},
		methods: {
			toShowPop(id){
				let token = globalData.token
				let _self = this;

				uni.showModal({
					title:'提示',
					content:'是否删除该视频',
					success:(res)=>{
						if(res.confirm){
							_self.$request('/video/destory', {id}, 'POST', {
								token
							}).then(result => {
								console.log(result);
								if(result.statusCode===0){
									if (_self.current === 0) {
										_self.videoList = []
										_self.getuserVideo();
									} else if (_self.current === 1) {
										_self.videoList = []
										_self.getuserlikeVideo()
									}
								}
							})
						}
					}
				})
			},
			toInfo() {
				console.log(1234);
				uni.navigateTo({
					url:'../info/info'
				})
			},
			fens() {
				uni.navigateTo({
					url: '../followMe/followMe'
				})
			},
			myFollow() {
				uni.navigateTo({
					url: '../myfollow/myfollow'
				})
			},
			toVideo(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:globalData.api+'/video/getVideoById',
					data:{
						id
					},
					success(res) {
						console.log(res);
						uni.setStorageSync('list',JSON.stringify(res.data.data));
						uni.navigateTo({
							url: '/pages/video/video',
						})
					}
					
				})
			},
			change(index) {
				this.current = index;
				console.log(this.current);
				if (this.current === 0) {
					this.videoList = []
					this.getuserVideo();
				} else if (this.current === 1) {
					this.videoList = []
					this.getuserlikeVideo()
				}
			},
			getuserVideo() {
				let token = globalData.token
				let _self = this;
				this.$request('/user/getuservideo', '', 'GET', {
					token
				}).then(result => {
					_self.videoList = result.data.video;
				})
			},
			getuserlikeVideo(){
				let token = globalData.token
				let _self = this;
				_self.videoList=[]
				this.$request('/user/getUserLikeVideo', '', 'GET', {
					token
				}).then(result => {
					let list=[];
					let tempData=result.data;
					console.log(result.data);
					tempData.forEach(item=>{
						list.push(item.data)
					})
					_self.videoList = list;
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getUser() {
				let token = globalData.token
				let _self = this;
				this.$request('/user/getuser', '', 'GET', {
					token
				}).then(result => {
					console.log(result);
					_self.user = result.data;
					_self.userinfo = result.data.user;
					_self.videoList = result.data.video;
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	.personalInfo {
		width: 100%;
		background: #333333;
		position: relative;
	}

	.backgrount-img-box {
		width: 100%;
		padding: 0 1px;
		z-index: 19;
	}

	.backgrount-img {
		width: 100%;
		height: 180px;

	}

	.top {
		width: 100%;
		position: absolute;
		top: 140px;
		left: 0;
		z-index: 100;
		background: #000000;
		height: 60px;

	}

	.personal-img-box {
		margin: -25px 0 0 30px;

	}

	.personal-img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		z-index: 20;
		border: 3.5px solid #000000;
	}

	.change {
		position: absolute;
		top: 15px;
		right: 25px;
		width: 55%;
		height: 35px;
		line-height: 35px;
		font-size: 16px;
		text-align: center;
		background: #333333;
		border-radius: 2px;
		color: #ffffff;
	}

	.name-box {
		padding: 0 25px;
		color: #EEEEEE;
		z-index: 20;
		margin-top: 20px;
	}

	.name {
		height: 50px;
		line-height: 50px;
		font-size: 26px;

	}

	.douyinId {
		height: 25px;
		line-height: 25px;
		font-size: 14px;
	}

	.text-box {
		z-index: 20;
		padding: 0 25px;
		margin-top: 8px;
		border-top: 1px solid #222222;

	}

	.introduce {
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		color: #EEEEEE;
	}

	.lable-box {
		width: 100%;
		height: 25px;
		margin-top: 5px;
		line-height: 25px;
		color: #EEEEEE;
	}

	.label {
		height: 20px;
		padding: 0 5px;
		line-height: 20px;
		font-size: 11.5px;
		background: #333333;
		color: #999999;
		float: left;
		border-radius: 1.5px;
		margin-right: 10px;
	}

	.number-box {
		width: 100%;
		height: 50px;
		line-height: 50px;

	}

	.box {
		height: 40px;
		line-height: 40px;
		float: left;
		margin-right: 5px;
	}

	.number {
		color: #FFFFFF;
		font-size: 15px;
	}

	.number-text {
		color: #999999;
		font-size: 13px;
	}

	.add-box {
		margin: 0 6%;
		height: 40px;
		line-height: 40px;
		background: #333333;
		border-radius: 3px;
		text-align: center;
		color: #FFFFFF;
	}

	.add {
		padding-left: 5px;
		font-size: 13px;
	}

	.option-box {
		width: 100%;
		height: 50px;
		line-height: 50px;

	}

	.option {
		width: 33%;
		height: 50px;
		line-height: 50px;
		color: #999999;
		float: left;
		text-align: center;
	}

	.ground {
		width: 100%;
		height: 50px;
		background: #000000;
	}

	.personalList {
		width: 100%;
		overflow: hidden;
		background: #000000;
		padding: 0 0.5%;

	}

	.item {
		width: 245rpx;

		height: 120px;
		float: left;
		position: relative;

	}

	image {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.more {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12x;
		color: #999999;
		background: #000000;
	}
</style>
