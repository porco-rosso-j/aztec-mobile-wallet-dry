const {
  //commands
  createEsbuildCommands,
  babelPlugin
  // esmCustomMainFieldResolverPlugin
} = require('react-native-esbuild');
const { polyfillNode } = require('esbuild-plugin-polyfill-node');

const commands = createEsbuildCommands(config => ({
  ...config,
  target: 'es2015', // or 'es2020' for more specific targeting
  format: 'esm',
  plugins: config.plugins.concat(
    babelPlugin({
      filter: /src\/my-babel-components\/.+\.[tj]sx?$/,
      loader: 'tsx', // use 'ts' if you are working with TypeScript or 'js' for JavaScript
      sourcemap: true,
      config: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                esmodules: true // or specify other targets like '> 0.25%, not dead'
              },
              modules: false
            }
          ],
          '@babel/preset-react', // Add this preset to compile JSX
          '@babel/preset-typescript' // If you're using TypeScript
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-modules-commonjs'
        ] // Add any Babel plugins you may need
      }
    }),
    polyfillNode({
      exclude: ['navigator', 'window', 'document']
    })
  ),
  external: ['react-native-web', 'react-dom']
}));

module.exports = {
  commands
};
