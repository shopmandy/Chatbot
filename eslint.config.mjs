import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Formatting rules
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
      'padded-blocks': ['error', 'never'],
      'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
      'arrow-spacing': 'error',
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
]

export default eslintConfig
