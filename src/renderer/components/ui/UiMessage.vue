<template>
	<div class="ui-message">
	<!--<img class="ui-message-icon" :src="message.icon" /> -->
		<div class="ui-message-content">
			<div class="ui-message-header">
				<span class="ui-message-header-username">{{ message.username }}</span>
				<span class="ui-message-header-time">{{ getTime }}</span>
			</div>
			<div class="ui-message-message">
				{{ message.text }}
			</div>
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

	computed: {
		getTime () {
			let date = new Date()
			return `${date.getHours() + 1}:${date.getMinutes() + 1}`
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-message {
	display: flex;
	padding: 4px;
	&-icon {
		height: 40px;
	}
	&-content {
		margin-left: 8px;
	}
	&-header {
		&-time {
			color: #7c7c7c;
			font-size: 70%;
		}
	}
}
</style>