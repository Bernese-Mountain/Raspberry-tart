/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetUno, presetAttributify, presetIcons } from "unocss";
// import Unocss from "unocss/vite";
import Unocss from "./config/unocss";

// https://vitejs.dev/config/
const rollupOptions = {

    external: ["vue", "vue-router"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
};

export default defineConfig({
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },
  plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        Unocss()
    ],
  build: {
        sourcemap: true, // 输出单独 source文件
        rollupOptions,
        minify: 'terser', // boolean | 'terser' | 'esbuild'
        cssCodeSplit: true,
        lib: {
          entry: "./src/entry.ts",
          name: "SmartyUI",
          fileName: "smarty-ui",
          formats: ["es", "umd", "iife"], // 导出模块类型
        },
      },

});
