import styleGuide from '@vercel/style-guide/prettier';

const sharedConfig = styleGuide;
const sharedPlugins = sharedConfig.plugins || [];

export default {
  ...sharedConfig,
  plugins: [...sharedPlugins, '@prettier/plugin-php', 'prettier-plugin-sh'],
  // Override Vercel
  // Override by file or type
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: {
        // Override Vercel
        bracketSpacing: true,
        singleQuote: true,
        printWidth: 80,
        // Chain formatting
        arrowParens: 'always',
        trailingComma: 'all',
        bracketSameLine: false,
      },
    },
    {
      files: 'package*.json',
      options: {
        printWidth: 1000,
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.php'],
      options: {
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        braceStyle: '1tbs',
        phpVersion: '8.2',
      },
    },
  ],
};
