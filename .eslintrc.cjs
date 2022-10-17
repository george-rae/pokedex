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
    camelcase: 0,
    "no-use-before-define": 0,
    "no-nested-ternary": 0,
    "no-prototype-builtins": 0,
    "@typescript-eslint/ban-types": 0,
    "no-param-reassign": 0,
    "vue/script-setup-uses-vars": 0,
  },
};
