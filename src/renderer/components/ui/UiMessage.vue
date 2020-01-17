<template>
	<div class="ui-message">
		<div class="ui-message-header">
			<span class="ui-message-header-username">{{ user.username }}</span>
			<span class="ui-message-header-time">{{ time }}</span>
		</div>
		<div class="ui-message-text" v-html="messageHtml">

		</div>
	</div>
</template>
<script>
import showdown from "showdown";
import { mapGetters } from "vuex";

const converter = new showdown.Converter();

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
		time () {
			let date = new Date(this.message.time);
			return `${date.getHours()}:${date.getMinutes()}`;
		},
		messageHtml() {
			return converter.makeHtml(this.message.text);
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-message {
	.flexColumn;
	flex-shrink: 0;
	padding: 16px;
	border-radius: 8px;
	&:hover {
		background-color: darken(@primary, 2%);
	}
	&-text {
		margin-left: 8px;
		color: @fc;
		white-space: pre;
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