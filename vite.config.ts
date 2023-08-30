import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

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

  plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        Unocss({
          presets: [presetUno(), presetAttributify(), presetIcons()],
      })
    ],
build: {
        cssCodeSplit: true,
        rollupOptions,
        minify:false,
        lib: {
        entry: "./src/entry.ts",
        name: "RaspberryTart",
        fileName: "raspberry-tart",
        // 导出模块格式
        formats: ["es", "umd","iife"],
        },
    },

});