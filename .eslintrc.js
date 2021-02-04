module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
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
    // ts
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
}
