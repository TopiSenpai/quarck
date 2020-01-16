<template>
	<div class="view-users">
		<div class="view-users-header">
			<div class="view-users-header-text">
				<ui-icon icon="people" />
				<span>Users</span>
				<ui-shuffle :value="usersFilter" :options="['all', 'online', 'friends']" @change="eventFilterChange" />
			</div>
			<div class="view-users-header-icons">
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
						<ui-icon-button v-if="isFriend(user.key)" type="secondary" icon="close" tooltip="Remove Friend" size="mini" tooltipPosition="top" @click="removeFriend(user.key)" />
						<ui-icon-button v-else type="secondary" icon="person_add" tooltip="Add Friend" size="mini" tooltipPosition="top" @click="addFriend(user.key)" />
						<ui-icon-button type="secondary" icon="block" tooltip="Block User" size="mini" tooltipPosition="top" @click="blockUser(user.key)" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import UiShuffle from "./ui/UiShuffle";
import { mapGetters } from "vuex";
import network from "../../main/network";

export default {

	name: "view-users",

	components: {
		UiShuffle,
	},

	computed: {
		...mapGetters([
			"getUsers",
			"isFriend",
			"isOnline",
			"getUsersFilter",
		]),
		users(){
			if(this.usersFilter === "friends") {
				return this.getUsers.filter(u => this.isFriend(u.key));
			}
			if(this.usersFilter === "online") {
				return this.getUsers.filter(u => this.isOnline(u.key));
			}
			return this.getUsers;
		},
		usersFilter(){
			return this.getUsersFilter;
		},
	},

	methods: {
		eventFilterChange(value) {
			this.$store.dispatch("setUsersFilter", value);
		},
		eventRefreshUsers() {
			this.$store.dispatch("clearUsers");
			network.discoverClients();
		},
		createChat(key) {

		},
		removeFriend(key) {
			this.$store.dispatch("removeFriend", key);
		},
		addFriend(key) {
			this.$store.dispatch("addFriend", key);
		},
		blockUser(key) {
			this.$store.dispatch("blockUser", key);
		},
	},
};
</script>
<style lang="less" scoped>
@import '../style/style.less';

.view-users {
	.flexColumn;
	&-header{
		.flexRow;
		flex-shrink: 0;
		align-items: center;
		padding: 8px;
		justify-content: space-between;
		border-bottom: 1px solid darken(@primary, 5%);
		&-text {
			.flexRow;
			align-items: center;
			& * {
				margin-right: 8px;
			}
		}
		&-icons {
			.flexRow;
			justify-content: flex-end;
			align-items: center;
		}
	}
	&-body {
		.flexRow;
		flex-grow: 1;
		&-userlist {
			.flexColumn;
			flex-grow: 1;
			&-header {
				border-bottom: 1px solid darken(@primary, 5%);
				& *:nth-last-child(n+2) {
					border-right: 1px solid darken(@primary, 5%);
				}
			}
			&-entry:hover {
				background-color: lighten(@primary, 5%);
			}
			&-entry,
			&-header {
				.flexRow;
				align-items: center;
				padding: 8px;
				& .more {
					display: none;
					justify-content: flex-end;
					flex-grow: 1;
				}
				&:hover .more {
					.flexRow;
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
					.flexRow;
					align-items: center;
					width: 200px;
				}
				& .status {
					.flexRow;
					align-items: center;
					width: 200px;
				}
				& .address {
					.flexRow;
					align-items: center;
				}
			}
		}
	}
}

</style>