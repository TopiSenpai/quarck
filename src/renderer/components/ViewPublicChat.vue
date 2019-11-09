<template>
	<div class="view-public-chat">
		<div class="view-public-chat-header">
			<span>Public Network</span>
			<span>Search</span>
			</div>
		<div class="view-public-chat-body">
			<div class="view-public-chat-body-container">
				<div class="view-public-chat-body-container-messages">
					<ui-message v-for="message in messages" :key="message.id" :message="message" />
				</div>
				<div class="view-public-chat-body-container-input">
					<ui-textbox />
				</div>
			</div>
			<div class="view-public-chat-body-user-list">
				
			</div>
		</div>
	</div>
</template>
<script>
import UiMessage from './UiMessage'
import { UiTextbox } from 'keen-ui'

export default {
	
	name: 'view-public-chat',

	components: {
		UiMessage
	},

	data () {
		return {
			messages: [
				{
					username: '',
					icon: '',
					text: '',
					timespamp: '',
					isRead: true
				}
			]
		}
	}
}
</script>
<style lang="less" scoped>

.view-public-chat {
	display: flex;
	flex-direction: column;
	&-header{
		display: flex;
		padding: 4px;
		width: 100%;
		border-bottom: 1px solid #272727;
	}
	&-body {
		flex: 1 1 auto;
		display: flex;
		&-container {
			display: flex;
			flex-direction: column;
			flex: 1 0 auto;
			&-messages {
				display: flex;
				flex-direction: column;
				flex: 1 0 auto;
				background-color: yellow;
			}
			&-input {
				display: flex;
				height: 100px;
				background-color: green;
			}
		}
		&-user-list {
			display: flex;
			flex-direction: column;
			width: 100px;
			background-color: red;
		}
	}
}

</style>