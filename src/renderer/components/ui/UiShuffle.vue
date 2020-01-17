<template>
	<div class="ui-shuffle">
		<ui-button v-for="option in options" :key="option" class="ui-shuffle-button" type="secondary" :color="isActive(option) ? 'primary' : 'default'" @click="eventClick(option)">{{ option }}</ui-button>
	</div>
</template>
<script>
export default {

	name: "ui-shuffle",

	props: {
		value: {
			required: true,
			type: String,
		},
		options: {
			required: true,
			type: Array,
		},
	},

	data() {
		return {
			model: this.value,
		};
	},

	methods: {
		isActive(value) {
			return this.model === value;
		},
		eventClick(value){
			this.model = value;
			this.$emit("change", value);
		},
	},
};
</script>
<style lang="less" scoped>
@import '../../style/style.less';

/deep/ .ui-button--type-secondary.ui-button--color-{
	&default {
		.fc;
		background-color: darken(@primary, 2%)!important;
		border: 1px solid darken(@primary, 2%)!important;
		&:hover {
			background-color: darken(@primary, 5%)!important;
			border: 1px solid darken(@primary, 5%)!important;
		}
	}
	&primary {
		.fc;
		.ui-primary!important;
	}
}
.ui-shuffle {
	.flexRow;
	&-button {
		margin-right: 4px;
	}
}

</style>