<template>
	<div class="view-server">
		<ui-chat-list class="view-server-chat-list" :chats="server.chats" @select-chat="eventSelectChat" />
	</div>
</template>
<script>
import UiChatList from "./ui/UiChatList";

export default {

	name: "view-server",

	props: {
		server: {
			required: true,
			type: Object,
		},
	},

	components: {
		UiChatList,
	},

	data () {
		return {
			selectedChat: -1,
		};
	},

	computed: {
		getSelectedChat () {
			if(this.selectedChat === -1) {
				return this.server.chats[0];
			}
			return this.server.chats[this.selectedChat];
		},
	},

	methods: {
		eventSelectChat (chat) {
			this.selectedChat = chat;
		},
	},
};
</script>
<style lang="less" scoped>
@import '../colors.less';

.view-server {
	display: flex;
	flex-grow: 1;
}

</style>