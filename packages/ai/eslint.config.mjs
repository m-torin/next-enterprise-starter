// es-utils/eslint.config.mjs
import serverConfig from '@repo/eslint-config/server';
import { resolve } from 'node:path';
import globals from 'globals';

const project = resolve(process.cwd(), 'tsconfig.json');

export default [
  ...serverConfig,
  {
    files: ['**/*.{js,ts,mts,cts,mjs,cjs}'],
    languageOptions: {
      parserOptions: {
        project,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {},
  },
  {
    files: ['**/__tests__/**/*', '**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {},
  },
];
