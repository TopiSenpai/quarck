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
		},
		showUserlist: true,
	},
	actions: {
		showUserlist(store, show) {
			store.commit("showUserlist", show);
		},
		chat(store, chat) {
			store.commit("chat", chat);
		},
		server(store, server) {
			store.commit("server", server);
		},
		username(store, username) {
			store.commit("username", username);
		},
		status(store, status) {
			store.commit("status", status);
		},
		privateKey(store, privateKey){
			store.commit("privateKey", privateKey);
		},
		publicKey(store, publicKey){
			store.commit("publicKey", publicKey);
		},
		settings(store, settings){
			store.commit("settings", settings);
		},


		message(store, message) {
			store.commit("message", message);
		},
		user(store, user) {
			store.commit("user", user);
		},
		updateUser(store, user) {
			store.commit("updateUser", user);
		},
	},
	mutations: {
		showUserlist(state, show) {
			state.showUserlist = show;
		},
		chat(state, chat) {
			state.chats.push(chat);
		},
		server(state, server) {
			state.servers.push(server);
		},
		username(state, username) {
			state.settings.username = username;
			let u = state.users.find(u => u.key === this.state.publicKey);
			config.set("username", username);
			if(u !== undefined){
				u.username = username;
			}
		},
		status(state, status) {
			state.settings.status = status;
		},
		privateKey(state, privateKey){
			state.settings.privateKey = privateKey;
			config.set("private_key", privateKey);
		},
		publicKey(state, publicKey) {
			state.settings.publicKey = publicKey;
			config.set("public_key", publicKey);
		},
		settings(state, settings){
			Object.entries(settings).forEach(([k, v]) => {
				state.settings[k] = v;
			});
			config.set("public_key", state.settings.publicKey);
			config.set("private_key", state.settings.privateKey);
			config.set("username", state.settings.username);
			let u = state.users.find(u => u.key === state.settings.publicKey);
			if(u !== undefined){
				u.username = state.settings.username;
			}
		},


		message(state, message) {
			state.chats.find(c => c.id === message.chat).messages.push(message);
		},
		user(state, user) {
			if(state.users.find(u => u.key === user.key) === undefined){
				state.users.push(user);
			}
		},
		updateUser(state, user) {
			let u = state.users.find(u => u.key === user.key);
			if(u !== undefined){
				Object.entries(u).forEach(([k, v]) => {
					u[k] = v;
				});
			}
		},
	},
	getters: {
		getServers: state => state.servers,
		getChats: state => state.chats,
		getChat: state => id => state.chats.find(c => c.id == id),
		getUser: state => key => state.users.find(u => u.key === key),
		getUsername: state => state.settings.username,
		getStatus: state => state.settings.status,
		getPrivateKey: state => state.settings.privateKey,
		getPublicKey: state => state.settings.publicKey,

		getSettings: state => state.settings,

		getUsers: state => state.users,
		getShowUserlist: state => state.showUserlist,
	},
});