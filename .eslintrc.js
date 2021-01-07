module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',
  },
}
