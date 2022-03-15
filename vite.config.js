/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import viteCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import Autoprefixer from 'autoprefixer'
import { visualizer } from 'rollup-plugin-visualizer'
import PostcssPxtorem from 'postcss-pxtorem'
import {version} from './package.json'
export default defineConfig(({mode,command})=>{
 const baseConfig = {
   cacheDir:'./vite_cache',
   server:{
     host:'0.0.0.0',
     port:8083,
     open:true
   },
   resolve: {
     alias: {
       '~/': `${path.resolve(__dirname, 'src')}/`,
     },
   },
   plugins: [
     Vue({
       reactivityTransform: true,
     }),
     legacy({targets: ["> 1%", "last 4 versions", "not dead"]}),
     // https://github.com/hannoeru/vite-plugin-pages
     Pages(),
     // https://github.com/antfu/unplugin-auto-import
     AutoImport({
       imports: [
         'vue',
         'vue/macros',
         'vue-router',
         '@vueuse/core',
       ],
       dts: true,
     }),
     WindiCSS(),
     // https://github.com/antfu/vite-plugin-components
     Components({
       dts: true,
     })
   ],
   css:{
     postcss:{
       plugins: [
         Autoprefixer(),
         PostcssPxtorem({rootValue: 100,propList: ['*']}),
       ]
     }
   },
   // https://github.com/vitest-dev/vitest
   test: {
     environment: 'jsdom',
   },
   define:{
     _env:JSON.stringify({
       buildTime:new Date().toLocaleString(),
       ver:version,
       isProduction:mode === 'production',
       isSandbox:mode === 'sandbox',
       mode,
       isServe:command === 'serve'
     })
   }
 }
  if(mode === 'production'){
    baseConfig.plugins.push(viteCompression())
  } else if(mode === 'report'){
    baseConfig.plugins.push(visualizer({
      filename: path.resolve(baseConfig.cacheDir,'./visualizer/stats.html'),
      open: true,
      gzipSize: true,
      brotliSize: true
    }))
  }
 return baseConfig
})
