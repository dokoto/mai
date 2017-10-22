module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended' // or 'plugin:vue/base'
  ],

parser: 'babel-eslint',

settings: {
  ecmascript: 6
},

ecmaFeatures:{ 
  modules: true
  destructuring: true
  classes: true
  forOf: true
  blockBindings: true
  arrowFunctions: true
  },

env:{
  browser: true
  node: true
},

globals:{
  TARGET: true
  PLATFORM: true
  VERSION: true
  REST_API: true
  LANGUAJE: true
},

rules: {
  arrow-body-style: 0,
  arrow-parens: 0,
  class-methods-use-this: 0,
  func-names: 0,
  indent: 2,
  new-cap: 0,
  no-plusplus: 0,
  no-return-assign: 0,
  quote-props: 0,
  template-curly-spacing: [2, "always"],
  comma-dangle: ["error", {
    "arrays": "always-multiline",
    "objects": "always-multiline",
    "imports": "always-multiline",
    "exports": "always-multiline",
    "functions": "never"
  }],
  prefer-arrow-callback: 0,
  import/extensions: 0,
  import/no-extraneous-dependencies: 0,
  import/no-unresolved: 0,
  import/prefer-default-export: 0,
  no-console: ["error", { allow: ["warn", "error", "log"] }]
}
}