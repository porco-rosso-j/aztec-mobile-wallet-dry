const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Aliases or redirects to help Metro resolve paths correctly
    // resolveRequest: (context, realModuleName, platform, moduleName) => {
    //   if (moduleName === '@aztec/aztec.js') {
    //     // Redirect the main import to a specific path
    //     return {
    //       filePath: path.resolve(
    //         __dirname,
    //         'node_modules/@aztec/aztec.js/dest/index.js'
    //       )
    //     };
    //   }
    //   // For all other modules, use the default resolver
    //   return context.resolveRequest(
    //     context,
    //     realModuleName,
    //     platform,
    //     moduleName
    //   );
    // }
    // https://github.com/leegeunhyeok/react-native-esbuild/tree/main/example
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
