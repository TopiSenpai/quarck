<template>
	<div class="view-chat">
		<div class="view-chat-header">
			<div class="view-chat-header-text">
				<ui-icon icon="chat" />
				<span>{{ chat.name }}</span>
			</div>
			<div>
				<ui-icon-button type="secondary" icon="clear_all" tooltip="Clear Chat" @click="eventClearChat" />
				<ui-icon-button type="secondary" icon="person_add" tooltip="Add User" />
				<ui-icon-button type="secondary" icon="group" tooltip="User List" @click="eventToggleUserList" />
			</div>
		</div>
		<div class="view-chat-body">
			<div class="view-chat-body-chat">
				<ui-message-list :messages="chat.messages" />
				<ui-messagebox placeholder="Type Message..." @message="eventMessage" />
			</div>
			<ui-user-list v-if="getShowUserlist" :users="users" />
		</div>
	</div>
</template>
<script>
import UiMessageList from "./ui/UiMessageList";
import UiUserList from "./ui/UiUserList";
import UiMessagebox from "./ui/UiMessagebox";
import network from "../../main/network";
import store from "../../stores/store";
import { mapGetters } from "vuex";

export default {

	name: "view-chat",

	components: {
		UiMessageList,
		UiUserList,
		UiMessagebox,
	},

	computed: {
		...mapGetters([
			"getChat",
			"getUsers",
			"getShowUserlist",
		]),
		chat() {
			return this.getChat(this.$route.params.id);
		},
		users() {
			if(this.chat.id === "public") {
				return this.getUsers;
			}
			return this.chat.users;
		},
	},

	methods: {
		eventMessage (message) {
			network.sendMessage(message, this.chat.id);
		},
		eventToggleUserList() {
			store.dispatch("showUserlist", !this.getShowUserlist);
		},
		eventClearChat() {
			store.dispatch("clearChat", this.chat.id);
		},
	},
};
</script>
<style lang="less" scoped>
@import '../style/style.less';

.view-chat {
	.flexColumn;
	&-header{
		.flexRow;
		flex-shrink: 0;
		align-items: center;
		padding: 8px;
		justify-content: space-between;
		border-bottom: 1px solid #2c2c2c;
		&-text {
			.flexRow;
			& * {
				margin-right: 8px;
			}
		}
	}
	&-body {
		.flexRow;
		flex-grow: 1;
		&-chat {
			.flexColumn;
			flex-grow: 1;
		}
	}
}

</style>