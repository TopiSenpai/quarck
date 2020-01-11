<template>
	<div class="ui-message">
		<div class="ui-message-header">
			<span class="ui-message-header-username">{{ user.username }}</span>
			<span class="ui-message-header-time">{{ getTime }}</span>
		</div>
		<div class="ui-message-text">
			{{ message.text }}
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	name: "ui-message",

	props: {
		message: {
			required: true,
			type: Object,
		},
	},

	computed: {
		...mapGetters([
			"getUser",
		]),
		user(){
			return this.getUser(this.message.key);
		},
		getTime () {
			let date = new Date(this.message.time);
			return `${date.getHours()}:${date.getMinutes()}`;
		},
	},
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
		color: @fc;
		word-break: break-all;
	}
	&-header {
		&-username {
			font-weight: bold;
		}
		&-time {
			color: @fc-dark;
			font-size: 70%;
		}
	}
}
</style>