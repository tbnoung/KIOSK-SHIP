module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:wdio/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['wdio'],
  // add your custom rules here
  rules: {
    'no-undef': 'off',
  },
}
