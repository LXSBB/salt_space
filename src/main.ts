import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import eventBus from 'vue3-eventbus'
import {setDomFontSize} from './tool/dom'
import directive from "./directive/directive";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

setDomFontSize()

createApp(App)
    .use(router)
    .use(directive)
    .use(ElementPlus)
    .use(createPinia())
    .use(eventBus).mount('#app')
