'use strict';

module.exports = {
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['./src/**/*.{ts,tsx}'],
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        'prefer-const': [
          'warn',
          {
            destructuring: 'any',
            ignoreReadBeforeAssign: false,
          },
        ],
        'prettier/prettier': 'warn',
      },
    },
    {
      files: ['./*.cjs'],
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'commonjs',
      },
      rules: {
        'prettier/prettier': 'warn',
      },
    },
    {
      files: ['./*.mjs'],
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      env: {
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ],
};
