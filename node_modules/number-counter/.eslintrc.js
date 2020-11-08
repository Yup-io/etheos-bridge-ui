module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-param-reassign": 0,
    "func-names": ["error", "never"],
    "max-len": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
    "allowIndentationTabs": true,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}]
  },
};
