//中央事件总线
import Vue from 'vue';

const Bus = function (Vue) {
    this.Vue = Vue;
    this.instance = null;

    this.init = function () {
        let {Vue} = this;
        this.instance = new Vue({
            methods: {
                emit(event, ...args) {
                    this.$emit(event, ...args);
                },
                on(event, callback) {
                    this.$on(event, callback);
                },
                off(event, callback) {
                    this.$off(event, callback);
                },
            },
        });
    };

    this.emit= function (event, ...args) {
        this.instance.emit(event, ...args);
    };

    this.init();
};

let bus = new Bus(Vue);
const install = function(Vue){
    Vue.prototype.$bus = bus.instance;
};
export default {
    install,
    bus: bus.instance,
};
