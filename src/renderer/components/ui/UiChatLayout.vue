<template>
	<div class="ui-chat-layout">
		<div class="ui-chat-layout-header">
			<span class="ui-chat-layout-header-text"><span class="ui-chat-layout-header-text-channel">#</span><span>{{ chat.name }}</span></span>
			<ui-icon-button type="secondary" icon="supervisor_account" color="white" @click="eventToggleUsers" />
		</div>
		<div class="ui-chat-layout-body">
			<ui-message-list class="ui-chat-layout-body-message-list" :messages="chat.messages" />
			<ui-messagebox class="ui-chat-layout-body-message-box" placeholder="Type Message..." @message="eventMessage" />
		</div>
	</div>
</template>
<script>
import UiMessageList from './UiMessageList'
import UiMessagebox from './UiMessagebox'
import { UiIconButton } from 'keen-ui'

export default {
	
	name: 'ui-chat-layout',

    props: {
		chat: {
			required: true,
			type: Object
		}
	},
	
	data() {
		return {
			hideUsers: false
		}
	},

	components: {
		UiMessageList,
		UiMessagebox,
		UiIconButton
	},

	methods: {
		eventMessage (message) {
			this.$emit('message', message)
		},
		eventToggleUsers() {
			this.hideUsers = !this.hideUsers
			this.$emit('toggle-users', this.hideUsers)
		}
		
	}
}
</script>
<style lang="less" scoped>
@import '../../colors.less';

/deep/ .ui-icon-button {
	cursor: pointer;
}

.ui-chat-layout {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	&-header{
		display: flex;
		align-items: center;
		padding: 8px;
		width: 100%;
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
		flex-direction: column;
		flex-grow: 1;
		&-message {
			&-list {
				flex-grow: 1;
			}
		}
	}
}

</style>