<template>
	<div class="view-chats">
		<ui-chat-list :chats="getChats" />
		<router-view></router-view>
		<!-- <ui-chat-layout v-for="chat in chats" :key="chat.id" :chat="chat" class="view-public-chat-layout" /> -->
	</div>
</template>
<script>
import UiChatList from './ui/UiChatList'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-public-chat',

	components: {
		UiChatList,
	},

	computed: {
		...mapGetters([
			'getChats'
		])
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

.view-chats {
	display: flex;
}

</style>