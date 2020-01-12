<template>
	<div class="ui-popup" ref="popup">
		<slot>

		</slot>
	</div>
</template>
<script>
export default {

	name: "ui-popup",

	methods: {
		open(){
			this.$refs.popup.style.display = "block";
			console.log("open");
		},
		close() {
			this.$refs.popup.style.display = "none";
		},
	},

};
</script>
<style lang="less" scoped>
@import '../../style/colors.less';

.ui-popup {
	position: fixed;
	right: 100px;
	bottom: 50px;
	display: none;
	background-color: @info;
}

</style>