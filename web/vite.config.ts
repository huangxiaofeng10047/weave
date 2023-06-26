import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  ElementPlusResolver,
  AntDesignVueResolver,
  VantResolver,
  HeadlessUiResolver,
  ElementUiResolver
} from 'unplugin-vue-components/resolvers'
import prismjs from "vite-plugin-prismjs";

import fs from 'fs'

// env must start with this prefix. in .env config
const envPrefix = 'WEAVE_';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), envPrefix) };

  return defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'views': resolve(__dirname, 'src/views'),
        'components': resolve(__dirname, 'src/components'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      prismjs({
        languages: ["json", "js", "go", "bash", "yaml", "markup"],
        plugins: ["line-numbers"],
        theme: "solarizedlight",
        css: true,
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
        ],
         // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
      })
    ],
    envPrefix: envPrefix,
    server: {
      // if your frontend not in the localhost, please uncomment the https config meanwhile
      host: process.env.WEAVE_HOST,
      port: process.env.WEAVE_PORT,
      // https: {
      //   ca: fs.readFileSync('../certs/root.crt'),
      //   key: fs.readFileSync('../certs/frontend.key'),
      //   cert: fs.readFileSync('../certs/frontend.crt')
      // },
      proxy: {
        '/api': {
          target: process.env.WEAVE_SERVER,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/\/api/, '/api')
        }
      },
    }
  });
}
