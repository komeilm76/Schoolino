import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.venv/**', 'test-results/**', 'playwright-report/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['src/**/*.{ts,vue}', '*.ts'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      globals: {
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        process: 'readonly',
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
      },
    },
  },
]
