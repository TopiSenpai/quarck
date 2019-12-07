import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		messages: [],
		users: []
	},
	mutations: {
		message(state, message) {
			state.messages.push(message)
		},
		user(state, user) {
			if(state.users.find(u => u.key = user.key) == undefined){
                state.users.push(user)
            }
		}
	},
	getters: {
		getMessages: state => state.messages,
		getUsers: state => state.users
	}
})