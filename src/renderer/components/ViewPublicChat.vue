<template>
	<div class="view-public-chat">
		<!-- <div class="view-public-chat-list">
			<ui-chat v-for="chat in chats" :key="chat.id" :chat="chat" />
		</div> -->
		<div class="view-public-chat-chat">
			<ui-message-list :messages="getMessages" />

	<!--	<ui-chat-layout v-for="chat in chats" :key="chat.id" :chat="chat" class="view-public-chat-layout" @message="eventMessage" @toggle-users="eventToggleUsers"/> -->
			<ui-messagebox class="view-public-chat-chat-messagebox" placeholder="Message global chat..." @message="eventMessage"/>
		</div>
		<ui-user-list v-if="!hideUsers" :users="getUsers" />
	</div>
</template>
<script>
import UiChat from './ui/UiChat'
import UiChatLayout from './ui/UiChatLayout'
import UiUserList from './ui/UiUserList'
import UiMessageList from './ui/UiMessageList'
import UiMessagebox from './ui/UiMessagebox'
import { UiTextbox, UiIconButton } from 'keen-ui'
import network from '../../main/network'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-public-chat',

	components: {
		UiChat,
		UiChatLayout,
		UiUserList,
		UiMessageList,
		UiMessagebox,
		UiIconButton
	},

	data () {
		return {
			selectedChat: '23423756',
			hideUsers: false
		}
	},

	computed: {
		...mapGetters([
			'getMessages',
			'getUsers'
		])
	},

	methods: {
		eventToggleUsers (value) {
			this.hideUsers = value
		},
		eventMessage (message) {
			network.sendMessage(message)
		}
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

.view-public-chat {
	display: flex;
	&-layout{
		flex: 1 0 auto;
	}
	&-chat{
		display: flex;
		flex-grow: 1;
		flex-direction: column;
	}
	&-list {
		display: flex;
		flex-direction: column;
		width: 200px;
		background-color: @list;
	}
}

</style>