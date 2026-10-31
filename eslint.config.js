import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'src/assets/icons/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        KeyboardEvent: 'readonly',
        MediaQueryList: 'readonly',
        Node: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        IntersectionObserver: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/attributes-order': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.js'],
    languageOptions: { sourceType: 'module' },
  },
  prettier,
)
