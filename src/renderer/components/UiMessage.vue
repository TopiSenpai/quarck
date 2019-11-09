<template>
	<div class="ui-message">
		<img class="ui-message-icon" :src="message.icon" />
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
			let date = new Date(message.time)
			return `${date.getHours() + 1}.${date.getMinutes() + 1}`
		}
	}
};
</script>

<style lang="less" scoped>
.ui-message {
	display: flex;
	flex-direction: column;
	width: 100px;
	background-color: #262626;
}
</style>