<template>
	<div class="view-users">
		<div class="view-users-header">
			<div class="view-users-header-text">
				<ui-icon icon="people" />
				<span>Users</span>
			</div>
			<div>
				<ui-icon-button type="secondary" icon="refresh" tooltip="Refresh Users" @click="eventRefreshUsers" />
			</div>
		</div>
		<div class="view-users-body">
			<div class="view-users-body-userlist">
				<div class="view-users-body-userlist-header">
					<span class="avatar"></span>
					<span class="username">
						Username
					</span>
					<span class="status">
						Status
					</span>
					<span class="address">
						Address
					</span>
				</div>
				<div v-for="user of users" :key="user.key" class="view-users-body-userlist-entry">
					<img class="avatar" src="../assets/avatar.png" height="30px">
					<span class="username">{{ user.username }}</span>
					<span class="status">{{ user.status }}</span>
					<span class="address">{{ user.address }}</span>
					<div class="more">
						<ui-icon-button type="secondary" icon="chat" tooltip="Open Chat" size="mini" tooltipPosition="top" @click="createChat(user.key)" />
						<ui-icon-button type="secondary" icon="person_add" tooltip="Add User" size="mini" tooltipPosition="top" @click="removeUser(user.key)" />
						<ui-icon-button type="secondary" icon="block" tooltip="Block User" size="mini" tooltipPosition="top" @click="addUser(user.key)" />
						<ui-icon-button type="secondary" icon="close" tooltip="Remove User" size="mini" tooltipPosition="top" @click="blockUser(user.key)" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import network from "../../main/network";

export default {

	name: "view-users",

	computed: {
		...mapGetters([
			"getUsers",
		]),
		users(){
			return this.getUsers;
		},
	},

	methods: {
		eventRefreshUsers() {
			this.$store.dispatch("clearUsers");
			network.discoverClients();
		},
		createChat(key) {

		},
		removeUser(key) {

		},
		addUser(key) {

		},
		blockUser(key) {

		},
	},
};
</script>
<style lang="less" scoped>
@import '../style/colors.less';

.view-users {
	display: flex;
	flex-direction: column;
	&-header{
		display: flex;
		flex-shrink: 0;
		align-items: center;
		padding: 8px;
		justify-content: space-between;
		border-bottom: 1px solid darken(@primary, 5%);
		&-text {
			display: flex;
			align-items: center;
			& * {
				margin-right: 8px;
			}
		}
	}
	&-body {
		display: flex;
		flex-grow: 1;
		&-userlist {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			&-header {
				border-bottom: 1px solid darken(@primary, 5%);
				& *:nth-last-child(n+2) {
					border-right: 1px solid darken(@primary, 5%);
				}
			}
			&-entry,
			&-header {
				display: flex;
				align-items: center;
				padding: 8px;
				& .more {
					display: none;
					flex-grow: 1;
					justify-content: flex-end;
				}
				&:hover .more {
					display: flex;
				}
				&:nth-child(n+2) {
					border-bottom: 1px solid lighten(@primary, 5%);
				}
				& *:nth-last-child(n+2) {
					margin-right: 8px;
				}
				& .avatar {
					width: 30px;
				}
				& .username {
					display: flex;
					align-items: center;
					width: 200px;
				}
				& .status {
					display: flex;
					align-items: center;
					width: 200px;
				}
				& .address {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}

</style>