<template>
	<div class="view-public-chat">
		<div class="view-public-chat-list">
			<ui-chat v-for="chat in chats" :key="chat.id" :chat="chat" />
		</div>
		<ui-chat-layout class="view-public-chat-layout" title="Public Chat" :messages="messages" :users="users" />
	</div>
</template>
<script>
import UiChat from './ui/UiChat'
import UiChatLayout from './ui/UiChatLayout'
import { UiTextbox, UiIconButton } from 'keen-ui'

export default {
	
	name: 'view-public-chat',

	components: {
		UiChat,
		UiChatLayout,
		UiTextbox,
		UiIconButton
	},

	data () {
		return {
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
			],
			users: [

			],
			chats: [
			
			]
		}
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

.view-public-chat {
	display: flex;
	flex-direction: column;
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