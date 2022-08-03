import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/home.vue";
import PersonalCenter from "../views/personalCenter.vue";
import articleInfo from "@/views/articleInfo.vue";
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
    },
    {
        path: '/info',
        name: 'articleInfo',
        component: articleInfo
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
