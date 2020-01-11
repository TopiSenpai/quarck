<template>
	<div class="view-chat">
		<div class="view-chat-header">
			<div class="view-chat-header-text">
				<ui-icon icon="chat" />
				<span>{{ chat.name }}</span>
			</div>
			<ui-icon-button type="secondary" icon="supervisor_account" color="white" @click="eventToggleUserList" />
		</div>
		<div class="view-chat-body">
			<div class="view-chat-body-message">
				<ui-message-list class="view-chat-body-message-list" :messages="chat.messages" />
				<ui-messagebox placeholder="Type Message..." @message="eventMessage" />
			</div>
			<ui-user-list v-if="getShowUserlist" :users="chat.users" />
		</div>
	</div>
</template>
<script>
import UiMessageList from './ui/UiMessageList'
import UiUserList from './ui/UiUserList'
import UiMessagebox from './ui/UiMessagebox'
import network from '../../main/network'
import store from '../../stores/store'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-chat',

	components: {
		UiMessageList,
		UiUserList,
		UiMessagebox,
	},

	computed: {
		...mapGetters([
			'getChat',
			'getShowUserlist'
		]),
		chat(){
			return this.getChat(this.$route.params.id)
		}
	},

	methods: {
		eventMessage (message) {
			network.sendMessage(message, this.chat.id)
		},
		eventToggleUserList() {
			store.dispatch('showUserlist', !this.getShowUserlist)
		}
		
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

/deep/ .ui-icon-button {
	cursor: pointer;
}

.view-chat {
	display: flex;
	flex-direction: column;
	&-header{
		display: flex;
		flex-shrink: 0;
		align-items: center;
		padding: 8px;
		justify-content: space-between;
		border-bottom: 1px solid #2c2c2c;
		&-text {
			display: flex;
			align-items: center;
			&-channel {
				font-size: 200%;
				color: rgb(138, 138, 138);
			}
			& * {
				margin-right: 8px;
			}
		}
	}
	&-body {
		display: flex;
		flex-grow: 1;
		&-message {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			&-list {
				flex-grow: 1;
			}
		}
	}
}

</style>