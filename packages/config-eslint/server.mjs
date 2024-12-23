// server.mjs
import baseConfig from './index.mjs';
import globals from 'globals';

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 *
 * Extends the base config and adds specific rules for server-side code:
 * - Stricter TypeScript checks
 * - Node.js environment globals
 * - Special handling for test files
 */

export default [
  ...baseConfig,
  {
    // Server-side specific files
    files: ['**/*.{js,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.es2021,
      },
    },
    rules: {
      // Enforce strict TypeScript usage in server code
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  {
    // Test file specific configuration
    files: ['**/__tests__/**/*', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      // Relax rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
