const {
  //commands,
  createEsbuildCommands,
  esmCustomMainFieldResolverPlugin
} = require('react-native-esbuild');

// const commands = createEsbuildCommands(({ plugins, ...rest }) => ({
//   ...rest,
//   plugins: plugins.concat(esmCustomMainFieldResolverPlugin()),
//   resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
//     .map(extension => [
//       `.macos${extension}`,
//       `.ios${extension}`,
//       `.native${extension}`,
//       `.react-native${extension}`,
//       extension
//     ])
//     .flat()
// }));
const commands = createEsbuildCommands(config => ({
  ...config,
  plugins: config.plugins.concat(
    babelPlugin({
      filter: /src\/my-babel-components\/.+\.[tj]sx?$/
    })
  )
}));

// module.exports = {
//   commands
// };

module.exports = {
  commands,
  transformer: {
    babelTransformerPath: require.resolve('react-native-esbuild'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  esbuild: {
    loader: {
      '.js': 'jsx',
      '.ts': 'tsx'
    },
    // Mark certain modules as external
    external: [
      'react-native-web',
      'react-dom',
      'base-64',
      'web-streams-polyfill/ponyfill/es6',
      'react-native-fetch-api',
      'react-native-get-random-values'
    ],
    // Polyfill Node.js modules
    // inject: ['./polyfills.js'],
    // Specify the target environment to support BigInt literals
    target: 'ESNext',
    tsconfig: 'tsconfig.json'
    // tty, util, fs,
    // https://react-native-esbuild.vercel.app/
    // https://github.com/acostalima/react-native-polyfill-globals
  }
};
