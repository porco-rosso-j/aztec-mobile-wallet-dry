import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';
import webpack from 'webpack';

export default {
  target: 'web',
  mode: 'production',
  // Useful for debugging.
  // mode: 'development',
  // devtool: 'source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: 'asset/inline'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.browser.json',
              onlyCompileBundledFiles: true
            }
          }
        ]
      }
      // {
      //   test: /\.[jt]sx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader', // Use babel-loader to transpile JSX/TypeScript
      //     options: {
      //       presets: [
      //         '@babel/preset-env',
      //         '@babel/preset-react',
      //         '@babel/preset-typescript'
      //       ]
      //     }
      //   }
      // }
    ]
  },
  output: {
    path: resolve(dirname(fileURLToPath(import.meta.url)), './dest/browser'),
    filename: 'index.js',
    module: true,
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_DEBUG': false }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
  ],
  resolve: {
    plugins: [new ResolveTypeScriptPlugin()]
    // extensions: ['.ts', '.tsx', '.js'] // Add common extensions
    // alias: {
    //   // Map React Native to React Native Web to avoid errors
    //   'react-native$': 'react-native-web'
    // }
    // fallback: {
    //   // Provide fallbacks for Node.js core modules (if needed by dependencies)
    //   buffer: require.resolve('buffer/'),
    //   util: require.resolve('util/')
    // }
  },
  // externals: {
  //   'react-native': 'commonjs react-native' // Treat react-native as an external dependency
  // },

  devServer: {
    hot: false,
    client: {
      logging: 'none',
      overlay: false
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
};
