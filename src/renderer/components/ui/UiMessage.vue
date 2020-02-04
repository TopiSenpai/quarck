<template>
	<div class="ui-message">
		<img class="ui-message-avatar" src="../../assets/avatar.png" />
		<div class="ui-message-content">
			<div class="ui-message-content-header">
				<span class="ui-message-content-header-username">
					{{ user.username }}
					<ui-user-popup :user="user" />
				</span>
				<span class="ui-message-content-header-time">{{ time }}</span>
			</div>
			<div class="ui-message-content-text" v-html="messageHtml"></div>
		</div>
	</div>
</template>
<script>
import UiUserPopup from "./UiUserPopup";
//import showdown from "showdown";
import { mapGetters } from "vuex";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

//const converter = new showdown.Converter();
//Prism.plugins.autoloader.languages_path = "../../prism-components";


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

	mounted() {
		Prism.highlightAll();
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
			return this.message.text;
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
	&:hover {
		background-color: darken(@primary, 2%);
	}
	&-avatar {
		width: 40px;
		height: 40px;
	}
	&-content {
		.flexColumn;
		&-text {
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
}
</style>