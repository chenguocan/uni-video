<template>
	<view >
		<!-- 头像 -->
		<view class="avatar info">
			<image :src="form.avatar" style="width: 150rpx;height: 150rpx;" @click="selectAvatar"></image>
			<!-- <u-avatar :src="src"></u-avatar> -->
		</view>

		<!-- 信息 -->
		<u-form :border-bottom="false"  :label-style="{color:'#989ba2'}" :model="form" ref="uForm">
			<u-form-item label="昵称">
				<u-input :customStyle="{color:'#686b74'}" v-model="form.nickname" placeholder="请输入昵称" />
			</u-form-item>
			<u-form-item label="邮箱">
				<u-input :customStyle="{color:'#686b74'}" v-model="form.email" placeholder="请输入邮箱" />
			</u-form-item>
			<u-form-item label="电话">
				<u-input :customStyle="{color:'#686b74'}" v-model="form.phone" placeholder="请输入电话" />
			</u-form-item>
			<u-form-item label="性别">
				<u-input :customStyle="{color:'#686b74'}" v-model="form.gender" placeholder="请输入性别" />
			</u-form-item>
			<u-form-item label="描述">
				<u-input :customStyle="{color:'#686b74'}"  v-model="form.desc" placeholder="请输入描述" />
			</u-form-item>
		</u-form>

		<view class="btn">
			<button @click="logout">退出登录</button>
			<button @click="submit">修改账号</button>
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/mmmm-image-tools/index.js'
	export default {
		data() {
			return {
				form: {
					avatar: '../../static/logo.png'
				},
				token: getApp().globalData.token
			}
		},
		methods: {
			logout() {
				this.$request('/user/logout', '', 'POST', {
					token: this.token
				}).then(result => {
					console.log(result);
					uni.navigateTo({
						url:'../login/login'
					})
				})
			},
			submit() {
				this.$request('/user/updateInfo', this.form, 'POST', {
					token: this.token
				}).then(result => {
					if(result.data.statusCode===0){
						uni.showToast({
							title:'修改成功',
							icon:'none'
						})
					}
				})
			},
			selectAvatar() {
				let _self=this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
				        pathToBase64(res.tempFilePaths[0])
				          .then(base64 => {
				            _self.form.avatar=base64
							let tempBase64=base64.replace(/^data:image\/\w+;base64,/, "")
							_self.$request('/user/editAvatar', {
								avatar:tempBase64
							}, 'POST', {
								token: _self.token
							}).then(result => {
								if(result.data.statusCode===0){
									uni.showToast({
										title:'修改成功',
										icon:'none'
									})
								}
							})
				          })
				          .catch(error => {
				            console.error(error)
				          })
				    }
				});
			},
			getInfo() {
				this.$request('/user/getUserInfo', '', 'POST', {
					token: this.token
				}).then(result => {
					console.log(result);
					this.form = result.data
				})
			}
		},
		onLoad() {
			this.getInfo()
			/* this.uploadFile() */
		}
	}
</script>

<style  lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #161824;
	}

	.avatar {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
		margin: 300upx auto 100upx;
		overflow: hidden;
		border: 1px dashed #c9ccd3;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.u-form {
		padding: 0 40upx;

	}

	.btn {
		display: flex;
		justify-content: space-around;
		margin-top: 50upx;

		button {
			color: #fff;
			background: #000;
			height: 80upx;
			line-height: 80upx;
			border: 1px solid #fff;
		}
	}
</style>
