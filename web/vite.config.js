import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import prismjs from "vite-plugin-prismjs";
import fs from 'fs'

// env must start with this prefix. in .env config
const envPrefix = 'WEAVE_';

// https://vitejs.dev/config/
<<<<<<< HEAD
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), envPrefix) };

  return defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'views': resolve(__dirname, 'src/views'),
        'components': resolve(__dirname, 'src/components'),
=======
export default defineConfig({
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
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    })
  ],
  server: {
    // if your frontend not in the localhost, please uncomment the https config meanwhile
    host: "0.0.0.0",
    port: 8081,
    https: {
      ca: fs.readFileSync('../certs/root.crt'),
      key: fs.readFileSync('../certs/frontend.key'),
      cert: fs.readFileSync('../certs/frontend.crt')
    },
    proxy: {
      '/api': {
        target: 'https://api.tool.mybns.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/\/api/, '/api')
>>>>>>> 89eb60c (add files)
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
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
        ],
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
