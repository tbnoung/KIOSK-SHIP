import { NuxtConfig } from '@nuxt/types'

interface LessLoader {
  lessOptions: Object | Function
  additionalData: String | Function
  sourceMap: Boolean
  webpackImporter: Boolean
}

const APP_NAME = process.env.APP_NAME || 'KRONOS : VISITOR MANAGEMENT PLATFORM'

const config: NuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Runtime Config (https://nuxtjs.org/guides/configuration-glossary/configuration-runtime-config)
  publicRuntimeConfig: {
    APP_NAME,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'KRONOS : VISITOR MANAGEMENT PLATFORM',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'kronos-icon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/less/router.less',
    '@/assets/less/ant-design-vue/antd.less',
    '@/assets/less/ant-design-vue/style/themes/dark.less',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios',
    '@/plugins/antd-ui',
    '@/plugins/i18n',
    '@/plugins/vee-validate',
    '~/plugins/validation.js',
    '~/plugins/global.js',
    '~/plugins/enum.js',
    '@/plugins/repositories.js',
    '@/plugins/ship/user.js',
    '@/plugins/ship/permission.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components', ignore: ['pages'] }],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // *** Experimentation before use of Nuxt 3***
    // TODO: Remove after use Nuxt 3
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
  ],

  // Nuxt Color Mode module configuration (https://tailwindcss.nuxtjs.org/options)
  colorMode: {
    preference: 'light',
  },

  // Tailwind CSS module configuration (https://tailwindcss.nuxtjs.org/options)
  tailwindcss: {
    // See https://tailwindcss.nuxtjs.org/setup/#tailwind-just-in-time
    jit: true,
  },

  // Moment.js module configuration (https://github.com/nuxt-community/moment-module#configuration)
  moment: {
    locales: ['th'],
  },

  // Font Awesome module (https://github.com/nuxt-community/fontawesome-module)
  fontawesome: {
    icons: {
      // brands: [],
    },
    proIcons: {
      // solid: [],
      // regular: [],
      // light: [],
      duotone: [
        'faHome',
        'faDatabase',
        'faHdd',
        'faChartLine',
        'faBoxHeart',
        'faBoxUsd',
        'faTruck',
        'faFileChartPie',
        'faStoreAlt',
        'faBoxOpen',
        'faMobile',
        'faWarehouseAlt',
        'faUser',
        'faFileChartLine',
        'faBook',
        'faBoxCheck',
        'faBell',
        'faFolder',
        'faRegistered',
        'faUserPlus',
        'faTrash',
        'faInfoCircle',
        'faFileAlt',
        'faEdit',
      ],
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/universal-storage-module
    '@nuxtjs/universal-storage',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL,
  },
  env: {
    WEB_VER: process.env.WEB_VER || 'Check Version',
    APP_IMAGE: process.env.APP_IMAGE || '',
  },
  generate: {
    dir: `\\\\10.224.183.36\\Shared Drive\\Web\\dist`,
    // dir: `C:\\Users\\ment\\Desktop\\Dist`,
  },

  // Auth module configuration (https://dev.auth.nuxtjs.org)
  auth: {
    strategies: {
      local: {
        // scheme: 'refresh',
        token: {
          property: 'result.tokenId',
          maxAge: 10800,
          global: true,
          type: '',
        },
        // refreshToken: {
        //   property: 'result.refreshToken',
        //   data: 'refresh_token',
        //   maxAge: 60 * 60 * 24 * 30,
        // },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: process.env.AUTH_ENDPOINT_LOGIN, method: 'post' },
          // refresh: { url: '/api/auth/refresh', method: 'post' },
          logout: false, // { url: process.env.AUTH_ENDPOINT_LOGOUT, method: 'post' },
          user: { url: process.env.AUTH_ENDPOINT_USER, method: 'get' },
        },
      },
    },
  },

  // PWA module configuration (https://go.nuxtjs.dev/pwa)
  pwa: {
    meta: {
      name: 'KRONOS',
    },
  },

  // i18n module configuration (https://i18n.nuxtjs.org/options-reference)
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'US English',
        file: 'en-US.js',
      },
      {
        code: 'th',
        iso: 'th-TH',
        name: 'TH ภาษาไทย',
        file: 'th-TH.js',
      },
    ],
    defaultLocale: 'ภาษาไทย',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'assets/locales/',
  },

  // Nuxt Webfontloader module configuration (https://github.com/Developmint/nuxt-webfontloader)
  webfontloader: {
    google: {
      families: ['Prompt:400,500,600&display=swap'],
    },
  },

  // Router configuration (https://nuxtjs.org/guides/configuration-glossary/configuration-router)
  router: {
    // Router Middleware (https://nuxtjs.org/guides/configuration-glossary/configuration-router#middleware)
    base: '/kronos',
    // middleware: ['auth'],
    middleware: ['auth', 'shipAuth'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // Transpile (https://go.nuxtjs.dev/config-build#transpile)
    transpile: ['vee-validate/dist/rules'],

    // Customize options of Nuxt.js integrated webpack loaders. (https://go.nuxtjs.dev/config-build#loaders)
    extend(_config, ctx) {
      const less = ctx.loaders.less as LessLoader
      less.lessOptions = {
        javascriptEnabled: true,
      }
    },
  },
}

export default config
