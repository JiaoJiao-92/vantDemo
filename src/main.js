// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Vant 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的touch事件，没有监听桌面端的mouse事件。
// 如果你需要在桌面端使用 Vant，可以引入我们提供的 @vant/touch-emulator，这个库会在桌面端自动将mouse事件转换成对应的touch事件，使得组件能够在桌面端使用。
// vant样式库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 为了试下桌面端的滑动效果-手机端不需要
import '@vant/touch-emulator';

import '../static/css/resetui.css';

// 按需引入vant组件


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})