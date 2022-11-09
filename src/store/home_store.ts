import { defineStore } from 'pinia'
import Type from '../types/types'
export const homeStore = defineStore('home', {
    state: () => ({
        nowTopic:1,
        theme: 'light'
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