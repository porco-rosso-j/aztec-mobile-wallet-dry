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

  // Mock both 'url' and 'node:url' to prevent issues with Node.js-specific modules
  if (moduleName === 'url' || moduleName === 'node:url') {
    return {
      filePath: path.resolve(__dirname, 'mock-url.js'), // Provide a mock for 'url' and 'node:url'
      type: 'sourceFile'
    };
  }

  // to exclude @aztec/bb.js
  // foundation/dest/crypto/perdersen/pedersen.wasm.js
  // foundation/dest/crypto/poseidon/index.js
  // bb.js

  // if (
  //   moduleName === '@aztec/foundation/dest/crypto/index.js' ||
  //   moduleName.endsWith('/crypto/index.js')
  // ) {
  //   console.log('Using foundationCryptoMock for:', moduleName);
  //   return {
  //     filePath: path.resolve(__dirname, 'foundationCryptoMock.js'),
  //     type: 'sourceFile'
  //   };
  // }

  // if (
  //   moduleName === '@aztec/foundation/dest/crypto/pedersen/pedersen.wasm.js' ||
  //   moduleName.endsWith('/pedersen.wasm.js')
  // ) {
  //   // return EmptyModule;
  //   console.log('Using pedersenMock for:', moduleName);
  //   return {
  //     filePath: path.resolve(__dirname, 'pedersenMock.js'),
  //     type: 'sourceFile'
  //   };
  // }

  // if (
  //   moduleName === '@aztec/foundation/dest/crypto/poseidon/index.js' ||
  //   moduleName.endsWith('/poseidon/index.js')
  // ) {
  //   console.log('Using poseidonMock for:', moduleName);
  //   return {
  //     filePath: path.resolve(__dirname, 'poseidonMock.js'),
  //     type: 'sourceFile'
  //   };
  // }

  // if (moduleName === '@aztec/bb.js') {
  //   console.log('Using @aztec/bb.js for:', moduleName);
  //   return {
  //     filePath: path.resolve(__dirname, 'bbJsMock.js'), // Provide a mock for 'url' and 'node:url'
  //     type: 'sourceFile'
  //   };
  // }

  // if (moduleName === '@aztec/bb.js') {
  //   return EmptyModule;
  // }

  // Default resolution for all other modules
  return context.resolveRequest(context, moduleName, platform);
}

module.exports = customResolver;
