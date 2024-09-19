const path = require('path');

const EmptyModule = {
  filePath: path.resolve(__dirname, 'node_modules/empty-module/index.js'),
  type: 'sourceFile'
};

function customResolver(context, moduleName, platform) {
  // console.log('customResolver called!');
  // Check if the module being resolved is cheat_codes.js

  if (
    moduleName === '@aztec/aztec.js/dest/utils/cheat_codes.js' ||
    moduleName.endsWith('/cheat_codes.js')
  ) {
    return EmptyModule;
  }

  if (moduleName === 'worker_threads') {
    return EmptyModule;
  }

  if (moduleName === 'fs') {
    return EmptyModule;
  }

  if (moduleName === 'fs/promises') {
    return EmptyModule;
  }

  if (moduleName === 'net') {
    return EmptyModule;
  }

  if (moduleName === 'tls') {
    return EmptyModule;
  }

  // if (moduleName === 'buffer') {
  //   console.log('replacing buffer');
  //   return {
  //     filePath: path.resolve(
  //       __dirname,
  //       './node_modules/react-native-buffer/index.js'
  //     ),
  //     type: 'sourceFile'
  //   };
  // }

  // Mock both 'url' and 'node:url' to prevent issues with Node.js-specific modules
  if (moduleName === 'url' || moduleName === 'node:url') {
    return {
      filePath: path.resolve(__dirname, 'mock-url.js'), // Provide a mock for 'url' and 'node:url'
      type: 'sourceFile'
    };
  }

  // if (moduleName === '@aztec/bb.js') {
  //   console.log('replacing @aztec/bb.js:', moduleName);
  //   return {
  //     filePath: path.resolve(__dirname, './react-native-bb.js/dest/index.js'),
  //     type: 'sourceFile'
  //   };
  // }

  // if (
  //   moduleName === '@aztec/circuits.js/dest/barretenberg/crypto/index.js' ||
  //   moduleName.endsWith('/crypto/index.js')
  // ) {
  //   console.log('replacing circuits.js');
  //   return {
  //     filePath: path.resolve(
  //       __dirname,
  //       // '@aztec/bb.js/dest/circuits.js-barretenberg/index.js'
  //       // './react-native-bb.js/dest/circuits.js-barretenberg/index.js'
  //       './react-native-bb.js/dest/circuits.js-crypto/index.js'
  //     ),
  //     type: 'sourceFile'
  //   };
  // }

  // Default resolution for all other modules
  return context.resolveRequest(context, moduleName, platform);
}

module.exports = customResolver;
