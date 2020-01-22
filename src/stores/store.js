import Vue from "vue";
import Vuex from "vuex";
import Store from "electron-store";
import { createPersistedState, createSharedMutations } from "vuex-electron";

Vue.use(Vuex);

const config = new Store();

export default new Vuex.Store({
	plugins: [
		createPersistedState(),
		createSharedMutations(),
	],
	state: {
		users: [],
		friends: [],
		blockedUsers: [],
		chats: [
			{
				name: "public",
				id: "public",
				messages: [],
				users: [],
			},
		],
		servers: [],
		settings: {
			username: "",
			status: "",
			privateKey: "",
			publicKey: "",
			showUserlist: true,
			usersFilter: "all",
		},
	},
	actions: {
		/* Chat Stuff */
		addChatMessage(store, message) {
			store.commit("addChatMessage", message);
		},
		addChat(store, chat) {
			store.commit("addChat", chat);
		},
		removeChat(store, chat) {
			store.commit("removeChat", chat);
		},
		clearChat(store, chat) {
			store.commit("clearChat", chat);
		},

		/* User Stuff */
		user(store, user) {
			store.commit("user", user);
		},
		updateUser(store, user) {
			store.commit("updateUser", user);
		},
		clearUsers(store) {
			store.commit("clearUsers");
		},
		addFriend(store, user) {
			store.commit("addFriend", user);
		},
		removeFriend(store, user) {
			store.commit("removeFriend", user);
		},

		/* Own Settings */
		username(store, username) {
			store.commit("username", username);
		},
		status(store, status) {
			store.commit("status", status);
		},
		privateKey(store, privateKey) {
			store.commit("privateKey", privateKey);
		},
		publicKey(store, publicKey) {
			store.commit("publicKey", publicKey);
		},

		/* Settings Stuff */
		settings(store, settings) {
			store.commit("settings", settings);
		},
		showUserlist(store, show) {
			store.commit("showUserlist", show);
		},
		setUsersFilter(store, show) {
			store.commit("setUsersFilter", show);
		},

		/* Server Stuff */
		server(store, server) {
			store.commit("server", server);
		},
	},
	mutations: {
		/* Chat Stuff */
		addChatMessage(state, message) {
			state.chats.find(c => c.id === message.chat).messages.push(message);
		},
		addChat(state, chat) {
			state.chats.push(chat);
		},
		removeChat(state, chat) {
			state.chats.splice(state.chats.findIndex(c => c.id === chat), 1);
		},
		clearChat(state, chat) {
			state.chats.find(c => c.id === chat).messages = [];
		},

		/* User Stuff */
		user(state, user) {
			if (user.key !== "") {
				if (state.users.find(u => u.key === user.key) === undefined) {
					state.users.push(user);
				}
			}
		},
		updateUser(state, user) {
			let u = state.users.find(u => u.key === user.key);
			if (u !== undefined) {
				Object.entries(u).forEach(([k, v]) => {
					u[k] = v;
				});
			}
		},
		clearUsers(state) {
			state.users = [];
		},
		addFriend(state, user) {
			if (!state.friends.includes(user)) {
				state.friends.push(user);
			}
		},
		removeFriend(state, user) {
			let i = state.friends.findIndex(f => f === user);
			if (i > -1) {
				state.friends.splice(i, 1);
			}
		},

		/* Own Settings */
		username(state, username) {
			state.settings.username = username;
			let u = state.users.find(u => u.key === this.state.publicKey);
			config.set("username", username);
			if (u !== undefined) {
				u.username = username;
			}
		},
		status(state, status) {
			state.settings.status = status;
		},
		privateKey(state, privateKey) {
			state.settings.privateKey = privateKey;
			config.set("private_key", privateKey);
		},
		publicKey(state, publicKey) {
			state.settings.publicKey = publicKey;
			config.set("public_key", publicKey);
		},

		/* Settings Stuff */
		settings(state, settings) {
			Object.entries(settings).forEach(([k, v]) => {
				state.settings[k] = v;
			});
			config.set("public_key", state.settings.publicKey);
			config.set("private_key", state.settings.privateKey);
			config.set("username", state.settings.username);
			let u = state.users.find(u => u.key === state.settings.publicKey);
			if (u !== undefined) {
				u.username = state.settings.username;
			}
		},
		showUserlist(state, show) {
			state.settings.showUserlist = show;
		},
		setUsersFilter(state, show) {
			state.settings.usersFilter = show;
		},

		/* Server Stuff */
		server(state, server) {
			state.servers.push(server);
		},
	},
	getters: {
		getChats: state => state.chats,
		getChat: state => id => state.chats.find(c => c.id == id),

		getUser: state => key => state.users.find(u => u.key === key),
		getUsername: state => state.settings.username,
		getUserByAddress: state => address => state.users.find(u => u.address === address),
		getStatus: state => state.settings.status,
		getPrivateKey: state => state.settings.privateKey,
		getPublicKey: state => state.settings.publicKey,

		getSettings: state => state.settings,

		getUsers: state => state.users,
		getFriends: state => state.friends.map(f => state.users.find(u => u.key === f)),
		isFriend: state => key => state.friends.includes(key),
		isOnline: state => key => state.friends.find(k => k === key).online,
		getShowUserlist: state => state.settings.showUserlist,
		getUsersFilter: state => state.settings.usersFilter,

		getServers: state => state.servers,
	},
});
