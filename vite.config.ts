import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path";
import {svgBuilder} from './src/tool/svgBuilder';

export default defineConfig({
  base: "./",
  plugins: [vue(), svgBuilder('./src/assets/svg/')],
  resolve: {
    alias: {
      '@': join(__dirname, '/src'),
    },
  },
  server:{
    host:'0.0.0.0',
    proxy: {
      // 接口地址代理
      '/api': {
        target: 'http://124.221.221.82:9099', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: path => path.replace(/^\/api/, ' ')
      },
    }
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
