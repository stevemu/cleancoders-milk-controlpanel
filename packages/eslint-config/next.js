const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "prettier/prettier": [
      2,
      {
        "arrowParens": "always",
        "editorconfig": true,
        "endOfLine": "auto",
        "jsxBracketSameLine": true,
        "jsxSingleQuote": true,
        "printWidth": 100,
        "quoteProps": "as-needed",
        "semi": true,
        "singleQuote": true,
        "usePrettierrc": false
      }
    ]
  }
};
