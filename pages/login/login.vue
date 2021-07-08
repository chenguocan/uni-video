<template>
	<view style="height: 100%;">
		<view class="title">
			登录
		</view>
		<view class="register">
			<u-form label-width="150" ref="uForm" :model="form">
				<u-form-item label="用户名" prop="username">
					<u-input v-model="form.username" placeholder="填写用户名" />
				</u-form-item>	
				<u-form-item label="密码" prop="password">
					<u-input type="password" v-model="form.password" placeholder="填写密码"  />
				</u-form-item>
			</u-form>
			<u-button shape="circle" type="primary" style="margin-top: 20rpx;" @click="login">登录</u-button>
			<u-button shape="circle" style="margin-top: 20rpx;" @click="reg">注册</u-button>
		</view>
	</view>
</template>

<script>
	const globalData=getApp().globalData;
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',

				},
				rules: {
					username: [{
						required: true,
						message: '请填写用户名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请填写密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}]
				}

			};
		},
		methods: {
			reg(){
				uni.navigateTo({
					url:'../register/register'
				})
			},
			login(){
				console.log('点击');
				let _self=this;
				uni.request({
					method:'POST',
					url:globalData.api+'/user/login',
					data:_self.form,
					success:function(result){
						console.log(result);
						if(result.data.statusCode===0){
							uni.setStorageSync('videoStorage',result.data.data.token);
							uni.setStorageSync('user_id',result.data.data.id);
							uni.showToast({
								title:result.data.data.msg,
								icon:'none'
							})
							setTimeout(function(){
								uni.switchTab({
									url:'../wo/wo',
								})
							},500)
						}else{
							uni.showToast({
								title:result.data.data,
								icon:'none'
							})
						}
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}

	};
</script>
<style>
	page {
		height: 100%;
		overflow: hidden;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 250rpx;
		font-weight: 700;
		font-size: 60rpx;
	}

	.register {
		height: 100%;
		padding: 40rpx;
	}
</style>
