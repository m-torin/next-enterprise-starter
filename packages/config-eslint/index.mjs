// index.mjs
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import securityPlugin from 'eslint-plugin-security';
import promisePlugin from 'eslint-plugin-promise';
import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Security Plugin recommended rules
  securityPlugin.configs.recommended,

  // Promise Plugin flat/recommended rules
  promisePlugin.configs['flat/recommended'],

  {
    // Match all JavaScript/TypeScript files
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],

    // Standard ignores plus build artifacts
    ignores: [
      '.*',
      'node_modules/**',
      'dist/**',
      'build/**',
      '**/*.css',
      '.eslintrc.js',
    ],

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project,
      },
      globals: {
        ...globals.node,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    // Configure all shared plugins
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'only-warn': onlyWarn,
      security: securityPlugin,
      promise: promisePlugin,
    },

    // TypeScript-aware import resolution
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },

    rules: {
      // Override conflicting TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off', // Explicitly disable no-explicit-any
      'security/detect-object-injection': 'off', // Disable object injection warning

      // Import organization and validation
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Must be last to properly disable conflicting rules
  eslintConfigPrettier,
];
