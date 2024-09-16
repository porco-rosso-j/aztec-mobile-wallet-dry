module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-syntax-import-attributes',
      {
        deprecatedAssertSyntax: true,
        loose: true
      }
    ],
    './babel-plugin-replace-import-meta',
    ['@babel/plugin-syntax-top-level-await', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }]
  ]
};
