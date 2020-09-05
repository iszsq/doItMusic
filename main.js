import Vue from 'vue'
import App from './App'
import store from './store'
import './plugins/uView';
import MyBusPlugin from './plugins/MyBusPlugin';
import BaseMixin from './mixins/base.vue'
import YunApi from './service/yunApi.js';

Vue.config.productionTip = false;
//api接口
Vue.prototype.$yunApi = YunApi;
//全局混入
Vue.mixin(BaseMixin);
//eventBus
Vue.use(MyBusPlugin);

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
