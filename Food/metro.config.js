const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for .cjs and .tsx files
config.resolver.sourceExts.push('cjs', 'ts', 'tsx');

// Ensure proper module resolution
config.resolver.extraNodeModules = {
  'react-native-gesture-handler': require.resolve('react-native-gesture-handler'),
};

module.exports = config; 