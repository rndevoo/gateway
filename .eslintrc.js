module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:flowtype/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-extra-semi": "error",
    "no-console": 0,
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "max-len": ["error", {
      "code": 80,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true,
    }],
    "no-trailing-spaces": "error",
    "space-before-function-paren": ["error", "always"],
    "spaced-comment": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "arrow-parens": ["error", "always"],
  },
};
