<template>
	<view style="height: 100%;">
		<view class="title">
			注册
		</view>
		<view class="register">
			<u-form label-width="150" ref="uForm" :model="form">
				<u-form-item label="用户名" prop="username">
					<u-input v-model="form.username" placeholder="填写用户名" />
				</u-form-item>
				<u-form-item label="昵称" prop="nickname">
					<u-input v-model="form.nickname" placeholder="填写昵称"  />
				</u-form-item>
				<u-form-item label="性别" prop="gender">
					<u-input v-model="form.gender" placeholder="选择性别"  />
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="form.password" placeholder="填写密码"  />
				</u-form-item>
				<u-form-item label="确认密码" prop="repassword">
					<u-input v-model="form.repassword" placeholder="填写确认密码"  />
				</u-form-item>
				<u-form-item label="电话号码" prop="phone">
					<u-input v-model="form.phone" placeholder="填写电话号码"  />
				</u-form-item>
			</u-form>
			<u-button shape="circle" type="primary" style="margin-top: 20rpx;" @click="register">注册</u-button>
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
					nickname: '',
					gender: '',
					password: '',
					repassword: '',
					phone: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请填写用户名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					nickname: [{
						required: true,
						message: '请填写昵称',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请填写密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					repassword: [{
						required: true,
						message: '请填写确认密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					phone: [{
						required: true,
						message: '请填写电话号码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['blur'],
					}]
				}

			};
		},
		methods: {
			register(){
				let _self=this;
				uni.request({
					method:'POST',
					url:globalData.api+'/user/register',
					data:_self.form,
					success:function(result){
						console.log(result);
						if(result.data.statusCode===0){
							uni.showToast({
								title:result.data.msg,
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../login/login'
								})
							},500)
						}else{
							uni.showToast({
								title:result.data.msg,
								icon:'none'
							})
						}
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
