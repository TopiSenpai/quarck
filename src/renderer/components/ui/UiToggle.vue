<template>
	<div class="ui-toggle">
		<ui-switch v-model="model" v-bind="$attrs" @change="eventChange" />
	</div>
</template>

<script>
export default {

	name: "ui-toggle",

	props: {
		value: {
			required: true,
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			model: this.value,
		};
	},

	methods: {
		eventChange(value){
			this.$emit("input", value);
		},
	},
};
</script>