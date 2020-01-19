<template>
	<div class="ui-select">
		<div class="ui-select-selected">
			{{ search }}
			<div class="ui-select-selected-entry" v-for="v in value" :key="v[valueProp]" @click="toggleSelect(v)">
				<span>{{ v[labelProp] }}</span>
			</div>
			<input type="text" v-model="search" placeholder="type to search..." />
		</div>
		<div class="ui-select-list">
			<div class="ui-select-list-entry" v-for="option in filteredOptions" :key="option[valueProp]" @click="toggleSelect(option)">
				<span>{{ option[labelProp] }}</span>
				<ui-checkbox :value="isSelected(option)" @input="toggleSelect(option)" />
			</div>
		</div>
	</div>
</template>
<script>
/*
{
				"address": "192.168.178.77",
				"image": "blaaa",
				"key": "gbjgj",
				"status": "koten",
				"username": "Hans"
			},
			{
				"address": "192.168.178.76",
				"image": "blaaa",
				"key": "gjbgjng",
				"status": "koten",
				"username": "Franz"
			},
			{
				"address": "192.168.178.45",
				"image": "blaaa",
				"key": "rdfbhftgbz",
				"status": "koten",
				"username": "Kanz"
			},
			{
				"address": "192.168.178.35",
				"image": "blaaa",
				"key": "345609ef hnuz",
				"status": "koten",
				"username": "Platz"
			},
			{
				"address": "192.168.178.56",
				"image": "blaaa",
				"key": "6dNdgEbwLVx40hoWsFpPOCJOPq90OuazwLL4ngOq010f9HU2a567xnjG7TFxlI",
				"status": "koten",
				"username": "Topi"
			}
*/
export default {

	name: "ui-select",

	props: {
		value: {
			required: false,
			type: Array,
		},
		options: {
			required: true,
			type: Array,
		},
		valueProp: {
			required: false,
			type: String,
			default: "value",
		},
		labelProp: {
			required: false,
			type: String,
			default: "label",
		},
	},

	data() {
		return {
			search: "",
		};
	},

	computed: {
		filteredOptions() {
			return this.options.filter(o => this.search === "" ? true : o[this.labelProp].toLowerCase().includes(this.search.toLowerCase()));
		},
	},

	methods: {
		isSelected(option) {
			return this.value.includes(option);
		},
		toggleSelect(option) {
			let i = this.value.indexOf(option);
			if(i > -1) {
				this.value.splice(i, 1);
			}
			else {
				this.value.push(option);
			}
			this.$emit("change", option);
		},
	},
};
</script>
<style lang="less" scoped>
@import '../../style/style.less';

.ui-select {
	.flexColumn;
	align-items: stretch;
	&-selected {
		.flexRow;
		flex-wrap: wrap;
		flex-grow: 1;
		background-color: @secondary;
		min-height: 32px;
		border-radius: 4px;
		& input {
			background-color: transparent;
			border: 0;
			border-radius: 4px;
			outline: 0;
			height: 28px;
			padding: 4px;
			margin: 2px;
			align-self: stretch;
			.fc;
		}
		&-entry {
			.ui-green;
			border-radius: 4px;
			padding: 4px;
			margin: 2px;
			cursor: pointer;
			& span::after {
				content: "x";
				.fc-dark;
				margin-left: 4px;
			}
			&:hover {
				.ui-green-dark;
			}
		}
	}
	&-list {
		.flexColumn;
		flex-grow: 1;
		max-height: 20vh;
		overflow-y: auto;
		margin-top: 2px;
		&-entry {
			.flexRow;
			align-items: center;
			justify-content: space-between;
			padding: 4px;
			cursor: pointer;
			border-radius: 4px;
			&:hover {
				background-color: darken(@primary, 5%);
			}
		}
	}
}

</style>