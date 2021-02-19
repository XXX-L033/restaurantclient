module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    $: true,
    process: true,
    __dirname: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 7,
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': 0,
    'react/jsx-props-no-spreading': 0,
    'prefer-promise-reject-errors': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'class-methods-use-this': 0,
    'react/sort-comp': 0,
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
