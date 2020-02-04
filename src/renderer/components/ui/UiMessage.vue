<template>
	<div class="ui-message">
		<img class="ui-message-avatar" src="../../assets/avatar.png" />
		<div class="ui-message-header">
			<span class="ui-message-header-username">
				{{ user.username }}
				<ui-user-popup :user="user" />
			</span>
			<span class="ui-message-header-time">{{ time }}</span>
		</div>
		<div class="ui-message-text" v-html="messageHtml"></div>
	</div>
</template>
<script>
import UiUserPopup from "./UiUserPopup";
import showdown from "showdown";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
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

	components: {
		UiUserPopup,
	},

	computed: {
		...mapGetters([
			"getUser",
		]),
		user(){
			return this.getUser(this.message.key);
		},
		time() {
			let date = new Date(this.message.time);
			return `${date.getHours()}:${date.getMinutes()}`;
		},
		messageHtml() {
			return converter.makeHtml(highlightjs.highlightAuto(this.message.text).value);
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-message {
	.flexRow;
	flex-shrink: 0;
	padding: 8px;
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
	&-avatar {
		width: 30px;
		height: 30px;
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