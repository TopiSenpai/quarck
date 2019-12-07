import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from "vuex-electron"

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [
		createPersistedState(),
		createSharedMutations()
	],
	state: {
		messages: [],
		users: [],
		username: '',
		privateKey: '',
		publicKey: '',
	},
	actions: {
		message(store, message) {
			store.commit('message', message)
		},
		user(store, user) {
			store.commit('user', user)
		},
		username(store, username) {
			store.commit('username', username)
		},
		keypair(store, privateKey, publicKey) {
			store.commit('keypair', privateKey, publicKey)
		},
	},
	mutations: {
		message(state, message) {
			state.messages.push(message)
		},
		user(state, user) {
			if(state.users.find(u => u.key === user.key) == undefined){
                state.users.push(user)
            }
		},
		username(state, username) {
			state.username = username
		},
		keypair(state, privateKey, publicKey) {
			state.privateKey = privateKey
			state.publicKey = publicKey
		},
	},
	getters: {
		getMessages: state => state.messages,
		getUsers: state => state.users,
		getUsername: state => state.username,
		getPrivateKey: state => state.privateKey,
		getPublicKey: state => state.publicKey,
	}
})