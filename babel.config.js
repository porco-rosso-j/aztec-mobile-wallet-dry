module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    'module:@react-native/babel-preset'
    // [
    //   'module:@react-native/babel-preset',
    //   {
    //     targets: {
    //       modules: false,
    //       node: 'current' // This is just an example, adjust if needed
    //     }
    //   }
    // ]
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import' // Needed for dynamic import syntax
  ]
};
