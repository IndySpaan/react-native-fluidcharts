const path = require('path');
const watchFolders = require('metro-config/src/defaults/watchFolders');

// Get the project root directory
const projectRoot = __dirname;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Let Metro know where the project root is
  projectRoot,

  // Watch folders for the monorepo structure
  watchFolders: [
    path.resolve(projectRoot, 'packages'),
  ],

  // Resolver configuration for monorepo
  resolver: {
    // Alias @fluidcharts/core to the packages folder
    extraNodeModules: {
      '@fluidcharts/core': path.resolve(projectRoot, 'packages/fluidcharts/src'),
    },
  },

  // Transformer configuration
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = config;
