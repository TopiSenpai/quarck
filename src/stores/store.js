import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		messages: [],
		users: []
	},
	mutations: {
		message(message) {
			this.state.messages.push(message)
		},
		user(user) {
			if(this.state.users.find(u => u.key = user.key) == undefined){
                this.state.users.push(user)
            }
		}
	},
	getters: {
		messages: state => state.messages,
		users: state => state.users
	}
})