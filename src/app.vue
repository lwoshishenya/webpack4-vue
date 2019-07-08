<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import wechat from './assets/js/wechat.js';
	export default {
		name: "",
		data() {
			return {

			}
		},
		props: [],
		created() { //实例被创建之后执行代码

		},
		beforeMount() { //模板编译/挂载之前

		},
		mounted() { //挂载结束状态
			wechat.Handler();
		},
		components: { //模板

		},
		computed: { //监控自己定义的变量,计算属性

		},
		watch: { //监控vue实例的变化

		},
		methods: { //事件

		}
	}
</script>

<style scoped>

</style>