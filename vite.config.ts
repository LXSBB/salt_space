import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0'
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.scss";',
      },
    },

  },
})
