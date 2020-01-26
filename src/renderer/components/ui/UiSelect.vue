<template>
	<div class="ui-select">
		<div class="ui-select-selected">
			<div class="ui-select-selected-entry" v-for="v in value" :key="v[valueProp]" @click="toggleSelect(v)">
				<span>{{ v[labelProp] }}</span>
				<ui-icon icon="close" />
			</div>
			<input type="text" v-model="search" placeholder="type to search..." />
		</div>
		<div class="ui-select-list" v-if="filteredOptions.length > 0">
			<div class="ui-select-list-entry" :class="{ selected: isSelected(option) }" v-for="option in filteredOptions" :key="option[valueProp]" @click="toggleSelect(option)">
				<img class="ui-select-list-entry-icon" src="../../assets/avatar.png"/>
				<span>{{ option[labelProp] }}</span>
			</div>
		</div>
		<div class="ui-select-list" v-else>
			<center>No entries to display...</center>
		</div>
	</div>
</template>
<script>

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
			let str = this.search.trim().toLowerCase();
			let options = this.options.filter(o => !this.isSelected(o));
			if(str !== "") {
				return options.filter(o => o[this.labelProp].toLowerCase().includes(str));
			}
			return options;
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
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
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
			.flexRow;
			justify-content: space-between;
			align-items: center;
			.ui-green;
			border-radius: 4px;
			padding: 4px;
			margin: 2px;
			cursor: pointer;
			/deep/ .ui-icon {
				font-size: 12px;
				color: #202020;
				font-weight: 600;
			}
			&:hover {
				.ui-green-dark;
			}
		}
	}
	&-list {
		.flexColumn;
		flex-grow: 1;
		max-height: 150px;
		overflow-y: auto;
		border: 1px solid darken(@primary, 5%);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		&-entry {
			.flexRow;
			align-items: center;
			justify-content: flex-start;
			flex-shrink: 0;
			padding: 4px;
			margin-top: 2px;
			border-radius: 4px;
			cursor: pointer;
			&:first-child {
				margin-top: 0;
			}
			&-icon {
				width: 30px;
				height: 30px;
			}
			&:hover {
				background-color: darken(@primary, 5%);
			}
			&.selected {
				.ui-primary;
				&:hover {
					.ui-primary-dark;
				}
			}
		}
	}
}

</style>