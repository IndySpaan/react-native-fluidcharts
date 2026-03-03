const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const config = {
   // Make Metro able to resolve required external dependencies
   watchFolders: [
     path.resolve(__dirname, '../modules/react-native-fluidcharts'),
   ],
   resolver: {
     extraNodeModules: {
       'react-native': path.resolve(__dirname, 'node_modules/react-native'),
        },
   },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);