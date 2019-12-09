<template>
	<div class="view-chats">
		<ui-chat-list :chats="getChats" />
		<router-view class="view-chats-chat"></router-view>
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
	&-chat {
		background-color: @primary;
	}
}

</style>