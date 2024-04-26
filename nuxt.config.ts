// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Moviewebsite',
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['stores'],
  },
  srcDir: 'src',
  alias: {
    gql: fileURLToPath(new URL('./src/gql', import.meta.url)),
    components: fileURLToPath(new URL('./src/components', import.meta.url)),
    stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
    utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
  },
})
