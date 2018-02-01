module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0, //
    'arrow-parens': 0, // Prettier messes this one up
    'no-plusplus': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'jsx-quotes'           : [2, 'prefer-single'],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'function-paren-newline': 0,
    'react/prop-types': 0, // We are using flow instead
    'react/jsx-filename-extension': 0, // Prefer .js
    'react/prefer-stateless-function': 1, // Just warn
    'jsx-a11y/accessible-emoji': 0, // Because I was lazy
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        // So the 'to' prop in Link and NavLink are considered ok
        specialLink: ['to'],
      },
    ],
    'key-spacing'          : 0,
    'jsx-quotes'           : [2, 'prefer-single'],
    'no-return-assign' : 0,
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }],
    'max-len'              : [2, 120, 2],
    'object-curly-spacing' : [2, 'always'],
    'object-curly-newline': [2, { 'consistent': true }],
    'space-before-function-paren': [2, 'never'],
    'semi': [2, 'always'],
    'react/jsx-indent-props': [0, 0],
    'react/jsx-tag-spacing': [2, {
      'closingSlash': 'never',
      'beforeSelfClosing': 'never',
      'afterOpening': 'never'
    }],
    'react/jsx-space-before-closing': 'off',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/no-children-prop': 0,
    'import/no-named-default': 0,
    'import/no-named-as-default': 0,
    'jsx-a11y/label-has-for': 0
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  // Add enzymes shallow, render, mount to be valid global vars
  globals: {
    shallow: true,
    render: true,
    mount: true,
    __DEV__: true,
    __TEST__: true,
    __PROD__: true,
    __COVERAGE__: false
  },
};
