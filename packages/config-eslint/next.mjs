// next.mjs
import reactConfig from './react.mjs';
import globals from 'globals';

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps. Extends React config with Next.js specific rules.
 */

export default [
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true,
      },
    },
    rules: {
      // Next.js specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Allow default exports for pages/components
      'import/no-default-export': 'off',
    },
  },
  {
    // Next.js specific file patterns
    files: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      'middleware.{js,ts}',
    ],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
    },
  },
];
