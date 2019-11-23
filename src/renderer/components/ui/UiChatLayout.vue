<template>
	<div class="ui-chat-layout">
		<div class="ui-chat-layout-header">
			<span>{{ chat.name }}</span>
			<ui-icon-button type="secondary" icon="supervisor_account" color="white" @click="hideUsers = !hideUsers" />
		</div>
		<div class="ui-chat-layout-body">
			<ui-message-list class="ui-chat-layout-body-message-list" :messages="chat.messages" />
			<ui-messagebox class="ui-chat-layout-body-message-box" placeholder="Type Message..."/>
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

	components: {
		UiMessageList,
		UiMessagebox,
		UiIconButton
	}
}
</script>
<style lang="less" scoped>
@import '../../colors.less';

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
	}
	&-body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		&-message {
			&-list {
				flex-grow: 1;
			}
			&-box {
				height: 100px;
			}
		}
	}
}

</style>