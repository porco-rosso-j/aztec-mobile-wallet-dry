const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  resolver: {
    unstable_enablePackageExports: true,
    resolveRequest: require('./metro.resolver'),

    extraNodeModules: {
      ...require('node-libs-react-native')
    },
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'] // Add other extensions if needed
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
