import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'vue/html-self-closing': 'off',
  },
})
