import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
    state: () => ({
        num:2
    }),
    getters: {
        countPow2(state) {
            return state.num + 2;
        },
    },
    actions: {
        countPlusOne(msg:any) {
            this.num+=msg;
        },
    },
})