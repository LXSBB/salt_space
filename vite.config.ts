import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path";

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, '/src'),
    },
  },
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
