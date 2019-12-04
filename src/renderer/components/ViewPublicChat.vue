<template>
	<div class="view-public-chat">
		<div class="view-public-chat-list">
			<ui-chat v-for="chat in chats" :key="chat.id" :chat="chat" />
		</div>
		<ui-chat-layout v-for="chat in chats" :key="chat.id" :chat="chat" class="view-public-chat-layout" @message="eventMessage" @toggle-users="eventToggleUsers"/>
		<ui-user-list v-if="!hideUsers" :users="users" />
	</div>
</template>
<script>
import UiChat from './ui/UiChat'
import UiChatLayout from './ui/UiChatLayout'
import UiUserList from './ui/UiUserList'
import { UiTextbox, UiIconButton } from 'keen-ui'
import network from '../../main/network'

export default {
	
	name: 'view-public-chat',

	components: {
		UiChat,
		UiChatLayout,
		UiUserList,
		UiTextbox,
		UiIconButton
	},

	data () {
		return {
			messages: network.data,
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

	methods: {
		eventToggleUsers (value) {
			this.hideUsers = value
		},
		eventMessage (message) {
			
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