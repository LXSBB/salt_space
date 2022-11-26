import { defineStore } from 'pinia'
import Type from '../types/types'
export const homeStore = defineStore('home', {
    state: () => ({
        nowTopic:1,
        theme: 'light',
        labelList: [], //首页标签
    }),
    getters: {
        // countPow2(state) {
        //     return state.num + 2;
        // },
    },
    actions: {
        changeTopic(playLoad:any) {
            this.nowTopic = playLoad;
        },
    },
})