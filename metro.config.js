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
    // minifierConfig: {
    //   compress: {
    //     // Remove unused code
    //     dead_code: true
    //   },
    //   mangle: true
    // },
    // sourceMap: false
    //  babelTransformerPath: require.resolve('react-native-babel-transformer'),
  },
  resolver: {
    // assetExts: metroDefault.assetExts.concat(['wasm']),
    unstable_enablePackageExports: true,
    // unstable_enableSymlinks: true,
    // Include extra node modules path for the custom package
    // alias: {
    //   // Alias the cheat_codes.js file to an empty module
    //   '@aztec/aztec.js/dest/utils/cheat_codes': path.resolve(
    //     __dirname,
    //     'cheat_codes'
    //   ) // or use your mock file path
    // },
    resolveRequest: require('./metro.customResolver'),
    // extraNodeModules: require('node-libs-react-native'),

    extraNodeModules: {
      // worker_threads: path.resolve(
      //   __dirname,
      //   'node_modules/empty-module/index.js'
      // ), // Mocking worker_threads
      // './node_modules/@aztec/aztec.js/dest/utils/cheat_codes.js':
      //   require.resolve('empty-module'),
      // cheat_codes: require.resolve('empty-module'),
      // './cheat_codes.js': require.resolve('empty-module'),
      // '@aztec/accounts': path.resolve(
      //   __dirname,
      //   'aztec-packages/accounts/dest'
      // ),
      // '@aztec/bb.js': path.resolve(__dirname, 'aztec-packages/bb.js'),
      //   '@aztec/aztec.js': path.resolve(__dirname, '@aztec/aztec.js/dest'),
      //   '@aztec/foundation': path.resolve(__dirname, '@aztec/foundation/dest'),
      //   '@aztec/circuits.js': path.resolve(
      //     __dirname,
      //     '@aztec/circuits.js/dest/index.js'
      //   ),
      //   '@aztec/circuit-types': path.resolve(
      //     __dirname,
      //     '@aztec/circuit-types/dest'
      //   ),
      //   '@aztec/ethereum': path.resolve(__dirname, '@aztec/ethereum/dest'),
      //   '@aztec/entrypoints': path.resolve(__dirname, '@aztec/entrypoints/dest'),
      //   '@aztec/types': path.resolve(__dirname, '@aztec/types/dest')

      // polyiflls
      // path: require.resolve('path-browserify'),

      // fs: require.resolve('react-native-fs'),
      //fs: require.resolve('empty-module'),
      // fs: path.resolve(__dirname, './node_modules/react-native-fs'),
      // fs: require.resolve('react-native-level-fs'),
      // fs: nodejs.path,
      // fs: require.resolve('browserify-fs'),
      // fs: path.resolve(__dirname, 'fs.js'),
      // https://stackoverflow.com/a/39068031
      // crypto: require.resolve('react-native-crypto'),
      // process: require.resolve('process/browser'),
      // https://github.com/facebook/react-native/issues/30654#issuecomment-753844822
      // randombytes: require.resolve('react-native-randombytes'),
      ...require('node-libs-react-native')
    },

    // blacklistRE: exclusionList([
    //   /node_modules\/@aztec\/aztec\.js\/dest\/utils\/cheat_codes\.js$/ // Exact path to cheat_codes.js
    // ]),
    // Support for common file extensions
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'] // Add other extensions if needed
  }
};

// https://web3auth.io/docs/troubleshooting/metro-issues-mpc
// @babel/polyfill

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
