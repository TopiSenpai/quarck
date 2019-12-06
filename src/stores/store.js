import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		messages: {},
		users: {}
	},
	mutations: {
		message(message) {
			state.messages.push(message)
		},
		user(user) {
			if(users.find(u => u.key = packet.data.key) == undefined){
                state.users.push(user)
            }
		}
	},
	getters: {
		messages: state => state.messages,
		users: state => state.users
	}
})