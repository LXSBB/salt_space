import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/home.vue";
import PersonalCenter from "../views/personalCenter.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/personalCenter',
        name: 'personalCenter',
        component: PersonalCenter
    }
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
