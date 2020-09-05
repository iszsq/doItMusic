import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isPc: true, //是否是pc端
	},
	mutations: {
		// login(state, payload) {
		// 	if (payload) {
		// 		state.mobile = payload.mobile
		// 	}
		// 	state.isLogin = true
		// },
		setIsPc(state, val){
			state.isPc= val;
		}
	},
	actions: {
		
	}
})

export default store;
