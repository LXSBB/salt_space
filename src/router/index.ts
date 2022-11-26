import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/home.vue";
import PersonalCenter from "../views/personalCenter.vue";
import articleInfo from "@/views/articleInfo.vue";
import createCenter from "@/views/createCenter.vue";
import bus from 'vue3-eventbus'
import personalCenter from "@/views/personalCenter.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            keepAlive: true,
        }
    },
    {
        path: '/personalCenter',
        name: 'personalCenter',
        component: PersonalCenter,
    },
    {
        path: '/info',
        name: 'articleInfo',
        component: articleInfo,
    },
    {
        path: '/createCenter',
        name: 'createCenter',
        component: createCenter
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: personalCenter
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
    //document.documentElement.setAttribute('data-theme', useHomeStore.theme);
    //判断当前登录状态并修改
    bus.emit('isLogin', !!localStorage.getItem('user_salt'))
    bus.emit('showNav', true)
    switch (to.name) {
        case "createCenter":
            if (!!localStorage.getItem('user_salt')) {
                bus.emit('showNav', false)
                next()
            } else {
                bus.emit('showLoginBox', true)
            }
            break
        default:
            next()
    }
});

export default router
