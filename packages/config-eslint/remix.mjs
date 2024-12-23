// remix.mjs
import reactConfig from './react.mjs';
import serverConfig from './server.mjs';
import globals from 'globals';

/*
 * This is a custom ESLint configuration for use with
 * Remix applications. Extends both React and Server configs
 * to handle Remix's fullstack nature.
 */

export default [
  ...serverConfig, // Base server rules
  ...reactConfig, // Base React rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['public/**'],
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals for client components
        ...globals.node, // Node globals for server code
      },
    },
    rules: {
      // Override any conflicting rules
      'import/no-default-export': 'off', // Remix needs default exports
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
          pathGroups: [
            {
              pattern: '~/**',
              group: 'internal',
            },
          ],
        },
      ],
    },
  },
  {
    // Remix-specific file patterns
    files: [
      'app/routes/**/*.{js,jsx,ts,tsx}',
      'app/root.{js,jsx,ts,tsx}',
      'app/entry.*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'import/prefer-default-export': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off', // Remix handles types
    },
  },
  {
    // Server-side only files
    files: [
      'app/server/**/*.{js,ts}',
      'app/models/**/*.{js,ts}',
      'app/services/**/*.{js,ts}',
    ],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
];
