import { defineStore } from 'pinia'
import Type from '../types/types'
export const useHomeStore = defineStore('home', {
    state: () => ({
        nowTopic:1
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