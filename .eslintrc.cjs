/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // @module overwrites
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-types": 0,
    // generic module overwrites
    "vue/script-setup-uses-vars": 0,
    "vuejs-accessibility/click-events-have-key-events": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    // built in eslint overwrites
    "no-use-before-define": 0,
    "no-nested-ternary": 0,
    "no-prototype-builtins": 0,
    "no-param-reassign": 0,
    "no-return-assignment": 0,
    camelcase: 0,
  },
};
