import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer' // 打包后生成包详情html
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import' // 线上环境文件转换为cdn
import {Plugin as cdnImport} from 'vite-plugin-cdn-import-async' // 线上环境文件转换为cdn 支持异步版
import viteCompression from 'vite-plugin-compression' // gzip压缩
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将 node_modules 中的代码单独打包成一个 JS 文件
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    visualizer({
      gzipSize: true
    }),
    viteCompression({}),
    cdnImport({
      modules: [
        // {
        //   name: 'lodash',
        //   var: '_',
        //   path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`
        // },
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://cdn.jsdelivr.net/npm/vue@3.4.15/dist/vue.global.min.js'
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://cdn.jsdelivr.net/npm/vue-demi@0.14.7/lib/index.iife.min.js'
        },
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://cdn.jsdelivr.net/npm/element-plus@2.6.1/dist/index.full.min.js'
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.min.js'
        },
        {
          name: 'echarts',
          var: 'echarts',
          mode:"defer",
          path: 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js'
        },
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
