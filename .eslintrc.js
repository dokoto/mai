module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  plugins: [
    'html'
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      destructuring: true,
      classes: true,
      forOf: true,
      blockBindings: true,
      arrowFunctions: true,
    },
  },
  globals: {
    VERSION: true,
    API: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-param-reassign': ["error", { "props": false }],
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'class-methods-use-this': 0,
    'func-names': 0,
    indent: 2,
    'new-cap': 0,
    'no-plusplus': 0,
    'no-return-assign': 0,
    'quote-props': 0,
    'template-curly-spacing': [2, 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'prefer-arrow-callback': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
};
