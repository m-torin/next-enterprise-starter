// .storybook/main.ts
import { StorybookConfig } from '@storybook/react-vite';
import path, { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
interface PackageResolver {
  (packageName: string): string;
}

const getAbsolutePath: PackageResolver = function (value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
};

const config: StorybookConfig = {
  // Stories pattern - where to find story files
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '!../src/cisceo/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  // Core configuration
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
    enableCrashReports: false,
  },

  // Addons configuration
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
  ],

  // Framework configuration
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  // Documentation configuration
  docs: {
    autodocs: true,
  },

  // TypeScript configuration
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false, // Disable type checking during build for better performance
    reactDocgenTypescriptOptions: {
      exclude: ['**/cisceo/**/*', '**/node_modules/**/*'],
      // You can add more directories to ignore
      // exclude: ['**/generated/**/*', '**/node_modules/**/*', '**/test/**/*', '**/stories/**/*'],
    },
  },

  // Vite specific configuration for Storybook
  viteFinal: async (config) => {
    // Ensure CSS configuration exists
    if (!config.css) {
      config.css = {};
    }

    // Configure CSS modules
    config.css.modules = {
      // Generate scoped class names for CSS modules
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // Use camelCase for class names in JavaScript
      localsConvention: 'camelCase',
    };

    // Configure SCSS preprocessing
    config.css.preprocessorOptions = {
      scss: {
        api: 'modern-compiler',
        // Import global SCSS variables in all files
        additionalData: `@use "${path.join(process.cwd(), 'src/mantine/_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    };

    // Return the modified config
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '#/base': path.resolve(__dirname, '..'),
          '#': path.resolve(__dirname, '../src'),
        },
      },
    };
  },
};

export default config;
