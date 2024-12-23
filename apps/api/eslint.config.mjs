// apps/api/eslint.config.mjs
import { resolve } from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import nextConfig from '@repo/eslint-config/next';
import globals from 'globals';

const __dirname = dirname(fileURLToPath(import.meta.url));
const project = resolve(process.cwd(), 'tsconfig.json');

export default [
  ...nextConfig,
  {
    files: [
      'app/**/*.{js,jsx,ts,tsx,mts,cts,mjs,cjs}',
      'src/**/*.{js,jsx,ts,tsx,mts,cts,mjs,cjs}',
    ],
    languageOptions: {
      parserOptions: {
        project,
      },
    },
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
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
