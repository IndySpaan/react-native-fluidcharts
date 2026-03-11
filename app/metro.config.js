const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

module.exports = mergeConfig(getDefaultConfig(projectRoot), {
  watchFolders: [workspaceRoot],

  resolver: {
    unstable_enableSymlinks: true,
    unstable_conditionNames: ['react-native', 'require', 'node', 'default'],
  },
});