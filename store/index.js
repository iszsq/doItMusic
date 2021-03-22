import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
/**
 * 全局状态管理
 */
const store = new Vuex.Store({
	state: {
		isPc: true, //是否是pc端
		//当前播放音乐id
		audioId: null,
		//音乐标题
		audioTitle: '',
		// 默认 音频播放背景图片
		defaultPicUrl: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
		//歌曲图片
		picUrl: '',
		//音乐歌词
		audioLrc: {
			ms: null
		}, 
		//音频组件信息
		audioMeta: {
			buffered: 0,
			duration: 0,
			currentTime: 0,
			volume: 0,
			//音乐是否暂停中
			paused: true,
		},
	},
	getters: {
		/**
		 * 播放页背景图片
		 */
		audioPageBg(state){
			let {picUrl, defaultPicUrl} = state;
			return picUrl ? picUrl : defaultPicUrl;
		},
		
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
		},
		setAudioId(state, val){
			state.audioId= val;
		},
		setAudioTitle(state, val){
			console.log('setAudioTitle--', val);
			state.audioTitle= val;
		},
		setPicUrl(state, val){
			console.log('setPicUrl--', val);
			state.picUrl= val;
		},
		setAudioLrc(state, val){
			state.audioLrc= val;
		},
		setAudioMeta(state, val){
			state.audioMeta= val;
		},
	},
	actions: {
		
	}
})

export default store;
