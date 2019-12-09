<template>
	<div class="ui-message">
		<div class="ui-message-header">
			<span class="ui-message-header-username">{{ message.username }}</span>
			<span class="ui-message-header-time">{{ getTime }}</span>
		</div>
		<div class="ui-message-text">
			{{ message.text }}
		</div>
	</div>
</template>

<script>
export default {
	name: "ui-message",

	props: {
		message: {
			required: true,
			type: Object
		}
	},

	mounted(){
		console.log('message', this.message)
	},

	computed: {
		getTime () {
			let date = new Date(this.message.time)
			return `${date.getHours()}:${date.getMinutes()}`
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-message {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	padding: 16px;
	&-text {
		color: white;
	}
	&-header {
		&-username {
			font-weight: bold;
		}
		&-time {
			color: #7c7c7c;
			font-size: 70%;
		}
	}
}
</style>