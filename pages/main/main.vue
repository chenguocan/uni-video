<template>
	<view>
		<view>hello</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			const subNvue=uni.getSubNVueById("concat");
			subNvue.show();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
