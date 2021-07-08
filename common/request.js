const baseUrl='http://121.4.255.166:7001'
const request=(url='',data,type="POST",headers)=>{
	console.log(headers);
	return new Promise((resolve,reject)=>{
		uni.request({
			method:type,
			url:baseUrl+url,
			data:data,
			header:headers,
			dataType:'json'
		}).then((response)=>{
			let [err,res]=response;
			console.log(res);
			if(res.data.statusCode===0){
				resolve(res.data);
			}else{
				if(res.statusCode===400){
					uni.showToast({
						title:'请登录',
						icon:'none'
					})
					setTimeout(function(){
						uni.navigateTo({
							url:'/pages/login/login',
							fail(res) {
								console.log(res)
							}
						})
					},1000)
				}else{
					uni.showToast({
						title:res.data.data,
						icon:'none'
					})
				}
			}
		}).catch((error)=>{
			uni.showToast({
				title:error,
				icon:'none'
			})
			reject(error);
		})
	})
}
export default request