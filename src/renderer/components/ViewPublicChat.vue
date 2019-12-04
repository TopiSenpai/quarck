<template>
	<div class="view-public-chat">
		<!-- <div class="view-public-chat-list">
			<ui-chat v-for="chat in chats" :key="chat.id" :chat="chat" />
		</div> -->
		<div>
			<ui-message-list :messages="getMessages" />
			{{ messages }}
	<!--	<ui-chat-layout v-for="chat in chats" :key="chat.id" :chat="chat" class="view-public-chat-layout" @message="eventMessage" @toggle-users="eventToggleUsers"/> -->
			<ui-messagebox @message="eventMessage"/>
		</div>
		<ui-user-list v-if="!hideUsers" :users="users" />
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
import ChannelMessagePacket from '../../main/packets/ChannelMessagePacket'

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
			messages: network.messages,
			selectedChat: '23423756',
			users: network.users,
			hideUsers: false,
			chats: [
				{
					id: '23423756',
					name: 'default',
					messages: [
						{
							username: 'Topi',
							icon: require('../assets/avatar.png'),
							text: 'Hello World!',
							timestamp: Date.now()
						},
						{
							username: 'Topi',
							icon: require('../assets/avatar.png'),
							text: 'Hello World!',
							timestamp: Date.now()
						},
						{
							username: 'Topi',
							icon: require('../assets/avatar.png'),
							text: 'Hello World!',
							timestamp: Date.now()
						}
					]
				}
			]
		}
	},

	computed: {
		getMessages () {
			return network.messages
		}
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
	&-list {
		display: flex;
		flex-direction: column;
		width: 200px;
		background-color: @list;
	}
}

</style>