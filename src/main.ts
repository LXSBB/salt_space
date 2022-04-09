import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import eventBus from 'vue3-eventbus'
import {setDomFontSize} from './tool/dom'

setDomFontSize()

createApp(App).use(router).use(createPinia()).use(eventBus).mount('#app')
