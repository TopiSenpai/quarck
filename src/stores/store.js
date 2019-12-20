import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from "vuex-electron"

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [
		//createPersistedState(),
		createSharedMutations()
	],
	state: {
		chats: [
			{
				name: 'public',
				messages: [],
				users: []
			}
		],
		servers: [],
		username: '',
		status: '',
		privateKey: '',
		publicKey: '',

		users: [],
		showUserlist: true
	},
	actions: {
		showUserlist(store, show) {
			store.commit('showUserlist', show)
		},
		chat(store, chat) {
			store.commit('chat', chat)
		},
		server(store, server) {
			store.commit('server', server)
		},
		username(store, username) {
			store.commit('username', username)
		},
		status(store, status) {
			store.commit('status', status)
		},
		privateKey(store, privateKey){
			store.commit('privateKey', privateKey)
		},
		publicKey(store, publicKey){
			store.commit('publicKey', publicKey)
		},


		message(store, message) {
			store.commit('message', message)
		},
		user(store, user) {
			store.commit('user', user)
		},
		updateUser(store, user) {
			store.commit('updateUser', user)
		},
	},
	mutations: {
		showUserlist(state, show) {
			state.showUserlist = show
		},
		chat(state, chat) {
			state.chats.push(chat)
		},
		server(state, server) {
			state.servers.push(server)
		},
		username(state, username) {
			state.username = username
		},
		status(state, status) {
			state.status = status
		},
		privateKey(state, privateKey){
			state.privateKey = privateKey
		},
		publicKey(state, publicKey) {
			state.publicKey = publicKey
		},


		message(state, message) {
			state.chats.find(c => c.name === message.chat).messages.push(message)
		},
		user(state, user) {
			if(state.users.find(u => u.key === user.key) === undefined){
                state.users.push(user)
			}
		},
		updateUser(state, user) {
			let u = state.users.find(u => u.key === user.key)
			if(u !== undefined){
				Object.entries().forEach(([k, v]) => {
					u[k] = v
				})
			}
		},
	},
	getters: {
		getPublicChat: state => state.publicChat,
		getServers: state => state.server,
		getChats: state => state.chats,
		getChat: state => name => state.chats.find(c => c.name == name),
		getUser: state => key => state.users.find(u => u.key === key),
		getUsername: state => state.username,
		getStatus: state => state.status,
		getPrivateKey: state => state.privateKey,
		getPublicKey: state => state.publicKey,

		getUsers: state => state.users,
		getShowUserlist: state => state.showUserlist
	}
})