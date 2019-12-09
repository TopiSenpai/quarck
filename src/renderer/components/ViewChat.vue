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
			<ui-list v-if="showUserList" :entries="chat.users" key="name" label="name" title="Users" />
		</div>
	</div>
</template>
<script>
import UiMessageList from './ui/UiMessageList'
import UiUserList from './ui/UiUserList'
import UiList from './ui/UiList'
import UiMessagebox from './ui/UiMessagebox'
import { UiIconButton, UiIcon } from 'keen-ui'
import network from '../../main/network'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-chat',
	
	data() {
		return {
			showUserList: true
		}
	},

	components: {
		UiMessageList,
		UiUserList,
		UiList,
		UiIcon,
		UiMessagebox,
		UiIconButton
	},

	computed: {
		...mapGetters([
			'getChat'
		]),
		chat(){
			return this.getChat(this.$route.params.name)
		}
	},

	methods: {
		eventMessage (message) {
			network.sendMessage(message, this.chat.name)
		},
		eventToggleUserList() {
			this.showUserList = !this.showUserList
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
	flex-grow: 1;
	&-header{
		display: flex;
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