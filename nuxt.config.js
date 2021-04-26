export default {
  ssr: true,
  target: 'server',
  env: {
    // BASE_URL: 'https://test-polimi.herokuapp.com', // Production URL
    BASE_URL: '', // Development URL
    GOOGLE_MAPS_API_KEY: 'AIzaSyCWL7MydXuhufeaRI9RAVEUAKiTH8lu6TA', // Google Maps Secret Key
  },
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server/rest/api.js',
    },
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Plug-IT: connect to the future',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Plug-IT is an italian company specialized in designing and implementing innovative solutions in the Digital Services, Technology and Consulting fields.',
      },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/icon.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&display=swap',
        rel: 'stylesheet',
      },
      {
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css/normalize.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
