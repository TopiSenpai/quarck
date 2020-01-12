<template>
	<div class="ui-image-picker" @click="clickImagePicker" :style="{ width: width, height: height }">
		<span v-if="!avatar" class="ui-image-picker-placeholder">Choose Avatar</span>
		<div v-else class="ui-image-picker-preview" :style="{ 'background-image': `url(${avatar})` }"></div>
		<input class="ui-image-picker-input" ref="imagePicker" type="file" accept=".gif, .jpg, .png" @change="inputFile">
	</div>
</template>
<script>
export default {

	name: "ui-image-picker",

	props: {
		width: {
			required: false,
			type: [String],
			default: "200px",
		},
		height: {
			required: false,
			type: [String],
			default: "200px",
		},
	},

	data () {
		return {
			avatar: null,
		};
	},

	methods: {
		clickImagePicker() {
			this.$refs.imagePicker.click();
		},
		inputFile() {
			const input = this.$refs.imagePicker;
			const files = input.files;
			if (files && files[0]) {
				const reader = new FileReader;
				reader.onload = e => {
					this.avatar = e.target.result;
				};
				reader.readAsDataURL(files[0]);
				this.$emit("input", files[0]);
			}
		},
	},
};
</script>
<style lang="less" scoped>
@import '../../style/colors.less';

.ui-image-picker {
	cursor: pointer;
	border-radius: 50%;
	background-color: darken(@primary, 5%);
	&:hover {
		background-color: darken(@primary, 7%);
	}
	&-preview {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-size: cover;
		background-position: center center;
	}
	&-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
		font-family: Helvetica;
	}
	&-input {
		display: none;
	}
}
</style>