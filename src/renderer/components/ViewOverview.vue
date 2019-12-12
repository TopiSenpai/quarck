<template>
	<div class="view-overview">
		<div class="view-overview-sidebar">
			<div class="view-overview-sidebar-list">
				<router-link to="/"><ui-icon icon="home" />Home</router-link>
				<router-link to="/users"><ui-icon icon="group" />Users</router-link>
				<router-link to="/games"><ui-icon icon="sports_esports" />Games</router-link>
			</div>
			<ui-chat-list :chats="getChats" />
			<div class="view-overview-sidebar-info">
				<ui-icon-button type="secondary" >
					<img width="36px" src="../assets/avatar.png"/>
				</ui-icon-button>
				<span class="view-overview-sidebar-info-username" @click="clickUsername">
					{{ username }}
					<ui-tooltip position="top">Click to copy username</ui-tooltip>
				</span>
				<router-link to="/settings"><ui-icon-button type="secondary" color="white" icon="settings_application" tooltip="Settings" /></router-link>
			</div>
		</div>
		<router-view class="view-overview-view"></router-view>
	</div>
</template>
<script>
import { clipboard } from 'electron'
import UiChatList from './ui/UiChatList'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-overview',

	components: {
		UiChatList
	},

	computed: {
		...mapGetters([
			'getChats',
			'getUsername'
		]),
		username(){
			return this.getUsername
		}
	},

	methods: {
		clickUsername(){
			clipboard.writeText(this.username)
		}
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

.view-overview {
	display: flex;
	&-sidebar {
		display: flex;
		flex-direction: column;
		background-color: @list;
		border-top-left-radius: 16px;
		&-list {
			display: flex;
			flex-direction: column;
			padding: 8px;
			flex-shrink: 0;
			& > * {
				padding: 8px;
				color: white;
				text-decoration: none;
				&:hover{
					background-color: @list-hover;
					border-radius: 8px;
				}
			}
		}
		&-info {
			display: flex;
			align-items: center;
			flex-shrink: 0;
			padding: 8px;
			background-color: @info;
			a {
				text-decoration: none;
			}
			&-username {
				user-select: text;
				cursor: text;
			}
		}
	}
	&-view {
		flex-grow: 1;
		background-color: @primary;
	}
}
</style>