import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home',
    }, {
        path: '/home',
        name: 'home',
        component: (resolve) => require(['@/components/home/home'], resolve)
    }, {
        path: '/subList',
        name: 'subList',
        component: (resolve) => require(['@/components/home/subList'], resolve)
    }, {
        path: '/town',
        name: 'town',
        component: (resolve) => require(['@/components/list/town'], resolve)
    }, {
        path: '/detail',
        name: 'detail',
        component: (resolve) => require(['@/components/common/detail'], resolve)
    }, {
        path: '/cunList',
        name: 'cunList',
        component: (resolve) => require(['@/components/list/cunList'], resolve)
    }, {
        path: '/myHome',
        name: 'myHome',
        component: (resolve) => require(['@/components/user/myHome'], resolve)
    }]
})