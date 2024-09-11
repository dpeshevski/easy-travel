module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'never'],
    'vuejs-accessibility/label-has-for': [
      'error', {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
        vue: 'always',
        json: 'never'
      }
    ],
    'import/no-unresolved': [2, { ignore: ['.ts', '.js', '.vue'] }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.vue']
      }
    }
  }
};
