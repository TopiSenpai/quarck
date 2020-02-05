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
			<vue-showdown class="ui-message-content-text" :markdown="message.text" />
		</div>
	</div>
</template>
<script>
import UiUserPopup from "./UiUserPopup";
import { mapGetters } from "vuex";

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
		margin-left: 8px;
		&-text {
			color: @fc;
			//white-space: pre;
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