module.exports = function () {
  return {
    visitor: {
      MetaProperty(path) {
        if (
          path.node.meta.name === 'import' &&
          path.node.property.name === 'meta'
        ) {
          // Replace `import.meta` with `undefined`
          path.replaceWithSourceString('undefined');
        }
      }
    }
  };
};
