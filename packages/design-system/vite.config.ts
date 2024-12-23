// vite.config.ts
import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Get __dirname equivalent in ESM
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Configure plugins
  plugins: [
    // React plugin for JSX support
    react(),

    // TypeScript declaration file generation
    dts({
      insertTypesEntry: true,
      include: ['src'],
      // Handle .scss.d.ts files
      copyDtsFiles: true,
    }),
  ],

  // CSS configuration
  css: {
    // Configure CSS modules
    modules: {
      // Generate scoped class names
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // Use camelCase for class names in JavaScript
      localsConvention: 'camelCase',
    },

    // Configure SCSS preprocessing
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // Import global SCSS variables in all files
        additionalData: `@use "${path.join(process.cwd(), 'src/mantine/_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    },
  },

  // Build configuration
  build: {
    // Enable source maps for debugging
    sourcemap: true,

    // Configure library build
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      // Generate both ES modules and UMD bundles
      formats: ['es', 'umd'],
      fileName: (format) => `design-system.${format}.js`,
    },

    // Configure Rollup options
    rollupOptions: {
      // Mark these packages as external to avoid bundling them
      external: [
        'react',
        'framer-motion',
        'react-dom',
        '@mantine/core',
        '@mantine/hooks',
      ],

      // Configure output options
      output: {
        // Global variable names for external packages
        globals: {
          react: 'React',
          'framer-motion': 'framerMotion',
          'react-dom': 'ReactDOM',
          '@mantine/core': 'Mantine',
          '@mantine/hooks': 'MantineHooks',
        },
      },
    },
  },

  // Configure path aliases
  resolve: {
    alias: {
      '#/base': resolve(__dirname, '.'),
      '#': resolve(__dirname, './src'),
    },
  },

  // Configure dependency optimization
  optimizeDeps: {
    // Include these packages in the optimization
    include: ['@mantine/core', '@mantine/hooks'],
  },
});
