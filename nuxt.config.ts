// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Must be false to be used served by pocketbase
  srcDir: 'app',
  modules: ['@nuxt/ui'],
  imports: {
    addons: {
      vueTemplate: true
    }
  },
})
