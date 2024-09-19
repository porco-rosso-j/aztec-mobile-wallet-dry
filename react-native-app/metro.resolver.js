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

  // Default resolution for all other modules
  return context.resolveRequest(context, moduleName, platform);
}

module.exports = customResolver;
